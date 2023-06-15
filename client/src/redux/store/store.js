import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import expenses from "../slices/expenses/expenseSlices";
import income from "../slices/income/incomeSlices";
import statistics from "../slices/accountStats/accountStatsSlices";
import order from "../slices/orders/ordersSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses,
    income,
    statistics,
    order,
  },
});

export default store;
