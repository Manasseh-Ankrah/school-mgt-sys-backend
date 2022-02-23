const mongoose = require("mongoose");

const feeSetupSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
//   courseCode: {
//     type: String,
//     required: true,
//   },
 
});

module.exports = FeeSetup = mongoose.model("adjustfee", feeSetupSchema);
