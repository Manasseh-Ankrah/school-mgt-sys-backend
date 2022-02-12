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
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      address,
      staff_email,
      telephone_no,
      role,
      qualification,
      experience,
      salary,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !gender ||
      !date_of_birth ||
      !nationality ||
      !address ||
      !staff_email ||
      !telephone_no ||
      !role ||
      !qualification ||
      !experience ||
      !salary
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else if (!staff_email.includes("@")) {
      return res.status(400).json({ msg: "Enter a valid email for Staff" });
    } else {
      // Register a new Staff in the database, if the above errors do not occur!!!!!!!
      const newStaff = new Staff({
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        date_of_birth: date_of_birth,
        nationality: nationality,
        address: address,
        staff_email: staff_email,
        telephone_no: telephone_no,
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

    // HINT !!!!!!
    // Why do I have to send the deleted data in my response instead of the updated Staff list ???????
    res.json(getStaff);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Staff not found" });
    }
    res.status(500).send("Unable to delete Staff");
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
