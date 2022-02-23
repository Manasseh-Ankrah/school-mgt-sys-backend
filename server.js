const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const Admin = require("./routes/admin");
const Student = require("./routes/student");
const Staff = require("./routes/staff");
const Course = require("./routes/course");
const FeeSetup = require("./routes/fee_setup");
// const Fees = require("./routes/fees");
const Event = require("./routes/event");
const app = express();
require("dotenv").config();
// Port variable
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/admin", Admin);
app.use("/student", Student);
app.use("/staff", Staff);
app.use("/course", Course);
app.use("/fee_setup", FeeSetup);
app.use("/event", Event);
// app.use("/fees", Fees);

app.get("/", (req, res) => {
  res.send("School Management Backend is ACTIVE!!");
});

// Database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
