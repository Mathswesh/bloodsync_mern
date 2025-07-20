const express = require("express")
const router = express.Router();

const AuthMiddleware = require("../Middleware/auth-middleware");
const Hospitaldonaterlist = require('../Controller/HospitalDonaterlistController')

router.get("/getdonater", AuthMiddleware ,Hospitaldonaterlist.getAllDonaterlist)

module.exports = router;