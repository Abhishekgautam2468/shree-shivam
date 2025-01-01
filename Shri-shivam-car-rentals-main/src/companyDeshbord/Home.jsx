import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
// import LineChart from './components/LineChart';
// import { Chart } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';
import Inventory from './components/Inventory';
import axios from 'axios';
import Dropdwon from '../component/dropdown/Dropdwon';
import Offers from './components/Offers';






const Utils = {
    mounth: ["january",]
}



const Home = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const lavel = ["jav", "fab", "march", "april", "may", "june", "july"]
    const navigate = useNavigate()
    const [menu, setmenu] = useState(false)
    const [list, setList] = useState('')
    const [bookingData, setbookingData] = useState([])
    const [pendingbookings, setpendingbooking] = useState([])
    const [cancledbookings, setCancledbooking] = useState([])
    const [confirmedbookings, setconfirmedbooking] = useState([])
    const owner = JSON.parse(localStorage.getItem('Owner'))
    
    const togglemenu = () => {
        setmenu(!menu)
    }
    const closeList = () => {
        setList('')
    }

    const getDate = (e) => {
        const isoDate = e;
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

   return formattedDate;
    }
    
    useEffect(() => {
        const fatch = async () => {
            if (owner) {
            await axios.post('https://shishicr.onrender.com/api/bookings/getallbooking', {token: owner.token}).then((res) => {
                setbookingData(res.data)
            })}
        }
      fatch()  
    }, [])
    
    useEffect(() => {
        const filter = async () => {
            const filltredbookings = bookingData.filter((item) => {
                return item.bookingConfirm === 'pending'

            })
            setpendingbooking(filltredbookings)
            const Canclebookings = bookingData.filter((item) => {
                return item.bookingConfirm === 'cancelled'

            })
            setCancledbooking(Canclebookings)
            const confirmbooks = bookingData.filter((item) => {
                return item.bookingConfirm === 'confirm'

            })
            setconfirmedbooking(confirmbooks)
        }
      filter()
    }, [bookingData])
    
    const [search, setsearch] = useState('')
    const [filteredarr, setFilteredarr] = useState([])

    useEffect(() => {
        const arr = bookingData.filter((item) => {
            return item.orderId.toLowerCase().includes(search.toLowerCase())

        })
        // console.log(bookingData)
        setFilteredarr(arr)
    },[search])
    
    
    const searchDropdown = () => {
       return ( <> <input
        type="text"
        placeholder="Search With Order Id"
        value={search}
                    onChange={(e) => {
                        setsearch(e.target.value)
                        
                    }}
                    className='border'
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px'
        }}
      /></>)
    }
    
    
    const table = (array) => {
        
        return (
            <>
           
            
            <div className="bg-white max-h-[80vh] w-[70vw] p-4 rounded  overflow-auto">
                                    <table className="w-full text-[1.5vw] text-left">
                                        <thead>
                                            <tr>
                                                <th className="pb-2 text-center">ORDER ID</th>
                                                <th className="pb-2 text-center">CAR NO.</th>
                                                <th className="pb-2 text-center">CAR <br /> MODEL</th>
                                                <th className="pb-2 text-center">BOOKING <br />DATES</th>
                                                <th className="pb-2 text-center">TOTAL PRICE</th>
                                                <th className="pb-2 text-center">STATUS</th>
                                                <th className="pb-2 text-center">BOOKING ON</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {array.map((item, key) => {
                                                 return <tr onClick={()=> navigate(`/company_deshbord/bookings/${item.orderId }`, {state: item})} key={key} className="border-t cursor-pointer text-[#3f3f3fb7] hover:text-[black]">
                                                <td className="py-2 text-center">#{item.orderId}</td>
                                                <td className="py-2 text-center">{item.car.carNo}</td>
                                                    <td className="py-2 text-center uppercase">{item.car.model }</td>
                                                    <td className="py-2  text-center ">{getDate(item.startDate)} To {getDate(item.startDate)} 
                                                    </td>
                                                <td className="py-2   flex justify-center gap-1 md:gap-3 font-semibold">₹ {item.totalPrice} </td>
                                                {item.bookingConfirm === 'pending' ? <td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>Pending</div></td>  : item.bookingConfirm === 'confirm' ?  <td className="py-2 "><div className='p-1   bg-green-100 text-center rounded-full text-green-700 font-semibold'>Confirm</div></td> : <td className="py-2 "><div className='p-1   bg-[#80000226] text-center rounded-full text-[#481313] font-semibold'>Cancle</div></td>}
                                                    <td className="py-2 text-center">{getDate(item.createdAt)}
                                                    </td>
                                                </tr>
                                                
                                            })
                                                
                                            }

                                        </tbody>
                                    </table>
                                    <div className='flex justify-center p-10'>
                                            {
                                                    pendingbookings.length === 0 && <><div>No more pending bookings...</div></>
                                            }</div>
                                </div></>
        )
    }
    


    return (
        <div className="flex flex-col min-h-[100vh] bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex justify-between">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-semibold">Dashboard</h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex">
                                <button
                                    onClick={() => setActiveTab('Overview')}
                                    className={`${activeTab === 'Overview' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('Inventory')}
                                    className={`${activeTab === 'Inventory' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ml-8`}
                                >
                                    Inventory
                                </button>
                                <button
                                    onClick={() => setActiveTab('Offers')}
                                    className={`${activeTab === 'Offers' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ml-8`}
                                >
                                    Offers
                                </button>
                                
                            </div>
                            
                            <div onClick={togglemenu} className='md:hidden right-3 top-4 absolute'><svg xmlns="http://www.w3.org/2000/svg" className='w-7 ' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg></div>
                            {!menu ? <></> : <div className="absolute right-1 top-14 z-10 md:hidden  mt-2 origin-top-right bg-white rounded-md shadow-lg">
                                <div className="py-1 p-4    text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            
                    <button
                                    onClick={() => setActiveTab('Overview')}
                                    className={`${activeTab === 'Overview' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Overview
                                    </button>
                                    <br />
                                <button
                                    onClick={() => setActiveTab('Inventory')}
                                    className={`${activeTab === 'Inventory' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium mt-2 `}
                                >
                                    Inventory
                                    </button>
                                    <br />
                                <button
                                    onClick={() => setActiveTab('Offers')}
                                    className={`${activeTab === 'Offers' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium mt-2 `}
                                >
                                    Offers
                                    </button>
                    </div>
                    </div>}
                        </div>
                    </div>
                </div>
            </nav>
            <br />
            

            <div className="flex flex-1 ">


                {/* Main Content */}
                <div className="flex-1 p-2">
                    {activeTab === 'Overview' && (
                        <div>
                            <div className='flex justify-center items-center '>
                <div className='block relative w-[50%]'>

            <input
        type="text"
        placeholder="Search With Order Id"
        value={search}
                    onChange={(e) => {
                        setsearch(e.target.value)
                        
                    }}
                    className='border rounded-xl z-40'
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px'
                    }}
                    
                />
                    <div className='absolute right-3     top-3'><svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg></div>
                    {filteredarr.length > 0 && search !== '' && <div className='absolute left-0 top-12 border w-full rounded-b-lg z-10 p-3 bg-white'>
                    <thead>
                                            <tr>
                                                <th className="pb-2 text-center">ORDER ID</th>
                                                <th className="pb-2 text-center">CAR NO.</th>
                                                <th className="pb-2 text-center">CAR <br /> MODEL</th>
                                                <th className="pb-2 text-center">BOOKING <br />DATES</th>
                                                <th className="pb-2 text-center">TOTAL PRICE</th>
                                                <th className="pb-2 text-center">STATUS</th>
                                                <th className="pb-2 text-center">BOOKING ON</th>
                                            </tr>
                                        </thead>
                    {filteredarr.map((item, key) => {
                                                 return <tr  onClick={()=> navigate(`/company_deshbord/bookings/${item.orderId }`, {state: item})} key={key} className="border-t cursor-pointer text-[#3f3f3fb7] hover:text-[black]">
                                                <td className="py-2 text-center">#{item.orderId}</td>
                                                <td className="py-2  text-center">{item.car.carNo}</td>
                                                    <td className="py-2  text-center uppercase">{item.car.model }</td>
                                                    <td className="py-2   text-center ">{getDate(item.startDate)} To {getDate(item.startDate)} 
                                                    </td>
                                                <td className="py-2    flex justify-center gap-1 md:gap-3 font-semibold">₹ {item.totalPrice} </td>
                                                {item.bookingConfirm === 'pending' ? <td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>Pending</div></td>  : item.bookingConfirm === 'confirm' ?  <td className="py-2 "><div className='p-1   bg-green-100 text-center rounded-full text-green-700 font-semibold'>Confirm</div></td> : <td className="py-2 "><div className='p-1   bg-[#80000226] text-center rounded-full text-[#481313] font-semibold'>Cancle</div></td>}
                                                    <td className="py-2 text-center">{getDate(item.createdAt)}
                                                    </td>
                                                </tr>
                                                
                                            })
                                                
                                            }
                    </div>}
            </div></div>
                            
                            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-white p-4 rounded shadow">
                                    <h2 className="text-gray-700 mb-4">All Bookings</h2>
                                    <p className="text-xl font-semibold">$3,200</p>
                                    <LineChart ChartData={chartData} />
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <h2 className="text-green-600 mb-4">Complete Bookings</h2>
                                    <p className="text-xl font-semibold">$890</p>
                                    <LineChart ChartData={chartData2} />
                                </div> */}
                                {/* <div className="bg-white p-4 rounded shadow">
                                    <h2 className="text-orange-500 mb-4">Pending Bookings</h2>
                                    <p className="text-xl font-semibold">$890</p>
                                    <LineChart ChartData={chartData3} />
                                </div> */}
                            {/* </div> */}
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-4">Pending Bookings <br /> <span className='text-gray-400 text-[1rem]'>Recent 10</span></h2>
                                
                                <div className="bg-white p-4 rounded shadow overflow-auto">
                                    <table className="w-full text-[1.5vw] text-left">
                                        <thead>
                                            <tr>
                                                <th className="pb-2 text-center">ORDER ID</th>
                                                <th className="pb-2 text-center">CAR NO.</th>
                                                <th className="pb-2 text-center">CAR <br /> MODEL</th>
                                                <th className="pb-2 text-center">BOOKING <br />DATES</th>
                                                <th className="pb-2 text-center">TOTAL PRICE</th>
                                                <th className="pb-2 text-center">STATUS</th>
                                                <th className="pb-2 text-center">BOOKING ON</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingbookings.map((item, key) => {
                                                if(key<10) return <tr onClick={()=> navigate(`/company_deshbord/bookings/${item.orderId }`, {state: item})} key={key} className="border-t cursor-pointer text-[#3f3f3fb7] hover:text-[black]">
                                                <td className="py-2 text-center">#{item.orderId}</td>
                                                <td className="py-2 text-center">{item.car.carNo}</td>
                                                    <td className="py-2 text-center uppercase">{item.car.model }</td>
                                                    <td className="py-2  text-center ">{getDate(item.startDate)} To {getDate(item.startDate)} 
                                                    </td>
                                                <td className="py-2   flex justify-center gap-1 md:gap-3 font-semibold">₹ {item.totalPrice} </td>
                                                    {<td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>Pending</div></td>  }
                                                    <td className="py-2 text-center">{getDate(item.createdAt)}
                                                    </td>
                                                </tr>
                                                
                                            })
                                                
                                            }

                                        </tbody>
                                    </table>
                                    <div className='flex justify-center p-10'>
                                            {
                                                    pendingbookings.length === 0 && <><div>No more pending bookings...</div></>
                                            }</div>
                                </div>
                                    <div className='flex justify-center p-5'><button className='btn btn-dark p-3 px-4 shadow-2xl mt-5 bg-white rounded-full hover:bg-gray-300 hover:text-white' onClick={()=>setList('Pending bookings')}>See more...</button></div>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-4">Cancled Bookings <br /> <span className='text-gray-400 text-[1rem]'>Recent 10</span></h2>
                                
                                <div className="bg-white p-4 rounded shadow overflow-auto">
                                    <table className="w-full text-[1.5vw] text-left">
                                        <thead>
                                            <tr>
                                                <th className="pb-2 text-center">ORDER ID</th>
                                                <th className="pb-2 text-center">CAR NO.</th>
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
                                             {cancledbookings.map((item, key) => {
                                                if(key<10) return <tr key={key} onClick={()=> navigate(`/company_deshbord/bookings/${item.orderId }`, {state: item})} className="border-t cursor-pointer text-[#3f3f3fb7] hover:text-[black]">
                                                <td className="py-2 text-center">#{item.orderId}</td>
                                                <td className="py-2 text-center">{item.car.carNo}</td>
                                                    <td className="py-2 text-center uppercase">{item.car.model }</td>
                                                    <td className="py-2  text-center ">{getDate(item.startDate)} To {getDate(item.startDate)} 
                                                    </td>
                                                <td className="py-2   flex justify-center gap-1 md:gap-3 font-semibold">₹ {item.totalPrice} </td>
                                                    {item.bookingConfirm === 'pending' ? <td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>Pending</div></td>  : item.bookingConfirm === 'confirm' ?  <td className="py-2 "><div className='p-1   bg-green-100 text-center rounded-full text-green-700 font-semibold'>Comfirm</div></td> : <td className="py-2 "><div className='p-1   bg-[#80000226] text-center rounded-full text-[#481313] font-semibold'>Cancle</div></td>}
                                                    <td className="py-2 text-center">{getDate(item.createdAt)}
                                                    </td>
                                                </tr>
                                                
                                            })
                                                
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                    <div className='flex justify-center p-5'><button className='btn btn-dark p-3 px-4 shadow-2xl mt-5 bg-white rounded-full hover:bg-gray-300 hover:text-white' onClick={()=>setList('cancle bookings')}>See more...</button></div>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-4">Confirmed Bookings <br /> <span className='text-gray-400 text-[1rem]'>Recent 10</span></h2>
                                
                                <div className="bg-white p-4 rounded shadow overflow-auto">
                                    <table className="w-full text-[1.5vw] text-left">
                                        <thead>
                                            <tr>
                                                <th className="pb-2 text-center">ORDER ID</th>
                                                <th className="pb-2 text-center">CAR NO.</th>
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
                                             {confirmedbookings.map((item, key) => {
                                                if(key<10) return <tr key={key} onClick={()=> navigate(`/company_deshbord/bookings/${item.orderId }`, {state: item})} className="border-t cursor-pointer text-[#3f3f3fb7] hover:text-[black]">
                                                <td className="py-2 text-center">#{item.orderId}</td>
                                                <td className="py-2 text-center">{item.car.carNo}</td>
                                                    <td className="py-2 text-center uppercase">{item.car.model }</td>
                                                    <td className="py-2  text-center ">{getDate(item.startDate)} To {getDate(item.startDate)} 
                                                    </td>
                                                <td className="py-2   flex justify-center gap-1 md:gap-3 font-semibold">₹ {item.totalPrice} </td>
                                                    {item.bookingConfirm === 'pending' ? <td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>Pending</div></td>  : item.bookingConfirm === 'confirm' ?  <td className="py-2 "><div className='p-1   bg-green-100 text-center rounded-full text-green-700 font-semibold'>Confirm</div></td> : <td className="py-2 "><div className='p-1   bg-[#80000226] text-center rounded-full text-[#481313] font-semibold'>Cancle</div></td>}
                                                    <td className="py-2 text-center">{getDate(item.createdAt)}
                                                    </td>
                                                </tr>
                                                
                                            })
                                                
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                    <div className='flex justify-center p-5'><button className='btn btn-dark p-3 px-4 shadow-2xl mt-5 bg-white rounded-full hover:bg-gray-300 hover:text-white' onClick={()=>setList('confirm bookings')}>See more...</button></div>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-4">Bookings <br /> <span className='text-gray-400 text-[1rem]'>Recent 10</span></h2>
                                
                                <div className="bg-white p-4 rounded shadow overflow-auto">
                                    <table className="w-full text-[1.5vw] text-left">
                                        <thead>
                                            <tr>
                                                <th className="pb-2 text-center">ORDER ID</th>
                                                <th className="pb-2 text-center">CAR NO.</th>
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
                                             {bookingData.map((item, key) => {
                                                if(key<10) return <tr key={key} onClick={()=> navigate(`/company_deshbord/bookings/${item.orderId }`, {state: item})} className="border-t cursor-pointer text-[#3f3f3fb7] hover:text-[black]">
                                                <td className="py-2 text-center">#{item.orderId}</td>
                                                <td className="py-2 text-center">{item.car.carNo}</td>
                                                    <td className="py-2 text-center uppercase">{item.car.model }</td>
                                                    <td className="py-2  text-center ">{getDate(item.startDate)} To {getDate(item.startDate)} 
                                                    </td>
                                                <td className="py-2   flex justify-center gap-1 md:gap-3 font-semibold">₹ {item.totalPrice} </td>
                                                    {item.bookingConfirm === 'pending' ? <td className="py-2 "><div className='p-1   bg-orange-100 text-center rounded-full text-orange-700 font-semibold'>Pending</div></td>  : item.bookingConfirm === 'confirm' ?  <td className="py-2 "><div className='p-1   bg-green-100 text-center rounded-full text-green-700 font-semibold'>Confirm</div></td> : <td className="py-2 "><div className='p-1   bg-[#80000226] text-center rounded-full text-[#481313] font-semibold'>Cancle</div></td>}
                                                    <td className="py-2 text-center">{getDate(item.createdAt)}
                                                    </td>
                                                </tr>
                                                
                                            })
                                                
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                    <div className='flex justify-center p-5'><button className='btn btn-dark p-3 px-4 shadow-2xl mt-5 bg-white rounded-full hover:bg-gray-300 hover:text-white' onClick={()=> setList('all bookings')}>See more...</button></div>
                            </div>
                            <Dropdwon close={closeList} isOpen={list} title={list}>
                                <br /><br />
                                    {list === 'Pending bookings' && table(pendingbookings)}
                                    {list === 'cancle bookings' && table(cancledbookings)}
                                    {list === 'confirm bookings' && table(confirmedbookings)}
                                    {list === 'all bookings' && table(bookingData)}
                            </Dropdwon>
                        </div>
                    )}
                    

                    {activeTab === 'Inventory' && (
                        <div >
                            <div className='flex justify-between'>
                                <h1 className="text-2xl font-semibold mb-6">Inventory</h1>
                                <button className='btn p-2 h-fit bg-blue-500 text-white rounded-md hover:bg-blue-400' onClick={()=> navigate("/company_deshbord/add_cars")}>Add new item</button>
                            </div>
                            {/* Inventory content */}
                            <Inventory/>
                        </div>
                    )}
                    {activeTab === 'Offers' && (
                        <div >
                            <div className='flex justify-between'>
                                <h1 className="text-2xl font-semibold px-5 mb-6">Offers</h1>
                                <button className='btn p-2 h-fit bg-blue-500 text-white rounded-md hover:bg-blue-400' onClick={()=> navigate("/company_deshbord/add_offers")}>Add new offer</button>
                            </div>
                            {/* Inventory content */}
                            <Offers/>
                        </div>
                    )}
                    

                </div>
            </div>
        </div>
    )
}

export default Home