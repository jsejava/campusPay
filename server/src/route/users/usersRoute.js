const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserWalletCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  saveVerifiedEmailCtrl,
} = require("../../controllers/users/usersCtrl");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/verify/:token", saveVerifiedEmailCtrl);

userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.get("/profile/", authMiddleware, userProfileCtrl);
userRoutes.put("/wallet/", updateUserWalletCtrl);
userRoutes.put("/:id", authMiddleware, updateUserCtrl);
userRoutes.put("/wallet/", updateUserWalletCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;

// verification /api/users/verify/:token
