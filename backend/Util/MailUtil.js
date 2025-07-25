const mailer = require("nodemailer");
const path = require("path");

const sendMail = async (to, subject, text) => {
    // Creating the transporter with Gmail service
    const transport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "bloodsync@gmail.com",  // Your email address
            pass: "tsnceegwtmlculgt"      // Your Gmail app-specific password
        }
    });

    const mailOptions = {
        from: "bloodsync@gmail.com",  // Sender's email
        to: to,                      // Recipient's email
        subject: subject,            // Subject of the email
        html: `<h1>${text}</h1>`,     // HTML body content
        attachments: [                // Corrected plural form of attachment
            {
                filename: "welcome.gif",  // The name the file will have in the email
                path: path.join(__dirname, "welcome.gif"),
            }
        ]
    };

    try {
        const mailRes = await transport.sendMail(mailOptions); // Send the email
        console.log("Mail Sent Successfully: ", mailRes);
        return mailRes;
    } catch (error) {
        console.error('Error sending mail: ', error);
        throw error; // It's better to throw the error with the correct object
    }
};

module.exports = {
    sendMail
};
