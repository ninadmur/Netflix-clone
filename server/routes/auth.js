const express = require('express');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(
      JSON.stringify(password),
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (!user) {
      res.status(401).json('Wrong password or username');
    } else {
      var bytes = await CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );
      var decryptedPassword = await JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
      );
    }
    if (password !== decryptedPassword) {
      res.status(401).json('Wrong password or username');
    } else {
      const accessToken = await jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.SECRET_KEY,
        { expiresIn: '5d' }
      );
      console.log(accessToken);
      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
