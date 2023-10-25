const express = require("express");
const {
  allMsgs,
  sendMsg,
} = require("../controllers/message.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMsgs);
router.route("/").post(protect, sendMsg);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// import createMsg from "../controllers/message.js";
// import getMsg from "../controllers/message.js";

// router.post("/App", createMsg);
// router.get("/:roomId",getMsg);

// module.exports = router;
