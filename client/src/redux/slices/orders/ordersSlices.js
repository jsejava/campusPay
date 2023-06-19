import { createSlice } from "@reduxjs/toolkit";
import {
  listMyOrdersAction,
  getOrderDetailsAction,
  payOrderAction,
} from "./ordersAction";

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
    // builder.addCase(payOrderAction.pending, (state, action) => {
    //   state.orderLoading = true;
    //   state.orderAppErr = undefined;
    //   state.orderServerErr = undefined;
    // });
    // builder.addCase(payOrderAction, (state, action) => {
    //   state.isPay = true;
    // });
    // builder.addCase(payOrderAction.fulfilled, (state, action) => {
    //   state.orderLoading = false;
    //   state.isPay = false;
    //   state.orderenseDeleted = action?.payload;
    //   state.orderAppErr = undefined;
    //   state.orderServerErr = undefined;
    //   state.isOrderCreated = false;
    // });
    // builder.addCase(payOrderAction.rejected, (state, action) => {
    //   state.orderLoading = false;
    //   state.orderAppErr = action?.payload?.message;
    //   state.orderServerErr = action?.error?.message;
    // });

    //Update
    // builder.addCase(payOrderAction.pending, (state, action) => {
    //   state.orderLoading = true;
    //   state.orderAppErr = undefined;
    //   state.orderServerErr = undefined;
    // });
    // builder.addCase(payOrderAction, (state, action) => {
    //   state.isOrderUpdated = true;
    // });
    // builder.addCase(payOrderAction.fulfilled, (state, action) => {
    //   state.orderLoading = false;
    //   state.orderPay = action?.payload;
    //   // state.isOrderUpdated = false;
    //   state.exporderErr = undefined;
    //   state.orderServerErr = undefined;
    //   // state.isOrderCreated = false;
    // });
    // builder.addCase(payOrderAction.rejected, (state, action) => {
    //   state.orderLoading = false;
    //   state.orderAppErr = action?.payload?.message;
    //   state.orderServerErr = action?.error?.message;
    // });
  },
});

export default orderSlices.reducer;
