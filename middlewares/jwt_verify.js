const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../configuation/config");
const verifyJWT = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: "Unauthorized user" });
      } else {
        console.log(decoded);
        next();
      }
    });
  }
  else {
    res.status(500).json({msg : "Unauthorized user"})
  }
};
module.exports = verifyJWT
