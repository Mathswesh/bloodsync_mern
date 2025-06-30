const jwt = require('jsonwebtoken')
const { secretKey } = require('../Util/jwtConfig')

function generateToken(user){
    const payload = {
        id: user._id,
        email: user.email, 
        username:user.username,
        hname:user.hname,
        latitude:user.latitude,
        longitude:user.longitude,
        haddress:user.haddress
    }
    return jwt.sign(payload,secretKey,{expiresIn:'1h'})
}

module.exports = {
    generateToken
}