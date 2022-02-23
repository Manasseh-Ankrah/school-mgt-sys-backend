const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
 
});

module.exports = Course = mongoose.model("course", courseSchema);
