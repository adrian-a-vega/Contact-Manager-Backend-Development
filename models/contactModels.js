
const mysql = require("mysql2")
const connectDB = require("../config/dbConnection")
async function fetchContacts() {
    try {
        connectDB()
        console.log("running fetch") 
        const [contacts] = await connectDB.query("SELECT * FROM Contacts")
        console.log(contacts)
        return [contacts]
    } catch (err) {
        console.error("fucking error:", err)
    }
}
module.exports = fetchContacts()