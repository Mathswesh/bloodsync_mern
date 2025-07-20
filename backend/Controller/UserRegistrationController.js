const userregister = require('../Model/UserRegistrationModel')
const hospitalevent = require('../Model/HospitalEventModel')

const adduserregister = async (req, res) => {
    try {
        const { eventid, eventhospitalid, userid } = req.body;
        console.log(eventid, eventhospitalid, userid, "add user event");

        // Validate required fields
        if (!eventid || !eventhospitalid || !userid) {
            return res.status(400).json({ message: "Event ID, Event Hospital ID, and User ID are required" });
        }

        // Check if the same user has already registered for the event
        const existingRegistration = await userregister.findOne({
            eventid,
            eventhospitalid,
            userid
        });

        if (existingRegistration) {
            return res.status(400).json({ message: "You have already registered for this event." });
        }

        // Allow multiple users to register for the same event
        const newRegistration = await userregister.create({
            eventid,
            eventhospitalid,
            userid
        });

        return res.status(201).json({
            message: "User registered successfully",
            userData: newRegistration,
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// const getuserdashboarddata = async (req, res) => {
//     try {
//         const user = req.user;

//         const alldata = await userregister.find({ userid: user.id })
//         console.log(alldata, "all data")
//         const alleventdata = await hospitalevent.find( {id : alldata.eventid} )
//         console.log(alleventdata, "all event data from get")

//         // Fetch all user events
//         const totalEvents = alleventdata.length;
//         // console.log("Total number of events:", totalEvents);

//         // Fetch upcoming events (date > current date) in ascending order
//         const upcomingEvents = alleventdata
//             .filter(event => new Date(event.eventdate) >= new Date())
//             .sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate));
//             console.log('----------------------------------------')
        
//             console.log(upcomingEvents)

//         // Fetch past events (date < current date) in ascending order
//         const pastEvents = alleventdata
//             .filter(event => new Date(event.eventdate) < new Date()) // Only past events
//             .sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate)); // Sort by date
//         // console.log(pastEvents)

//          // Generate January to December structure
//          const currentYear = new Date().getFullYear();
//          const monthWiseEvents = {};
 
//          for (let month = 1; month <= 12; month++) {
//              const monthKey = `${currentYear}-${String(month).padStart(2, '0')}`;
//              monthWiseEvents[monthKey] = 0; // Default 0 events
//          }
 
//          // Populate monthWiseEvents with actual event counts
//          alleventdata.forEach(event => {
//              const eventDate = new Date(event.eventdate);
//              const monthKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
 
//              if (monthWiseEvents.hasOwnProperty(monthKey)) {
//                  monthWiseEvents[monthKey] += 1;
//              }
//          });
 

//         return res.status(200).json({
//             message: "User dashboard data retrieved successfully.",
//             totalEvents,
//             upcomingEvents,
//             pastEvents,
//             alleventdata,
//             monthWiseEvents
//         });

//     } catch (error) {
//         console.error("Error retrieving user dashboard data:", error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// };
const getuserdashboarddata = async (req, res) => {
    try {
        const user = req.user;

        // Get all registered data for the user
        const alldata = await userregister.find({ userid: user.id });
        console.log(alldata, "all data");

        // Extract all event IDs from alldata
        const eventIds = alldata.map(data => data.eventid).filter(id => id); // Ensure no undefined IDs

        // Fetch all hospital events matching the event IDs
        const alleventdata = await hospitalevent.find({ _id: { $in: eventIds } });
        console.log(alleventdata, "all event data from get");

        // Fetch all user events
        const totalEvents = alleventdata.length;

        // Get current date
        const currentDate = new Date();

        // Fetch upcoming events (date > current date) in ascending order
        const upcomingEvents = alleventdata
            .filter(event => event.eventdate && new Date(event.eventdate) >= currentDate)
            .sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate));

        console.log('----------------------------------------');
        console.log(upcomingEvents);

        // Fetch past events (date < current date) in ascending order
        const pastEvents = alleventdata
            .filter(event => event.eventdate && new Date(event.eventdate) < currentDate) // Only past events
            .sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate)); // Sort by date

        // Generate January to December structure
        const currentYear = currentDate.getFullYear();
        const monthWiseEvents = {};

        for (let month = 1; month <= 12; month++) {
            const monthKey = `${currentYear}-${String(month).padStart(2, '0')}`;
            monthWiseEvents[monthKey] = 0; // Default 0 events
        }

        // Populate monthWiseEvents with actual event counts
        alleventdata.forEach(event => {
            if (event.eventdate) { // Ensure event has a valid date
                const eventDate = new Date(event.eventdate);
                const monthKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;

                if (monthWiseEvents.hasOwnProperty(monthKey)) {
                    monthWiseEvents[monthKey] += 1;
                }
            }
        });

        return res.status(200).json({
            message: "User dashboard data retrieved successfully.",
            totalEvents,
            upcomingEvents,
            pastEvents,
            alleventdata,
            monthWiseEvents
        });

    } catch (error) {
        console.error("Error retrieving user dashboard data:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    adduserregister,
    getuserdashboarddata
}
