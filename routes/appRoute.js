const express = require("express");
const router = express.Router();
const path = require("path");
const userViews = require("../utils/userViews");
const userController = require("../DB/userController");

router.get("/", (req, res) => {
  res.send(userViews.start());
});

router.get("/test", async (req, res) => {
});

module.exports = router;
