const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password:{ type: String, required: true },
    fullname:{ type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    registerDate: { type: Date, default: new Date() },
    numberOfTrips:{ type: Number, required: false },
    numberOfKms: { type: Number, required: false },
    avatar: {type:String},
    isActive: { type: Boolean, default: true },
});

const User = mongoose.model('User', userSchema);


module.exports = {
    userSchema, User
}