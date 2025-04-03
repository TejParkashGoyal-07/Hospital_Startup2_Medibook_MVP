const mongoose = require("mongoose");

const DiseaseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  diseaseName: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Disease", DiseaseSchema);
