const express = require("express");
const router = express.Router();
const chatsCtrl = require('../controllers/chatroom');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/', chatsCtrl.accessChat);
router.post('/', chatsCtrl.fetchChats);
router.post('/', chatsCtrl.createGroupChat);
router.put('/rename', chatsCtrl.renameGroup);
router.put('/groupremove', chatsCtrl.removeFromGroup);
router.put('/groupadd', ensureLoggedIn, chatsCtrl.addToGroup);

module.exports = router;

// const express = require("express");
// const router = express.Router();


// const { protect } = require("../middleware/authMiddleware");
// import createChatRoom from "../controllers/chatroom";
// import getUserRoom from "../controllers/chatroom";
// import getRoomUsers from "../controllers/chatroom";

// router.post('/', createChatRoom);
// router.get('/:userId', getUserRoom);
// router.get('/:userIdOne/:userIdTwo', getRoomUsers);

// module.exports = router;

