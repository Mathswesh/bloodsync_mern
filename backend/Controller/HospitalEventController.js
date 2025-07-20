const HospitalEvent = require("../Model/HospitalEventModel"); // Import the hospital event model
const registration = require('../Model/UserRegistrationModel')

const addEvent = async (req, res) => {
    try {
        const data = req.body;
        console.log("Received Event Data:", data);

        //     // Required fields validation
        const requiredFields = [
            "eventname", "eventdate", "eventtime", "eventend",
            "eventdescription", "haddress", "hname", "id", // Change `id` to `hospitalId` if needed
            "latitude", "longitude"
        ];

        for (let field of requiredFields) {
            if (!data[field] || data[field].toString().trim() === "") {
                return res.status(400).json({ success: false, message: `${field} is required.` });
            }
        }

        const eventdata = await HospitalEvent.create(data)
        console.log("done", eventdata)

        return res.status(201).json({
            success: true,
            message: "Event created successfully.",
            event: eventdata
        });

    } catch (error) {
        console.error("Error adding event:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

const getEvent = async (req, res) => {
    try {
        const data = req.user;
        console.log(data, "from get event");
        
        const donaters = await registration.countDocuments({ eventhospitalid: data.id });
        console.log(donaters,"donaters");


        const response = await HospitalEvent.find({ id: data.id });
        console.log(response);

        const currentDate = new Date();
        const futureEvents = response.filter(event => new Date(event.eventdate) >= currentDate);
        const pastEvents = response.filter(event => new Date(event.eventdate) < currentDate);

        // Generate month-wise event count
        let monthlyEventData = Array(12).fill(0); // Initialize with 0 for each month

        response.forEach(event => {
            const eventDate = new Date(event.eventdate);
            const monthIndex = eventDate.getMonth(); // 0-based index (Jan = 0, Dec = 11)
            monthlyEventData[monthIndex]++;
        });

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Convert to a structured object with month names
        const formattedMonthlyData = monthNames.map((month, index) => ({
            month,
            count: monthlyEventData[index]
        }));

        console.log("Monthly Event Data:", formattedMonthlyData);

        res.status(200).json({
            msg: "User is verified",
            futureEvents,
            pastEvents,
            monthlyEventData: formattedMonthlyData,
            response,
            donaters
        });
    } catch (error) {
        console.error(`Error from getEvent route: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const listofevent = () => {
    try {
        const data = req.body;
        console.log(eventlist)
        res.status(200).json({
            msg: "Hospital events are fetched",
            eventlist
        });
    } catch (error) {

    }
}

// Haversine formula to calculate distance
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

const calculateAndStoreDistances = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        console.log("User Coordinates:", latitude, longitude);

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required." });
        }

        const events = await HospitalEvent.find();
        console.log("All Events:", events);

        const currentDate = new Date(); // Get current date

        const upcomingEvents = events
            .filter(event => new Date(event.eventdate) >= currentDate) // Keep only upcoming events
            .map(event => {
                const distance = haversineDistance(latitude, longitude, event.latitude, event.longitude);
                return {
                    eventId: event._id,
                    eventname: event.eventname,
                    eventdate: event.eventdate,
                    eventtime: event.eventtime,
                    eventend: event.eventend,
                    eventdescription: event.eventdescription,
                    eventhname: event.hname,
                    eventhaddress: event.haddress,
                    eventhospitalid: event.id,
                    latitude: event.latitude,
                    longitude: event.longitude,
                    distance, // Store distance
                    userLatitude: latitude,
                    userLongitude: longitude
                };
            })
            .sort((a, b) => a.distance - b.distance); // Sort events by nearest distance

        // Store distances in the database (if needed)
        // await EventDistance.insertMany(upcomingEvents);

        res.json({ message: "Upcoming event distances stored successfully.", events: upcomingEvents });

    } catch (error) {
        console.error("Error storing event distances:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all stored upcoming event distances (sorted by distance)
exports.getStoredEventDistances = async (req, res) => {
    try {
        const currentDate = new Date(); // Get current date

        const eventDistances = await EventDistance.find()
            .sort({ distance: 1 }) // Sort by nearest events
            .lean(); // Optimize performance by returning plain JS objects

        // Filter only upcoming events
        const upcomingEventDistances = eventDistances.filter(event => new Date(event.eventdate) >= currentDate);

        res.json(upcomingEventDistances);
    } catch (error) {
        console.error("Error fetching stored event distances:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// const calculateAndStoreDistances = async (req, res) => {
//     try {
//         const { latitude, longitude } = req.body;
//         console.log(latitude, longitude);

//         if (!latitude || !longitude) {
//             return res.status(400).json({ error: "Latitude and longitude are required." });
//         }

//         const events = await HospitalEvent.find();
//         console.log(events);

//         const currentDate = new Date(); // Get current date

//         const upcomingEvents = events
//             .filter(event => new Date(event.eventdate) >= currentDate) // Filter out past events
//             .map(event => {
//                 const distance = haversineDistance(latitude, longitude, event.latitude, event.longitude);
//                 return {
//                     eventId: event._id,
//                     eventname: event.eventname,
//                     eventdate: event.eventdate,
//                     eventtime: event.eventtime,
//                     eventend: event.eventend,
//                     eventdescription: event.eventdescription,
//                     eventhname: event.hname,
//                     eventhaddress: event.haddress,
//                     eventhospitalid: event.id,
//                     latitude: event.latitude,
//                     longitude: event.longitude,
//                     distance,
//                     userLatitude: latitude,
//                     userLongitude: longitude
//                 };
//             });

//         // Store distances in the database (if needed)
//         // await EventDistance.insertMany(upcomingEvents);

//         res.json({ message: "Upcoming event distances stored successfully.", events: upcomingEvents });

//     } catch (error) {
//         console.error("Error storing event distances:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// // Get all stored upcoming event distances
// exports.getStoredEventDistances = async (req, res) => {
//     try {
//         const currentDate = new Date(); // Get current date

//         const eventDistances = await EventDistance.find()
//             .sort({ distance: 1 }) // Sort by nearest events
//             .filter(event => new Date(event.eventdate) >= currentDate); // Keep only upcoming events

//         res.json(eventDistances);
//     } catch (error) {
//         console.error("Error fetching stored event distances:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


// Fetch all events, calculate distances, and store in EventDistance
// const calculateAndStoreDistances = async (req, res) => {
//     try {
//         const { latitude, longitude } = req.body;
//         console.log(latitude, longitude)
//         if (!latitude || !longitude) {
//             return res.status(400).json({ error: "Latitude and longitude are required." });
//         }

//         const events = await HospitalEvent.find();
//         console.log(events)

//         const eventDistances = events.map(event => {
//             const distance = haversineDistance(latitude, longitude, event.latitude, event.longitude);
//             return {
//                 eventId: event._id,
//                 eventname: event.eventname,
//                 eventdate: event.eventdate,
//                 eventtime: event.eventtime,
//                 eventend: event.eventend,
//                 eventdescription: event.eventdescription,
//                 eventhname: event.hname,
//                 eventhaddress: event.haddress,
//                 eventhospitalid: event.id,
//                 latitude: event.latitude,
//                 longitude: event.longitude,
//                 distance,
//                 userLatitude: latitude,
//                 userLongitude: longitude
//             };
//         });

//         // Store distances in the database
//         // await EventDistance.insertMany(eventDistances);

//         res.json({ message: "Event distances stored successfully.", events: eventDistances });

//     } catch (error) {
//         console.error("Error storing event distances:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// // Get all stored event distances
// exports.getStoredEventDistances = async (req, res) => {
//     try {
//         const eventDistances = await EventDistance.find().sort({ distance: 1 });
//         res.json(eventDistances);
//     } catch (error) {
//         console.error("Error fetching stored event distances:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


module.exports = {
    addEvent,
    getEvent,
    calculateAndStoreDistances,
    listofevent
};