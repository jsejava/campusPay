const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//create schema
const expenseSchema = new mongoose.Schema(
  {
    title: {
      required: [true, "reference  is required"],
      type: String,
    },
    type: {
      type: String,
      default: "expense",
    },
    description: {
      required: [true, "pin  is required"],
      type: String,
    },
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

expenseSchema.plugin(mongoosePaginate);
//Compile schema into model
const Expense = mongoose.model("Expense", expenseSchema);

//match password
// expenseSchema.methods.isPasswordMatched = async function (enteredDescription) {
//   return await bcrypt.compare(enteredDescription, this.password);
// };

module.exports = Expense;
