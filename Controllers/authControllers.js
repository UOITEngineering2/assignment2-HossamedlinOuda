const User = require("../models/User");

const mongoose = require("mongoose");

require("dotenv").config();

const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');

const handle_errors = (err) => {
  const error_obj = {};
  if (err.code === 11000) {
    error_obj["msg"] = " Duplicate email ";
    error_obj.status_code = 11000;
  }

  if (err.message == "Incorrect password") {
    error_obj["msg"] = err.message;
    error_obj.status_code = 401;
  } else if (err.message == "Incorrect email") {
    error_obj["msg"] = "Your email is not registered in the system";
    error_obj.status_code = 401;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error_obj[properties.path] = properties.message;
      //console.log("my path " , properties.path , " the message in it " ,properties.message );
    });
    error_obj.status_code = 400;
  }
  return error_obj;
};

module.exports.signupPost = async (req, res) => {
  //console.log("the recieved request ", req.body);
  const { firstName, lastName, email, password } = req.body;
    try {
      const my_user = await User.create({
        firstName,
        lastName,
        email,
        password
      });
      //console.log("sign up is successfull", my_user._id);
      const id = my_user._id;
      console.log("MY USER ID IS",id);
      const token = jwt.sign({ id }, "Network_computing_task", {
        expiresIn: 3 * 24 * 60 * 60,
      });
      res.cookie("GameToken", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      console.log("cookie is created ");
      res.status(201).json({ msg: "sign up is successfull", userID: my_user._id });
    } catch (err) {
      const recieved_Err = handle_errors(err);
      console.log("error occured during signup process ", err);
      res.status(400).json({ recieved_Err });
    }
  
};

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const my_user = await User.login(email, password);
    console.log("login is successfull", my_user._id);
    const id = my_user._id;
    const token = jwt.sign({ id }, "Network_computing_task", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    //console.log("token is created waiting to add attributes ....");
    res.cookie("GameToken", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ msg: "login is successfull", userID: my_user._id });
    console.log("logged in ");
  } catch (error) {
    console.log(error);
    const recived_Err = handle_errors(error);
    //console.log(error.message, "*****", error.code)
    res.status(400).json({ recived_Err });
  }
};

