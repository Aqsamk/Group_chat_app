
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

function isstringinvalid(string) {
    if (string == undefined || string.length === 0) {
      return true;
    } else {
      return false;
    }
}
const signup = async (req, res) => {
    try {
      const { name, email,phonenumber, password } = req.body;
      if (
        isstringinvalid(name) ||
        isstringinvalid(email) ||
        isstringinvalid(phonenumber) ||
        isstringinvalid(password)
      ) {
        return res
          .status(400)
          .json({ err: "Bad Parameters . Something is missing." });
      }
      // Check if user already exists with given email
      const user = await User.findOne({ email });
      if (user) {
          return res.status(409).json({ err: "Email already in use." });
      }
      const saltrounds = 10;
      bcrypt.hash(password, saltrounds, async (err, hash) => {
        console.log(err);
        await User.create({ name, email,phonenumber, password: hash });
        res.status(201).json({ message: "Successfully created new user" });
      });
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  };

  module.exports = {signup}