const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const Admin = require("./routes/admin");
const Student = require("./routes/student");
const app = express();
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/admin", Admin);
app.use("/student", Student);

// Port variable
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
