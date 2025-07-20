const express = require("express")
const router = express.Router();
const landingpagecontroller = require("../Controller/LandingpageController");

router.get("/data",landingpagecontroller.getdata)

module.exports = router;