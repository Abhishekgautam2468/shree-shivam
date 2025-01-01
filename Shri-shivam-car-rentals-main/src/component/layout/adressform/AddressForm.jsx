import axios from 'axios';
import React, { useEffect, useState } from 'react';

const countries = {
    India: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
    USA: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
    Canada: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"],
    Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Australian Capital Territory", "Northern Territory"],
    United_Kingdom: ["England", "Scotland", "Wales", "Northern Ireland"],
    Germany: ["Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"],
    France: ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"],
    China: ["Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan", "Inner Mongolia", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Ningxia", "Qinghai", "Shaanxi", "Shandong", "Shanghai", "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"],
    Brazil: ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"],
    Japan: ["Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gunma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"]
  
};

const AddressForm = (e) => {
    const user = e.user;
    // console.log(user,"uuuuuuuuu")

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    streetAddress: '',
    phoneNumber: '',
    email:''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
  
    if (id === 'country') {
      setFormData({
        ...formData,
        country: value,
        state: '',
        city: '',
        postalCode: '',
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  }
  useEffect(()=>{setFormData({ ...formData, email: user.user_email })},[])
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      //   console.log(user)
      //   console.log(formData)
      axios.post("https://shishicr.onrender.com/api/address", { ...formData, email: user.user_email, token: user.token }).then((res) => {
        alert("adress updated")
        window.location.reload()
      }).catch((err) => {
        alert(err)
      })
      
    } 
      catch (err) {
          alert(err)
      }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg overflow-scroll h-[70vh]    w-[70vw] scroll-hidden ">
     
      <div className="p-6 space-y-4 ">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="name">
            Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
              </div>
              <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="Number"
            id="phoneNumber"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      min={1000000000}
                      max={10000000000}
            
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="country">
            Country
          </label>
          <select
            id="country"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.country}
                      onChange={handleChange}
                      required
          >
            <option value="">Select country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="state">
            State
          </label>
          <select
            id="state"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.state}
            onChange={handleChange}
                      disabled={!formData.country}
                      required
          >
            <option value="">Select state</option>
            {formData.country &&
              countries[formData.country].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Select city"
            value={formData.city}
                      onChange={handleChange}
                      required
            disabled={!formData.state}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="postalCode">
            Postal Code
          </label>
          <input
            type="Number"
            id="postalCode"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter postal code"
            value={formData.postalCode}
                      onChange={handleChange}
                      min={100000}
                      max={999999}
                      required
            disabled={!formData.state}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="streetAddress">
            Street Address
          </label>
          <textarea
            id="streetAddress"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter your street address"
            value={formData.streetAddress}
            onChange={handleChange}
                      disabled={!formData.state}
                      required
          />
        </div>
        
      </div>
      <div className="flex items-center p-6">
      <button className='w-full bg-[#0000000b] h-12 flex items-center justify-center rounded-md hover:scale-[0.9]  uppercase hover:text-black text-[#0000007e]' style={{transition: "all ease 0.2s"}} type='submit'>
                                       save
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
