const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../DB/userController");

router.get("/users/all", async (req, res) => {
});

router.post("/test", (req, res)=>{
  userController.updateUser()
});

router.put("/makeAdmin", (req, res)=>{
  
});

module.exports = router;