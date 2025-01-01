import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// import { supabase } from '../client';
import emailjs from "@emailjs/browser"
import axios from "axios"
import { useNavigate } from "react-router-dom"


// service_a5p9rtr

const Authentication = () => {
    const navigate = useNavigate()
    const [rememberMe, setRememberMe] = useState(false);
    const [signUp, setsignUp] = useState(false);
    const [emailVarify, setEmailVarify] = useState(false);
    const [loading, setloading] = useState(false);
    const location = useLocation()

    const [loginuser, setloginuser] = useState({
        email: "",
        password: ""
    })
    const [signupuser, setsignupuser] = useState({
        email: "",
        password: "",
        name: ""
    })

    const hendlepagechange = () => {
        setsignUp(!signUp)
        seterr('')
        // console.log(signUp)
    }

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };
    // console.log(loginuser)
    const hendleSubmmitlogin = async(e) => {
        e.preventDefault();

        try {
            await axios.post("https://shishicr.onrender.com/api/auth/login", loginuser).then((res) => {
                // console.log(res)
                console.log(res.data)
                
                localStorage.setItem("User", JSON.stringify(res.data))
                window.location.href = '/'
              
            }).catch((err) => {
                seterr(err.response.data.error);
                // console.log(err)
                
            })
        }
        catch (err) { 
            seterr(err.response.data.msg)
        }
    }


    // const genrateOpt = () => {
    //     let otp = Math.floor(100000 + Math.random() * 900000);
    //     return otp
    // }
    
    // const [genratedOTP, setgerratedOTP] = useState(null)


    // const hendleSubmmitsignup = async (e) => {
    //     e.preventDefault();
    //     setloading(true);
    //     const newOtp = genrateOpt()
    //     setgerratedOTP(newOtp)
        
    // emailjs.send('service_a5p9rtr', 'template_48htzjs', { from_name: "SHRI SHIVAM", to_name: signupuser.name, from_email: "Shrishivam@varify", to_email: signupuser.email, OTP: newOtp }, 'VmhYCGXVnmiZ0S_-F').then(() => {
    //     setloading(false)
    //     setEmailVarify(true)
    //   alert("chake email")
      
    // }, (error) => {
    //   setloading(false)
    // //   console.log(error);
    //   alert('Something went wrong')
    // })
         
        
        
        
        
    // }
    
    




    // const [otp, setOtp] = useState(new Array(6).fill(''));
    

//   const handleOtpChange = (element, index) => {
//     const value = element.value.replace(/\D/g, ''); // Remove non-numeric characters
//     if (value) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move to the next input field
//       if (element.nextSibling) {
//         element.nextSibling.focus();
//       }
//     }
//   };

//   const handleOtpKeyDown = (element, index, event) => {
//     if (event.key === 'Backspace') {
//       const newOtp = [...otp];
//       newOtp[index] = '';
//       setOtp(newOtp);

