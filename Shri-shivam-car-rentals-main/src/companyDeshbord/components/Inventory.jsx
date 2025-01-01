import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Inventory = () => {
    const [cars, setcars] = useState([])
    const [allcars, setallcars] = useState([])
    const [search, setsearch] = useState()
    // console.log(search)
    const hendle_search = (e) => {
        setsearch(e.target.value)
    }
    const navigate = useNavigate()

    useEffect(() => {
        const arr = () => {
            if (search == '') {
                setcars(allcars)
                return
            }
            
            setcars(allcars.filter(car => {

                const carNoMatch = car.carNo && car.carNo.toString().includes(search);
        const modelMatch = car.model && car.model.toString().toLowerCase().includes(search.toLowerCase());
        return carNoMatch || modelMatch;
            }))
        }
        arr()
    },[search])

    
    useEffect(() => {
        const fatch = async() => {
            axios.get('https://shishicr.onrender.com/api/cars').then((res) => {
                setcars(res.data)
                setallcars(res.data)
                // console.log(res.data)
            }).catch((err) => {
                alert("server error")
            })
        }
        fatch()
    }, [])
    
    
    return (
        <>
            <input
        type="text"
        placeholder="Search cars no. and model"
        value={search}
        onChange={(e)=> hendle_search(e)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px'
        }}
      />
            <div className='div bg-white p-3 h-[70vh] overflow-scroll scroll-hidden'>
      {cars.map((car,ind)=>{
        
          return (
              <>
                  <div className=' border-b  p-2 gap-3  grid grid-flow-col text-[#000000a0] hover:text-black cursor-pointer' key={ind} onClick={() => navigate(`/company_deshbord/car/${car._id}`, { state: car })}>
            <div className=' flex gap-2 '>
                <img src={car.image[0] || car.images[0]} alt="" width={50} className='rounded-md' />
                
      
                    <h1 className='text-[0.7rem] uppercase flex items-center font-semibold'>{car.model}</h1>
                
            </div>
            <p className='text-[0.7rem] uppercase flex items-center font-semibold  justify-center'>No. {car.carNo}</p>
            <p className='text-[0.7rem] uppercase flex items-center font-semibold justify-center'>₹{car.pricePerHour}</p>
            <p className='text-[0.7rem] uppercase flex items-center font-semibold justify-center'>{car.color}</p>
            
           
            
      
      
        </div>
            </>
          )
      })}</div>
        </>
        
     
  )
}

export default Inventory