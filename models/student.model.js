const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  // Biodata section
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  nationality: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  regFees: {
    type: Number,
    required: true,
  },
  // Course section
  courseTitle: {
    type: String,
    required: true,
  },
  courseCode: {
    type: Number,
    required: true,
    maxlength: 6,
  },
  level: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  // Sponsor section
  sponsorFName: {
    type: String,
    required: true,
  },
  sponsorLName: {
    type: String,
    required: true,
  },
  sponsorEmail: {
    type: String,
    required: true,
    // unique: true,
  },
  sponsorTelephone: {
    type: Number,
    required: true,
  },
});

module.exports = Student = mongoose.model("student", studentSchema);
