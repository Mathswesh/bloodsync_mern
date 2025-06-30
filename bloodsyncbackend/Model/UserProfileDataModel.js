const mongoose = require("mongoose")
const schema = mongoose.Schema;

const ProfileSchema = new schema(
    {
        userid: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        },
        useremail: {
            type: String,
            required: true,
        },
        useraddress: {
            type: String,
            required: true
        },
        userage: {
            type: Number,
            required: true
        },
        usergender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },
        userphone: {
            type: String,
            required: true
        },
        userbloodType: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "No"],
            required: true
        },
        userallergies: {
            type: String,
            required: true
        },
        userheight: {
            type: String,
            required: true
        },
        userweight: {
            type: String,
            required: true
        },
        uservaccinationStatus: {
            type: String,
            enum: ["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated"],
            required: true
        },
        usersmokingStatus: {
            type: String,
            enum: ["Yes", "No"],
            required: true
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model("UserProfile", ProfileSchema)