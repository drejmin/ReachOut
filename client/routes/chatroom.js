const express = require("express");
const router = express.Router();


import createChatRoom from "../controllers/chatroom";
import getUserRoom from "../controllers/chatroom";
import getRoomUsers from "../controllers/chatroom";

router.post(',', createChatRoom);
router.get('/:userId', getUserRoom);
router.get('/:userIdOne/:userIdTwo', getRoomUsers);

module.exports = router;

