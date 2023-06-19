const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      required: [true, "First name is required"],
      type: String,
    },
    lastname: {
      required: [true, "Last name is required"],
      type: String,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Hei buddy Password is required"],
    },
    pin: {
      type: String,
    },
    Wallet: {
      type: Number,
      default: 0,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//virtual method to populate created post
userSchema.virtual("expenses", {
  ref: "Expense",
  foreignField: "user",
  localField: "_id",
});

//virtual method to populate created post
userSchema.virtual("income", {
  ref: "Income",
  foreignField: "user",
  localField: "_id",
});
//virtual method to populate created post
userSchema.virtual("fees", {
  ref: "Fees",
  foreignField: "user",
  localField: "_id",
});

//Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Hash pin
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("pin")) {
//     next();
//   }
//hash pin
//   const salt = await bcrypt.genSalt(10);
//   this.pin = await bcrypt.hash(this.pin, salt);
//   next();
// });
//match Pin
userSchema.methods.isPinMatched = async function (enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin);
};

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
