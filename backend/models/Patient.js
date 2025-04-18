const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const pateintSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["patient", "doctor"], required: true },
  disease:{type: String,default:"NIL"},
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})
module.exports = mongoose.model('Pateint', pateintSchema);

