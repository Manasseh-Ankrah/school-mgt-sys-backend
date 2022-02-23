const express = require("express");
const mongoose = require("mongoose");
// const bycrypt = require("bcrypt");
const router = express.Router();
const Staff = require("../models/staff.model");
// const auth = require("../middleware/auth");
// const jwt = require("jsonwebtoken");
require("dotenv").config();


// Fetching all Staff
router.get("/", (req, res) => {
    try {
      Staff.find((err, data) => {
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

// Creting a new Staff
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
      role,
      qualification,
      experience,
      salary,
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
      !role ||
      !qualification ||
      !experience ||
      !salary
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else if (!email.includes("@")) {
      return res.status(400).json({ msg: "Enter a valid email for Staff" });
    } else {
      // Register a new Staff in the database, if the above errors do not occur!!!!!!!
      const newStaff = new Staff({
        fName: fName,
        lName: lName,
        gender: gender,
        date: date,
        nationality: nationality,
        address: address,
        email: email,
        telephone: telephone,
        role: role,
        qualification: qualification,
        experience: experience,
        salary: salary,
      });

      const saveStaff = await newStaff
        .save()
        .then(() => res.json("New Staff Registered !!"))
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
router.delete("/:staffId", async (req, res) => {
  try {
    const getStaff = await Staff.findById(req.params.staffId);
    if (!getStaff) {
      return res.status(404).json({ msg: "Staff not found" });
    }
    await getStaff.remove();

    res.status(200).send("Student deleted Successfully");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Staff not found" });
    }
    res.status(500).send("Unable to delete Staff");
  }
});

//Update Staff
router.patch(
  "/:staff_id",
  async (req, res) => {
    console.log(req.params.fName);

    try {
      const updatedStaff = await Staff.updateMany(
        { _id: req.params.staff_id },
        {
          $set: {
            fName: req.body.fName,
            lName: req.body.lName,
            qualification: req.body.qualification,
            salary: req.body.salary,
            // imgUrl: req.body.imgUrl
          },
        }
      );
      res.json(updatedStaff);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("unable to update Student information");
    }
  }
);

module.exports = router;
