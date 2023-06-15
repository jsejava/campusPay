import { createSlice } from "@reduxjs/toolkit";
import { listMyOrdersAction, getOrderDetailsAction } from "./ordersAction";

//--------------
//slices
//--------------
const orderSlices = createSlice({
  name: "order",
  initialState: {},
  extraReducers: (builder) => {
    //fetch all
    builder.addCase(listMyOrdersAction.pending, (state, action) => {
      state.orderLoading = true;
      state.orderAppErr = undefined;
      state.orderServerErr = undefined;
    });
    builder.addCase(listMyOrdersAction.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.orderList = action?.payload;
      state.orderAppErr = undefined;
      state.orderServerErr = undefined;
      state.isOrderCreated = false;
    });
    builder.addCase(listMyOrdersAction.rejected, (state, action) => {
      state.orderLoading = false;
      state.orderAppErr = action?.payload?.message;
      state.orderServerErr = action?.error?.message;
    });

    //fetch single
    builder.addCase(getOrderDetailsAction.pending, (state, action) => {
      state.orderLoading = true;
      state.orderAppErr = undefined;
      state.orderServerErr = undefined;
    });
    builder.addCase(getOrderDetailsAction.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.orderDetails = action?.payload;
      state.orderAppErr = undefined;
      state.orderServerErr = undefined;
      state.isOrderCreated = false;
    });
    builder.addCase(getOrderDetailsAction.rejected, (state, action) => {
      state.orderLoading = false;
      state.orderAppErr = action?.payload?.message;
      state.orderServerErr = action?.error?.message;
    });

    //Delete
    // builder.addCase(deleteExpenseAction.pending, (state, action) => {
    //   state.expLoading = true;
    //   state.expAppErr = undefined;
    //   state.expServerErr = undefined;
    // });
    // builder.addCase(resetExpDeleted, (state, action) => {
    //   state.isDeleted = true;
    // });
    // builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
    //   state.expLoading = false;
    //   state.isDeleted = false;
    //   state.expenseDeleted = action?.payload;
    //   state.expAppErr = undefined;
    //   state.expServerErr = undefined;
    //   state.isExpCreated = false;
    // });
    // builder.addCase(deleteExpenseAction.rejected, (state, action) => {
    //   state.expLoading = false;
    //   state.expAppErr = action?.payload?.message;
    //   state.expServerErr = action?.error?.message;
    // });

    //Update
    // builder.addCase(updateExpenseAction.pending, (state, action) => {
    //   state.expLoading = true;
    //   state.expAppErr = undefined;
    //   state.expServerErr = undefined;
    // });
    // builder.addCase(resetExpUpdated, (state, action) => {
    //   state.isExpUpdated = true;
    // });
    // builder.addCase(updateExpenseAction.fulfilled, (state, action) => {
    //   state.expLoading = false;
    //   state.expenseUpdated = action?.payload;
    //   state.isExpUpdated = false;
    //   state.expAppErr = undefined;
    //   state.expServerErr = undefined;
    //   state.isExpCreated = false;
    // });
    // builder.addCase(updateExpenseAction.rejected, (state, action) => {
    //   state.expLoading = false;
    //   state.expAppErr = action?.payload?.message;
    //   state.expServerErr = action?.error?.message;
    // });
  },
});

export default orderSlices.reducer;
