const express = require("express")
const dbConnection = require("./Util/DBConnection")
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors") // Cross-Origin Resource Sharing


dbConnection.dbConnection();

// app.use(cookieParser());
app.use(express.json());
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Router
const signup = require("./Router/SignUpRouter");
const login = require("./Router/LoginRouter");
const porfile = require("./Router/ProfileRouter")
const userregister = require("./Router/UserRegistrationRouter.js")
const userprofile = require('./Router/UserProfileRouter.js')
const usercontactform = require('./Router/UserContactRouter.js')
// Use
app.use("/signup", signup);
app.use("/login", login);
app.use("/profile", porfile);
app.use("/registration", userregister);
app.use('/userformprofile',userprofile)
app.use('/usercontactform',usercontactform)

// ---------------------------------------------------------------------
const hospital = require('./Router/HospitalRouter.js')
const event = require('./Router/HospitalEventRouter.js')
const donater = require('./Router/HospitalDonaterlistRouter.js')
// hospital
app.use('/hospital',hospital)
app.use('/event',event)
app.use('/donater',donater)

// ---------------------------------------------------------------------
const data = require('./Router/LandingpageRouter.js')
app.use('/data',data)

app.listen(PORT, (req, res) => {
    console.log(`Server Is Running On http://localhost:${PORT}`)
})