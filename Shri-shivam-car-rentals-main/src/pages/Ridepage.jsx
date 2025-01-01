import React, { useEffect, useState } from 'react'
import Navbar from '../component/layout/navbar/Navbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'







const Ridepage = () => {
  const location = useLocation();
  const data = location.state || {};
  const navigate = useNavigate()

  
  const user = JSON.parse(localStorage.getItem('User'))
  const [startTime, setStartTime] = useState(data.pickuptime ? data.pickuptime : '');
  const [endTime, setEndTime] = useState(data.returntime ? data.returntime : '');
  const [cars, setCars] = useState([]);
  const [filtercars, setFiltercars] = useState([]);
  const [loader, setloader] = useState(false);
  const [endDate, setendDate] = useState(data.returndate ? data.returndate : '');
  const [startDate, setStartDate] = useState(data.pickupdate ? data.pickupdate : '');
  const [searchForm, setsearchForm] = useState(false);
  const [MinDate, setMinDate] = useState('');
  
  const navigatefun = (link, data) => {
    navigate(`/${link}`);
  };
  const ProductCard = ({ image, title, category, price, keys, car }) => (
    <div
      key={keys}
      onClick={() => navigatefun(car._id, car)}
      className="bg-gray-100 cursor-pointer hover:scale-[1.1] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img src={image[0]} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{category}</p>
        <p className="text-gray-800 text-sm mt-2">Seates: {car.seats}</p>
        <div className="mt-3 font-semibold uppercase">₹{price} per hour</div>
      </div>
    </div>
  );

  const toggleSearchForm = () => {
    setsearchForm(!searchForm)

  }

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
  const fatchCars_ontime = async () => {
    // Placeholder function for fetching cars. Replace with actual API call.
    setloader(true)
    try {
      const res = await axios.post('https://shishicr.onrender.com/api/cars/available-cars' , {startDate: startDate, startTime: startTime, endDate: endDate, endTime: endTime});
      setFiltercars(res.data);
      setloader(false)
    } catch (err) {
      alert(err);
      setloader(false)
    }
    
  };

  useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      
      fatchCars_ontime()
      
    } 
    
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
  return (
    <>
      <div className="fixed bg-[#e5e6e8] z-50">
        <Navbar user={user} />
      </div>
      <br /><br /><br />
      <section className="bg-gray-100 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Find Your Car</h2>
          {!searchForm ? <button
                  className=" items-center w-full justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background hover:ring transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6   bg-white  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            
            onClick={()=>toggleSearchForm()}
                >
                  Search
                </button>:<form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            
          </form>}
        </div>
      </section>
      <main className="py-8 px-6">
        {(startDate && startTime && endDate && endTime) ? <div className="h-[100vh] mx-auto px-4 md:px-6 py-12">
        {loader ? <ClipLoader/> : filtercars.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"> {filtercars.map((item, ind) => (
            <ProductCard
              key={ind}
              image={item.image}
              title={item.model}
              category={item.make}
              price={item.pricePerHour}
              keys={ind}
              car={item}
            />))}</div>
          : <div className='flex justify-center w-full '><h1>No cars available at the time you selected</h1></div>}
      </div> : <div className="mx-auto  md:px-6 ">
        
          {loader ? <div className='flex justify-center w-full '><ClipLoader/></div> : cars.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"> {cars.map((item, ind) => (
            <ProductCard
              key={ind}
              image={item.image}
              title={item.model}
              category={item.make}
              price={item.pricePerHour}
              keys={ind}
              car={item}
            />))}</div>
          : <div className='flex justify-center w-full '><h1>No cars available</h1></div>}
        
      </div>}
      </main>
    

    </>
  )
}

export default Ridepage