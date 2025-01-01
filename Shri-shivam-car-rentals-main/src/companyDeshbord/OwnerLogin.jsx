import axios from 'axios';
import React, { useState } from 'react'

const OwnerLogin = () => {
  
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const[Err,seterr] = useState("") 
    
      const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    };
    const [loader,setloader] = useState(false)
    
      const handleSubmit = async(e) => {
          e.preventDefault();
          setloader(true)
          try {
              await axios.post("https://shishicr.onrender.com/api/owner/login", formData).then((res) => {
                    const data = JSON.stringify(res.data)
                  localStorage.setItem('Owner', data)   

                  window.location.reload()

              }).catch((err) => {
                  seterr(err.response.data.msg)
                  setloader(false)
            })
          }
          catch(err) {
            seterr(err.response.data.msg)
          }
        // Add your form submission logic here
      };
    
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                Sign in to your owner account
              </h2>
             
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-muted-foreground"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    className="h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                    id="username"
                    autoComplete="username"
                    required
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-muted-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    className="h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                    id="password"
                    autoComplete="current-password"
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                      </div>
                      {Err && <p className='text-red-700 px-3 font-semibold'>{ Err }</p>}
              
              <div>
                <button
                  className="items-center bg-indigo-900 text-white hover:bg-indigo-800 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="submit"
                >
                  log in
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default OwnerLogin