import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import BookingProfile from './BookingProfile';
import { ClipLoader } from 'react-spinners';
import Dropdwon from '../component/dropdown/Dropdwon';





const CarProfile = () => {

    const location = useLocation()
    const car = location.state
    
    const navigate = useNavigate()
    const [carBookings, setcarBooking] = useState([])
    const getDate = (e) => {
        const isoDate = e;
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    return formattedDate;
    }

    useEffect(() => {
      const fatch = async () => {
            const token = JSON.parse(localStorage.getItem('Owner')).token
        await axios.post(`https://shishicr.onrender.com/api/bookings/car/${car._id}`, {token: token} ).then((res) => {
              setcarBooking(res.data)
              // console.log(res.data)
            }).catch((err) => {
               alert(err.massage)
           })
        } 
        fatch()
    },[])
    

    const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [MinDate, setMinDate] = useState('');
  const [availibility, setAvailibility] = useState({});
  const [loader, setloader] = useState(false)
  
  

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');


    const currentDate = `${yyyy}-${mm}-${dd}`;
   

    setMinDate(currentDate);
   
    const fatch = async () => {
      if (startDate && startTime && endDate && endTime) { 
        setloader(true)
       
        try {
          const formData = {
            carId : car._id,
            startTime,
            token: JSON.parse(localStorage.getItem('Owner').token),
            endTime,
            endDate,
            startDate
          }
          await axios.post('https://shishicr.onrender.com/api/cars/chake-availibility', formData).then((res) => {
            setloader(false)
          
            setAvailibility(res.data)
           
          }).catch((err) => {
            setloader(false)
            alert(err.response.data.error)
          })
        }
        catch (err) {
          setloader(false)
          alert("error:", err)
        }
      }
    }
    fatch()
  }, [startDate, startTime, endDate, endTime])
  
  const [delete_loader, setdeleteLoader] = useState(false)
 
  const [confirmDelete, setconfirmDelete] = useState(false)
  const [confirm_input, setConfirmInput] = useState('')
  const [confirm_correct, setConfirm_correct] = useState(true)
  const toggleConfirmDelete = () => {
    setconfirmDelete(!confirmDelete)
  }

  const hendle_confirm = () => {
    if (car.model.toUpperCase() === confirm_input) {
      hendle_delete()
    } else setConfirm_correct(false)
  }
  const hendle_delete = async() => {
    setdeleteLoader(true)
    await axios.post(`https://shishicr.onrender.com/api/cars/${car._id}`, {token: JSON.parse(localStorage.getItem('Owner')).token}).then((res) => {
      alert('Car deleted')
    }).catch((err) => {
      alert('Somethig went wrong')
    })
    window.location.href = "/company_deshbord"
    
  }



  
  return (
      <>
          <nav className="bg-white border-b border-gray-200 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-semibold cursor-pointer" onClick={()=>navigate("/company_deshbord")}>Dashboard</h1>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </nav>
         <div className="flex flex-col  w-full min-h-screen">
      <section className="bg-gray-100 flex justify-center  py-12 md:py-20 lg:py-24 ">
        <div className="container  px-4 md:px-6 grid gap-8  lg:grid-cols-2  lg:gap-12">
          <div>
              <img src={car.image[0]} width={600} height={400} alt="Car" className="w-full rounded-lg object-cover" />
              <br />
            <div className='container   grid gap-2 grid-cols-4 lg:grid-cols-4  lg:gap-3'>
                {car.image.map((item) => {
              return <div className=' '><img src={item}  alt="Car"  className="w-full h-full rounded-lg object-cover" /></div>
            })}

            </div>
            </div>
          <div className="space-y-4 ">
            <div className="space-y-2">
                              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl uppercase">{car.year} { car.model}</h1>
                              <p className="text-gray-500 text-lg">{ car.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-500">Seating Capacity</div>
                <div className="text-lg font-medium">{car.seats}</div>
              </div>
                              {car.headings.head.map((item, key) => {
                  return <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-500">{item}</div>
                  <div className="text-lg font-medium">{car.headings.description[key]}</div>
                </div>


              })}
              
                              <br />
                              
            </div>
                              <button className='bg-red-500  hover:bg-red-600 text-white w-full h-10 rounded-md font-semibold transition-all lg:hover:scale-[1.1]' onClick={()=>toggleConfirmDelete()}> Delete Car</button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 flex justify-center lg:py-24">
        <div className="container px-4 md:px-6 grid gap-12">
        <div className="container px-4 md:px-6 grid gap-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Chake Rental Availability</h2>
            <h3 className=" font-bold tracking-tight mb-4">Select pickup date & time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <div>
                <label htmlFor="datepicker" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input
                      type='date'
                      id='startDate'
                      value={startDate}
                  min={MinDate}
                  onChange={(e)=>setStartDate(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
              
              {/* Time Picker */}
              
                <div>
                  <label htmlFor="timepicker" className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                    <input
                      type='time'
                    id="startTime"
                    value={startTime}
                                              onChange={(e)=>setStartTime(e.target.value)}
                                              
                    className="block w-full px-3 py-2 border     rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                                  </div>
                              </div>
                                  <h3 className=" font-bold tracking-tight mb-4 mt-4">Select return date & time</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  
            
              <div>
                <label htmlFor="datepicker" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                    <input
                    type='date'
                      id="endDate"
                      min={startDate}
                  selected={endDate}
                  onChange={(e)=>setEndDate(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
              
              {/* Time Picker */}
              
                <div>
                  <label htmlFor="timepicker" className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                    <input
                      type='time'
                    id="endTime"
                    value={endTime}
                    onChange={(e)=>setEndTime(e.target.value)}
                                              
                    className="block w-full px-3 py-2 border     rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                                  </div>
                                  
                </div>
                <br />
                <div className='flex justify-center mt-4 items-center'>
                  {loader && <ClipLoader></ClipLoader>}
                  {availibility && ! loader ? availibility.available === true ? <><h1 className='font-bold text-lime-600'>{availibility.message}</h1></>: <><h1 className='font-bold text-red-600'>{availibility.message}</h1></> : <></>}
             </div>
          </div>
        </div>
        </div>
      </section>
      <section className="py-12 md:py-20 flex justify-center lg:py-24 bg-gray-100">
        <div className="container px-4 md:px-6 grid gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Booking History</h2>
            <div className="border rounded-lg p-4">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-[10px] md:text-xl">
                    <th className="hidden md:block py-2 px-4">Costumer name</th>
                    <th className="py-2 px-4">Booking Dates</th>
                    <th className="py-2 px-4">Booking time</th>
                    <th className="py-2 px-4">Total ammount</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                                  <tbody>
                                      {carBookings.map((item, key) => { 
                                          
                                          return (<tr className='text-[10px] md:text-xl text-[#00000070] hover:text-black cursor-pointer' key={key} onClick={()=> navigate(`/company_deshbord/bookings/${item.orderId }`, {state: item})}>
                                              <td className="py-2 hidden md:block px-4 text-center "><span className='uppercase'>{item.user.name}</span> {`(${item.user.email})`} </td>
                                              <td className="py-2 px-4 text-center ">{getDate(item.startDate)} To { getDate(item.endDate) }</td>
                                              <td className="py-2 px-4 text-center ">{item.startTime} To {item.endTime }</td>
                                          <td className="py-2 px-4 text-center">{item.totalPrice}</td>
                                          <td className="py-2 px-4 text-center ">{item.bookingConfirm==='cancled' ?  <div className="flex items-center gap-2 bg-red-100 text-red-800 rounded-full px-3 py-1 text-xs font-medium">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor">
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        Cancled
                      </div> : item.bookingConfirm==='pending' ? <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs font-medium">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor">
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        Pending
                      </div> : <div className="flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor">
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        Confirm
                      </div>}</td>
                                        </tr>)
                      
                    })}
                  
                </tbody>
              </table>
                    {
                        !carBookings.length > 0 && <><div className='py-10 flex justify-center items-center'>bookings not exist...</div></>
                    }
            </div>
          </div>
          
        </div>
      </section>
      </div>
      <Dropdwon isOpen={confirmDelete} close={toggleConfirmDelete} title="Conform delete">
        {delete_loader ? <div className='flex justify-center p-10 w-[30vw]'><ClipLoader></ClipLoader></div> :<div className='p-4'> 
        <label
                className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Enter <span className='text-red-700 uppercase' >"{car.model}"</span> for confirmation
              </label>
        <input
                className=" w-[60vw] flex h-10 mt-3  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="make"
            
                placeholder="Enter the car company"
                value={confirm_input}
                onChange={(e)=>{setConfirmInput(e.target.value)}}
                required
          />
          {!confirm_correct && <h1 className='text-red-600 mt-4'>Please type correct input</h1>}
          <div className='w-full  flex items-center justify-center'><button  className='bg-red-500 mt-5 hover:bg-red-600 text-white w-[95%] h-10 rounded-md font-semibold transition-all hover:scale-[1.1]' onClick={()=>hendle_confirm()}> Delete Car</button></div>
        </div>}
      </Dropdwon>
      </>
  )
}

export default CarProfile