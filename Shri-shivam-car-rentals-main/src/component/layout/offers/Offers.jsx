import React, { useEffect, useState } from 'react'
import Offercard from './Offercard'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'



const Offers = () => {
  const [Offers, setoffer] = useState([]) 
  const [loading,setloading] = useState(true)
  useEffect(() => {
    const fatch = async() => {
      await axios.get('https://shishicr.onrender.com/api/offer').then((res) =>{
        setoffer(res.data)
        setloading(false)
      }).catch ((err) => {
        console.log(err)
        setloading(false)
      })
    }
    fatch()
  },[])
  return (
      <div className='overview flex p-5 w-[80vw] flex-col  md:overflow-y-scroll flex-nowrap md:flex-wrap md:max-h-[100vh] scroll-hidden   md:flex-row  gap-3 lg:gap-6'>
          {!loading ? Offers.length <= 0 ? <div className='w-full justify-center flex flex-col items-center p-10'>No offers found</div> : 
    <div className='overview p-4 grid gap-10  grid-cols-1 md:grid-cols-2  lg:px-10'>
      {!loading &&  Offers.map((item, key) => {
              return <Offercard key={key} item={item}/>
      }) }
    </div> : <div className='w-full justify-center flex flex-col items-center p-10'><ClipLoader/><p className='mt-3'>loding...</p></div> }
    </div>
  )
}

export default Offers