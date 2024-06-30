const express = require("express");
const { register,login, deleteUser, updateDetails, updatePassword } = require("../Controller/auth");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', deleteUser);
router.put('/updatedetails/:id', updateDetails);
router.put('/updatepassword/:id', updatePassword);


module.exports = router;



