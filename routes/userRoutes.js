const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../DB/userController");
const userViews = require("../utils/userViews");

router.get("/profile", async (req, res) => {
  try {
    const userId = req.user.payload;
    const User = await userController.fetchUser(userId);
    res.send(userViews.profile(User));
  } catch (err) {
    res.status(500).json({ message: "User not found" });
  }
});

router.put("/update/:id", (req, res) => {});

router.get("/remove/all", async (req, res) => {
  try {
    const numRemoved = await userController.removeAllUser();
    res
      .status(200)
      .json({ message: "Successfully removed users.", numRemoved });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing ALL USERS.", error: err.message });
  }
});

router.get("/view/all", async (req, res) => {
  const Users = await userController.fetchAllUser();
  res.status(200).json({ Users });
});

module.exports = router;
