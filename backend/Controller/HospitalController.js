const signupModel = require("../Model/HospitalSignupModel")
const encrypt = require("../Util/Encrypt")
const bcrypt = require('bcrypt')
const { generateToken } = require('../Util/jwtUtils')

const AddUser = async (req, res) => {
    try {
        const { email , password} = req.body;
        console.log(req.body)

        // Check if the email already exists in the signup table
        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists. Please use a different email.",
            });
        }

        // Encrypt the password
        const hashedPassword = encrypt.encryptPassowrd(password); // Fixed typo

        // Create user object for the signup table
        const UserObject = { ...req.body, password: hashedPassword };

        // Save user to the signup table
        const saveUser = await signupModel.create(UserObject);
        if (saveUser) {

            // Send a JSON response with a redirect URL
            return res.status(201).json({
                message: "User created successfully",
                userData: saveUser,
                // redirectUrl: "/signin", // Provide this for frontend redirection
            });
        } else {
            return res.status(400).json({
                message: "Failed to create user",
            });
        }
    } catch (error) {
        console.error("Error during signup:", error);

        // Handle generic errors
        return res.status(500).json({
            message: "An error occurred during signup. Please try again later.",
        });
    }
};
const getAllUser = async (req, res) => {
    try {
        const users = await signupModel.find()
        if (users) {
            res.status(200).json({
                message: "All Users Fetched Successfully",
                UserInfo: users
            })
        }
        else {
            res.status(404).json({
                message: "No Users Found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong to Fetch All Users",
            UserInfo: []
        })
    }
}
const UpdateDetails = async (req, res) => {
    try {
        const email = req.body.email; // Get email from the route parameter
        const userdata = req.body; // Get user data from the request body

        if (email) {
            // Update the user details based on the email
            const updatedUser = await signupModel.findOneAndUpdate(
                { email: email }, // Query object
                userdata, // Data to update
                { new: true } // Return the updated document
            );

            if (updatedUser) {
                res.status(200).json({
                    message: "User Details Updated Successfully",
                    UserInfo: updatedUser
                });
            } else {
                res.status(404).json({
                    message: "Email Not Found In Our DataBase",
                    UserInfo: []
                });
            }
        } else {
            res.status(400).json({
                message: "Email is required to Update User Details",
                UserInfo: []
            });
        }
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({
            message: "An error occurred while updating user details",
            error: error.message
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const userdata = req.body;

        if (email) {
            const deletedUser = await signupModel.findOneAndDelete({ email: email }, { new: true })
            if (deletedUser) {
                res.status(200).json({
                    message: "User Deleted Successfully",
                    UserInfo: deletedUser,
                })
            }
            else {
                res.status(404).json({
                    message: "E-mail not Found in our database",
                    UserInfo: []
                });
            }
        }
        else {
            res.status(400).json({
                message: "Email is required to Update User Details",
                UserInfo: []
            });
        }
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({
            message: "An error occurred while updating user details",
            error: error.message
        });
    }
}


const loginHospital = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

        // Fetch user data from the database
        const user = await signupModel.findOne({ email });
        console.log(user)

        // Check if the user exists
        if (!user || user.email !== email) {
            return res.status(404).json({
                message: "Email ID Doesn't Exist",
                status: 404,
            });
        }

        // Validate password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Email or Password Not Found",
                status: 400,
            });
        }

        // Role-based logic
        let emailSubject = "Welcome to Blood Sync!";
        let emailContent = `
                Welcome to Blood Sync, ${user.firstname}!
                We’re excited to have you on board. Your login was successful,
                and you can now access all the features and services of our platform.

                If you need any assistance or have questions, feel free to 
                reach out to our support team at support@bloodsync.com.

                Thank you for choosing Blood Sync. Together, we’re making a difference!

                Best regards,
                The Blood Sync Team
            `;

        const token = generateToken(user)
        console.log(token)
        // Generate JWT token
        // const createdToken = jwt.sign(
        //     {
        //         email: user.email,
        //         id: user._id,
        //     },
        //     "Galu_0106", // Secret key
        //     { expiresIn: "1h" }
        // );
        // console.log(createdToken)
        // ✅ Fix: Check if the email already exists in LoginModel
        // const existingLogin = await LoginModel.findOne({ email: user.email });

        // if (existingLogin) {
        //     // ✅ If the user already has an entry, update the existing record
        //     await LoginModel.updateOne(
        //         { email: user.email },
        //         { $set: { password: user.password, role: user.role, lastLogin: new Date() } }
        //     );
        // } else {
        //     // ✅ If the user is logging in for the first time, create a new entry
        //     await LoginModel.create({
        //         email: user.email,
        //         password: user.password, // Ensure this is hashed
        //         // role: user.role,
        //         lastLogin: new Date()
        //     });
        // }
        // ------------------------------------------------------------------------------
        // Send email notification
        // await mailer.sendMail(user.email, emailSubject, emailContent);

        // Respond to regular user
        return res.status(200).json({
            success: true,
            message: "You Have Logged In Successfully",
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error);

        res.status(500).json({
            message: "Something Went Wrong!!",
            error: error,
            status: 500,
        });
    }
};

const getHospital = async (req, res) => {
    try {
        const userdata = req.user; // Now req.user is populated
        console.log("User Data:", userdata);

        res.status(200).json({
            msg: "User is verified ",
            user: userdata,
        });
    } catch (error) {
        console.error(`Error from getuser route: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    AddUser,
    getAllUser,
    UpdateDetails,
    deleteUser,
    loginHospital,
    getHospital
}