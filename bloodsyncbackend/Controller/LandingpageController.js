const userregister = require('../Model/UserRegistrationModel');
const hospitalevent = require('../Model/HospitalEventModel');
const hospital = require('../Model/HospitalSignupModel');

const getdata = async (req, res) => {
    try {
        const userCount = await userregister.countDocuments({});
        const eventCount = await hospitalevent.countDocuments({});
        const hospitalCount = await hospital.countDocuments({});

        console.log(userCount, eventCount, hospitalCount);

        // Return 200 status with count data
        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: {
                userCount,
                eventCount,
                hospitalCount
            }
        });
    } catch (error) {
        console.error('Error fetching counts:', error);

        // Return 400 status in case of error
        return res.status(400).json({
            success: false,
            message: "Failed to fetch counts",
            error: error.message
        });
    }
};

module.exports = {
    getdata
};

// const userregister = require('../Model/UserRegistrationModel');
// const hospitalevent = require('../Model/HospitalEventModel');
// const hospital = require('../Model/HospitalSignupModel');

// const getdata = async () => {
//     try {
//         const userCount = await userregister.countDocuments({});
//         const eventCount = await hospitalevent.countDocuments({});
//         const hospitalCount = await hospital.countDocuments({});
//         console.log(userCount , eventCount, hospitalCount)
//         return {
//             userCount,
//             eventCount,
//             hospitalCount
//         };
//     } catch (error) {
//         console.error('Error fetching counts:', error);
//         return { error: 'Failed to fetch counts' };
//     }
// };

// module.exports = {
//     getdata
// };

// // const userregister = require('../Model/UserRegistrationModel')
// // const hospitalevent = require('../Model/HospitalEventModel')
// // const hospital = require('../Model/HospitalSignupModel')

// // const getdata = () => {

// // }


// // module.exports = {
// //     getdata
// // }
