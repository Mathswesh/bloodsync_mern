const contactformmodel = require('../Model/UserContactForm')

const addcontactform = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)

        const saveData = await contactformmodel.create(data);
        if (saveData) {
            return res.status(201).json({
                message: "User added form data successfully",
                contactData: saveData,
            });
        } 
        else {
            return res.status(400).json({
                message: "Failed to create user form",
            }); 
        }
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({
            message: "An error occurred during adding form. Please try again later.",
        });
    }
};

const getcontactform = async (req, res) => {
    try {
        const users = await profilemodel.find()
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

module.exports = {
    getcontactform,
    addcontactform
}
