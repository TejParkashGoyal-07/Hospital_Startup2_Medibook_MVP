const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Doctor = require("../models/Doctor"); // Import Doctor model
const jwt = require("jsonwebtoken");
const router = express.Router();

// Normal user signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, phone, password, userType } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, phone, password: hashedPassword, userType });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Doctor signup
// router.post("/signup-doctor", async (req, res) => {
//   try {
//     const { fullName, email, phone, password, specialization, experience, availableFrom, availableTo } = req.body;

//     const existingDoctor = await Doctor.findOne({ email });
//     if (existingDoctor) return res.status(400).json({ message: "Doctor already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newDoctor = new Doctor({
//       fullName,
//       email,
//       phone,
//       password: hashedPassword,
//       specialization,
//       experience,
//       availableHours: { from: availableFrom, to: availableTo },
//     });

//     await newDoctor.save();
//     res.status(201).json({ message: "Doctor registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.post("/signin", async (req, res) => {
  console.log("Sign-in Request Data:", req.body); // Log request data

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

    res.json({ success: true, token, user });
  } catch (err) {
    console.error("Sign-in Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
