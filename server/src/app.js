const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const incomeRoute = require("./route/income/income");
const feesRoute = require("./route/fees/fees");
const expenseRoute = require("./route/expense/expense");

const accountStatsRoute = require("./route/stats/stats");
const orderRoute = require("./route/order/order");

const morgan = require("morgan");
const requestRoute = require("./route/Request/Request");

// dotenv;
dotenv.config();
// dotenv.config({ path: "../../config.env" });
const app = express();
app.get("/", (req, res) => {
  res.json({
    app: "CampusPay",
    developer: "Achilles Enam",
    school: "CUG",
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

//Fess
app.use("/api/fees", feesRoute);
//stats
app.use("/api/stats", accountStatsRoute);
//Order
app.use("/api/orders", orderRoute);

//Request
app.use("/api/requests", requestRoute);

// register view engine
app.set("view engine", "ejs");

//listen for request

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// route
app.get("http://localhost:5001/api/users/verify/:token", (req, res) => {
  res.render("about");
});
//err handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
