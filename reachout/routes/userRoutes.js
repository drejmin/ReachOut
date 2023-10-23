const express = require('express');
const {registerUser, authUser, getAllUsers} = require("../controllers/users");

const router = express.Router();

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/').get(protect, getAllUsers)

module.exports= router;