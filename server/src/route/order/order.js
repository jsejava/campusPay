const express = require("express");
const {
  fetchOrderCtrl,
  fetchOrdersCtrl,
  orderPayCtrl,
} = require("../../controllers/order/orderCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const orderRoute = express.Router();

orderRoute.get("/", authMiddleware, fetchOrdersCtrl);
orderRoute.get("/:id", authMiddleware, fetchOrderCtrl);
orderRoute.put("/:id/pay", authMiddleware, orderPayCtrl);

module.exports = orderRoute;
