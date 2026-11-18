const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

// curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" localhost:5001/api/users/current
// curl localhost:5001/api/users/current -H "Authorization: Bearer {token}"
const validateToken = asyncHandler(async (req, res, next) => {
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(400)
                throw new Error("User is not authorized")
            }
            req.user = decoded.user
            next()
        })
        if(!token){
            res.status(401)
            throw new Error("User or token is not authorized")
        }
    }
})

module.exports = validateToken