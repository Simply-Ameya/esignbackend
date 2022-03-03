const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
require("dotenv").config();   
const secret = process.env.secret;
const UserModel = require("../model/user");
//fu
const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  phone: Joi.number().min(10).required(),
  gender: Joi.string().required(),
});

router.post("/register", async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //   const emailExists = await userModel.findOne({ email: req.body.email });

  //   if (emailExists) return res.status(400).send("email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    gender: req.body.gender,
  });
  console.log(user);
  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
