import { createSlice } from "@reduxjs/toolkit";
import {
  listMyRequestsAction,
  getRequestDetailsAction,
  payRequestAction,
} from "./requestsAction";

//--------------
//slices
//--------------
const requestSlices = createSlice({
  name: "request",
  initialState: {},
  extraReducers: (builder) => {
    //fetch all
    builder.addCase(listMyRequestsAction.pending, (state, action) => {
      state.reqLoading = true;
      state.reqAppErr = undefined;
      state.reqServerErr = undefined;
    });
    builder.addCase(listMyRequestsAction.fulfilled, (state, action) => {
      state.reqLoading = false;
      state.reqList = action?.payload;
      state.reqAppErr = undefined;
      state.reqrServerErr = undefined;
      state.isReqCreated = false;
    });
    builder.addCase(listMyRequestsAction.rejected, (state, action) => {
      state.reqLoading = false;
      state.reqAppErr = action?.payload?.message;
      state.reqServerErr = action?.error?.message;
    });

    //fetch single
    builder.addCase(getRequestDetailsAction.pending, (state, action) => {
      state.reqLoading = true;
      state.reqAppErr = undefined;
      state.reqServerErr = undefined;
    });
    builder.addCase(getRequestDetailsAction.fulfilled, (state, action) => {
      state.reqLoading = false;
      state.reqDetails = action?.payload;
      state.reqAppErr = undefined;
      state.reqServerErr = undefined;
      state.isReqCreated = false;
    });
    builder.addCase(getRequestDetailsAction.rejected, (state, action) => {
      state.reqLoading = false;
      state.reqAppErr = action?.payload?.message;
      state.reqServerErr = action?.error?.message;
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

export default requestSlices.reducer;
