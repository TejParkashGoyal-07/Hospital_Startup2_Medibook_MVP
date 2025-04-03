const User = require("../models/User"); // General User Schema
const Doctor = require("../models/Doctor"); // Your Doctor Schema
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, phone, password, userType, expertise, experience, availableHours } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({ email }) || await Doctor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    if (userType === "doctor") {
      // Save doctor in Doctor Collection
      const newDoctor = new Doctor({
        fullName,
        email,
        phone,
        password: hashedPassword, // Store hashed password
        specialization: expertise,
        experience,
        availableHours,
      });

      await newDoctor.save();
      return res.status(201).json({ message: "Doctor registered successfully!" });

    } else {
      // Save normal user in User Collection
      const newUser = new User({
        fullName,
        email,
        phone,
        password: hashedPassword,
        userType, // "patient"
      });

      await newUser.save();
      return res.status(201).json({ message: "Patient registered successfully!" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
