const profilemodel = require('../Model/UserProfileDataModel')
const mongoose = require("mongoose");

const AddProfile = async (req, res) => {
    try {
        const UserObject= req.body;
        console.log(UserObject)
        const saveUserProfile = await profilemodel.updateOne(UserObject);
        if (saveUserProfile) {
            return res.status(201).json({
                message: "User profile created successfully.",
                userData: saveUserProfile,
            });
        } else {
            return res.status(400).json({
                message: "Failed to create user profile.",
            });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({
            message: "An error occurred during signup. Please try again later.",
        });
    }
};

const getAllProfile = async (req, res) => {
    try {
        const userdata = req.user; // Now req.user is populate
        console.log("data from auth to profile: ",userdata)

        const users = await profilemodel.findOne({userid:userdata.id})
        console.log("hi : ",users)
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

// export const userprofileupdate = async (req,res) => {
//   try {
    
//   } catch (error) {
    
//   }
// };


module.exports = {
    getAllProfile,
    AddProfile,
    // userprofileupdate
}
