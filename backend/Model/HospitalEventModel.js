const mongoose = require('mongoose');

const HospitalEventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
  },
  eventdate: {
    type: Date,
    required: true,
  },
  eventtime: {
    type: String,
    required: true,
  },
  eventend: {
    type: String,
    required: true,
  },
  eventdescription: {
    type: String,
    required: true,
  },
  hname: {
    type: String,
    required: true,
  },
  haddress: {
    type: String,
    required: true,
  },
  id: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital', // Assuming 'Hospital' is another model
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('HospitalEvent', HospitalEventSchema);
