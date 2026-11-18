const express = require("express")
const router = express.Router()
const {getContacts, createContact, getContact, updateContact, deleteContact} = require("../controllers/contactController")
const validateToken = require("../middleware/validateTokenHandler")
// Since 'api/contacts' is often used it can be replaces w /
// // curl localhost:5001/api/contacts
/*router.route('/').get((req, res) => {
    res.status(200).json({message: "Get all contacts"   })
})
// curl -XPOST localhost:5001/api/contacts
router.route('/').post((req, res) => {
    res.status(200).json({message: "Create contact"   })
})
// curl localhost:5001/api/contacts/1
router.route('/:id').get((req, res) => {
    res.status(200).json({message: `Get Contact for ${req.params.id}`   })
})
//curl -X PUT http://localhost:5001/api/contacts/000004 \
     -H "Content-Type: application/json" \-d '{"name": "John Doe", "email": "jdoe@email.com", "phone": "123-456-7890"}'
// curl -XPUT localhost:5001/api/contacts/1
router.route('/:id').put((req, res) => {
    res.status(200).json({message: `Update contact for ${req.params.id}`   })
})
// curl -XDELETE localhost:5001/api/contacts/1
router.route('/:id').delete((req, res) => {
    res.status(200).json({message: `Delete contact for ${req.params.id}`   })
})*/
// Middleware to validate token for all routes
router.use(validateToken)
router.route('/').get(getContacts).post(createContact)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)
// Export routes to be used in other files
module.exports = router