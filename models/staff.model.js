const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
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
  staff_email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone_no: {
    type: Number,
    required: true,
  },
  // Course section
  role: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
});

module.exports = Staff = mongoose.model("staff", staffSchema);
