const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validateEmail, passwordValidation, fetchUserAcc } = require("../config/dbConnection")
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields must be filled.")    
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const validEmail = await validateEmail(username, email, hashedPassword)
    if (!validEmail) {
        res.status(400)
        throw new Error("Invalid email address.")
    }
    res.status(201).json({message: "Register user", id: validEmail, email: email })
})
//@desc Register a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    console.log("validating pasword...")
    const [validPassword] = await passwordValidation(email)
    if( email && (await bcrypt.compare(password, validPassword.password))) {
        console.log("valid password")
        const [userInfo] = await fetchUserAcc(email)
        console.log("user info:", userInfo)
        const accessToken = jwt.sign({
            user: userInfo,
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"})
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("Email or passowrd is not valid.")
    }
})
//@desc Register a user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    console.log("current user:", req.user)
    res.json(req.user)
})
module.exports = {registerUser, loginUser, currentUser}