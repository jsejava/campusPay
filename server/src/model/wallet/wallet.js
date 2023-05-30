const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//create schema
const walletSchema = new mongoose.Schema(
  {
    // title: {
    //   required: [true, "reference  is required"],
    //   type: String,
    // },
    type: {
      type: String,
      default: "wallet",
    },
    // description: {
    //   required: [true, "pin  is required"],
    //   type: String,
    // },
    amount: {
      required: [true, "Amount is required"],
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
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

walletSchema.plugin(mongoosePaginate);
//Compile schema into model
const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
