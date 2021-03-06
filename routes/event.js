const express = require("express");
const mongoose = require("mongoose");
// const bycrypt = require("bcrypt");
const router = express.Router();
const Event = require("../models/event.model");
// const auth = require("../middleware/auth");
// const jwt = require("jsonwebtoken");
require("dotenv").config();


// Fetching all events
router.get("/", (req, res) => {
    try {
      Event.find((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.json({ message: error });
    }
  });

// Creating a new Event
router.post("/register", async (req, res) => {
  // console.log(req.body);
  try {
    const {
        event,
        eventDate, 
        completed,
    } = req.body;
    if (
      !event ||
      !eventDate
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered for completed" });
    } else {

      // Register a new Event in the database, if the above errors do not occur!!!!!!!
      const newEvent = new Event({
        event: event,
        eventDate: eventDate,
        completed: completed
      });

      const saveEvent = await newEvent
        .save()
        .then((newEvent) => res.json(newEvent))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});


// Feting specific Staff based on (course_title && level)
// router.get("/:course_title/:level", async (req, res) => {
//   try {
//     const specificStaff = await Staff.findById(
//       req.params.course_title && req.params.level
//     );
//     res.status(200).send(specificStaff);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

// Staff Delete Request
router.delete("/:eventId", async (req, res) => {
  try {
    const getEvent = await Event.findById(req.params.eventId);
    if (!getEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }
    await getEvent.remove();

    res.status(200).send("Event deleted Successfully");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("Unable to delete Event");
  }
});

//Update Course
router.patch(
  "/:event_id",
  async (req, res) => {
    console.log(req.body.completed);
    try {
      const updatedEvent = await Event.updateOne(
        { _id: req.params.event_id },
        {
          $set: {
            completed: req.body.completed,
          },
        }
      );
      res.status(200).send("Event updated Successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unable to update Event");
    }
  }
);

module.exports = router;
