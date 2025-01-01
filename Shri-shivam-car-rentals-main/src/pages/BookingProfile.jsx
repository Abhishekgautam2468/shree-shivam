import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Dropdwon from '../component/dropdown/Dropdwon'


const BookingProfile = () => {
    
    const [booking, setbooking] = useState()
    const { id } = useParams()
    const [loader,setloader] = useState(false)
    console.log(id)
    const getDate = (e) => {
        const isoDate = e;
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    return formattedDate;
    }
    const toggleloader = () => {
        setloader(!loader)
    }
    const hendle_cancle = async () => {
        toggleloader()
        await axios.put(`https://shishicr.onrender.com/api/bookings/cancle/${booking._id}`).then((res) => {
            booking.bookingConfirm = 'cancled'
            setloader(false)
        }).catch((err) => {
            console.log(err)
        })
        
        
    }
    
    const user = JSON.parse(localStorage.getItem('User'))
    // console.log(user)
    useEffect(() => {
        const fatch = async () => {
            const data = {
                token: user.token
            }
            await axios.post("https://shishicr.onrender.com/api/bookings/user", data).then((res) => {
                setbooking(res.data.filter((item) => { return item._id.includes(id) })[0])
                // console.log(res.data)
                
            }).catch((err) => {
                console.log(err)
            })
        }
        fatch()
    }, [])
    // console.log(booking)
  if(booking) return (
    <>
    <nav className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                    </div>
                    
                </div>
            </div>

        </div>
    </nav>
    <div className="flex-1 bg-gray-100">
<div className="container mx-auto py-8">
<div className="rounded-lg border bg-white text-gray-900 shadow-sm p-6">
  <div className="flex flex-col space-y-1.5">
    <h3 className="text-2xl font-semibold leading-none tracking-tight">User Booking Details</h3>
  </div>
  <div className="mt-6 grid gap-6">
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Customer:</div>
      <div className='uppercase'>{user.user_name}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Customer email:</div>
      <div >{user.user_email}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Booking Date:</div>
                        <div>{getDate(booking.createdAt) }</div>
    </div>
    
  </div>
</div>
<div className="rounded-lg border bg-white text-gray-900 shadow-sm p-6 mt-6">
  <div className="flex flex-col space-y-1.5">
    <h3 className="text-2xl font-semibold leading-none tracking-tight">Car Booking Details</h3>
  </div>
  <div className="mt-6 grid gap-6">
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Booking Confirm:</div>
    <div>{booking.bookingConfirm === 'confirm' ? 'Confirmed' : booking.bookingConfirm === 'pending' ? 'Pending' : 'cancled'}</div>
     
                        
     {(booking.bookingConfirm === 'pending' )  &&  <button className='bg-[#ff1c1c71] p-2 text-white font-semibold hover:bg-[#ff1c1c87]' onClick={()=>hendle_cancle()}>Cancle</button>}
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Car No:</div>
      <div>{booking.car.carNo}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Color:</div>
      <div>{booking.car.color}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Make:</div>
      <div>{booking.car.make}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Model:</div>
      <div>{booking.car.model}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Year:</div>
      <div>{booking.car.year}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Seats:</div>
      <div>{booking.car.seats}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Price per Hour:</div>
      <div>₹{booking.car.pricePerHour}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Late Price per Hour:</div>
      <div>₹{booking.car.latePricePerHour}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Total Price:</div>
      <div>₹{booking.totalPrice}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Start Date:</div>
      <div>{getDate(booking.startDate)}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">End Date:</div>
      <div>{getDate(booking.endDate)}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">Start Time:</div>
      <div>{booking.startTime}</div>
    </div>
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="font-medium">End Time:</div>
      <div>{booking.endTime}</div>
    </div>
    
    
    <div className="mt-6">
      <h4 className="font-semibold text-lg">Images</h4>
      <div className="flex  mt-3 gap-3 flex-wrap">
        {booking.car.image.map((img, index) => (
          <img key={index} src={img} alt={`Car ${index + 1}`} className="w-28 h-28 object-cover rounded-lg" />
        ))}
      </div>
    </div>
  </div>
</div>
</div>
    </div>
    {
        loader && <Dropdwon  isOpen={loader} > <div className='flex flex-col justify-center items-center'><ClipLoader></ClipLoader> <h1 className='mt-2'>loading...</h1></div> </Dropdwon>
    }
</>
    )
    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'><h1><ClipLoader/></h1></div>
    )
}

export default BookingProfile