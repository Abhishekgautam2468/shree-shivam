import React from 'react'

const ButtonPallete = (e) => {
    
  return (<>
      <div className='container gap-5 md:gap-10 flex justify-center items-center mb-10   '>
          {
              e.companies.map((company, index) => { 
                  return (<div key={index}>
                      {e.productTab == company.name ? 
                          (<button onClick={company.Opentab} className='flex p-3 md:px-7 rounded bg-[#FA5F7F] text-white font-semibold'  >{company.name}</button>) : (<button onClick={company.Opentab} className='flex p-3 md:px-7 rounded bg-[#ededed]'>{ company.name}</button>)}
                      
                  </div>
                  )
              })
              
          }
          
          
      </div>
      
  </>
  )
}

export default ButtonPallete