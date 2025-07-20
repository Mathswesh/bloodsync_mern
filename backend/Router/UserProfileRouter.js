const express = require("express")
const UserProfileController = require("../Controller/UserProfleController")
const AuthMiddleware = require("../Middleware/auth-middleware");

const router = express.Router();

router.post("/addprofile",UserProfileController.AddProfile)
router.get("/getprofile",AuthMiddleware,UserProfileController.getAllProfile)
// router.put('/updateprofile',AuthMiddleware,UserProfileController.userprofileupdate)

module.exports = router