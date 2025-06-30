const express = require("express")
const router = express.Router();
const userregistration = require("../Controller/UserRegistrationController")
const Authmiddleware = require('../Middleware/auth-middleware')

router.post("/adduserregister",userregistration.adduserregister)
router.get("/getuserdashboarddata",Authmiddleware,userregistration.getuserdashboarddata)

module.exports = router