import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {


  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return null; 

  


  return (
    <div className="mt-4 bg-softgray -mx-8 px-8 pt-8 font-jakarta rounded-2xl">
      <h2 className="text-3xl text-softblue font-arima">{place.title}</h2>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl text-softblue font-arima">Description</h2>
            {place.description}
          </div>
          <div className="grid grid-cols-2 italic text-slate-200">
          Check-in: {place.checkIn}  <br />
          Check-out :{place.checkOut} <br />
           Max number of guests: {place.maxGuests} <br />
      {place.perks.length > 0 && (
        <div>
          <ul className="mt-2 text-sm text-white leading-5">
            {place.perks.map((perk) => (
              <li key={perk} className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      )}
        </div>
       
        </div>
        <div className="flex pricingContainer max-w-xl min-w-xl bg-softgray">
        <BookingWidget
          placeId={place._id}
          pricePerNight={place.price} // Pass the correct price from the database
          checkInDate={place.checkIn}
          checkOutDate={place.checkOut}
          numberOfGuests={place.maxGuests}
          cleaningFee={20} 
          serviceFee={25} 
        />
        </div>
      </div>
      <div className="bg-softgray -mx-8 px-8 py-8 border-t">
       
        <div>
          <h2 className="font-semibold text-2xl text-softblue font-arima">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-white leading-5">{place.extraInfo}</div>
        <div>
   
        </div>
      </div>
    </div>
  );
}