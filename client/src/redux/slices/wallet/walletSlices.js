import { createSlice } from "@reduxjs/toolkit";
import {
  addNewWalAction,
  deleteExpenseAction,
  fetchWalenseAction,
  fetchExpensesAction,
  resetExpCreated,
  resetExpDeleted,
  resetExpUpdated,
  updateExpenseAction,
} from "./walletAction";

//--------------
//slices
//--------------
const expenseSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(addNewWalAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(resetExpCreated, (state, action) => {
      state.isExpCreated = true;
    });
    builder.addCase(addNewWalAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseCreated = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(addNewWalAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //fetch all
    builder.addCase(fetchExpensesAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(fetchExpensesAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseList = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(fetchExpensesAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //fetch single
    builder.addCase(fetchWalenseAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(fetchWalenseAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseDetails = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(fetchWalenseAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //Delete
    builder.addCase(deleteExpenseAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(resetExpDeleted, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.isDeleted = false;
      state.expenseDeleted = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(deleteExpenseAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //Update
    builder.addCase(updateWalletAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(resetExpUpdated, (state, action) => {
      state.isExpUpdated = true;
    });
    builder.addCase(updateWalletAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseUpdated = action?.payload;
      state.isExpUpdated = false;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(updateWalletAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });
  },
});

export default expenseSlices.reducer;
