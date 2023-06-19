const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../config/token/generateToken");
const validateMongodbId = require("../../utils/validateMongodbID");
const jwt = require("jsonwebtoken");
const sendEmailtoUser = require("../../config/EmailTemplate.js");
const sendPintoUser = require("../../config/PinTemplate.js");
var generator = require("generate-password");

const express = require("express");
const morgan = require("morgan");
const app = express();
//register view engine
app.set("view engine", "ejs");

//listen for request

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// route
app.get("http://localhost:5001/api/users/verify/:token", (req, res) => {
  res.render("about");
});

var pin = generator.generate({
  length: 4,
  numbers: true,
  // exclude: true,
});

//-------------------------------------
//Register
//-------------------------------------

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  //Check if user Exist
  const userExists = await User.findOne({ email: req?.body?.email });
  //console.log(req.body);
  if (userExists) throw new Error("User already exists");

  // Generate Token

  const secretKey = "welcomeToCodeWithviju";

  const token = jwt.sign({ email: email }, secretKey, {
    expiresIn: "10m",
  });

  const link = `http://localhost:5001/api/users/verify/${token}`;

  sendEmailtoUser(link, email, pin);
  try {
    //Register user
    const user = await User.create({
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      password: req?.body?.password,
      // pin: req?.body?.pin,
      Wallet: req?.body?.Wallet,
      isVerified: false,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// //-------------------------------
// //Login user
// //-------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  if (userFound) {
    const isVerifiedProfile = await User.findById(userFound._id);
    if (isVerifiedProfile.isVerified) {
      //Check if password is match
      if (
        email === userFound.email &&
        (await userFound?.isPasswordMatched(password))
      ) {
        res.json({
          _id: userFound?._id,
          firstName: userFound?.firstName,
          lastName: userFound?.lastName,
          email: userFound?.email,
          isAdmin: userFound?.isAdmin,
          token: generateToken(userFound?._id),
        });
      } else {
        res.status(401);
        throw new Error("Invalid Login Credentials");
      }
    } else {
      return res.status(400).json({ message: "Email Verification Pending" });
    }
  } else {
    return res.status(400).json({ message: "user Not Registered!!" });
  }
});

//-------------------------------
//user verification
//-------------------------------

const saveVerifiedEmailCtrl = async (req, res) => {
  const { token } = req.params;
  // var pin = generator.generate({
  //   length: 4,
  //   numbers: true,
  //   // exclude: true,
  // });
  try {
    if (token) {
      // token verify
      const secretKey = "welcomeToCodeWithviju";
      const isEmailVerified = await jwt.verify(token, secretKey);
      if (isEmailVerified) {
        const getUser = await User.findOne({
          email: isEmailVerified.email,
        });
        // Pin HAshing
        const genSalt = await bcrypt.genSalt(10);
        const hashedPin = await bcrypt.hash(pin, genSalt);
        const saveEmail = await User.findByIdAndUpdate(getUser._id, {
          $set: {
            isVerified: true,
            pin: hashedPin,
          },
        });
        // sendPintoUser(pin, getUser.email);
        if (saveEmail) {
          return res.status(200).render("about");
          //.json({ message: "Email Verification Success" });
        }

        //
      } else {
        return res.status(400).json({ message: "Link Expired" });
      }
    } else {
      return res.status(400).json({ message: "Invalid URL" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//------------------------------
//Users
//-------------------------------
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  // console.log("User call");
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Delete user
//------------------------------
const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//----------------
//user details
//----------------
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//User profile
//------------------------------

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;

  try {
    const myProfile = await User.findById(_id).populate([
      "expenses",
      "income",
      "fees",
    ]);

    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Update Wallet
//------------------------------
const updateUserWalletCtrl = expressAsyncHandler(async (req, res) => {
  // console.log("Bakeng Wallet Updated...............");
  const { id } = req.body;

  validateMongodbId(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      Wallet: req?.body?.Wallet,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//------------------------------
//Update profile
//------------------------------
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { pin: currentpin, newpin } = req.body;
  // console.log(currentpin, newpin);

  const { _id } = req?.user;
  validateMongodbId(_id);
  const userFound = await User.findOne({ _id });
  if (userFound && (await userFound?.isPinMatched(currentpin))) {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(newpin, genSalt);

    try {
      const user = await User.findByIdAndUpdate(
        _id,
        {
          pin: hashedPin,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(user);
      console.log(user);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.status(401);
    throw new Error("rejected current pin");
  }
});

//------------------------------
//Update password
//------------------------------

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserWalletCtrl,
  updateUserPasswordCtrl,
  saveVerifiedEmailCtrl,
};

//// firstname: req?.body?.firstname,
//// lastname: req?.body?.lastname,
//// email: req?.body?.email,
//// Wallet: req?.body?.Wallet,
