const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Doctor = require("../models/Doctor"); // Import Doctor model
const jwt = require("jsonwebtoken");
const router = express.Router();
const Patient = require("../models/Patient"); // Add this at the top
// Import Patient model
const diseaseOrganMapping = require("../utils/diseaseOrganMapping");
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
router.post("/insert-disease", async (req, res) => {
  try {
    const { email, diseaseName, description } = req.body;

    if (!email || !diseaseName || !description) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the disease exists in our mapping
    const diseaseInfo = diseaseOrganMapping[diseaseName];
    if (!diseaseInfo) {
      return res.status(404).json({ success: false, message: "No mapping found for this disease" });
    }

    const affectedOrgan = diseaseInfo.organ;
    const doctorSpecialization = diseaseInfo.doctor;

    // Find a doctor with the correct specialization
    const doctor = await Doctor.findOne({ specialization: doctorSpecialization });

    // Save patient disease entry
    const newPatientRecord = new Patient({
      email,
      disease: diseaseName,
      description,
    });

    await newPatientRecord.save();

    if (!doctor) {
      return res.status(201).json({
        success: true,
        message: "Disease entry saved successfully! No matching doctor found yet.",
        patient: newPatientRecord
      });
    }

    res.status(201).json({
      success: true,
      message: "Disease entry saved successfully!",
      patient: newPatientRecord,
      matchedDoctor: {
        name: doctor.fullName,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization,
        experience: doctor.experience
      }
    });
  } catch (error) {
    console.error("Insert Disease Error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
});

router.get("/get-patient/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    // Get the affected organ and doctor type
    const diseaseInfo = diseaseOrganMapping[patient.disease];
    if (!diseaseInfo) {
      return res.status(404).json({ success: false, message: "No mapping found for this disease" });
    }

    const doctor = await Doctor.findOne({ specialization: diseaseInfo.doctor });

    res.status(200).json({
      success: true,
      patient,
      matchedDoctor: doctor ? {
        name: doctor.fullName,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization,
        experience: doctor.experience
      } : null
    });
  } catch (error) {
    console.error("Get Patient Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/find-doctor", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    // Find the disease associated with the email
    const patientDisease = await Disease.findOne({ email });
    if (!patientDisease) return res.status(404).json({ success: false, message: "No disease found for this email" });

    // Find a doctor specializing in this disease
    const doctor = await Doctor.findOne({ specialization: patientDisease.diseaseName });
    if (!doctor) return res.status(404).json({ success: false, message: "No doctor available for this disease" });

    res.json({ success: true, doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
