const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const { Query } = require("mongoose");
const bcrypt = require("bcrypt");

const adminlogin = async (req, res) => {
  try {
    const email = req.body.admin.email;
    const password = req.body.admin.password;

    if (process.env.email == email && process.env.password == password) {
      const KEY = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email: process.env.email }, KEY, {
        expiresIn: "8hr",
      });

      const user = {
        email: process.env.email,
        token,
      };
      res.status(200).json({
        message: "authentication true",
        success: true,
        data: { token },
        userData: user,
      });
    } else {
      res.status(401).json({ message: "invaild email or password" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyadmin = async (req, res) => {
  try {
    const KEY = process.env.JWT_SECRET_KEY;
    jwt.verify(req.body.token, KEY, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "auth fail",
          success: false,
        });
      } else {
        const user = {
          email: decode.process.env.email,
        };
        return res
          .status(200)
          .send({ message: "sucess", success: true, userData: user });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
const userlists = async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      const regex = RegExp(req.query.search, "i");
      query.name = { $regex: regex };
    }
    const userdetails = await User.find(query).sort({ name: 1 });

    if (userdetails) {
      return res
        .status(200)
        .send({ message: "sucess", success: true, userdetails });
    } else {
      return res.status(401).send({ message: "false", success: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const block = async (req, res) => {
  try {
    const id = req.query.id;

    const user = await User.findOne({ _id: id });

    user.status = !user.status;
    await user.save();
    const userdata = await User.find();
    return res
      .status(200)
      .send({ message: "sucess ", success: true, userdata });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteuser = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedata = await User.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "sucess", success: true, deletedata });
  } catch (error) {
    console.log(error.message);
  }
};
const adduser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existsuser = await User.findOne({ email: email });
    if (!existsuser) {
      const hashpassword = await bcrypt.hash(password, 10);
      const userdata = new User({ name, email, phone, password: hashpassword });
      const saveData = await userdata.save();

      if (saveData) {
        res
          .status(200)
          .json({ success: true, message: "registration successfully" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "registration  failed" });
      }
    } else {
      res.json({ errorMessage: "user alredy exixts" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

module.exports = {
  adminlogin,
  verifyadmin,
  userlists,
  block,
  deleteuser,
  adduser,
};
