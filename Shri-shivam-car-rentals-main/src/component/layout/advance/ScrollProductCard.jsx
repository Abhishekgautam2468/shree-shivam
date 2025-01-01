import React from 'react'

const ScrollProductCard = (e) => {
    // console.log(e)
  return (
      <div className='flex p-5 overflow-x-scroll justify-center gap-6 items-center scroll-hidden'  >
          {
              e.product.map((item, index) => {
                  return (
                      <>
                          <div className='p-3 h-[350px] cursor-pointer hover:scale-[1.1]  bg-gray-100 rounded-xl w-[300px] mb-20' key={index} style={{transition: "all ease 0.5s"}}>
                              <div className='w-full h-1/2 bg-black rounded-xl overflow-hidden'>
                                  <img src={item.image} alt="" className=' object-cover w-full h-full' />
                                    
                              </div>
                              <div className='p-2 font-semibold'>
                                  <h1>
                                    {item.carName}
                                  </h1>
                                  <p className='text-gray-400'>{ item.company }</p>
                                  <p className='text-gray-400 text-[0.7rem]'>{item.description}</p>
                                  <p>{item.rentPricePerHour} <span className='text-gray-500'>$</span></p>
                                  <button className='p-3 mt-5 w-full bg-white hover:bg-gray-200 rounded-xl hover:scale-[0.9]' style={{transition: "all ease 0.5s"}} >see carr</button>
                              </div>
                          </div>
                      </>
                  )
              })
          }
    </div>
  )
}

export default ScrollProductCard