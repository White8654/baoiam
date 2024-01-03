const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Appointment = new mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
