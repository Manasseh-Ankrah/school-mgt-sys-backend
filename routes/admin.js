const express = require("express");
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const router = express.Router();
const Admin = require("../models/admin.model");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// for generating secrete token
// require('crypto').randomBytes(64).toString('hex')

// router.post("/login",  (req, res) => {
//   res.json({"data":req.body})
// })

router.post("/register", async (req, res) => {
  try {
    const { password, email, passwordCheck, displayName } = req.body;

    const existingAdmin = await Admin.findOne({ email: email });
    // console.log(existingAdmin);
    // console.log(req.body);
    //   Validating Register Details

    // Checking if user has submitted the necessary information
    if (!password || !email || !passwordCheck || !displayName) {
      res.status(400).json({ msg: "Not all the fields has been filled" });
    }

    // Checking if the Password Length is more than 5
    else if (password.length < 5) {
      res
        .status(400)
        .json({ msg: "Password should be more than 5 characters long" });
    }

    // Checking if the Password Length is more than 5
    else if (!email.includes("@")) {
      res.status(400).json({ msg: "Email should an @ symbol" });
    }

    // Checking if password and passwordCheck are the same
    else if (password != passwordCheck) {
      res
        .status(400)
        .json({ msg: "Enter the same password twice for verification" });
    }

    // Checking if user dosen't have an account with the same email
    else if (existingAdmin) {
      res
        .status(400)
        .json({ msg: "An account with the same email already exists" });
    } else {
      // Encrypting or Hashing User password before storing it in the database
      const salt = await bycrypt.genSalt();
      const passwordHash = await bycrypt.hash(password, salt);

      // Creating a newUser variable which is ready to be saved in the db
      const newAdmin = new Admin({
        email: email,
        password: passwordHash,
        displayName: displayName,
      });

      // Saving the user details in the db
      const savedUser = await newAdmin
        .save()
        .then(() => res.json("Admin added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    const admin = await Admin.findOne({ email: email });
    if (!admin)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    const isMatch = await bycrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const token = jwt.sign(
      { id: admin._id },
      "ef3ee8a527ee80718e822c040d24998b833aba902e26e3adce3b571786f9a39753f60cfa1917d26df04b03df8ca29cb851f3b81559782445d15e6a10ec630005"
    );
    res.json({
      token,
      admin: { id: admin._id, displayName: admin.displayName },
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const admin = await Admin.findById(verified.id);
    if (!admin) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/", auth, async (req, res) => {
  const admin = await Admin.findById(req.admin);
  res.json(
    //   {
    //   displayName: admin.displayName,
    //   id: admin._id,
    // }
    "HELLO"
  );
});

module.exports = router;
