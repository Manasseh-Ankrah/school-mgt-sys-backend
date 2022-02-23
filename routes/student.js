const express = require("express");
const mongoose = require("mongoose");
// const bycrypt = require("bcrypt");
const router = express.Router();
const Student = require("../models/student.model");
// const auth = require("../middleware/auth");
// const jwt = require("jsonwebtoken");
require("dotenv").config();


// Fetching all Students
router.get("/", (req, res) => {
  // const {courseTitle, level} = req.query
  // let sortedStudents = [...Student];

  // if (courseTitle) {
  //   sortedStudents = sortedStudents.filter((student)=> {
  //     return student.courseTitle.startsWith(courseTitle)
  //   })
  // }

  try {
    Student.find((err, data) => {
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

// Creting a new Student
router.post("/register", async (req, res) => {
  try {
    const {
      fName,
      lName,
      gender,
      date,
      nationality,
      address,
      email,
      telephone,
      regFees,
      courseTitle,
      courseCode,
      level,
      duration,
      sponsorFName,
      sponsorLName,
      sponsorEmail,
      sponsorTelephone,
    } = req.body;
    if (
      !fName ||
      !lName ||
      !gender ||
      !date ||
      !nationality ||
      !address ||
      !email ||
      !telephone ||
      !regFees ||
      !courseTitle ||
      !courseCode ||
      !level ||
      !duration ||
      !sponsorFName ||
      !sponsorLName ||
      !sponsorEmail ||
      !sponsorTelephone
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else if (!email.includes("@")) {
      return res.status(400).json({ msg: "Enter a valid email for Student" });
    } else if (!sponsorEmail.includes("@")) {
      return res.status(400).json({ msg: "Enter a valid email for Sponsor" });
    } else {
      // Register a new Student in the database, if the above errors do not occur!!!!!!!
      const newStudent = new Student({
        fName: fName,
        lName: lName,
        gender: gender,
        date: date,
        nationality: nationality,
        address: address,
        email: email,
        telephone: telephone,
        regFees: regFees,
        courseTitle: courseTitle,
        courseCode: courseCode,
        level: level,
        duration: duration,
        sponsorFName: sponsorFName,
        sponsorLName: sponsorLName,
        sponsorEmail: sponsorEmail,
        sponsorTelephone: sponsorTelephone,
      });

      const saveStudent = await newStudent
        .save()
        .then(() => res.json("New Student Registered !!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});


// Feting specific Students based on (courseTitle && level)
router.get("/:courseTitle/:level", async (req, res) => {
  try {
    const specificStudent = await Cards.findById(
      req.params.courseTitle && req.params.level
    );
    res.status(200).send(specificStudent);
  } catch (error) {
    res.json({ message: error });
  }
});

// Student Delete Request
router.delete("/:studentId", async (req, res) => {
  try {
    const getStudent = await Student.findById(req.params.studentId);
    if (!getStudent) {
      return res.status(404).json({ msg: "Student not found" });
    }
    await getStudent.remove();

    res.status(200).send("Student deleted Successfully");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Student not found" });
    }
    res.status(500).send("Unable to delete Student");
  }
});

//Update Student
router.patch(
  "/:student_id",
  async (req, res) => {
    console.log(req.params.fName);

    try {
      const updatedStudent = await Student.updateMany(
        { _id: req.params.student_id },
        {
          $set: {
            fName: req.body.fName,
            lName: req.body.lName,
            level: req.body.level,
            courseTitle: req.body.courseTitle,
            // imgUrl: req.body.imgUrl
          },
        }
      );
      res.status(200).send("Student updated Successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unable to update Student information");
    }
  }
);

module.exports = router;
