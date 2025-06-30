const express = require("express")
const router = express.Router();
const hospitalEventController = require("../Controller/HospitalEventController");
const AuthMiddleware = require("../Middleware/auth-middleware");

router.post("/addevent", hospitalEventController.addEvent)
router.get("/getevent", AuthMiddleware,hospitalEventController.getEvent)
router.post("/getdistance",hospitalEventController.calculateAndStoreDistances)
router.get("/geteventlist", AuthMiddleware,hospitalEventController.listofevent)

// router.put("/update", hospitalEventController.UpdateDetails)
// router.delete("/delete", hospitalEventController.deleteUser);

// ---------------------------------------------------------------------------------------------

// router.post('/signin',hospitalEventController.loginHospital)
// router.get("/hospital", AuthMiddleware,hospitalEventController.getHospital);

module.exports = router;