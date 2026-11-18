// Create a basic express server
/* Install express w 'npm install express' */
/* Then, install nodemon which refreshes the server after file is saved */
const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()
//const connectDB = require("./config/dbConnection")

// Connect to mysql db
//connectDB()
const app = express()
const port =  process.env.PORT || 5000

/* THE FOLLOWING CODE WAS REPLACES WITH THE ROUTES FOLDER
// Any GET request from a client will recieve a 404 Error, since nothing handles the GET req
// The following will respond to a GET request at the /api/contacts endpoint with "Get all contacts"
// curl -v localhost:5001/api/contacts
// We don't want to create each endpoint for all are routs 
/*app.get('/api/contacts', (req, res) => {
    // respond w string
    res.send("Get all contacts")
    // respond w json and stats
    res.status(200).json({message: "Get all contacts"   })
})*/
// Middleware
// express.josn helps recieve json information from client
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

// we need environment file to name the port 
// INstall npm dotenv - allows to fetch the values of a port at .env file 
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
// npm i express-async-handler