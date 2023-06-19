const express = require("express");
const {
  fetchOrderCtrl,
  fetchOrdersCtrl,
  orderPayCtrl,
} = require("../../controllers/Request/RequestCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const requestRoute = express.Router();

requestRoute.get("/", authMiddleware, fetchOrdersCtrl);
requestRoute.get("/:id", authMiddleware, fetchOrderCtrl);
requestRoute.put("/:id/pay", authMiddleware, orderPayCtrl);

module.exports = requestRoute;
