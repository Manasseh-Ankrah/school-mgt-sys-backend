const express = require("express");
const mongoose = require("mongoose");
// const bycrypt = require("bcrypt");
const router = express.Router();
const FeeSetup = require("../models/fee_setup.model");
// const auth = require("../middleware/auth");
// const jwt = require("jsonwebtoken");
require("dotenv").config();


// Fetching all FeeSetup
router.get("/", (req, res) => {
    try {
      FeeSetup.find((err, data) => {
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

// Creating a new FeeSetup
router.post("/register", async (req, res) => {
  try {
    const {
      level,
      amount,
    } = req.body;
    if (
      !level ||
      !amount
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else {
      // Register a new FeeSetup in the database, if the above errors do not occur!!!!!!!
      const newFeeSetup = new FeeSetup({
        level: level,
        amount: amount
      });

      const saveCourse = await newFeeSetup
        .save()
        .then((newFeeSetup) => res.json(newFeeSetup))
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
router.delete("/:course_Id", async (req, res) => {
  try {
    const getCourse = await FeeSetup.findById(req.params.course_Id);
    if (!getCourse) {
      return res.status(404).json({ msg: "FeeSetup not found" });
    }
    await getCourse.remove();

    res.status(200).send("FeeSetup deleted Successfully");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "FeeSetup not found" });
    }
    res.status(500).send("Unable to delete FeeSetup");
  }
});

//Update FeeSetup
router.patch(
  "/:course_id",
  async (req, res) => {
    // console.log(req.params.course_id);
    try {
      const updatedCourse = await FeeSetup.updateMany(
        { _id: req.params.course_id },
        {
          $set: {
            level: req.body.level,
            amount: req.body.amount,
            // imgUrl: req.body.imgUrl
          },
        }
      );
      res.status(200).send("FeeSetup updated Successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unable to update FeeSetup information");
    }
  }
);

module.exports = router;
