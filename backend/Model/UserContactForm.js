const mongoose = require("mongoose")
const schema = mongoose.Schema;

const Usercontactform = new schema({
    username:{
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("usercontactform", Usercontactform);