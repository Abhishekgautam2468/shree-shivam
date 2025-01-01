import React, { useState } from 'react'
import Navbar from '../component/layout/navbar/Navbar'
import Overview from '../component/layout/overview/Overview'
import Offers from '../component/layout/offers/Offers'
import Settings from '../component/layout/settings/Settings'


const Profile = (e) => {
    const [page, setpage] = useState('Overview')
    const [component, setcomponent] = useState('bookings')
    const [menu, setmenu] = useState('bookings')

    const togglemenu = () => {
        setmenu(!menu)
    }
    // console.log(Profile)
    const feature = ["bookings", "prev booking", "future bookings"]
    const pages = [{
        name: "Overview",
        img: "https://img.freepik.com/free-photo/variety-people-multitasking-3d-cartoon-scene_23-2151294550.jpg?t=st=1716543529~exp=1716547129~hmac=67670ef30f5c420f18f2c3372fd6fe762e461d2f867cfda8f773f2c146c5f182&w=740"
    },{
        name: "Offers",
        img: "https://img.freepik.com/free-photo/view-3d-businessmen-handshaking_23-2150709806.jpg?t=st=1716556626~exp=1716560226~hmac=60fdd81c0a31ee695fe0899711d4ef9af09e11a8e4e8300a40e019c731737d20&w=740"
    },{
        name: "Settings",
        img: "https://img.freepik.com/free-photo/3d-illustration-cartoon-character-with-big-robot-calculator_1057-44743.jpg?t=st=1716556432~exp=1716560032~hmac=6236fd6552213b246d0b7c8408169183960cf2d60d1ab41acd78ebf81f2b8e2e&w=740"
    }]
  return (
      <div className='  bg-[#e9e9e9] flex flex-wrap w-[100vw] min-h-[100vh] '>
          <div className=' z-10 h-[80px] ]'><Navbar user={e.user} /></div>
          <div className='w-[100vw] md:hidden'><nav className="bg-white border-b border-gray-200 relative">
                <div className="max-w-7xl w-full  mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex  w-full h-16">
                        <div className="flex w-full">
                        
                            <div className=" sm:ml-6 flex gap-10  justify-center  w-full">
                                <button
                                    onClick={() => setpage('Overview')}
                                    className={`${page === 'Overview' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Overview
                                </button>
                                
                                <button
                                    onClick={() => setpage('Offers')}
                                    className={`${page === 'Offers' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ml-8`}
                                >
                                    Offers
                              </button>
                              <button
                                    onClick={() => setpage('Settings')}
                                    className={`${page === 'Settings' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-600'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ml-8`}
                                >
                                    Settings
                                </button>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </nav></div>
          <div className='hidden z-0 md:block md:max-w-[15vw]     p-4 left bg-white h-[100vh] rounded-r-2xl px-5 max-w-[10vw] shadow-xl'>
          {pages.map((item, key) => {
                                  return page == item.name ? <div key={key} onClick={()=> setpage(item.name)} className='mb-3 relative px-4 p-2 border-2 border-purple-500 bg-purple-100 rounded-xl flex flex-col items-center cursor-pointer scale-[0.9] ' style={{transition:"all ease 0.2s"}}>
                  <img src={item.img} alt="" width={50} className='rounded-full' />
                  <h1 className='text-[2vw] lg:text-[1.2vw] px-4'>{item.name}</h1>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-5 absolute top-[50%] -translate-y-[50%] -right-[13px] text-purple-500 ' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg>
              </div>:<div onClick={()=> setpage(item.name)} className='mb-3 relative px-4 p-2 border-2 rounded-xl flex flex-col items-center cursor-pointer hover:scale-[0.9] ' style={{transition:"all ease 0.2s"}}>
                  <img src={item.img} alt="" width={50} className='rounded-full' />
                  <h1 className='text-[1vw] lg:text-[1.2vw] px-4' >{item.name}</h1>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className='w-5  absolute top-[50%] -translate-y-[50%] -right-[13px] text-[#dadada]' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg> */}
              </div>
                                  
                                  
                              
                              })}
              
              {/*  */}
          </div>


          {page == "Overview" && <Overview user={e.user} />}
          {page == "Offers" && <Offers user={e.user} />}
          {page == "Settings" && <Settings user={e.user}  />}
        
    </div>
  )
}
 
export default Profile