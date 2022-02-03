const express = require("express");
const mongoose = require("mongoose");
// const bycrypt = require("bcrypt");
const router = express.Router();
const Student = require("../models/student.model");
// const auth = require("../middleware/auth");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// Creting a new Student
router.post("/register", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      address,
      student_email,
      telephone_no,
      reg_fees,
      course_title,
      course_code,
      level,
      duration,
      spon_fname,
      spon_lname,
      spon_email,
      spon_telephone,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !gender ||
      !date_of_birth ||
      !nationality ||
      !address ||
      !student_email ||
      !telephone_no ||
      !reg_fees ||
      !course_title ||
      !course_code ||
      !level ||
      !duration ||
      !spon_fname ||
      !spon_lname ||
      !spon_email ||
      !spon_telephone
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else if (!student_email.includes("@")) {
      return res.status(400).json({ msg: "Enter a valid email for Student" });
    } else if (!spon_email.includes("@")) {
      return res.status(400).json({ msg: "Enter a valid email for Sponsor" });
    } else {
      // Register a new Student in the database, if the above errors do not occur!!!!!!!
      const newStudent = new Student({
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        date_of_birth: date_of_birth,
        nationality: nationality,
        address: address,
        student_email: student_email,
        telephone_no: telephone_no,
        reg_fees: reg_fees,
        course_title: course_title,
        course_code: course_code,
        level: level,
        duration: duration,
        spon_fname: spon_fname,
        spon_lname: spon_lname,
        spon_email: spon_email,
        spon_telephone: spon_telephone,
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

// Fetching all Students
router.get("/", (req, res) => {
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

// Feting specific Students based on (course_title && level)
router.get("/:course_title/:level", async (req, res) => {
  try {
    const specificStudent = await Cards.findById(
      req.params.course_title && req.params.level
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

    // HINT !!!!!!
    // Why do I have to send the deleted data in my response instead of the updated Student list ???????
    res.json(getStudent);
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
  "/:student_id/:first_name/:last_name/:level/course",
  async (req, res) => {
    console.log(req.params.first_name);

    try {
      const updatedStudent = await Student.updateMany(
        { _id: req.params.student_id },
        {
          $set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            level: req.body.level,
            course_title: req.body.course_title,
          },
        }
        // imgUrl: req.body.imgUrl
      );
      res.json(updatedStudent);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("unable to update Student information");
    }
  }
);

module.exports = router;
