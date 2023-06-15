const express = require("express");
const {
  fetchOrderCtrl,
  fetchOrdersCtrl,
} = require("../../controllers/order/orderCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const orderRoute = express.Router();

orderRoute.get("/", authMiddleware, fetchOrdersCtrl);
orderRoute.get("/:id", authMiddleware, fetchOrderCtrl);

module.exports = orderRoute;
