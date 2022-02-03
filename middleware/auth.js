const jwt = require("jsonwebtoken");
require("dotenv").config();
// dotenv.load();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });
    const verified = jwt.verify(
      token,
      "ef3ee8a527ee80718e822c040d24998b833aba902e26e3adce3b571786f9a39753f60cfa1917d26df04b03df8ca29cb851f3b81559782445d15e6a10ec630005"
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
