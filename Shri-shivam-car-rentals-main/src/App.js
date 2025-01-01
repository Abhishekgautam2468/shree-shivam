import React, {Suspense, lazy, useEffect, useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import ProtectedRoute from './Highorderfuntions/ProtectedRoute';
import Explore from './pages/Explore';
import CompanyHome from './companyDeshbord/Home'
import AddproductForm from './companyDeshbord/layouts/AddproductForm';
import About from './pages/About';
const Authentication = lazy(() => import('./pages/Authentication'));
const Profile = lazy(() => import('./pages/Profile'));
const SelectCompany = lazy(() => import('./pages/Rent/SelectCompany'));
const Viewcars = lazy(() => import('./pages/Rent/ViewCars'));
const CarProfile = lazy(() => import('./pages/CarProfile'));
const Ride = lazy(() => import('./pages/Ridepage'))
const Company_deshbord_BookingProfile = lazy(() => import('./companyDeshbord/BookingProfile'))
const CardashbordProfile = lazy(()=> import('./companyDeshbord/CarProfile'))
const Addoffers = lazy(() => import('./companyDeshbord/layouts/Addoffers'))
const BookingProfile = lazy(() => import('./pages/BookingProfile'))
const OwnerLogin = lazy(()=>import('./companyDeshbord/OwnerLogin'))

const App = () => {
  let [User, SetUser] = useState({})
  let [Owner, setOwner] = useState({})
    
  // console.log(User)
  useEffect(()=>{
    let isLoggedIn = JSON.parse(localStorage.getItem('User'))
    let owner = JSON.parse(localStorage.getItem('Owner'))
    SetUser(isLoggedIn)
    setOwner(()=>owner && owner)
      
   },[])

  return (
    
    <Suspense fallback={<div>Loading...</div>}>
  <Routes>
      <Route path="/" element={<Home user={User} />} />
      
        <Route path="/ride" element={<Ride />} />
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<SelectCompany />} />
        <Route path="/category/:category" element={<Viewcars/>} />
        <Route path="/:_id" element={<CarProfile/>} />
        <Route path="/explore" element={<Explore user={User} />} />
      <Route path="/authentication" element={<ProtectedRoute user={!User} redirect='/'><Authentication/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute user={User} redirect='/'><Profile user={User} /></ProtectedRoute>}/>
        <Route path="/bookings/:id" element={<ProtectedRoute user={User} redirect='/'><BookingProfile/></ProtectedRoute>}/>
        
      {/* company_deshbord */}
        <Route path="/company_deshbord" element={<ProtectedRoute user={Owner} redirect='/company_deshbord/login'><CompanyHome /></ProtectedRoute>} />
      <Route path="/company_deshbord/add_cars" element={<ProtectedRoute user={Owner} redirect='/company_deshbord/login'><AddproductForm /></ProtectedRoute>}/>
      <Route path="/company_deshbord/add_offers" element={<ProtectedRoute user={Owner} redirect='/company_deshbord/login'><Addoffers /></ProtectedRoute>} />
      <Route path="/company_deshbord/bookings/:_id" element={<ProtectedRoute user={Owner} redirect='/company_deshbord/login'>< Company_deshbord_BookingProfile/></ProtectedRoute>} />
      <Route path="/company_deshbord/car/:_id" element={<ProtectedRoute user={Owner} redirect='/company_deshbord/login'>< CardashbordProfile/></ProtectedRoute>} />
      <Route path="/company_deshbord/login" element={<ProtectedRoute user={!Owner} redirect='/company_deshbord'>< OwnerLogin/></ProtectedRoute>} />
      </Routes>
      </Suspense>
    
  )
}

export default App