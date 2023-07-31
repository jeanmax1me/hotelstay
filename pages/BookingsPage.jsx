import { useEffect, useState } from "react";
import axios from "axios";
import PlacePhotos from "../src/PlacePhotos";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);
    return (

        <div className="mt-16">
            {bookings?.length > 0 && bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex cursor-pointer mb-4 bg-softgray p-4 rounded-2xl">

                    <div className="rounded-2xl">
                        <PlacePhotos place={booking.place}
                        />
                    </div>
                    <div className="flex-col ml-5">
                        <h2 className="text-xl text-softblue font-arima">{booking.place.title}</h2>
                        <BookingDates booking={booking}
                        />
                        <p className="font-jakarta mt-2">Check-in: {booking.place.checkIn}</p>
                        <p className="font-jakarta">Check-out: {booking.place.checkOut} </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <h3 className="font-bold mt-2 font-jakarta">Price ${booking.totalPrice}</h3>
                    </div>
                </Link>
            ))}
        </div>
    )}