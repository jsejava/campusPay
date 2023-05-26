const express = require("express");
const {
  createIncome,
  addIncome,
  fetchIncomeCtrl,
  fetchIncomesCtrl,
  updateIncomeCtrl,
  deletIncomeCtrl,
} = require("../../controllers/income/incomeCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const incomeRoute = express.Router();

incomeRoute.post("/", authMiddleware, createIncome);
incomeRoute.post("/admin", authMiddleware, addIncome);
incomeRoute.get("/", authMiddleware, fetchIncomesCtrl);
incomeRoute.get("/:id", authMiddleware, fetchIncomeCtrl);
incomeRoute.put("/:id", authMiddleware, updateIncomeCtrl);
incomeRoute.delete("/:id", authMiddleware, deletIncomeCtrl);
module.exports = incomeRoute;