//       if (element.previousSibling) {
//         element.previousSibling.focus();
//       }
//     }
//   };
    //   console.log(signupuser)
    const [err, seterr] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    //   console.log(signupuser)
    //   if (otp.join('') == genratedOTP) {
          await axios.post("https://shishicr.onrender.com/api/auth/register", signupuser).then((res) => {
            localStorage.setItem("User", JSON.stringify(res.data))
            window.location.href = '/'
              
          }).catch((err) => {
              seterr(err.response.data.msg);
            //   console.log(err)
          })
    //   }
    //   else {
    //       alert("otp is incorect")
    //    }
      
      
  };


    

    return (<>{!signUp ?

        <>< div className = "flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 " >
            <div className="w-full max-w-md space-y-8">
                <div>
                    {/* <img
            src="/placeholder.svg"
            alt="Acme Car Rentals"
            width="48"
            height="48"
            className="mx-auto h-12 w-auto"
            style={{ aspectRatio: '48 / 48', objectFit: 'cover' }}
          /> */}
                    <h1 className='mt-6 text-center underline text-3xl font-bold tracking-tight text-gray-900 '>Rental.X</h1>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
                        Sign in to your account
                    </h2>
                    
                </div>
                <form className="space-y-6" onSubmit={hendleSubmmitlogin}>
                    <div>
                        <label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 "
                            htmlFor="email"
                        >
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                                id="email"
                                autoComplete="email"
                                onChange={(e) => {
                                    setloginuser({ ...loginuser, email: e.target.value })
                                    seterr('')
                                }}
                                required
                                type="email"
                                name="email"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 "
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setloginuser({ ...loginuser, password: e.target.value })
                                    seterr('')
                                }}
                                required
                                type="password"
                                name="password"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-center">
                            <button
                                type="button"
                                role="checkbox"
                                aria-checked={rememberMe}
                                onClick={() => handleCheckboxChange()}
                                className={`peer shrink-0 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4 rounded ${rememberMe ? 'bg-primary   text-primary-foreground' :
                                        'bg-gray-800 dark:bg-white'
                                    }`}
                                id="remember-me"
                            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg></button>
                            <input
                                aria-hidden="true"
                                tabIndex="-1"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleCheckboxChange}
                                className="hidden"
                                name="remember-me"
                            />
                            <label
                                className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 block text-sm text-gray-900 dark:text-gray-300"
                                htmlFor="remember-me"
                            >
                                Remember me
                            </label>
                        </div> */}
                        <div className="text-sm">
                            {/* <Link
                                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                href="#"
                            >
                                Forgot your password?
                            </Link> */}
                            <span
                                className=" cursor-pointer ml-2 hover:underline font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                href="#"
                                onClick={()=>hendlepagechange()}

                            >
                                Sign up
                            </span>
                        </div>
                        {err && <p className='text-red-700 px-3 font-semibold'>{ err }</p>}
                    </div>
                    <button
                        className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900"
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div > 
        </>:
    
        <>
            {/* {emailVarify ? <><div className='flex h-[100vh] w-[100vw]   justify-center items-center'>  <div className="rounded-lg border h-fit bg-white text-gray-800 shadow-sm  dark:text-gray-200 w-full max-w-md">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Verify your OTP</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter the 6-digit code sent to your email id.</p>
        </div>
        <div className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-2 relative" style={{ userSelect: 'none' }}>
              {/* <div className="flex items-center"> */}
                {/* {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e.target, index, e)}
                    className="relative flex h-10 w-10 items-center justify-center border border-gray-300 dark:border-gray-600 text-lg font-medium text-center dark:bg-gray-700 first:rounded-l-md last:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ pointerEvents: 'all' }}
                  />
                ))} */}
              {/* </div> */}
            {/* </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 h-10 px-4 py-2 w-full"
              type="submit"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div></div></>:*/}< div className = "flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 " > 
            <div className="w-full max-w-md space-y-8">
                <div>
                    {/* <img
            src="/placeholder.svg"
            alt="Acme Car Rentals"
            width="48"
            height="48"
            className="mx-auto h-12 w-auto"
            style={{ aspectRatio: '48 / 48', objectFit: 'cover' }}
          /> */}
                    <h1 className='mt-6 text-center underline text-3xl font-bold tracking-tight text-gray-900 '>Rental.X</h1>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
                        Crete a new Account
                    </h2>
                    
                </div>
                <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 "
                            htmlFor="email"
                        >
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                                id="email"
                                    autoComplete="email"
                                    onChange={(e)=>setsignupuser({...signupuser, email: e.target.value})}
                                    
                                required
                                type="email"
                                name="email"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 "
                            htmlFor="Name"
                        >
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                                id="name"
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        setsignupuser({ ...signupuser, name: e.target.value })
                                        seterr('')
                                    }}
                                required
                                type="text"
                                name="name"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 "
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                                    id="password"
                                    onChange={(e) => {
                                        setsignupuser({ ...signupuser, password: e.target.value })
                                        seterr('')
                                    }}
                                autoComplete="current-password"
                                required
                                type="password"
                                name="password"
                            />
                        </div>
                        </div>
                        
                    <div className="flex items-center justify-between">
                        
                        <div className="text-sm">
                            
                            <span
                                className=" cursor-pointer ml-2 hover:underline font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                href="#"
                                onClick={()=>hendlepagechange()}

                            >
                                Sign in
                            </span>
                            </div>
                            {err && <p className='text-red-700 px-3 font-semibold'>{ err }</p>}
                    </div>
                    <button
                        className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900"
                        type="submit"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div > 
        </>}</>
    )
    
}

export default Authentication