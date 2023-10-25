const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;

// const express = require("express");
// const router = express.Router();


// import createChatRoom from "../controllers/chatroom";
// import getUserRoom from "../controllers/chatroom";
// import getRoomUsers from "../controllers/chatroom";

// router.post('/', createChatRoom);
// router.get('/:userId', getUserRoom);
// router.get('/:userIdOne/:userIdTwo', getRoomUsers);

// module.exports = router;

