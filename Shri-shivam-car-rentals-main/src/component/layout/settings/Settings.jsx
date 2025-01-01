import React, { useEffect, useState } from 'react'
import Dropdwon from '../../dropdown/Dropdwon';
import AddressForm from '../adressform/AddressForm';
import axios from 'axios';



const Settings = (e) => {
   

    const [personalInfo, setpersonalInfo] = useState(false);
    const togglepersnolInfo = () => {
        setpersonalInfo(!personalInfo);
    }
    const [AddressBox, setAddressBox] = useState(false);
    const toggleAddressBox = () => {
        setAddressBox(!AddressBox);
    }
    const [personalInfoEditsName, setpersonalInfoEditsName] = useState(e.user.user_name)
    const [personalInfoEditsEmail, setpersonalInfoEditsEmail] = useState(e.user.user_email)

    const [Address, setAddress] = useState([])
    useEffect(() => {
        const fatch = () => {
            axios.post('https://shishicr.onrender.com/api/address/user-address', { token: e.user.token }).then((res) => {
                setAddress(res.data.address)
            }).catch((err) => {
                alert(err)
            })
        }
        fatch()
    }, [])
    // console.log(Address)
    
    
    

   
    return (
        <div className='overview flex p-10 w-full md:w-[80vw] flex-col  md:overflow-y-scroll flex-nowrap md:flex-wrap md:max-h-[100vh] scroll-hidden   md:flex-row  gap-3 lg:gap-6'>
            <div className=" mx-auto p-4 w-full bg-white shadow-md rounded-lg">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center">
                        <img
                            className="w-16 h-16 rounded-full mr-4"
                            src={e.user.user_profile}
                            alt="Profile"
                        />
                        <div>
                            <h2 className="text-xl font-semibold uppercase" >{e.user.user_name}</h2>
                            <p className="text-sm text-gray-600">{e.user.user_email}</p>
                            <p className="text-sm text-gray-600">Leeds, United Kingdom</p>
                        </div>
                    </div>
                    {/* <button className="text-blue-500 hover:underline">Edit</button> */}
                </div>

                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <p className="mt-1 text-gray-900 uppercase">{e.user.user_name}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <p className="mt-1 text-gray-900">{e.user.user_email}</p>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">AddressB/label>
                            <p className="mt-1 text-gray-900">{e.user.user_no ? e.user.user_no : <><a  className='text-blue-500 hover:underline' onClick={toggleAddressBox}>Add AddressB/a></>}</p>


                        </div> */}

                    </div>
                    {/* <button className="mt-4 text-blue-500 hover:underline" onClick={togglepersnolInfo}>Edit</button> */}
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold">Address</h3>
                    {Address && Address.map((item,key)=>{return(<div key={key} className="mt-4 border-b py-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <p className="mt-1 text-gray-900">{item.country}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <p className="mt-1 text-gray-900">{item.state}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">city</label>
                            <p className="mt-1 text-gray-900">{item.city}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                            <p className="mt-1 text-gray-900">{item.streetAddress } |   {item.postalCode}</p>
                        </div>
                        
                    </div>)})}
                    {e.user.user_address && <button className="mt-4 text-blue-500 hover:underline">Edit</button>}
                    { Address.length <= 5 && <button className="mt-4 text-blue-500 hover:underline" onClick={toggleAddressBox} >Add new address</button>}
                </div>
                {personalInfo &&  <Dropdwon isOpen={personalInfo} close={togglepersnolInfo} title="personal info" >
                    <div class="p-6 space-y-4">
                        <div class="space-y-2 w-[50vw]">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="name"
                            >
                                Name
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="name"
                                value={personalInfoEditsName}
                                onChange={(T) => setpersonalInfoEditsName(T.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="email"
                            >
                                Email <span className='text-[red] ml-2'>*Not changable*</span>
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="email"
                                placeholder="Enter your email"
                                type="email"
                                value={personalInfoEditsEmail}
                                readOnly
                            />
                        </div>

                        
                    </div>
                    <div class="flex items-center p-6 gap-2">
                        <button className='w-full bg-[#0000000b] h-12 flex items-center justify-center rounded-md hover:scale-[0.9]  uppercase hover:text-black text-[#0000007e]' style={{ transition: "all ease 0.2s" }} >
                            Change password
                        </button>
                        <button className='w-full bg-[#0000000b] h-12 flex items-center justify-center rounded-md hover:scale-[0.9]  uppercase hover:text-black text-[#0000007e]' style={{ transition: "all ease 0.2s" }} >
                            Save changes
                        </button>
                    </div>
                </Dropdwon> }
                {AddressBox   && <Dropdwon isOpen={AddressBox} close={toggleAddressBox} title="Add Address" >
                    <AddressForm user={e.user} close={toggleAddressBox } />
                </Dropdwon>}

            </div>
        </div>
    )
}

export default Settings