import React from 'react'

const Offercard = (e) => {
    
    return (
      <>
      <div key={e.key} className="hover:scale-[0.9] w-[80vw] md:max-w-sm relative h-fit rounded-lg shadow-md overflow-hidden bg-white p-4">
            {/* <div className='absolute h-full w-full bg-gray-100 top-0 left-0 z-10'>
              
          </div> */}
          <div className='z-10' style={{zIndex:"999"}}>
      <div className="   flex justify-between  mb-2 z-20">
                        <span className="text-xs rounded-full p-2 bg-gray-100 font-semibold text-gray-700 px-3">{e.item.name }</span>
                        <span className="text-xs rounded-full p-2 bg-gray-100 font-semibold text-gray-700 px-3">{e.item.percentage }% off</span>
      </div>
                    <h3 className="text-lg px-5 font-semibold">{ e.item.subtitle}</h3>
      <p className="text-sm text-gray-500 px-5">{e.item.subtitle}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="bg-gray-100 p-2 rounded-full w-min">
          <span className="text-xs font-semibold text-gray-700 px-2">{e.item.code}</span>
        </div>
        <div>
          <img
            className="w-16 h-16  bg-gray-100 rounded-full object-cover"
            src={e.image || e.item.image}
            alt="Offer Illustration"
          />
        </div>
      </div>
            </div></div>
        </>
  )
}

export default Offercard