const express = require("express");
const {
  createWalletCtrl,
  fetchWalletsCtrl,
  fetchWalletCtrl,
  updateWalletCtrl,
  deletWalletCtrl,
} = require("../../controllers/wallet/walletCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const walletRoute = express.Router();

walletRoute.post("/", authMiddleware, createWalletCtrl);
walletRoute.get("/", authMiddleware, fetchWalletsCtrl);
walletRoute.get("/:id", authMiddleware, fetchWalletCtrl);
walletRoute.put("/:id", authMiddleware, updateWalletCtrl);
walletRoute.delete("/:id", authMiddleware, deletWalletCtrl);
module.exports = walletRoute;
