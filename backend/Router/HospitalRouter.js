const express = require("express")
const router = express.Router();
const validation = require("../Middleware/zodMiddleware")
const signupValidation = require("../Util/SignUpValidation")
const hospitalController = require("../Controller/HospitalController");
const AuthMiddleware = require("../Middleware/auth-middleware");

router.post("/signup", validation.UserValidation(signupValidation), hospitalController.AddUser)
router.get("/get", hospitalController.getAllUser)
router.put("/update", hospitalController.UpdateDetails)
router.delete("/delete", hospitalController.deleteUser);

// ---------------------------------------------------------------------------------------------

router.post('/signin',hospitalController.loginHospital)
router.get("/hospital", AuthMiddleware,hospitalController.getHospital);

module.exports = router;
