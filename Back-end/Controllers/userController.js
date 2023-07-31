const User = require('../Models/userModel')
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();


const register = async function (req, res, next) {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      throw new Error('name, email and password are required')
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) throw new Error('User already exists');

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    await newUser.save()
    res.status(200).json(newUser)
  } catch (e) {
    console.log(e)
    return res.status(400).json({ e })
  }
}

// Login
const login = async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));


    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "secretKey"
    );
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: false,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};


const getUser = async function (req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate("messages profile");

    res.status(200).json({ user });
  } catch (e) {
    res.status(400).json({ e })
  }
}
const logout = async function (req, res) {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.")
}

const logoutAll = async function (req, res) {
  try {
    req.user.tokens = []
    await req.user.save()
    res.status(200).send('successfully logged out from all devices')
  } catch (e) {
    res.status(500).json({ e })
  }
}

module.exports = { register, login, getUser, logout, logoutAll }
