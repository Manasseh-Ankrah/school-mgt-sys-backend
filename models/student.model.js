const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  // Biodata section
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date_of_birth: {
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
  student_email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone_no: {
    type: Number,
    required: true,
  },
  reg_fees: {
    type: Number,
    required: true,
  },
  // Course section
  course_title: {
    type: String,
    required: true,
  },
  course_code: {
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
  spon_fname: {
    type: String,
    required: true,
  },
  spon_lname: {
    type: String,
    required: true,
  },
  spon_email: {
    type: String,
    required: true,
    unique: true,
  },
  spon_telephone: {
    type: Number,
    required: true,
  },
});

module.exports = Student = mongoose.model("student", studentSchema);
