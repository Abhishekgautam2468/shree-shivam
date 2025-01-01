import React, { useEffect, useState } from 'react';
import Navbar from '../../component/layout/navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const ViewCars = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("User"));
  const [car, setCar] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loader,setloader] = useState(true)

  const navigatefun = (link, data) => {
    navigate(`/${link}`);
  };

  const ProductCard = ({ image, title, category, price, keys, car }) => (
    <div
      key={keys}
      onClick={() => navigatefun(car._id, car)}
      className="bg-gray-100 cursor-pointer hover:scale-[1.1] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <img src={image[0]} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{category}</p>
        <p className="text-gray-800 text-sm mt-2">Seates: {car.seats}</p>
        <div className="mt-3 font-semibold uppercase">₹{price} per hour</div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('https://shishicr.onrender.com/api/cars');
        setCar(res.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchCars();
  }, []);
  

  useEffect(() => {
    const select = () => {

      const newCars = car.filter(c => c.make.trim().toLowerCase() === category.trim().toLowerCase());
      setFilteredCars(newCars);
      setloader(false)
    };

    select();
  }, [car, category]);
 
  if (filteredCars.length == 0) return (
    <>
      <div className="fixed bg-[#e5e6e8] z-20">
        <Navbar user={user} />
      </div>
      <br />
      <br />
      <div className='w-full h-[100vh] grid place-items-center'>
        {loader ? <ClipLoader /> : <><h1>Sorry, No Cars Found</h1></>}

        
      </div>
    </>
  )
  return (
    <>
      <div className="fixed bg-[#e5e6e8] z-20">
        <Navbar user={user} />
      </div>
      <br />
      <br />
      <div className="h-[100vh] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCars.map((item, ind) => (
            <ProductCard
              key={ind}
              image={item.image}
              title={item.model}
              category={item.make}
              price={item.pricePerHour}
              keys={ind}
              car={item}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewCars;
