import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10 justify-between items-center">
          <p className="text-sm text-black">&copy; 2024 Your Company Name. All rights reserved.</p>
          <ul className="flex space-x-4 text-black">
            <li><Link to='/' className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/category" className="hover:text-gray-400">Rent</Link></li>
            <li><Link to="/ride" className="hover:text-gray-400">Ride</Link></li>
            <li><Link to="/explore" className="hover:text-gray-400">Explore</Link></li>
            <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer