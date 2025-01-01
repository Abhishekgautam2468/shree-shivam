import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'




const Overview = (e) => {
    const navigate = useNavigate()
    const [page, setpage] = useState('')
    const [component, setcomponent] = useState('')
    const feature = [{title: "All bookings", filter: ""}, {title: "Future bookings", filter: "pending"}, {title: "prev bookings", filter: "prev"}]
    const [booking, setbooking] = useState([])
    const user = JSON.parse(localStorage.getItem("User"))
    const getDate = (e) => {
        const isoDate = e;
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    return formattedDate;
    }   

    useEffect(() => {
        const fatch = async () => {
            
            await axios.post("https://shishicr.onrender.com/api/bookings/user", {token: user.token}).then((res) => {
                setbooking(res.data)

            }).catch((err) => {
                console.log(err)
            })
        }
        fatch()
    }, [])
    
  return (
      <>
      
              <div className='overview flex p-3 flex-col  md:flex-row  gap-3 lg:gap-6'>
                  <div className='w-[95vw] lg:w-[25vw]  h-fit md:w-[35vw]  bg-white p-4 rounded-md'>
                      <div className='w-full flex flex-col   '>
                          <div className='w-full flex justify-center h-[30vh]  text-center items-center '>
                              <img src={e.user.user_profile} className='rounded-full w-32 lg:w-48'  alt="" />
                          </div>
                          <h1 className='text-center uppercase mt-2 text-[1.5rem] font-semibold'>{e.user.user_name}</h1>
                          <p className='text-center text-[0.7rem] mb-2 uppercase'>{e.user.user_email}</p>
                          <button className='w-full mb-2 bg-[#0000000b] p-4 h-12 flex items-center justify-center rounded-md hover:scale-[0.9] hover:text-black  uppercase text-[#0000007e]' style={{transition: "all ease 0.2s"}} >
                                        edit
                            </button>
                      </div>
                  </div>
                  <div className=' w-[95vw] lg:w-[55vw] md:w-[45vw]   bg-white p-4 rounded-md'>
                      <div className='w-full  h-[100vh] flex flex-col  '>
                          <nav >
                          <div className='h-16 border-b-2 cursor-pointer mb-2   flex bg-gray-100   overflow-x-scroll scroll-hidden'>
                              {feature.map((item, key) => {
                                  return component == item.filter ? 
                                  <div key={key} className='uppercase text-[0.7rem] md:text-[1rem]  flex items-center h-full p-4 shadow-md  scale-[1.1] px-7 relative bg-white text-center font-semibold' >
                                      {item.title}
                                      {/* <svg xmlns="http://www.w3.org/2000/svg" className='w-5 absolute -bottom-3 left-[50%] text-white -translate-x-[50%]' viewBox="0 0 24 24" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg> */}
                                  </div>: 
                                  <div key={key} className='uppercase text-[0.7rem] md:text-[1rem] flex items-center h-full p-4 hover:scale-[1.1]   px-7 relative  text-center font-semibold' onClick={()=>setcomponent(item.filter)}>
                                      {item.title}
                                      {/* <svg xmlns="http://www.w3.org/2000/svg" className='w-5 absolute -bottom-3 left-[50%] text-white -translate-x-[50%]' viewBox="0 0 24 24" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg> */}
                                  </div>
                                  
                                  
                              
                              })}
                                  
                              </div>
                          </nav>
                          <div className='px-2 max-h-[90%] scroll-hidden overflow-x-scroll'>
                          <table className="w-full text-[1.5vw] text-left">
                                        <thead>
                                            <tr>
                                                <th className="pb-2 text-center">ORDER ID</th>
                                                
                                                <th className="pb-2 text-center">CAR <br /> MODEL</th>
                                                <th className="pb-2 text-center">BOOKING <br />DATES</th>
                                                <th className="pb-2 text-center">TOTAL PRICE</th>
                                                <th className="pb-2 text-center">STATUS</th>
                                                <th className="pb-2 text-center">BOOKING ON</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {bookingData.map((item, key) => {
                                                return <tr key={key} className="border-t">
                                                <td className="py-2 text-center">#{item.order_id}</td>
                                                <td className="py-2 text-center">{item.car_no}</td>
                                                    <td className="py-2 text-center uppercase">{item.car_model }</td>
                                                <td className="py-2  text-center font-semibold">{item.Booking_date.start_date} To {item.Booking_date.end_date}</td>
                                                <td className="py-2   flex justify-center gap-1 md:gap-3 font-semibold"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='w-[1.5vw] '><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg>{item.total_price} </td>
                                                    {!item.status.cancle ? item.status.onDrive ? <td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>OnDrive</div></td> : <td className="py-2 "><div className='p-1   bg-green-100 text-center rounded-full text-green-700 font-semibold'>Complete</div></td>: <td className="py-2 "><div className='p-1 px-3  bg-red-100 text-center rounded-full text-red-700 font-semibold'>Cancle</div></td> }
                                                <td className="py-2 text-center">{item.Booking_on}</td>
                                                </tr>
                                                
                                            })
                                                } */}
                                  {booking.filter((item) => {
                                                if(component === "prev") return !item.bookingConfirm.includes("pending")
                                                 return item.bookingConfirm.includes(component)
                                             }).map((item, key) => {
                                               return <tr key={key} onClick={()=> navigate(`/bookings/${item._id }`, {state: item})} className="border-t  cursor-pointer text-[#3f3f3fb7] hover:text-[black]">
                                                <td className="py-2 text-center">#{item.orderId}</td>
                                                
                                                    <td className="py-2 text-center uppercase">{item.car.model }</td>
                                                    <td className="py-2  text-center ">{getDate(item.startDate)} To {getDate(item.startDate)} 
                                                    </td>
                                                <td className="py-6   flex justify-center  gap-1 md:gap-3 font-semibold ">₹ {item.totalPrice} </td>
                                                    {item.bookingConfirm === 'pending' ? <td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>Pending</div></td>  : item.bookingConfirm === 'confirm' ?  <td className="py-2 "><div className='p-1   bg-green-100 text-center rounded-full text-green-700 font-semibold'>Comfirm</div></td> : <td className="py-2 "><div className='p-1   bg-[#80000226] text-center rounded-full text-[#481313] font-semibold'>Cancle</div></td>}
                                                    <td className="py-2 text-center">{getDate(item.createdAt)}
                                                    </td>
                                                </tr>
                                                
                                            })
                                                
                                            }

                                        </tbody>
                                    </table>
                          
                          </div>
                      </div>
                  </div>
                  
              
                </div>
          </>
  )
}

export default Overview