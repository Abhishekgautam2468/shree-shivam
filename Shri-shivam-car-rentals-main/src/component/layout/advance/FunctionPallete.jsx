import React from 'react'

const FunctionPallete = (e) => {
    // console.log(e)

  return (
      <>
          <div className='flex flex-col lg:flex-row justify-center items-center gap-10 mt-10 mb-10 px-5 w-[98.5vw]'>
              {
                  e.functions.map((item, index) => {
                      return (
                          <>
                              <div className='p-3    w-1/2 flex gap-4 rounded-xl justify-center  bg-gray-200 hover:bg-gray-100 cursor-pointer  ' >
                              {
                                      item.icon
                                  }
                                  {item.name}

                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-5' fill="rgb(86, 86, 86)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path></svg>
                                  
                              </div>
                          </>
                      )
                  })
              }
          </div>
      </>
  )
}

export default FunctionPallete