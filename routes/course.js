const express = require("express");
const mongoose = require("mongoose");
// const bycrypt = require("bcrypt");
const router = express.Router();
const Course = require("../models/course.model");
// const auth = require("../middleware/auth");
// const jwt = require("jsonwebtoken");
require("dotenv").config();


// Fetching all Course
router.get("/", (req, res) => {
    try {
      Course.find((err, data) => {
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

// Creating a new Course
router.post("/register", async (req, res) => {
  try {
    const {
      courseTitle,
      courseCategory,
      courseCode
    } = req.body;
    if (
      !courseTitle ||
      !courseCategory ||
      !courseCode
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else {
      // Register a new Course in the database, if the above errors do not occur!!!!!!!
      const newCourse = new Course({
        courseTitle: courseTitle,
        courseCategory: courseCategory,
        courseCode: courseCode
      });

      const saveCourse = await newCourse
        .save()
        .then((newCourse) => res.json(newCourse))
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
    const getCourse = await Course.findById(req.params.course_Id);
    if (!getCourse) {
      return res.status(404).json({ msg: "Course not found" });
    }
    await getCourse.remove();

    res.status(200).send("Course deleted Successfully");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(500).send("Unable to delete Course");
  }
});

//Update Course
router.patch(
  "/:course_id",
  async (req, res) => {
    // console.log(req.params.course_id);
    try {
      const updatedCourse = await Course.updateMany(
        { _id: req.params.course_id },
        {
          $set: {
            courseTitle: req.body.courseTitle,
            courseCategory: req.body.courseCategory,
            // imgUrl: req.body.imgUrl
          },
        }
      );
      res.status(200).send("Course updated Successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unable to update Course information");
    }
  }
);

module.exports = router;
