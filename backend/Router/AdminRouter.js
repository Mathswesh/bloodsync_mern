const AdminController = require("../Controller/AdminController")
const express = require("express")
const router = express.Router();

router.post("/", AdminController.createAdminAccount)

module.exports = router