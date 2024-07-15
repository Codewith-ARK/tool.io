const express = require("express");
const router = express.Router();
const path = require("path");

const { hashPassword, auth } = require("../utils/auth");
const { generateToken } = require("../utils/token");
const userController = require("../DB/userController");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "signup.html"));
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.get("/401",(req,res)=>{
  res.sendFile(path.join(__dirname, "..", "public", "html", "401.html"));
});

router.post("/login", async (req, res) => {
  try {
    const userData = await userController.fetchUserByEmail(req.body.email);
    if(!userData) return res.status(404).json({message: "User not found"});
    // Authenticate user
    const isAuthenticated = await auth(req.body.email, req.body.password, userData.email, userData.password);
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate token
    const token = generateToken(userData._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    res.cookie("isAdmin", userData.userType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,     
    });

    // Send success response
    res.status(200).json({ message: "Login successful." });
    
  } catch (err) {
    console.log("Error in login:",err)
    res.status(500).json({ message: "Error in login: " + err.message });
  }
});

router.post("/signup", async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  try {
    userController.createUser(userData);
    res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Error during signup", err });
  }
});

module.exports = router;