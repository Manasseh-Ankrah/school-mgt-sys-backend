const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

module.exports = Event = mongoose.model("event", eventSchema);
