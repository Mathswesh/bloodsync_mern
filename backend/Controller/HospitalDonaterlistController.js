const HospitalEvent = require("../Model/HospitalEventModel"); // Import the hospital event model
const Userregistration = require("../Model/UserRegistrationModel"); // Import the registration model
const UserProfile = require("../Model/UserProfileDataModel"); // Import the user profile model

const getAllDonaterlist = async (req, res) => {
    try {
        const data = req.user;
        console.log("User Data:", data);

        // Fetch all hospital events for the given user ID
        const hospitalevent = await HospitalEvent.find({ id: data.id }).lean();
        console.log("Fetched Hospital Events:", JSON.stringify(hospitalevent, null, 2));

        if (!hospitalevent.length) {
            return res.status(404).json({
                message: "No events found for this hospital",
            });
        }

        // Extract unique event _id values
        const eventIds = hospitalevent.map(event => event._id);
        console.log("Event IDs:", eventIds);

        // Fetch user registrations for the retrieved event IDs
        const userRegistrations = await Userregistration.find({ eventid: { $in: eventIds } }).lean();
        console.log("Fetched User Registrations:", JSON.stringify(userRegistrations, null, 2));

        if (!userRegistrations.length) {
            return res.status(404).json({
                message: "No Donater Found",
            });
        }

        // Extract unique user IDs from user registrations
        const uniqueUserIds = [...new Set(userRegistrations.map(registration => registration.userid))];

        // Fetch user profiles for the retrieved unique user IDs
        const userProfiles = await UserProfile.find({ userid: { $in: uniqueUserIds } }).lean();
        console.log("Fetched User Profiles:", JSON.stringify(userProfiles, null, 2));

        res.status(200).json({
            message: "All Users Fetched Successfully",
            totalDonors: userProfiles.length, // Count of unique donors
            totalRegistrations: userRegistrations.length, // Total number of registrations
            Donaters: userProfiles,
        });

    } catch (error) {
        console.error("Error fetching donators:", error);
        res.status(500).json({
            message: "Something went wrong while fetching users",
            UserInfo: [],
        });
    }
};

module.exports = {
    getAllDonaterlist,
};

// const HospitalEvent = require("../Model/HospitalEventModel"); // Import the hospital event model
// const Userregistration = require("../Model/UserRegistrationModel"); // Import the registration model
// const UserProfile = require("../Model/UserProfileDataModel"); // Import the user profile model

// const getAllDonaterlist = async (req, res) => {
//     try {
//         const data = req.user;
//         console.log("User Data:", data);

//         // Fetch all hospital events for the given user ID
//         const hospitalevent = await HospitalEvent.find({ id: data.id }).lean();
//         console.log("Fetched Hospital Events:", JSON.stringify(hospitalevent, null, 2));

//         if (!hospitalevent.length) {
//             return res.status(404).json({
//                 message: "No events found for this hospital",
//             });
//         }

//         // Extract unique event _id values
//         const eventIds = hospitalevent.map(event => event._id);
//         console.log("Event IDs:", eventIds);

//         // Fetch user registrations for the retrieved event IDs
//         const userRegistrations = await Userregistration.find({ eventid: { $in: eventIds } }).lean();
//         console.log("Fetched User Registrations:", JSON.stringify(userRegistrations, null, 2));

//         if (!userRegistrations.length) {
//             return res.status(404).json({
//                 message: "No Donater Found",
//             });
//         }

//         // Extract unique user IDs from user registrations
//         const uniqueUserIds = [...new Set(userRegistrations.map(registration => registration.userid))];

//         // Fetch user profiles for the retrieved unique user IDs
//         const userProfiles = await UserProfile.find({ userid: { $in: uniqueUserIds } }).lean();
//         console.log("Fetched User Profiles:", JSON.stringify(userProfiles, null, 2));

//         res.status(200).json({
//             message: "All Users Fetched Successfully",
//             total: userProfiles.length, // Include total count
//             Donaters: userProfiles,
//         });

//     } catch (error) {
//         console.error("Error fetching donators:", error);
//         res.status(500).json({
//             message: "Something went wrong while fetching users",
//             UserInfo: [],
//         });
//     }
// };

// module.exports = {
//     getAllDonaterlist,
// };
