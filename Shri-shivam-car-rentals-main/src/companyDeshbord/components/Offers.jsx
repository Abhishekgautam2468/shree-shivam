import React, { useEffect, useState } from 'react'
import Offercard from '../../component/layout/offers/Offercard';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';


const Offers = () => {
  const [Offers, setoffer] = useState([]) 
  const [loading,setloading] = useState(true)
  useEffect(() => {
    const fatch = async() => {
      await axios.get('https://shishicr.onrender.com/api/offer').then((res) =>{
        setoffer(res.data)
        setloading(false)
      }).catch ((err) => {
        alert("error:", err)
        setloading(false)
      })
    }
    fatch()
  },[])
  
  return (
    <>{!loading ? Offers.length <= 0 ? <div className='w-full justify-center flex flex-col items-center p-10'>No offers found</div> : 
    <div className='overview p-4 grid gap-10 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 lg:px-10'>
      {!loading &&  Offers.map((item, key) => {
              return <Offercard key={key} item={item}/>
      }) }
    </div> : <div className='w-full justify-center flex flex-col items-center p-10'><ClipLoader/><p className='mt-3'>loding...</p></div> }</>
  )
}

export default Offers