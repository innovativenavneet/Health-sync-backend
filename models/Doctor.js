const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  isActive: Boolean,
});
module.exports = mongoose.model("User", userSchema);

const PrescriptionSchema = new mongoose.Schema({
  uid: String,
  symptoms: [String],
  medicines: [String],
  date: { type: Date, default: Date.now },
});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;



const appointmentSchema = new mongoose.Schema({
  userUid: { type: String, required: true },
  userName: { type: String, required: true },
  transcription: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

