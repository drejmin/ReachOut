const express = require("express");
const router = express.Router();

const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatroom");

router.post('/', accessChat);
router.post('/', fetchChats);
router.post('/', createGroupChat);
router.put('/rename', renameGroup);
router.put('/groupremove', removeFromGroup);
router.put('/groupadd', addToGroup);

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

