const express = require("express");
const router = express.Router();

import createMsg from "../controllers/message";
import getMsg from "../controllers/message";

router.post("/App", createMsg);
router.get("/:roomId",getMsg);

module.exports = router;
