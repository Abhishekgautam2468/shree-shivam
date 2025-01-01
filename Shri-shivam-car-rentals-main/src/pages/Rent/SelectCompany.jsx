import React from 'react'
import audilogo from '../../Images/audi-logo-10.png'
import tatalogo from '../../Images/toyoto.png'
import mahindralogo from '../../Images/Mahindra.png'
import suzukilogo from '../../Images/suzuki.png'
import hyundailogo from '../../Images/Hyundai.png'
import fordlogo from '../../Images/Ford.png'
import marcedeslogo from '../../Images/Mercedes.png'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../component/layout/navbar/Navbar'




const VisageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
    <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
    <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <path d="M9 9h.01"></path>
    <path d="M15 9h.01"></path>
  </svg>
);


const categories = [

    { icon: audilogo, label: 'Audi' },
    { icon: tatalogo, label: 'Tata' },
    { icon: mahindralogo, label: 'Mahindra' },
    { icon: suzukilogo, label: 'Suzuki' },
    { icon: hyundailogo, label: 'Hyundai' },
    { icon: fordlogo, label: 'Ford' },
    { icon: marcedeslogo, label: 'Mercedes' },
    
  ];
  
  const products = [
    { image: '/placeholder.svg', title: 'Moisturizing Cream', category: 'Visage', price: '$29.99' },
    { image: '/placeholder.svg', title: 'Body Lotion', category: 'Corps', price: '$19.99' },
    { image: '/placeholder.svg', title: 'Shampoo', category: 'Cheveux', price: '$14.99' },
    { image: '/placeholder.svg', title: 'Baby Powder', category: 'Maman Et Bébé', price: '$9.99' },
    { image: '/placeholder.svg', title: 'Sunscreen', category: 'Solaire', price: '$24.99' },
    { image: '/placeholder.svg', title: 'Hand Soap', category: 'Hygiène', price: '$7.99' },
    { image: '/placeholder.svg', title: 'Aftershave Balm', category: 'Hommes', price: '$16.99' },
    { image: '/placeholder.svg', title: 'Multivitamin', category: 'Compléments Alimentaires', price: '$29.99' },
    { image: '/placeholder.svg', title: 'Clogs', category: 'Sabots Et Claquettes', price: '$39.99' }
    ];
                
const CategoryCard = ({ icon, label, navigate }) => (
 
  
  <Link to={`/category/${label.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center gap-2 p-10  cursor-pointer justify-center  rounded-lg bg-gray-100  hover:bg-gray-200  transition-colors" onClick={()=>navigate("/select_car_company")}>
      <img className='w-16 ' src={icon} alt="" />
      <span className="text-sm font-semibold uppercase ">{label}</span>
  </Link>
 
);



const Rent = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("User"))
  return (
    <>
      <div className='fixed bg-[#e5e6e8]  z-20'><Navbar user={user} /></div>
    <div className="container flex justify-center items-center h-[100vh] mx-auto px-4 md:px-6 py-12">
          <div className="grid  gap-8 ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} icon={category.icon} label={category.label} navigate={navigate} />
        ))}
      </div>
              
        </div>
      </div>
    </>
  )
}

export default Rent