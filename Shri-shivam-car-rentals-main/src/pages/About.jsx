import React from 'react'
import Navbar from '../component/layout/navbar/Navbar'


const About = () => {
    const user = JSON.parse(localStorage.getItem('User'))
  return (
    <div className="flex flex-col min-h-screen">
    <div className="fixed bg-[#e5e6e8] z-20">
        <Navbar user={user} />
      </div>
    <main className="flex-1">
      <section className="w-full py-12 md:py-24   flex justify-center lg:py-32 xl:py-48">
        <div className="container   px-4 md:px-6">
          <div className="grid   gap-6  lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col  justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover the Joy of Driving with Acme Car Rentals
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  At Acme Car Rentals, we're dedicated to providing you with a seamless and enjoyable car rental experience. Our mission is to make it easy for you to explore the world around you, whether you're traveling for business or pleasure.
                </p>
              </div>
            </div>
            <img
              src="https://www.motortrend.com/uploads/2023/10/2024-Nissan-Versa-SR-front-view-29.jpg?w=768&width=768&q=75&format=webp"
              alt="Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              width="550"
              height="550"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 flex justify-center md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                Why Choose Acme?
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Exceptional Service, Unbeatable Prices</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At Acme Car Rentals, we pride ourselves on offering a wide selection of well-maintained vehicles, competitive pricing, and exceptional customer service. Our goal is to make your car rental experience as seamless and enjoyable as possible.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center  gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="https://wallpaperaccess.com/full/33139.jpg"
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              width="550"
              height="310"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Wide Selection</h3>
                    <p className="text-gray-500">
                      Choose from a wide variety of well-maintained vehicles, including sedans, SUVs, and luxury cars.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Competitive Pricing</h3>
                    <p className="text-gray-500">
                      Enjoy our competitive rates and flexible rental options to fit your budget.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Exceptional Service</h3>
                    <p className="text-gray-500">
                      Our friendly and knowledgeable staff are dedicated to ensuring your rental experience is seamless and hassle-free.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center  py-12 md:py-24 lg:py-32">
        <div className="container  flex justify-center text-center px-4 md:px-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Get in Touch with Acme Car Rentals
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a question or need more information? Fill out the form below and one of our team members will be in touch with you shortly.
              </p>
            </div>
            <form className="grid grid-row-1  gap-4  ">
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                id="name"
                placeholder="Name"
                type="text"
              />
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                id="email"
                placeholder="Email"
                type="email"
              />
              <textarea
                className="flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                id="message"
                placeholder="Message"
                rows="4"
              ></textarea>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-black text-white"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Our Fleet
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our wide selection of vehicles to find the perfect car for your needs.
            </p>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example Car Card */}
              <div className="flex flex-col justify-center  items-center bg-white rounded-lg shadow-md">
                <img src="https://i2.wp.com/www.motoringexposure.com/wp-content/uploads/2017/07/red-bmw-f80-m3-brixton-forged-pf5-duo-series-forged-wheels-concave-20-brushed-smoke-black-12-1800x1200.jpg?resize=1000%2C667&ssl=1" alt="Car" className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Luxury Sedan</h3>
                  <p className="text-gray-500">Comfortable and stylish sedan for city driving.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center  items-center bg-white rounded-lg shadow-md">
                <img src="https://i2.wp.com/www.motoringexposure.com/wp-content/uploads/2017/07/red-bmw-f80-m3-brixton-forged-pf5-duo-series-forged-wheels-concave-20-brushed-smoke-black-12-1800x1200.jpg?resize=1000%2C667&ssl=1" alt="Car" className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Luxury Sedan</h3>
                  <p className="text-gray-500">Comfortable and stylish sedan for city driving.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center  items-center bg-white rounded-lg shadow-md">
                <img src="https://i2.wp.com/www.motoringexposure.com/wp-content/uploads/2017/07/red-bmw-f80-m3-brixton-forged-pf5-duo-series-forged-wheels-concave-20-brushed-smoke-black-12-1800x1200.jpg?resize=1000%2C667&ssl=1" alt="Car" className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Luxury Sedan</h3>
                  <p className="text-gray-500">Comfortable and stylish sedan for city driving.</p>
                </div>
              </div>
              {/* Repeat for other cars */}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Testimonials
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear what our satisfied customers have to say about their experience with Acme Car Rentals.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example Testimonial Card */}
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <p className="text-gray-500">"Great service and excellent cars. Highly recommend!"</p>
                <span className="mt-4 text-sm font-medium">- Jane Doe</span>
              </div>
              {/* Repeat for other testimonials */}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our services.
            </p>
            <div className="space-y-4">
              {/* Example FAQ */}
              <div className="text-left bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-bold">What is the minimum rental period?</h3>
                <p className="text-gray-500">The minimum rental period is 24 hours.</p>
              </div>
              {/* Repeat for other FAQs */}
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">© 2024 Acme Car Rentals. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a className="text-xs hover:underline underline-offset-4" href="#" rel="ugc">
          Terms of Service
        </a>
        <a className="text-xs hover:underline underline-offset-4" href="#" rel="ugc">
          Privacy
        </a>
      </nav>
    </footer>
  </div>
  )
}

export default About