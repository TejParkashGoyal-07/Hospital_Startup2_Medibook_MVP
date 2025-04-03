const Doctor = require('../models/Doctor');

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

exports.updateAvailability = async (req, res) => {
  const { doctorId, available } = req.body;
  await Doctor.findByIdAndUpdate(doctorId, { available });
  res.json({ message: 'Availability Updated' });
};
