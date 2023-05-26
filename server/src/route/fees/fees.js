const express = require("express");
const {
  createExpenseCtrl,
  fetchExpenseCtrl,
  fetchExpensesCtrl,
  updateExpenseCtrl,
  deletExpenseCtrl,
} = require("../../controllers/fees/feesCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const feesRoute = express.Router();

feesRoute.post("/", authMiddleware, createExpenseCtrl);
feesRoute.get("/", authMiddleware, fetchExpensesCtrl);
feesRoute.get("/:id", authMiddleware, fetchExpenseCtrl);
feesRoute.put("/:id", authMiddleware, updateExpenseCtrl);
feesRoute.delete("/:id", authMiddleware, deletExpenseCtrl);
module.exports = feesRoute;
