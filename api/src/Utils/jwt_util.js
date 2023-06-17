const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });
};

const verifyAccessToken = (req, res, next) => {
  console.log("I am called");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    const data = {
      success: false,
      message: "Missing authorization header or token!",
    };
    res.status(401).json(data);
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded_payload) => {
      if (err) {
        const data = {
          success: false,
          message: "Invalid token!",
        };
        res.status(401).json(data);
      } else {
        req.user = decoded_payload;

        next();
      }
    });
  }
};

module.exports = {
  verifyAccessToken,
  generateAccessToken,
};
