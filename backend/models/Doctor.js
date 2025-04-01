const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        specialization: { type: String, required: true },
        experience: { type: Number, required: true },
        availableHours: {
            from: { type: Number, required: true },  // Store as 9 (for 9 AM)
            to: { type: Number, required: true },    // Store as 18 (for 6 PM)
        },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },  // Admin Approval
        appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    },
    { timestamps: true }
);

// Hash password before saving
doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("Doctor", doctorSchema);
