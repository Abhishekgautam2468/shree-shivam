import React, { useEffect, useState } from 'react'
import Navbar from '../component/layout/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Explore = () => {
  
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('User'))
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loader, setloader] = useState(false);
  const [endDate, setendDate] = useState('');
  const [startDate, setStartDate] = useState( '');
  const [searchForm, setsearchForm] = useState(false);
  const [cars, setCars] = useState([]);
  const [MinDate, setMinDate] = useState('');
  const toggleSearchForm = () => {
    setsearchForm(!searchForm)

  }
  const navigatefun = (link, data) => {
    navigate(`/${link}`);
  };
  const ProductCard = ({ image, title, category, price, keys, car }) => (
    <div
      key={keys}
      onClick={() => navigatefun(car._id, car)}
      className="bg-gray-100  cursor-pointer hover:scale-[1.1] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <img src={image[0]} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{category}</p>
        <p className="text-gray-800 text-sm mt-2">Seates: {car.seats}</p>
        <div className="mt-3 font-semibold uppercase">₹{price} per hour</div>
      </div>
    </div>
  );
  
  const fatchCars = async () => {
    // Placeholder function for fetching cars. Replace with actual API call.
    setloader(true)
    try {
      
      const res = await axios.get('https://shishicr.onrender.com/api/cars');
      setCars(res.data);
      setloader(false)
    } catch (err) {
      alert(err);
      setloader(false)
    }
    
  };
  const hendleSubmit = (e) => {
    e.preventDefault()
    const search = {
      pickupdate: startDate,
      pickuptime: startTime,
      returndate: endDate,
      returntime: endTime
    }
    if (search.pickupdate && search.pickuptime && search.returndate && search.returntime) {
        navigate("/ride", {state: search})
    }else alert('please select time')
    // 
  }
  useEffect(() => {
    
    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
 

    const currentDate = `${yyyy}-${mm}-${dd}`;
   

    setMinDate(currentDate);
    
  }, [startTime, endTime,startDate,endDate]);
  useEffect(() => {
    
    fatchCars()
  }, []);
  console.log(cars)
 
  return (
      <div>
          <div className='fixed z-50'> <Navbar user={user} /></div>
      <div>
        <br /><br /><br />
          <div className="flex flex-col min-h-[100dvh]">
      <section className="flex justify-center py-12 items-center md:py-20 lg:py-28 h-[100vh]">
        <div className="container   px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] mb-10  lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col  justify-center space-y-4">
              <div className="space-y-2 ">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Explore the World with Our Car Rentals
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl 0">
                  Find the perfect car for your next adventure. Search by location, dates, and vehicle type to get
                  started.
                </p>
              </div>
            </div>
            <img
              src="https://img.freepik.com/premium-photo/step-into-world-automotive-excellence-captivating-car-showroom-tour-where-you-can-explore-wide-range-vehicles-that-embody-innovation-generated-by-ai_661108-6110.jpg"
              width="500"
              height="400"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
          <section className="bg-gray-100 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Find Your Car</h2>
          {!searchForm ? <button
                  className=" items-center w-full justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background hover:ring transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6   bg-white  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            
            onClick={()=>toggleSearchForm()}
                >
                  Search
                </button>:<><form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" >
            <div>
              <label htmlFor="startDate" className="block font-medium mb-1">
                Start Date
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="startDate"
                value={startDate}
                onChange={(e)=>setStartDate(e.target.value)}
                type="date"
                  defaultValue=""
                  min={MinDate}
              />
            </div>
           
            <div>
              <label htmlFor="startTime" className="block font-medium mb-1">
                Start Time
              </label>
              <input
                value={startTime}
                onChange={(e)=>setStartTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="startTime"
                 
                type="time"
                defaultValue=""
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block font-medium mb-1">
                End Date
              </label>
              <input
                value={endDate}
                onChange={(e)=>setendDate(e.target.value)}
                className="flex h-10 w-full  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="endDate"
                  min={startDate}
                type="Date"
                defaultValue=""
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block font-medium mb-1">
                End Time
              </label>
              <input
                value={endTime}
                onChange={(e)=>setEndTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="endTime"
                  min={startTime}
                type="time"
                defaultValue=""
              />
            </div>
            
                  </form>
                    <button
                    className=" items-center w-full justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background hover:ring transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6   bg-white  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              
                      
                        onClick={(e)=> hendleSubmit(e)}
                  >
                    Search
                  </button></>
                  }
        </div>
      </section>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-28 flex justify-center">
        <div className="   px-4 md:px-6">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Cars</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl 0">
                Discover our top-rated car models for your next adventure.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {cars.map((item, ind) => {
            if(ind <= 4) return <ProductCard
              key={ind}
              image={item.image}
              title={item.model}
              category={item.make}
              price={item.pricePerHour}
              keys={ind}
              car={item}
            />
          })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-28 bg-gray-200 flex justify-center" >
        <div className="container px-4 md:px-6">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Destinations</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl 0">
                Explore our top rental locations around the world.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { name: 'Bhojpur', description: 'Explore the Big Apple', imgSrc: 'https://hindi.cdn.zeenews.com/hindi/sites/default/files/2018/07/09/253510-b1.jpg' },
                { name: 'Pachmarhi', description: 'City of Angels', imgSrc: 'https://th.bing.com/th/id/OIP.oTUjnlAlPdhTSqcaqDs_YQHaE8?rs=1&pid=ImgDetMain' },
                { name: 'Halali dam', description: 'The Magic City', imgSrc: 'https://www.holidify.com/images/cmsuploads/compressed/halalidam_20180220130138.jpg' },
                { name: 'Tekri', description: 'The Entertainment Capital', imgSrc: 'https://i.ytimg.com/vi/5kk4OI7BOr0/maxresdefault.jpg' },
              ].map((destination, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <a className="block" href="#">
                    <img
                      src={destination.imgSrc}
                      width="400"
                      height="300"
                      alt="Destination"
                      className="rounded-t-lg w-full h-48 object-cover"
                      style={{ aspectRatio: '400 / 300', objectFit: 'cover' }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{destination.name}</h3>
                      <p className="text-gray-500 0">{destination.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
          </div>
          
    </div>
  )
}

export default Explore 