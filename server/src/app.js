const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const incomeRoute = require("./route/income/income");
const feesRoute = require("./route/fees/fees");
const expenseRoute = require("./route/expense/expense");
const walletRoute = require("./route/wallet/wallet");
const accountStatsRoute = require("./route/stats/stats");
const orderRoute = require("./route/order/order");
// dotenv;
dotenv.config();
// dotenv.config({ path: "../../config.env" });
const app = express();
app.get("/", (req, res) => {
  res.json({
    app: "Expenses-Tracker",
    developer: "inovotek",
    youtubeChannel: "i-Novotek",
  });
});
//DB
dbConnect();

//-------------
//Middleware
//--------------
app.use(express.json());
//cors
app.use(cors());
//Users route
app.use("/api/users", userRoutes);
//incomeRout
app.use("/api/incomes", incomeRoute);
//Expenses
app.use("/api/expenses", expenseRoute);
//Wallet
app.use("/api/wallet", walletRoute);
//Fess
app.use("/api/fees", feesRoute);
//stats
app.use("/api/stats", accountStatsRoute);
//Order
app.use("/api/orders", orderRoute);
//err handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
