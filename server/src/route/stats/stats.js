const express = require("express");
const {
  // accountStatsCtrl,
  accountsStatsCtrl,
} = require("../../controllers/accountStatsCtrl/accountStatsCtrl");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const accountStatsRoute = express.Router();

accountStatsRoute.get("/", accountsStatsCtrl);
// accountStatsRoute.get("/:id", accountStatsCtrl);
module.exports = accountStatsRoute;
