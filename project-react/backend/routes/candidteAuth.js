const express = require("express");
const router = express.Router();
const Candidate_Reg = require("../models/candidate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




// Registration route
router.post('/can-reg', async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Candidate_Reg({
      fname,
      lname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    const user = await Candidate_Reg.findOne({ email });
    console.log(user, "user");
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed- User doesn't exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed- password doesn't match" });
    }

    const token = jwt.sign(
      { userId: user._id, userEmail: user.email },
      "your-secret-key",
      {
        expiresIn: "1h",
      }
    );

    // Set the token in a cookie
    res.cookie('AuthToken', token, { httpOnly: true, secure: false });

    res.status(200).json({ message: 'Login Success', token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});
// Logout route
router.post('/canlogout', (req, res) => {
  res.clearCookie('AuthToken', { httpOnly: true, secure: false });
  res.status(200).json({ message: 'Logout Success' });
});







module.exports = router;
