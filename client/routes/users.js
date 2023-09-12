const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get("/", getAllUsers);
router.get("/:userId", getUser);

module.exports = router;