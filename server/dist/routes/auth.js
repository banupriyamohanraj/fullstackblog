"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
require("dotenv").config();
// Create a new express router instance
const router = express();
router.use(express.json());
router.use(cors());
router.get("/", (req, res) => {
    res.send("hello");
});
module.exports = router;
//# sourceMappingURL=auth.js.map