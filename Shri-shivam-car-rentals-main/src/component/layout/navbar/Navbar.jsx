import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Explore from '../../../pages/Explore';




const Navbar = (e) => {
    console.log(e)
    const [menu, setmenu] = useState(false);
    const toggleclick = () => {

        setmenu(!menu);
    }
    const user = JSON.parse(localStorage.getItem('User')) 
    const [profileMenu, setProfileMenu] = useState(false);
    const toggleProfileMenuClick = () => {

        setProfileMenu(!profileMenu);
       
    }
    const navigate = useNavigate()
    // console.log(e.user, "eeeeee")
    const hendleLogout = () => {
        localStorage.removeItem('User')
        window.location.reload()
    }


    return (
        <div className='  h-[80px] bg-[#e5e6e8] w-[100vw] px-3'>
            <div className='p-3 flex items-center justify-between px-3  h-full relative '>
                <div className='left p-3 font-semibold text-[1.5rem]'>
                    <h1 onClick={()=>navigate('/')} className=' cursor-pointer' >Rental.X</h1>
                </div>
                <div className='hidden right gap-10  md:flex mt-3 md:mt-0 font-bold  h-full p-2'>
                    <div className='hover:border-b-2  h-[40px] flex items-center border-[#FA5F7F] font-semibold'><Link to="/category" className='text-[1.2rem]  ' style={{ fontWeight: 100 }}>Rent</Link></div>
                    <div className='hover:border-b-2  h-[40px] flex items-center border-[#FA5F7F]'><Link className='text-[1.2rem] font-bold ' to="/ride" style={{ fontWeight: 100 }}>Ride</Link></div>
                    <div className='hover:border-b-2  h-[40px] flex items-center border-[#FA5F7F]'><Link className='text-[1.2rem]  ' to="/explore" style={{ fontWeight: 100 }}>Explore</Link></div>
                    <div className='hover:border-b-2  h-[40px] flex items-center border-[#FA5F7F]'><Link className='text-[1.2rem]  ' to="/about" style={{ fontWeight: 100 }}>About</Link></div>


                </div>
                {!menu ? <></> : <div className="absolute right-1 top-14 z-10 md:hidden  mt-2 origin-top-right bg-white rounded-md shadow-lg">
                    <div className="py-1    text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to="/category" className="block px-4 py-2 text-sm     text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" >Rent</Link>
                        <Link to="/ride" className="block px-4 py-2 text-sm  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" >Ride</Link>
                        <Link to="/explore" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" >Explore</Link>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" >About</a>
                    </div>
                    <div className="py-1 border-t-2  px-6 border-black text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {!user ? <><button className='bg-[#ffffff8a] text-black rounded-md px-3 p-2 hover:bg-[#00000091] hover:text-white' onClick={() => navigate("/authentication")}>Sign up</button>
                        <button className='bg-[#434C9F] rounded-md px-3 p-2 text-white hover:bg-[#af455a]' onClick={() => navigate("/authentication")}>Log-in</button></>
                         : <><div className='flex gap-2 cursor-pointer'>
                                <div className=' overflow-hidden rounded-full'>
                                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1716529770~exp=1716533370~hmac=75cdbffda8b401f617295a6d17241fb7d551535d20c3de19ed4563a1dd767dd4&w=740" width={30} alt="" />
                                </div>
                                <div className='h-[100] flex items-center '><h1 className=' uppercase' onClick={()=> navigate("/profile")}>{ e?.user?.user_name || e?.user?.user?.name }</h1>
                                    {/* <p className=' text-[#00000095]'>{e.user.user_email}</p> */}</div>
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-8' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path></svg>
                                </div>
                            </div>
                            <button onClick={()=>hendleLogout()} className='w-full mb-2 mt-2 bg-[#0000000b] h-12 flex items-center justify-center rounded-md hover:scale-[0.9] hover:text-black  uppercase text-[#0000007e]' style={{transition: "all ease 0.2s"}} >
                                        Logout
                            </button>   
                        </>}
                    </div>
                </div>}
                <div className='hidden right gap-10 h-full items-center  md:flex  md:mt-0  font-semibold relative right-0 '>
                    {!user ? <><button className='bg-[#ffffff8a] text-black rounded-md px-3 p-2 hover:bg-[#00000091] hover:text-white' onClick={() => navigate("/authentication")}>Sign up</button>
                        <button className='bg-[#434C9F] rounded-md px-3 p-2 text-white hover:bg-[#af455a]' onClick={() => navigate("/authentication")}>Log-in</button></> :
                        <>
                            <div className='relative flex  gap-2 cursor-pointer hover:border-2 border-[#00000077] hover:shadow-xl  p-2 rounded-md' onClick={()=>toggleProfileMenuClick()}>
                                <div className=' overflow-hidden rounded-full'>
                                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1716529770~exp=1716533370~hmac=75cdbffda8b401f617295a6d17241fb7d551535d20c3de19ed4563a1dd767dd4&w=740" width={30} alt="" />
                                   
                                </div>
                                <div className='h-[100] flex items-center '><h1 className=' uppercase'>{e.user.user_name}</h1>
                                    {/* <p className=' text-[#00000095]'>{e.user.user_email}</p> */}</div>
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-8' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path></svg>
                                </div>
                            </div>
                            {profileMenu && <><div className=' hidden absolute top-[100%] bg-[#ffffff] shadow-md md:block  p-4 py-5 right-1 min-h-32 rounded-md'>
                                <div>
                                    
                                    <div className='relative flex  gap-2 cursor-pointer  border-[#00000077]  pr-20   p-2 rounded-md' onClick={() => toggleProfileMenuClick()}>
                                <div className='w-12 h-12 rounded-full overflow-hidden'>
                                    <img src={e.user.user_profile }  className=' object-cover '  alt="" />
                                </div>
                                <div className='h-[100]  '><h1 className=' uppercase '>{e.user.user_name}</h1>
                                    <p className=' text-[#00000095]'>{e.user.user_email}</p></div>
                                
                                    </div>
                                    {user && <button onClick={()=>hendleLogout()} className='w-full mb-2 bg-[#0000000b] h-12 flex items-center justify-center rounded-md hover:scale-[0.9] hover:text-black  uppercase text-[#0000007e]' style={{transition: "all ease 0.2s"}} >
                                        Logout
                                    </button>}
                                    <button className='w-full bg-[#0000000b] h-12 flex items-center justify-center rounded-md hover:scale-[0.9]  uppercase hover:text-black text-[#0000007e]' style={{transition: "all ease 0.2s"}} onClick={()=> navigate("/profile")}>
                                        view profile
                                    </button>
                                    

                            </div>
                            </div></>}
                        </>
                    }
                </div>
                <div onClick={toggleclick} className='md:hidden'><svg xmlns="http://www.w3.org/2000/svg" className='w-5 ' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg></div>
            </div>
        </div>
    )
}

export default Navbar