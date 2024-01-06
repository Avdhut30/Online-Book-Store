// authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/auth");
const { OAuth2Client } = require("google-auth-library");

// Initialize the Google OAuth2 client
const googleClient = new OAuth2Client("your-google-client-id");

// User registration
router.post("/register", async (req, res) => {
  // ... (existing code)
});

// User login
router.post("/login", async (req, res) => {
  // ... (existing code)
});

// Google Sign-In
router.post("/googleSignIn", async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: idToken,
      audience: "your-google-client-id",
    });

    const payload = ticket.getPayload();
    const googleUserId = payload.sub;

    // Check if the user with the Google ID exists in your database
    let user = await User.findOne({ googleId: googleUserId });

    if (!user) {
      // If the user does not exist, create a new user with Google ID
      user = await User.create({ googleId: googleUserId });
    }

    // You may generate a JWT token for the user and send it in the response
    res.status(200).json({ message: "Google Sign-In successful", user });
  } catch (error) {
    console.error("Google Sign-In error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
