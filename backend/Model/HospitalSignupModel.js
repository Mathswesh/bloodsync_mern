const mongoose = require("mongoose")
const schema = mongoose.Schema;

const SignupSchema = new schema({
    hname:{
        type: String,
        required:true,
    },
    haddress:{
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    contact:{
        type: String,
        required:true,
    },
    longitude:{
        type:String,
        required:true,
    },
    latitude:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("HospitalSignup", SignupSchema);