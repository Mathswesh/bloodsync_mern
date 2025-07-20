const express = require("express")
const router = express.Router();

const LoginController = require("../Controller/LoginController");
const AuthMiddleware = require("../Middleware/auth-middleware");

router.post("/", LoginController.loginUser)
router.get("/user", AuthMiddleware,LoginController.getuser);

router.post("/forgotpassword", LoginController.SendOTPToMail)
router.post("/verify", LoginController.verifyOTP)
router.post("/update", LoginController.updatePassword)

module.exports = router;