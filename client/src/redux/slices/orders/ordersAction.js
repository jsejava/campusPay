import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//Redirect action
export const resetExpCreated = createAction("expense/created/reset");
export const resetExpUpdated = createAction("expense/updated/reset");
export const resetExpDeleted = createAction("expense/deleted/reset");

//Fetch All Order
export const listMyOrdersAction = createAsyncThunk(
  "order/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/orders`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch Single Order
export const getOrderDetailsAction = createAsyncThunk(
  "order/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/orders/${id}`, config);
      // console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// //Fetch Single Exp
export const payOrderAction = createAsyncThunk(
  "order/pay",
  async (paymentResult, { rejectWithValue, getState, dispatch }) => {
    const { disId, ...fields } = paymentResult;
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/orders/${disId}/pay`,

        fields,
        config
      );

      console.log("done.......................");
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// //Delete
// export const deleteExpenseAction = createAsyncThunk(
//   "expense/delete",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { userAuth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userAuth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.delete(
//         `${baseUrl}/api/expenses/${id}`,
//         config
//       );
//       //dispatch
//       dispatch(resetExpDeleted());
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Update
// export const updateExpenseAction = createAsyncThunk(
//   "expense/update",
//   async (expense, { rejectWithValue, getState, dispatch }) => {
//     console.log(expense);
//     //get user token
//     const user = getState()?.users;
//     const { userAuth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userAuth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.put(
//         `${baseUrl}/api/expenses/${expense?.id}`,
//         {
//           title: expense?.title,
//           description: expense?.description,
//           amount: expense?.amount,
//         },
//         config
//       );
//       dispatch(resetExpUpdated());
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );
