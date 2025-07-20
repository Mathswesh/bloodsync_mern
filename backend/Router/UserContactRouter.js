const express = require("express")
const usercontactform = require("../Controller/UserContactFormController")
const router = express.Router();

router.post("/",usercontactform.addcontactform)
router.get("/",usercontactform.getcontactform)

module.exports = router