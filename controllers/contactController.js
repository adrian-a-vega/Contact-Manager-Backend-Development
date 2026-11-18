/* Controllers that contain all the logic req/res that connects w DB */
// Whnever api methods need labels

// whenever an exception occurs the asyncHandler will pass it to errorHandler
const asyncHandler = require("express-async-handler")
const {fetchContacts, addContact, fetchContact, changeContact, removeContact} = require("../config/dbConnection")
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await fetchContacts(req.user.id)
    res.status(200).json({message: `Get all contacts`, contacts: contacts})
})
//@desc Create new Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    // We must use a body passer to retrieve body which express does
    console.log("The request body is", req.body)
    // destructure req
    const {name, email, phone} = req.body
    if(!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields must be filled.")
    }
    console.log(name, email, phone, req.user.id)
    const contact = await addContact(name, email, phone, req.user.id)
    // 201 is resource created
    res.status(201).json({message: "Create Contact", contact: req.body})
})
//@desc Get Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await fetchContact(req.params.id, req.user.id)
    if(contact == []) {
        res.status(403)
        throw new Error("User doesn't have access to contact.")
    }
    res.status(200).json({message: `Get Contact for ${req.params.id}`, contact: contact })
})
//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body
    const contact = await changeContact(req.params.id, name, email, phone)
    res.status(200).json({message: `Update Contact for ${req.params.id}`, contact: contact })
})
//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await removeContact(req.params.id)
    res.status(200).json({message: `Delete Contact for ${req.params.id}`   })
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact}