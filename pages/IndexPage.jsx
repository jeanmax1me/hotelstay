import axios from "axios";
import { useEffect, useState } from "react";
import  { Link } from "react-router-dom";

export default function IndexPage() {
    const [places,setPlaces] = useState([]);
   useEffect(() => {
axios.get('/places').then(response => {
    setPlaces(response.data);
});
   }, []);
   
   return (

<>

   
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
   {places.length > 0 && places.map(place => (
    <Link to={'/place/'+place._id} key={place.id} className="">
        {place.photos?.[0] && (
        <img className="rounded-2xl aspect-[1.052/1] object-cover" src={place.photos?.[0]} alt="" />)}
         <h2 className="font-bold text-gray-300 font-jakarta">{place.address}</h2>
         <h2 className="text-sm text-softblue font-arima">{place.title}</h2>
         <h2 className="font-bold font-jakarta">€ {place.price} <span className="font-normal font-jakarta">per night</span></h2>       
         </Link> 
   ))}
</div>
</>
    );
}