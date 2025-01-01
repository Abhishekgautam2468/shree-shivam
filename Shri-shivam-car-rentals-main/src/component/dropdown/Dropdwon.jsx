import React, { useEffect } from 'react'


const Dropdwon = ( {title, isOpen, close , children }) => {
  const handleBackdropClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <>{isOpen && (
        <div className=' w-full h-[100vh] top-0  fixed left-0 z-20 overflow-scroll scroll-hidden'>      
        <div
          className="top-[50%]  left-[50%] -translate-x-[50%] overflow-scroll scroll-hidden -translate-y-[50%] p-5 absolute  mt-2 z-20  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          >
              <h1 className='font-bold uppercase text-[1.2rem] -mt-1'>{title }</h1>
          <div className="" role="none">
                  
                  {children}
              </div>
              {close && <button className='p-2 bg-[#0000000b] absolute right-3 top-3  flex items-center justify-center rounded-full hover:scale-[0.9]  uppercase hover:text-black text-[#0000007e]' style={{transition: "all ease 0.2s"}} onClick={()=>close()}>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-5' viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
                </button>}
        </div>
        </div>
        
      )}</>
  )
}

export default Dropdwon