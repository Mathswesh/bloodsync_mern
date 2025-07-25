const donationform = require("../Model/UserRegistrationModel")
// const SignupModel = require("../Model/SignupModel")

const AddData = async (req, res) => {
    try {
        const { email, ...udata } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await SignupModel.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ message: "Email not registered." });
        }

        const userdata = { email, ...udata }

        const registeredUser = await donationform.create(userdata);
        console.log(registeredUser)
        res.status(200).json({
            message: "You have registered successfully!",
            data: registeredUser
        });


    } catch (error) {
        res.status(404).json({
            message: "Error Occured",
            err: error.message,
        })
    }
}



module.exports = {
    AddData,
}


// Review/Rating/Name
// Profile Photo , Login Cookie/Session , Logout Destroy Cookie/Session
// Admin -> Users/Doners/Hospitals -> Certificates
