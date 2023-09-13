const express = require("express");
const router = express.Router();

import createMsg from "../controllers/message.js";
import getMsg from "../controllers/message.js";

router.post("/App", createMsg);
router.get("/:roomId",getMsg);

module.exports = router;
