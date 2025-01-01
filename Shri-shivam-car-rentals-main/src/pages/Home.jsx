import React, { useEffect, useState, useSyncExternalStore } from 'react'
import Navbar from '../component/layout/navbar/Navbar'
import carpng from '../component/images/red-edition-audi-luxury-car-jdc.png'
import ai from "../component/images/addvertise icon/ai.png"
import chat from "../component/images/addvertise icon/chat.png"
import bing from "../component/images/addvertise icon/bing.png"
import google from "../component/images/addvertise icon/google.png"
import facebook from "../component/images/addvertise icon/facebook.png"
import instagram from "../component/images/addvertise icon/instagram.png"
import yalowcar from "../component/images/yallowcar.png"
import szukilogo from "../component/images/brands/szuki.png"
import ButtonPallete from '../component/layout/button/ButtonPallete'
import ScrollProductCard from '../component/layout/advance/ScrollProductCard'
import cartop from "../component/images/car-top.png"
import FunctionPallete from '../component/layout/advance/FunctionPallete'
import Footer from '../component/layout/footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'




const Home = (e) => {
    const [isOpen, setIsOpen] = useState(false);
    const [picupdatebox, setpicupdatebox] = useState(false);
    const [returndatebox, setreturndatebox] = useState(false);
    const [locationMenu, setlocation] = useState(false);
    const navigate = useNavigate()
    const [cars, setCars] = useState([])

    



    const functions = [{ name: 'Lock', icon: <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path></svg> },
    { name: 'Unlock', icon: <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path></svg> },
    { name: 'Start', icon: <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16.3944 12.0001L10 7.7371V16.263L16.3944 12.0001ZM19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path></svg> },
    { name: 'Stop', icon: <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 7V17H17V7H7ZM6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z"></path></svg> },
    { name: 'Lights', icon: <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 4V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V4H20C20 6.5 17.5 7.5 17 7.5V10H20C20 12.5 17.5 13.5 17 13.5V16H20C20 18.5 17.5 19.5 17 19.5V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V19.5C6.5 19.5 4 18.5 4 16H7V13.5C6.5 13.5 4 12.5 4 10H7V7.5C6.5 7.5 4 6.5 4 4H7ZM12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z"></path></svg> },
    { name: 'AC', icon: <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 9V13H20V9H22V14C22 14.5523 21.5523 15 21 15H3C2.44772 15 2 14.5523 2 14V9H4Z"></path></svg> }];
    const items = [ai, chat, bing, google, facebook, instagram];


    const [productTab, setProductTab] = useState("Honda");
    const [loader, setloader] = useState(false)
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
    
    useEffect(() => {
        fatchCars();
    }, [])
    console.log(cars)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const togglepicupdatebox = () => {
        setpicupdatebox(!picupdatebox)
    };
    const togglereturndatebox = () => {
        setreturndatebox(!returndatebox)
    };
    const togglelocation = () => {
        setlocation(!locationMenu);
    };

    const handleCitySelect = () => {
        setIsOpen(false); // Close the dropdown when a city is selected
        // Add your logic for city selection here
    };

    const changeTab = (value) => {
        // console.log("click changetab")
        setProductTab(value);
    }
    const city = ["Bhopal", "Vidisha", "Sehore", "Raisen", "Sanchi", "Berasia"]
    const [search, setsearch] = useState({
        city: "",
        pickupdate: "",
        pickuptime: "",
        returndate: "",
        returntime: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsearch((prev) => ({
            ...prev,
            [name]: value,
        }));

    };
    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start from 0
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };
    
      // Get the current time in HH:MM format
      const getCurrentTime = () => {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    };
    
    const hendle_submit_time = () => {
        if (search.pickupdate && search.pickuptime && search.returndate && search.returntime) {
            navigate("./ride", {state: search})
        }
        // 
    }

    

    return (
        <div >
            <div className='fixed bg-[#e5e6e8]  z-20'><Navbar user={e.user} /></div>
            <div className='bg-[rgb(229,230,232)] z-10'>
                <div className='h-[85vh] flex '>
                    <div className='left w-full md:w-[50%] h-full flex flex-col justify-center items-center relative'>
                        <div className='w-full px-10 md:w-[60%]'>
                            <h1 className='font-bold text-[2rem] '>Looking to save more on your rental car?</h1>
                            <div className='h-[30px] w-[50px] border-t-4 mt-3 rounded-sm border-[#FA5F7F]'>
                            </div>
                            <p className='text-[0.7rem] text-[#00000066] hidden md:flex'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, quasi repudiandae mollitia ullam asperiores dolore vero minus placeat provident quaerat.</p>

                        </div>
                        {!locationMenu && <button onClick={togglelocation} type="button" className="mt-10 inline-flex md:hidden gap-2 bg-[#434C9F] hover:bg-[#91384a] text-white justify-center  px-5 py-3 text-sm font-medium  rounded-md bg-[]  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            Search
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                        </button>}

                    </div>
                    <div className='hidden md:flex justify-center items-center right w-[50%] relative'>

                        <img className='w-[50vw] absolute h-[80%] rounded-xl  -mb-[250px]  ' src={carpng} alt='' />

                    </div>
                    {locationMenu && <div className='rounded md:hidden  justify-center items-center bg-[#ffffff] shadow-2xl  p-3  mt-10 gap-1 absolute top-[48%] left-[50%] -translate-x-1/2 md:translate-x-0 md:left-[4%] '>

                        <div className="relative  flex flex-col md:inline-block text-left" >
                            

                        </div>
                        <div className="relative flex flex-col   md:inline-block text-left" >
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">pick up date:</label>
                            <input
                                type="date"
                                id="pickupdate"
                                name="pickupdate"
                                value={search.pickupdate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent bg-gray-800 px-3 py-2 text-white shadow-lg focus:ring-4 focus:ring-purple-500 focus:border-transparent sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                required
                            />
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Pick up time</label>
                            <input
                                type="time"
                                id="pickuptime"
                                name="pickuptime"
                                value={search.pickuptime}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent  px-3 py-2 bg-gray-800 text-white   sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                required
                            />

                        </div>
                        <div className="relative flex flex-col mb-2   md:inline-block text-left" >
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Return date:</label>
                            <input
                                type="date"
                                id="returndate"
                                name="returndate"
                                value={search.returndate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent bg-gray-800  px-3 py-2 text-white shadow-lg  sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                required
                            />
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Return time:</label>
                            <input
                                type="time"
                                id="returntime"
                                name="returntime"
                                value={search.returntime}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent bg-gray-800 px-3 py-2 text-white shadow-lg  sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                required
                            />
                        </div>
                        <div className="relative flex flex-col   md:inline-block text-left">
                            <button type="button" className="inline-flex gap-2 bg-[#000000] hover:bg-[#91384a] text-white justify-center  px-5 py-3 text-sm font-medium  rounded-md bg-[]  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={()=>hendle_submit_time()}>
                                Search
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                            </button></div>






                    </div>}
                    <div className='hidden md:flex rounded  justify-center items-center bg-[#ffffff] shadow-2xl  p-3  mt-10 gap-1 absolute top-[60%] left-[50%] -translate-x-1/2 md:translate-x-0 md:left-[4%] '>

                        <div className="relative  flex flex-col md:inline-block text-left" onClick={() => setIsOpen(!isOpen)}>
                            <select
                                id="city"
                                className="flex h-10 w-full   px-2 rounded-md font-semibold bg-background  py-2 text-sm"
                                value={search.city}
                                onChange={(e) => setsearch({ ...search, city: e.target.value })}
                                required
                            >
                                <option value="">Select city</option>
                                {city.map((city, key) => (
                                    <option key={key} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative flex flex-col   md:inline-block text-left" >
                            {!picupdatebox &&
                                <button type="button" className="inline-flex justify-center w-full px-4 py-3 text-sm font-medium  rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={togglepicupdatebox}>
                                Select pickup date & time
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 1 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3A1 1 0 0 1 10 12z" clipRule="evenodd"></path>
                                </svg>
                            </button>}
                            {picupdatebox && 
                        <><label htmlFor="date" className="block text-sm font-medium text-gray-700">Pick up date:</label>
                            <input
                                type="date"
                                id="pickupdate"
                                name="pickupdate"
                                value={search.pickupdate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent  px-3 py-2 text-black focus:ring-4 focus:ring-purple-500 focus:border-transparent sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                    required
                                    min={getCurrentDate()}
                            />
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Pick up time</label>
                            <input
                                type="time"
                                id="pickuptime"
                                name="pickuptime"
                                value={search.pickuptime}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent  px-3 py-2 text-black   sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                    required
                                    min={getCurrentTime}
                            /></>}
                        </div>
                        <div className="relative flex flex-col   md:inline-block text-left" >
                        {!returndatebox &&
                                <button type="button" className="inline-flex justify-center w-full px-4 py-3 text-sm font-medium  rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={togglereturndatebox}>
                                Select return date & time
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 1 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3A1 1 0 0 1 10 12z" clipRule="evenodd"></path>
                                </svg>
                            </button>}
                            {returndatebox && 
                        <><label htmlFor="date" className="block text-sm font-medium text-gray-700">Return date:</label>
                            <input
                                type="date"
                                id="returndate"
                                name="returndate"
                                value={search.returndate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent text-black px-3 py-2   focus:ring-4 focus:ring-purple-500 focus:border-transparent sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                    required
                                    min={search.pickupdate}
                            />
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Return time</label>
                            <input
                                type="time"
                                id="returntime"
                                name="returntime"
                                value={search.returntime}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-transparent  px-3 py-2 text-black  sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                    required
                                   
                                   
                            /></>}
                        </div>
                        <div className="relative flex flex-col   md:inline-block text-left">
                            <button type="button" className="inline-flex gap-2 bg-[#434C9F] hover:bg-[#91384a] text-white justify-center  px-5 py-3 text-sm font-medium  rounded-md bg-[]  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={()=>hendle_submit_time()}>
                                Search
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                            </button></div>






                    </div>

                </div>



            </div>

            <div className='flex items-center  md:grid  grid-cols-2 justify-center' >
                <div className='hidden md:flex p-10 items-end overflow-hidden'>
                    <img src={yalowcar} className=' -ml-[20%] scale-[1.3]' alt="" />
                </div>
                <div className='p-10 font-bold text-[#00000043] '>
                    <h1>Best Deals</h1>
                    <p className='w-[80%] text-black font-bold  text-[1.7rem]'>Feel the best expirience with our rentle deals.</p>
                    <div className='h-[30px] w-[50px]  border-t-4 mt-3 rounded-sm border-[#FA5F7F]'>
                    </div>
                    <div className='flex justify-start items-center gap-10 mb-5'>
                        <span className=' bg-[#ededed] p-3 rounded-md'> <svg xmlns="http://www.w3.org/2000/svg" className='w-5 ' viewBox="0 0 24 24" fill="#00000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path></svg></span>
                        <div><h1 className='text-black'>hello</h1><p className='text-[0.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, voluptas!</p></div>
                    </div>
                    <div className='flex justify-start items-center gap-10 mb-5'>
                        <span className=' bg-[#ededed] p-3 rounded-md'> <svg xmlns="http://www.w3.org/2000/svg" className='w-5 ' viewBox="0 0 24 24" fill="#00000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM6.00008 6.00008V9.5148L3.5148 12.0001L6.00008 14.4854V18.0001H9.5148L12.0001 20.4854L14.4854 18.0001H18.0001V14.4854L20.4854 12.0001L18.0001 9.5148V6.00008H14.4854L12.0001 3.5148L9.5148 6.00008H6.00008ZM12.0001 16.0001C9.79094 16.0001 8.00008 14.2092 8.00008 12.0001C8.00008 9.79094 9.79094 8.00008 12.0001 8.00008C14.2092 8.00008 16.0001 9.79094 16.0001 12.0001C16.0001 14.2092 14.2092 16.0001 12.0001 16.0001ZM12.0001 14.0001C13.1047 14.0001 14.0001 13.1047 14.0001 12.0001C14.0001 10.8955 13.1047 10.0001 12.0001 10.0001C10.8955 10.0001 10.0001 10.8955 10.0001 12.0001C10.0001 13.1047 10.8955 14.0001 12.0001 14.0001Z"></path></svg></span>
                        <div><h1 className='text-black'>hii</h1><p className='text-[0.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, voluptas!</p></div>
                    </div>
                    <div className='flex justify-start items-center gap-10 mb-5'>
                        <span className=' bg-[#ededed] p-3 rounded-md'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-5' fill="#00000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg></span>
                        <div><h1 className='text-black'>bye</h1><p className='text-[0.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, voluptas!</p></div>
                    </div>

                </div>

            </div>

            <div className='flex-1 mt-10 '>
                <div className='w-full flex flex-col  justify-center items-center '>
                    <h1 className='font-bold text-[1.5rem] '>EXPLORE OUR CARS</h1>
                    <p className='w-full md:w-1/2 text-center font-semibold text-[#00000047] mb-5 px-3 md:px-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt quidem quia et consequatur, repellendus sapiente ipsam hic debitis ducimus in.</p>
                    <div className={`grid grid-flow-col grid-cols-4 gap-5  md:grid-cols-2 lg:grid-cols-4 mt-10`}>{cars.length > 0 ? cars.map((item, ind) => {
                    if(ind <= 4)return <ProductCard key={ind}
                    image={item.image}
                    title={item.model}
                    category={item.make}
                    price={item.pricePerHour}
                    keys={ind}
                    car={item}/>
                }):<><ClipLoader/></>}</div>
                </div>
            </div>
            <div className='hover:scale-1.5 h-[100px] w-full   flex  items-center justify-center p-2    mb-10 mt-4 '>
                {items.map((item, index) => {
                    return <div key={index} className='py-10 w-[30vw]  text-center flex flex-col items-center justify-center gap-2 opacity-80 '>
                        <img src={items[index]} className='w-[20%]' alt="" />

                    </div>
                })}

            </div>
            <div>
                <div className=' flex justify-center '>
                    <img src={cartop} className=' w-[300px]' alt="" />

                </div>
                <FunctionPallete functions={functions} />
            </div>
            <Footer />

        </div>
    )
}

export default Home