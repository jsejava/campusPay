const expressAsyncHandler = require("express-async-handler");
const Request = require("../../model/Request/Request");
const User = require("../../model/user/User");

//-------------------------------------
//Fetch all
//-------------------------------------
const fetchOrdersCtrl = expressAsyncHandler(async (req, res) => {
  //console.log(req.user._id);
  try {
    const order = await Request.find({ user: req.user._id }).sort({ _id: -1 });
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
    const order = await Request.findById(req.params.id).populate(
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
const orderPayCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const order = await Request.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
    console.log("PAY BACKEND");
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

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
  orderPayCtrl,
};
