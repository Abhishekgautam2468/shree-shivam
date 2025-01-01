import React, { useEffect, useState } from 'react'
import Navbar from '../component/layout/navbar/Navbar'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Dropdwon from '../component/dropdown/Dropdwon'
import chakemark from '../Images/chakemark.png'
import emailjs from "@emailjs/browser"
import { ClipLoader } from 'react-spinners'








const CarProfile = () => {
  const { _id } = useParams()
  const user = JSON.parse(localStorage.getItem('User'))
  const navigate = useNavigate()


  const [confirmFrom, setconfirmFrom] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');

  const [data, setdata] = useState('')
  useEffect(() => {
    const fatch = () => {
      axios.get(`https://shishicr.onrender.com/api/cars/${_id}`).then((res) => {
        setdata(res.data)
      }).catch((err) => {
        alert(err)
      })
    }
    fatch()
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');

    const currentDate = `${yyyy}-${mm}-${dd}`;
    const currentTime = `${hh}:${min}`;

    setMinDate(currentDate);
    setMinTime(currentTime);
  }, [])
  const [scrollPosition, setScrollPosition] = useState(0);
  const [page, setPage] = useState(0);
  const handleSwipe = () => {

    window.scrollTo({
      top: (page + 3.8) * window.innerHeight,
      behavior: 'smooth'
    }); // Decrease scroll position by 100vh
  };
  const [loader, setloader] = useState(false)
  const [processComplete, setprocessComplete] = useState(false)
  const [totalPrice, setTotalPrice] = useState('')
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [rentalTime, setRentalTime] = useState('');
  const [recieverPhone, setrecieverPhone] = useState();
  const [availibility,setAvailibility] = useState({})

  // console.log(pickupDate)
  // console.log(pickupTime)
  // console.log(returnDate)
  // console.log(returnTime)
  // console.log(rentalTime)
  // console.log(totalPrice)


  const calculateRentalTime = () => {
    if (pickupDate && pickupTime && returnDate && returnTime) {
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
      const returnDateTime = new Date(`${returnDate}T${returnTime}`);

      if (pickupDateTime < returnDateTime) {
        const diffInMs = returnDateTime - pickupDateTime;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        setRentalTime(diffInHours.toFixed(2));
        return diffInHours;
      } else {
        setRentalTime('0');
        return 0;
      }
    } else {
      setRentalTime('');
      return 0;
    }
  };

  const calculateTotalPrice = (hours) => {
    let price = hours * data.pricePerHour;
    if (hours >= 24) {
      price = price * 0.85; // Apply 15% discount
    }
    setTotalPrice(price.toFixed(2));
  };

  useEffect(() => {
    const hours = calculateRentalTime();
    calculateTotalPrice(hours);
  }, [pickupDate, pickupTime, returnDate, returnTime]);

  const toggleLoader = () => {
    setloader(!loader)
  }
  const toggleprocess = () => {
    setprocessComplete(!processComplete)
  }
  const hendle_toggle_confirmFrom = () => {
    if (totalPrice > 0) {
      setconfirmFrom(!confirmFrom)
    } else alert("Please select time for booking")
  }
  const getDate = (e) => {
    const isoDate = e;
const date = new Date(isoDate);
const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

return formattedDate;
  }
  // console.log(data)

  const hendleSubmit = async () => {
    toggleLoader()

    const fromData = {
      token: user.token,
      user: user._id,
      car: data._id,
      startDate: pickupDate,
      endDate: returnDate,
      totalPrice: totalPrice,
      startTime: pickupTime,
      endTime: returnTime,
      receiverPhoneNum: recieverPhone

    }



    if (availibility && availibility.available) {
      await axios.post('https://shishicr.onrender.com/api/bookings', fromData).then((res) => {
      

        
        
        
        // hendle_toggle_confirmFrom()
        setloader(true)
        emailjs.send('service_a5p9rtr', 'template_p4tx7w4', {
          from_name: "SHRI SHIVAM",
          to_name: user.user_name.toUpperCase(),
          from_email: "Shrishivam@varify",
          to_email: user.user_email,
          subject: "Car booking request received",
          msg_3: " If you have any questions or need further assistance, please feel free to contact our customer support at [customer.support@example.com] or call us at [+1234567890].",
          msg_2: `Thank you for choosing "SREE SHIVAM RENTALS" for your car rental needs. We are pleased to confirm your booking with the confirmation order id  [${res?.data?.booking?.orderId}].`,
          msg_1: `You have booked a ${data.model} for the period from D: ${getDate(pickupDate)} , T: ${pickupTime} to D: ${getDate(returnDate)} T: ${returnTime}. The car will be picked up from [123 Main Street, City, Country] and returned to [456 Elm Street, City, Country]. The total amount of [${res?.data?.booking?.totalPrice}] . Your booking includes a full-to-full fuel policy, unlimited mileage, and basic insurance coverage. Here are the details of your reservation:`,
          order_id: res?.data?.booking?.orderId,
          car_model: data.model,
          start_date: getDate(pickupDate),
          start_time: pickupTime,
          end_date: getDate(returnDate),
          end_time: getDate(returnTime),
          car_no: data.carNo,
          total_pay: res?.data?.booking?.totalPrice
        }, 'VmhYCGXVnmiZ0S_-F').then(() => {
          emailjs.send('service_a5p9rtr', 'template_of7l6b4', {
            from_name: user.user_name.toUpperCase(),
            to_name: "Shivam rentals",
            from_email: "Shrishivam@varify",
            to_email: "naman13399@gmail.com",
            subject: "Car booking request received",
            msg_3: " If you have any questions or need further assistance, please feel free to contact our customer support at [customer.support@example.com] or call us at [+1234567890].",
            msg_2: `Thank you for choosing "SREE SHIVAM RENTALS" for your car rental needs. We are pleased to confirm your booking with the confirmation order id  [${res?.data?.booking?.orderId}].`,
            msg_1: `A customer named "${user.user_name} has requested to book your "${data.model}" from [${getDate(pickupDate)}, ${pickupTime}] to [${getDate(returnDate)}, ${returnTime}]. The pick-up location is [123 Main Street, City, Country], and the drop-off location is [456 Elm Street, City, Country]. The estimated rental amount is [${totalPrice}].`,
            order_id: res?.data?.booking?.orderId,
            car_model: data.model,
            start_date: getDate(pickupDate),
            start_time: pickupTime,
            end_date: getDate(returnDate),
            end_time: getDate(returnTime),
            car_no: data.carNo,
            total_pay: res?.data?.booking?.totalPrice,
            Customer_phone: recieverPhone,
            Customer_email: user.user_email,
            Customer_name: user.user_name.toUpperCase()
          
          }, 'VmhYCGXVnmiZ0S_-F').then(() => {
            // setloading(false)
            // setEmailVarify(true)
            // alert("check email")
            navigate('/profile')
            alert("booking confirm successfully chake email")

                  }, (error) => {
            
            console.error(error); // Log the error for debugging
            
                        alert('Something went wrong in sending email');

          });
          // console.log("complete2");
        }, (error) => {
          
          console.error(error); // Log the error for debugging
          alert('Something went wrong in sending email');
        });
        
    
    
        


    }).catch((err) => {
        alert(err.response.data.error)
    })
    } else alert('select another time')





   
  }
  
  useEffect(() => {
    const fatch = async () => {
      if (pickupDate && pickupTime && returnDate && returnTime) {
        try {
          const formData = {
            carId: data._id,
            startTime : pickupTime,
            endTime : returnTime,
            endDate : returnDate,
            startDate : pickupDate
          }
          await axios.post('https://shishicr.onrender.com/api/cars/chake-availibility', formData).then((res) => {
            
          
            setAvailibility(res.data)
            // console.log(res.data)
           
          }).catch((err) => {
                        alert(err.response.data.error)
          })
        }
        catch (err) {
                    console.log(err)
        }
      }
    }
    fatch()
  },[pickupDate,pickupTime,returnDate,returnTime])








  return (
    <>
      <div className='fixed bg-[#e5e6e8]  z-20'><Navbar user={user} /></div>
      {data && <>
        <br /><br /> <br /><br />
        <div className="flex flex-col min-h-screen " >
          <section className="w-full flex items-center  justify-center   md:pt-24 mb-32">
            <div className="container flex items-center  justify-center space-y-10 xl:space-y-16">
              <div className="grid gap-4 px-4  md:px-6 md:grid-cols-2 md:gap-16">
                <div>
                  <img
                    src={data.image[0]}
                    width="600"
                    height="400"
                    alt="Car"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
                      {data.model}
                    </h1>
                    <p className="text-gray-500 md:text-xl dark:text-gray-400">
                      {data.subtitle}
                    </p>
                    <p className="text-black md:text-xl uppercase font-semibold">
                      seats : {data.seats}
                    </p>
                    <p className="text-black  md:text-xl  uppercase font-semibold">
                      color : {data.color}
                    </p>
                    <p className="text-black  md:text-xl  uppercase font-semibold">

                    </p>
                  </div>
                  <div className="grid gap-4 uppercase text-gray-500 dark:text-gray-400">
                    late fees per hour ₹{data.latePricePerHour}
                  </div>
                  <button onClick={handleSwipe} className="px-6 py-3 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Book Now ₹{data.pricePerHour} Per Hour
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full flex items-center  justify-center py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container  px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl uppercase">Key Features</h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
                    The Acme Roadster is packed with cutting-edge features that make it a true standout in its class.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                {data.headings.head.map((item, ind) => {
                  return (
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">{item}</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {data.headings.description[ind]}
                      </p>
                    </div>
                  )
                })}

              </div>
            </div>
          </section>

          <section className="w-full flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className=" space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl uppercase">discription</h2>

                </div>
                <p>{data.description}</p>
              </div>
            </div>

          </section>

          <section className="w-full flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 ">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Gallery</h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
                    Explore the Acme Roadster from every angle with our comprehensive gallery.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {data.image.map((item) => {
                  return (<img
                    src={item}
                    width="300"
                    height="200"
                    alt="Gallery Image"
                    className="aspect-video overflow-hidden rounded-xl object-cover"
                  />

                  )
                })}

              </div>
            </div>
          </section>

          {user ? <section className="w-full flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className=" space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl ">Select Date & Time</h2>
                  <p className="w-full text-gray-500 md:text-xl text-center  dark:text-gray-400">
                    Choose a date and time for your  booking.
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-2xl grid gap-6 py-12">
                <div className="grid gap-4">
                  <label htmlFor="date" className="text-gray-700 dark:text-gray-300 font-bold">Date</label>
                  <input
                    onChange={(e) => { setPickupDate(e.target.value) }}

                    type="date"
                    id="pickupdate"
                    value={pickupDate}
                    min={minDate}
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="grid gap-4">
                  <label htmlFor="time" className="text-gray-700 dark:text-gray-300 font-bold">Time</label>
                  <input
                    onChange={(e) => { setPickupTime(e.target.value) }}
                    type="time"
                    min={minTime}
                    value={pickupTime}
                    id="pickup_time"
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="grid gap-4">
                  <label htmlFor="date" className="text-gray-700 dark:text-gray-300 font-bold">Return Date</label>
                  <input
                    onChange={(e) => { setReturnDate(e.target.value) }}
                    type="date"
                    value={returnDate}
                    min={pickupDate}
                    id="date"
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="grid gap-4">
                  <label htmlFor="time" className="text-gray-700 dark:text-gray-300 font-bold">Return Time</label>
                  <input
                    onChange={(e) => { setReturnTime(e.target.value) }}
                    type="time"
                    min={pickupTime}
                    value={returnTime}
                    id="return_time"
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                {availibility ? !availibility.available ? <h3 className='text-red-700 font-semibold'>{ availibility.message }</h3> :  <h3 className='text-green-700 font-semibold'>{availibility.message}</h3> : <></>}
                <button className="px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700" onClick={() => hendle_toggle_confirmFrom()} disabled={availibility ? availibility.available ?  false : true : true}>
                  Confirm Booking ₹ {totalPrice > 0 ? totalPrice : "0.00"}
                </button>
              </div>
            </div>

          </section> : <div className=' p-10 flex justify-center '><button className='bg-[#4957cd] w-[50vw] rounded-md px-3 p-2 text-white hover:bg-[#af455a]' onClick={() => navigate("/authentication")}>Log-in for booking</button></div>}
          <Dropdwon title={!loader ?"Confirm booking": "Booking request submiting..."} isOpen={confirmFrom}  close={!loader ? hendle_toggle_confirmFrom : undefined} >
            {!loader ? <><div className="grid gap-4">
              <label htmlFor="Phone no" className="text-gray-700  font-bold mt-4"> Phone no.</label>
              <input
                onChange={(e) => {
                  setrecieverPhone(e.target.value)

                }

                }
                type="Number"
                placeholder='Receiver phone no.'

                value={recieverPhone}
                id="Phone no."
                className="p-3 border w-[60vw] md:w-[50vw] rounded-lg shadow-sm focus:outline-none focus:border-blue-600"
              />
            </div>
              <div className='flex w-full justify-center'>
                <button className="px-6 py-3 w-full mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"  onClick={() => hendleSubmit()}>
                  Confirm ₹ {totalPrice > 0 ? totalPrice : "0.00"}
                </button></div></> : <><div className='w-[40vw]  flex  justify-center p-10 item-center '>
                   <ClipLoader/>

                </div></>}
          </Dropdwon>
        </div></>}</>
  )
}

export default CarProfile