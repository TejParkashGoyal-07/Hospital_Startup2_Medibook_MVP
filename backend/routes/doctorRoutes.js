const express = require("express");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor");

const router = express.Router();

// ✅ Doctor Signup Route
router.post("/signup-doctor", async (req, res) => {
    try {
        const { 
            fullName, 
            email, 
            phone, 
            password, 
            specialization, 
            experience, 
            availableFrom, 
            availableTo 
        } = req.body;

        // 1️⃣ Check if all required fields are provided
        if (!fullName || !email || !phone || !password || !specialization || !experience || !availableFrom || !availableTo) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // 2️⃣ Validate Email & Phone Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format (10 digits required)" });
        }

        // 3️⃣ Validate Password Strength
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // 4️⃣ Validate Experience
        if (isNaN(experience) || experience < 0) {
            return res.status(400).json({ success: false, message: "Experience must be a valid number" });
        }

        // 5️⃣ Check if the doctor already exists (by email or phone)
        const existingDoctor = await Doctor.findOne({ $or: [{ email }, { phone }] });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: "Doctor already exists with this email or phone number" });
        }

        // 6️⃣ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 7️⃣ Convert Available Hours to Numbers
        const availableFromNum = parseInt(availableFrom, 10);
        const availableToNum = parseInt(availableTo, 10);

        // 8️⃣ Create a new doctor entry
        const newDoctor = new Doctor({
            fullName,
            email,
            phone,
            password: hashedPassword,
            specialization,
            experience,
            availableHours: { from: availableFromNum, to: availableToNum }, 
            status: "approved", // Default status until admin approval
        });

        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor registered successfully. Waiting for admin approval." });
    } catch (error) {
        console.error("Doctor Signup Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});


router.get("/:email", async (req, res) => {
    const { email } = req.params;
    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.json({ name: doctor.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  module.exports = router; 