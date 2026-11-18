const mysql = require("mysql2")
const connectDB = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PSWRD,
        database: 'myContactsBackend',
    }).promise()

if(!connectDB) {
    console.log("connection failed")
}
console.log(process.env.MYSQL_HOST)


async function fetchContacts(user_id) {
    try {
        console.log("running fetch") 
        let sql = `SELECT * FROM Contacts WHERE user_id = ${user_id}`
        const [contacts] = await connectDB.query(sql)
        console.log(contacts)
        return [contacts]
    } catch (err) {
        console.error("fucking error:", err)
    }
}
async function addContact(name, email, phone, user_id) {
    let contact = [name, email, phone]
    let sql = `INSERT INTO Contacts (user_id, uuid, name, email, phone) VALUES (${user_id},`+ 'UUID_SHORT(), ?)'
    connectDB.query(sql, [contact], function (err,result) {
        if (err) throw err;
        console.log("Contact added.")
    })
}
async function fetchContact(id, user_id) {
    try {
        let sql = `SELECT * FROM Contacts WHERE id = ? AND user_id = ?`
        const [contact] = await connectDB.query(sql,[id, user_id])
        console.log(contact)
        return [contact]
    } catch (err) {
        console.error("fucking error:", err)
    }
}
async function changeContact(id, name, email, phone)  {
    let contact = [name, email, phone, id]
    console.log(contact)
    let sql = 'UPDATE `Contacts` SET `name` = ?, `email` = ?, `phone` = ? WHERE `id` = ?'
    connectDB.query(sql, contact, function (err,result) {
        if (err) throw err;
        console.log("Contact change.")
    })
}
async function removeContact(id) {
    try {
        const contact = fetchContact(id)
        let sql = `DELETE FROM Contacts WHERE id = ${id}`
        await connectDB.query(sql)
    } catch (err) {
        console.error("fucking error:", err)
    } 
}
async function validateEmail(username, email, password) {
    let userInfo = [username, email, password]
    console.log(userInfo)
    // 1 true is email is found, 0 false if email isnt found
    const sql = 'INSERT INTO Users (username, email, password) SELECT ?' + `WHERE NOT EXISTS (SELECT 1 FROM Users WHERE email = '${email}');`
    const [emailValidation] = await connectDB.query(sql, [userInfo])
    const validEmail = emailValidation.affectedRows
    if (!validEmail) {
        return false
    }
    return emailValidation.insertId
}
async function passwordValidation(email) {
    const sql = 'SELECT password FROM Users WHERE email = ?'
    const [hashedPassword] = await connectDB.query(sql, email)
    console.log(hashedPassword)
    return hashedPassword
}
async function fetchUserAcc(email) {
    const sql = 'SELECT id, username, email FROM Users WHERE email = ?'
    const [userInfo] = await connectDB.query(sql, email)
    return userInfo
}


// Export the function instead of called function with fetchContacts()
module.exports = { fetchContacts, addContact, fetchContact, changeContact, removeContact, validateEmail, passwordValidation, fetchUserAcc}