const jwt = require("jsonwebtoken");
require("dotenv").config();
dotenv.load();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });
    const verified = jwt.verify(
      token,
      Buffer.from(process.env.JWT_SECRET, "base64")
    );
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = auth;
