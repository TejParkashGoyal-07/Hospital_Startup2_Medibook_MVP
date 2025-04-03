const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Patient Email
  disease: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // Reference to the matched Doctor
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Linking to Doctor Schema
    default: null // Initially null if no doctor is found
  }
});

module.exports = mongoose.model("Patient", patientSchema);
