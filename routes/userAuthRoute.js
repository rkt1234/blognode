const express = require("express");
const router = express.Router();
const User = require("../models/user");
const SECRET_KEY = require("../configuation/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// user registration route
router.post("/register", async (req, res) => {
  console.log("register");
  let { email, password, imageUrl, userName } = req.body;
  console.log(email);
  console.log(userName);
  password = bcrypt.hashSync(password, 10);
  const userData = {
    email: email,
    password: password,
    username: userName,
    imageurl: imageUrl,
  };
  const user = new User(userData);
  try {
    const result = await user.save();
    const payload = {
      username: user.username,
      userid: user._id,
      imageurl: user.imageurl,
    };
    const jwt_token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ msg: jwt_token });
  } catch (err) {
    if (err.code == 11000) {
      const keyValue = err.keyValue;
      const duplicateKey = Object.keys(keyValue)[0];

      if (duplicateKey == "email") {
        res.status(500).json({ msg: "email already exists" });
      } else {
        res.status(500).json({ msg: "username already exists" });
      }
    } else {
      console.log(err);
      res.status(500).json({ msg: "internal server error" });
    }
  }
});

// user login route
router.post("/login", async (req, res) => {
  console.log("login");
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("email does not exist");
      res.status(500).json({ msg: "email does not exist" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("password does not match");
        res.status(500).json({ msg: "invalid password" });
      } else {
        const payload = {
          username: user.username,
          userid: user._id,
          imageurl: user.imageurl,
        };
        const jwt_token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ msg: jwt_token });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "internal server error" });
  }
});
module.exports = router;
