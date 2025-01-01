import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Preview = (e) => {
    // console.log(e.product.headings)
    const images = e.uploadedImages.length !== 0 ? e.uploadedImages : ["https://via.placeholder.com/600x400","https://via.placeholder.com/600x400?text=Image+2"]
    
      return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 ">
          
          <main className="flex-grow">
            <section className="container mx-auto px-4 md:px-6 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex justify-center">
                  <Carousel 
                    showArrows={true} 
                    autoPlay={true} 
                    infiniteLoop={true} 
                    showThumbs={false} 
                                  className="w-full"
                    
                  >
                    {images.map((src, index) => (
                      <div key={index}>
                        <img src={src} alt={`Car ${index + 1}`} className="w-full h-auto rounded-lg" />
                      </div>
                    ))}
                  </Carousel>
                          </div>
                          
                                  
                <div>
                              <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl">{ e.product.model ? e.product.model : "#Model"} <span className='text-gray-400 text-[1rem] ' style={{letterSpacing:"2px"}}>{ e.product.year ? e.product.year : "#Year"}</span></h2>
                  <p className="mt-4 text-gray-500 ">
                                  {e.product.subtitle ? e.product.subtitle : "#Subtitle"} 

                              </p>
                              <p className='mt-3'>{e.product.color ? e.product.color : "#Car no"}</p>
                              
                            
                              <h1 className='text-[1.5rem] mt-3 font-semibold'>Rs. {e.product.hour_rate  ? e.product.hour_rate  : "#hour rate "}/- </h1>
                              <p className='text-gray-400'>Per hour rent</p>
                            <button className='text-white bg-gray-800 hover:bg-gray-700 mt-4 w-full p-4 py-3 rounded-md'>Book Now</button>

                </div>
                             
              </div>
                      <div className='mt-10'>
                          <div className="mt-12 mb-10">
                              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">Specifications</h2>
                              <br />
                              {e.product.headings.map((item, ind) => {
                                  return <div className='mt-2' key={ind}>
                                  <h3 className="text-lg font-bold uppercase"><li>{item}</li></h3>
                                  <p className="text-gray-500 dark:text-gray-400 ">
                                          {e.product.descriptions[ind] ? e.product.descriptions[ind] : "Description"}

                                  </p>
                                </div>
                                  
                              })}
                      </div>
                          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex">Seats: <span><p className='  ml-2'> {e.product.seats  ? e.product.seats  : "#seats"}</p></span></h2>
                          
                              
                          </div>       
                          <div className='mt-10'>
                          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">Color : <span className=' mt-2 '>{e.product.color  ? e.product.color  : "#color"}</span></h2>
                          
                              <p > </p>
                          </div>       
                          <div className='mt-10'>
                          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">Description</h2>
                          <br />
                              <p className='text-gray-300'> {e.product.description  ? e.product.description  : "#description"}</p>
                          </div>       
              
                  <button className='text-white bg-gray-800 hover:bg-gray-700 mt-4 w-full p-4 py-3 rounded-md'>Book Now</button>
                  </section>
          </main>
          
        </div>
      );
}

export default Preview