const express = require("express");
const router = express.Router();

const {
  allMsgs,
  sendMsg,
} = require("../controllers/message.js");


router.post('/:chatId',allMsgs)
router.post('/', sendMsg)

module.exports = router;



// router.route("/:chatId").get(allMsgs);
// router.route("/").post(sendMsg);
// const express = require("express");
// const router = express.Router();

// import createMsg from "../controllers/message.js";
// import getMsg from "../controllers/message.js";

// router.post("/App", createMsg);
// router.get("/:roomId",getMsg);

// module.exports = router;
