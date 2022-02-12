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
      course,
      courseCategory,
      courseCode
    } = req.body;
    if (
      !course ||
      !courseCategory ||
      !courseCode
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else {
      // Register a new Course in the database, if the above errors do not occur!!!!!!!
      const newCourse = new Course({
        course: course,
        courseCategory: courseCategory,
        courseCode: courseCode
      });

      const saveCourse = await newCourse
        .save()
        .then(() => res.json("New Course Registered !!"))
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
router.delete("/:courseId", async (req, res) => {
  try {
    const getCourse = await Course.findById(req.params.courseId);
    if (!getCourse) {
      return res.status(404).json({ msg: "Course not found" });
    }
    await getCourse.remove();

    // HINT !!!!!!
    // Why do I have to send the deleted data in my response instead of the updated Course list ???????
    res.json(getCourse);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(500).send("Unable to delete Course");
  }
});

//Update Staff
// router.patch(
//   "/:student_id/:first_name/:last_name/:level/course",
//   async (req, res) => {
//     console.log(req.params.first_name);

//     try {
//       const updatedStudent = await Student.updateMany(
//         { _id: req.params.student_id },
//         {
//           $set: {
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             level: req.body.level,
//             course_title: req.body.course_title,
//           },
//         }
//       );
//       res.json(updatedStudent);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("unable to update Student information");
//     }
//   }
// );

module.exports = router;
