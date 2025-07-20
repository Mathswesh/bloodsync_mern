const mongoose = require("mongoose");

const UserRegistrationSchema = new mongoose.Schema({
    
    eventid: { type: mongoose.Schema.Types.ObjectId, required: true },
    eventhospitalid: { type: mongoose.Schema.Types.ObjectId, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, required: true },

}, { timestamps: true });

module.exports = mongoose.model("UserRegistration", UserRegistrationSchema);