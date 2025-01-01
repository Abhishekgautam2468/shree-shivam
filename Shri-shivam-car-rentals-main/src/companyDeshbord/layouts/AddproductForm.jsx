import axios from 'axios';
import React, { useState } from 'react';
import Dropdwon from '../../component/dropdown/Dropdwon';
import Preview from './Preview';
import { createClient } from '@supabase/supabase-js'
import { ClipLoader } from 'react-spinners'; 
import { json, useNavigate } from 'react-router-dom';
import { supabaseUrl, supabaseKey } from '../../config';




const supabase = createClient(supabaseUrl, supabaseKey)

function AddNewCar() {
  const [uploading, setuploading] = useState(false)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    car_no: '',
    seats: '',
    hour_rate: '',
    late_hour_rate: '',
      description: '',
    subtitle: '',
    img: [''],
    token: JSON.parse(localStorage.getItem('Owner')).token,
    headings: [''],
    descriptions: [''],
  });
  const [image,setimage] = useState([])
    
    const [isOpen, setisOpen] = useState(false);
    const toggleclick = () => {
        setisOpen(!isOpen);
        console.log(true)
    }



  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleKeyPointerChange = (index, value) => {
    const newKeyPointers = [...formData.keyPointers];
    newKeyPointers[index] = value;
    setFormData((prevFormData) => ({ ...prevFormData, keyPointers: newKeyPointers }));
    };
    const handleDeleteHeadingAndDescription = (index) => {
        const newHeadings = [...formData.headings];
        newHeadings.splice(index, 1);
        const newDescriptions = [...formData.descriptions];
        newDescriptions.splice(index, 1);
        setFormData((prevFormData) => ({
          ...prevFormData,
          headings: newHeadings,
          descriptions: newDescriptions,
        }));
      };

  const handleHeadingChange = (index, value) => {
    const newHeadings = [...formData.headings];
    newHeadings[index] = value;
    setFormData((prevFormData) => ({ ...prevFormData, headings: newHeadings }));
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...formData.descriptions];
    newDescriptions[index] = value;
    setFormData((prevFormData) => ({ ...prevFormData, descriptions: newDescriptions }));
  };

  const handleAddKeyPointer = () => {
    if (formData.keyPointers.length < 8) {
      setFormData((prevFormData) => ({ ...prevFormData, keyPointers: [...prevFormData.keyPointers, ''] }));
    }
  };

  const handleAddHeadingAndDescription = () => {
    if (formData.headings.length < 8 && formData.descriptions.length < 8) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        headings: [...prevFormData.headings, ''],
        descriptions: [...prevFormData.descriptions, ''],
      }));
    }
    };
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const img = imageFiles
    
    const uploadimg = []
    if (img.length > 0) {
    
      toggleUploading()
      
      for (const element of img) {

      try {
        const { data, error } = await supabase.storage.from('car_image').upload('car_image/' + element.name, element);
        if (error) {
          console.log('msg:'+ error.message);
          
        }
        
          const imgurl = `${supabaseUrl}/storage/v1/object/public/car_image/car_image/${element.name}`;
          console.log('Image URL:', imgurl);
        uploadimg.push(imgurl);
        console.log(uploadimg)
       
        
      } catch (err) {
        console.error('Unexpected error:', err);
        toggleUploading()

        
      }
    }

    axios.post("https://shishicr.onrender.com/api/cars", { ...formData, img : uploadimg  }).then((res) => {
      navigate("/company_deshbord")
    }).catch((err) => {
      setuploading(false)
      
      alert(err.response.data.error);

    });
    
    }else alert("please select img")


    
    
    
  }
  const toggleUploading = () => {
    setuploading(!uploading)
  }

  if(uploading)  return (
    <>
      <div className='flex flex-col  h-[100vh] w-[100vw] items-center justify-center'>
        <ClipLoader color={"#123abc"} loading={uploading} size={50} />
        
        <h1 className='mt-4'>don't refress the page from is  </h1>
        uploading...
      </div>
    </>
  )
  
 
  

    
    

  return (
    <div className="rounded-lg bg-card text-card-foreground shadow-sm w-full mx-auto mt-10">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Add New Car</h3>
        <p className="text-sm text-muted-foreground">Fill out the form to add a new car to the rental fleet.</p>
      </div>
      <div className="p-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="make"
              >
                Company
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="make"
                placeholder="Enter the car company"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="model"
              >
                Model
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="model"
                placeholder="Enter the car model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>
            <div className="space-y-2 ">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="subtitle"
              >
                Sub-title
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="subtitle"
                placeholder="Enter the car Subtitle"
                value={formData.subtitle}
              onChange={handleChange}
              required
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="car_no"
              >
                Car number
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="car_no"
                          type='text'
                placeholder="Enter the car number"
                value={formData.car_no}
              onChange={handleChange}
              required
              /></div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="year"
              >
                Year
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="year"
                placeholder="Manufacture on"
                              type="number"
                              min={0}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="color"
              >
                Color
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="color"
                placeholder="Enter the car color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="seats"
              >
                Seats
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="seats"
                placeholder="Enter the number of seats"
                type="number"
                value={formData.seats}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="rate"
              >
                hourly Rental Rate
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="hour_rate"
                placeholder="Enter the hourly rental rate"
                type="number"
                value={formData.hour_rate}
                onChange={handleChange}
                required
              />
                      </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="rate"
              >
                late hourly Rental Rate
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="late_hour_rate"
                placeholder="Enter the late hourly rental rate"
                              type="number"
                              min={0}
                value={formData.late_hour_rate}
                onChange={handleChange}
                required
              />
                      </div>
                      
            <div className="space-y-2 ">
              <label
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="image"
              >
                Car Images
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="image"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="flex min-h-[80px]  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="description"
              placeholder="Enter a description of the car"
              value={formData.description}
              onChange={handleChange}
              required
                      ></textarea>
                      
                     
                  </div>
                  <div className="grid  gap-4">
            <label
                className="text-sm text-[1rem]  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
               
            >
                Add key-pointers
              </label>
            {formData.headings.map((heading, index) => (
              <div key={index} className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={`heading-${index}`}
                >
                  Heading {index + 1}
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id={`heading-${index}`}
                  placeholder={`Enter heading ${index + 1}`}
                  value={heading}
                  onChange={(e) => handleHeadingChange(index, e.target.value)}
                  required
                />
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={`description-${index}`}
                >
                  Description {index + 1}
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id={`description-${index}`}
                  placeholder={`Enter description ${index + 1}`}
                  value={formData.descriptions[index]}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                ></textarea>
              </div>
            ))}
                  </div>
                  <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddHeadingAndDescription}
              className="inline-flex items-center justify-center whitespace-nowrap hover:bg-gray-200 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Add Heading and Description
            </button>
            <button
              type="button"
              onClick={handleDeleteHeadingAndDescription}
              className="inline-flex items-center justify-center whitespace-nowrap hover:bg-gray-200 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Delete Heading and Description
            </button>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap hover:bg-gray-200 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"         
              type='submit'
            >
              Upload
            </button>
          </div>
          
          
          
        </form>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap hover:bg-gray-200 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"        
                onClick={()=>toggleclick()}
                      >
              Preview
            </button>
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Uploaded Images</h4>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {uploadedImages.map((src, index) => (
              <div key={index} className="relative w-full pb-[75%]">
                <img
                  src={src}
                  alt={`Car ${index + 1}`}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-[#ffffff6f] w-8 h-8 text-white rounded-full p-1 hover:bg-[#ffffff75]"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
                  {isOpen && <>
                      <h1 className='text-[1.5rem] font-semibold'>Preview</h1>
                      <Preview product={formData} uploadedImages={ uploadedImages} /></>}
        </div>
      </div>
    </div>
  );
}

export default AddNewCar;
