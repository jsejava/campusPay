const expressAsyncHandler = require("express-async-handler");
const Order = require("../../model/Order/Order");
const User = require("../../model/user/User");

//-------------------------------------
//Fetch all
//-------------------------------------
const fetchOrdersCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user._id);
  try {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Fetch single
//-------------------------------------
const fetchOrderCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "id firstname lastname email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Update
//-------------------------------------
// const updateExpenseCtrl = expressAsyncHandler(async (req, res) => {
//   const { id } = req?.params;
//   const { description, title, amount } = req.body;
//   try {
//     const income = await Expense.findByIdAndUpdate(
//       id,
//       {
//         description,
//         title,
//         amount,
//       },
//       { new: true, runValidators: true }
//     );
//     res.json(income);
//   } catch (error) {
//     res.json(error);
//   }
// });

//-------------------------------------
//Delete
//-------------------------------------
// const deletExpenseCtrl = expressAsyncHandler(async (req, res) => {
//   const { id } = req?.params;
//   try {
//     const income = await Expense.findByIdAndDelete(id);
//     res.json(income);
//   } catch (error) {
//     res.json(error);
//   }
// });

module.exports = {
  fetchOrdersCtrl,
  fetchOrderCtrl,
};
