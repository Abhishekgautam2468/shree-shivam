import axios from 'axios';
import React, { useState } from 'react';
import Dropdwon from '../../component/dropdown/Dropdwon';
import Preview from './Preview';
import { createClient } from '@supabase/supabase-js'
import { ClipLoader } from 'react-spinners'; 
import { useNavigate } from 'react-router-dom';
import Offercard from '../../component/layout/offers/Offercard';
import { supabaseUrl, supabaseKey } from '../../config';





const supabase = createClient(supabaseUrl, supabaseKey)

function Offer() {
    const navigate = useNavigate()
    const [uploading, setuploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    const [formData,setFormData] = useState({
        title: '',
        
        subtitle:'',
      percentage: null,
        minPrice: null,
        name:'',
        image: '',
        code:''
    })
    const [image,setimage]= useState()
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
        // console.log(formData)
    };
    // console.log(uploadedImages)
    const handleImageChange = (event) => {
        const files = event.target.files[0];
        setimage(files)
        if (files) {
            const imageUrl = URL.createObjectURL(files);
            // console.log(imageUrl);
            setUploadedImages([imageUrl]);
          }
        
  };
  
    // console.log(image)
    const handleSubmit = async (event) => {
        event.preventDefault();
        toggleUploading()
        
        const img = image
        
      const uploadimg = []
      
        
        
    
          try {
            const { data, error } = await supabase.storage.from('car_image').upload('car_image/' + img.name, img);
            if (error) {
              alert('msg:'+ error.message);
              
            }
            
            const imgurl = `${supabaseUrl}/storage/v1/object/public/car_image/car_image/${img.name}`;
            // console.log('Image URL:', imgurl);
            uploadimg.push(imgurl)
            
              
            // console.log(uploadimg)
           
            
          } catch (err) {
            console.error('Unexpected error:', err);
            toggleUploading()
    
            
          }
        
    
        axios.post("https://shishicr.onrender.com/api/offer", { ...formData, image : uploadimg[0] , token: JSON.parse(localStorage.getItem('Owner')).token }).then((res) => {
          navigate("/company_deshbord")
        }).catch((err) => {
          toggleUploading()
          alert(err.message);
        });
        
        
    
    
        
        
        
      }
      const toggleUploading = () => {
        setuploading(!uploading)
      }
  const hendlefrom = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
  const toggleisOpen = (e) => {
       
        setIsOpen(!isOpen)
      }
    return (
        <div className="rounded-lg bg-card text-card-foreground shadow-sm w-full mx-auto mt-10">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Add New Car</h3>
        <p className="text-sm text-muted-foreground">Fill out the form to add a new car to the rental fleet.</p>
            </div>
            <div className="p-6">
        <form className="grid gap-6" onSubmit={hendlefrom} >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                placeholder="Enter the offer name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>  
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Title
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="title"
                placeholder="Enter the offer title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>  
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Subtitle
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="subtitle"
                placeholder="Enter the offer title"
                value={formData.subtitle}
                onChange={handleChange}
                required
              />
            </div>  
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Minimum price
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="minPrice"
                placeholder="Enter the offer description"
                value={formData.minPrice}
                onChange={handleChange}
                required
                />
                
            </div>  
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Percentage
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="percentage"
                                type='Number'
                placeholder="Enter the offer description"
                                value={formData.percentage}
                                min={1}
                                max={99}
                onChange={handleChange}
                required
              />
            </div>  
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Code
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="code"
                                type='text'
                placeholder="Enter the offer description"
                                value={formData.code}
                                min={1}
                                max={99}
                onChange={handleChange}
                required
              />
            </div>  
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Image
              </label>
              <input
               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="code"
                                type='file'
                                accept="image/*"
                placeholder="Enter the offer description"
                                
                                min={1}
                                max={99}
                onChange={(e)=> handleImageChange(e)}
                required
              />
                        </div>
            <div className="space-y-2 ">
             <div className='h-full w-full flex items-end justify-center '> <button className='bg-gray-900 font-semibold w-full p-2 text-white rounded-md hover:bg-gray-700' type='submit'>Preview</button></div>
                        </div>
                        
            </div>  </form>
            </div>  
        <Dropdwon isOpen={isOpen} close={() => toggleisOpen()} title="preview"> <div className='flex justify-center py-5'><Offercard item={formData} image={uploadedImages} />
        </div>
          <button className='bg-gray-900 w-full p-3   text-white rounded-md hover:bg-gray-800' onClick={handleSubmit}>Submit</button>
           </Dropdwon>
      </div>
  )
}

export default Offer;
