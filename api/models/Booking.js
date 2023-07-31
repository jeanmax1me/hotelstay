const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    user: {type: mongoose.Schema.Types.ObjectId, required:true},
    checkInDate: {type:Date, required:true},
    checkOutDate: {type:Date, required:true},
    name: {type:String, required:true},
    phone: {type:String, required:true},
    totalPrice: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;