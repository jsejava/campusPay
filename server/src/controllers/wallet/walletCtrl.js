const expressAsyncHandler = require("express-async-handler");
const Wallet = require("../../model/wallet/wallet");
const User = require("../../model/user/User");
//-------------------------------------
//Create
//-------------------------------------
const createWalletCtrl = expressAsyncHandler(async (req, res) => {
  //console.log(req.body);
  const { amount } = req.body;
  //console.log("USER", req.user.email);
  // const email = req.user.email;
  // const userFound = await User.findOne({ email });
  //console.log("USER", userFound);
  // if (userFound && (await userFound?.isPinMatched(description))) {
  try {
    const exp = await Wallet.create({
      amount,
      user: req?.user?._id,
    });
    res.json(exp);
  } catch (error) {
    res.json(error);
  }
  // } else {
  //   res.status(401);
  //   throw new Error("PIN");
  // }
});

//-------------------------------------
//Fetch all
//-------------------------------------
const fetchWalletsCtrl = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const wallets = await Wallet.paginate(
      {},
      {
        limit: 10,
        page: Number(page),
        sort: "desc",
        populate: ["user"],
      }
    );
    res.json(wallets);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Fetch single
//-------------------------------------
const fetchWalletCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Wallet.findById(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Update
//-------------------------------------
const updateWalletCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { amount } = req.body;
  try {
    const income = await Wallet.findByIdAndUpdate(
      id,
      {
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
const deletWalletCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Wallet.findByIdAndDelete(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createWalletCtrl,
  fetchWalletCtrl,
  fetchWalletsCtrl,
  updateWalletCtrl,
  deletWalletCtrl,
};
