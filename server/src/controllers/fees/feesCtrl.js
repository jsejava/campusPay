const expressAsyncHandler = require("express-async-handler");
const Fees = require("../../model/fees/Fees");
//const Expense = require("../../model/Expense/Expense");
const User = require("../../model/user/User");
//-------------------------------------
//Create
//-------------------------------------
const createExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { description, title, amount } = req.body;
  //console.log("USER", req.user.email);
  const email = req.user.email;
  const Wallet = req.user.Wallet;
  const userFound = await User.findOne({ email });
  const wallet = await User.findOne({ Wallet });
  console.log("amount", amount);
  console.log("wallet", wallet.Wallet);
  if (userFound && (await userFound?.isPinMatched(description))) {
    if (wallet && (await wallet.Wallet) > amount) {
      try {
        const exp = await Fees.create({
          description,
          title,
          amount,
          user: req?.user?._id,
        });
        res.json(exp);
      } catch (error) {
        res.json(error);
      }
    } else {
      res.status(401);
      throw new Error("insufficient balance");
    }
  } else {
    res.status(401);
    throw new Error("PIN");
  }
});
//-------------------------------------
//Fetch all
//-------------------------------------
const fetchExpensesCtrl = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    // const incomes = await Expense.paginate(
    //   { amount: { $eq: 3 } },
    //   { limit: 10, page, sort: "desc", populate: ["user"] }
    // );
    const expenses = await Fees.paginate(
      {},
      {
        limit: 10,
        page: Number(page),
        sort: "desc",
        populate: ["user"],
      }
    );
    res.json(expenses);
  } catch (error) {
    res.json(error);
  }
});

// const fetchExpensesCtrl = expressAsyncHandler(async (req, res) => {
//   const { page } = req?.query;
//   const match = {};
//   const sort = {};
//   try {
//     const expenses = await Expense.find().limit(2).skip(10);
//     res.json(expenses);
//   } catch (error) {
//     res.json(error);
//   }
// });

//-------------------------------------
//Fetch single
//-------------------------------------
const fetchExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Fees.findById(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Update
//-------------------------------------
const updateExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { description, title, amount } = req.body;
  try {
    const income = await Fees.findByIdAndUpdate(
      id,
      {
        description,
        title,
        amount,
      },
      { new: true, runValidators: true }
    );
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Delete
//-------------------------------------
const deletExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Fees.findByIdAndDelete(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createExpenseCtrl,
  fetchExpenseCtrl,
  fetchExpensesCtrl,
  updateExpenseCtrl,
  deletExpenseCtrl,
};
