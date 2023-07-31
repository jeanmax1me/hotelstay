import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BookingConfirmation from "./BookingConfirmation";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router-dom"
import { UserContext } from "./src/UserContext";

const BookingWidget = ({
    placeId,
    pricePerNight,
    cleaningFee,
    serviceFee,
}) => {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bookingSuccessful, setBookingSuccessful] = useState(false);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);
    
    const numberOfNights = Math.max(
        Math.round(Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / oneDay)),
        1
    );
    const navigate = useNavigate();
    const subtotal = pricePerNight * numberOfNights;
    const total = subtotal + cleaningFee + serviceFee;
    const today = new Date().toISOString().split("T")[0];

    const handleBookingSuccess = () => {
        setBookingSuccessful(true);
        setTimeout(() => {
            setBookingSuccessful(false);
            navigate("/account/bookings/");
          }, 3000); 
        };

    const handleReservation = () => {
        const reservationData = {
            place: placeId,
            checkInDate,
            checkOutDate,
            name,
            phone,
            totalPrice: total,
        };
        axios.post("/booking", reservationData)
            .then((response) => {
                console.log("Reservation successful!", response.data);
            })
            .catch((error) => {
                console.error("Error occurred during reservation:", error);
            });
    };

    const handleOnClick = () => {
        handleReservation();
        handleBookingSuccess();
    }


    return (
        <div className="booking-widget">
            <div className="price-per-night">Price per night: €{pricePerNight}</div>
            <div className="checkin-checkout">
                Check-in:
                <input
                    type="date"
                    value={checkInDate}
                    min={today} 
                    onChange={(e) => setCheckInDate(e.target.value)}
                />
                <br />
                Check-out:
                <input
                    type="date"
                    value={checkOutDate}
                    min={today}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />
            </div>
            <div className="guest-name">Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /> </div>
            <div className="guest-phone">Phone Number:
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /> </div>
            <button className="reserve-button" onClick={handleOnClick}>Reserve</button>
            <div className="not-charged text-center">You won&apos;t be charged</div>
            <div className="price-details">
                <div>
                    Price x {numberOfNights} night{numberOfNights > 1 ? "s" : ""}: €{subtotal}
                </div>
                <div>Cleaning Fee: +€{cleaningFee}</div>
                <div>Service Fee: +€{serviceFee}</div>
                <div className="total-sum">
                    Total Sum: <strong>€{total}</strong>
                </div>
            </div>
            {bookingSuccessful && <BookingConfirmation />}
      {bookingSuccessful && <Backdrop />}
        </div>
    );
};


BookingWidget.propTypes = {
    placeId: PropTypes.string.isRequired,
    pricePerNight: PropTypes.number.isRequired,
    numberOfGuests: PropTypes.number.isRequired,
    cleaningFee: PropTypes.number.isRequired,
    serviceFee: PropTypes.number.isRequired,
};

export default BookingWidget;
