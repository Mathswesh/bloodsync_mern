const jwt = require("jsonwebtoken");
const {secretKey} = require('../Util/jwtConfig')

const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("auth",authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const jwtToken = authHeader.replace("Bearer", "").trim(); // Remove 'Bearer' and trim

    console.log("Token from auth middleware:", jwtToken);
    console.log(secretKey)
    jwt.verify(jwtToken,secretKey, (err,user) => {
        if(err) {
            return res.status(401).json({message: " wrong"})
        }
        req.user = user
        console.log("done from auth")
        next()
    })
};

module.exports = AuthMiddleware ;