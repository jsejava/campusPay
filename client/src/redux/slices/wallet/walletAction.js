import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//Redirect action
export const resetExpCreated = createAction("expense/created/reset");
export const resetExpUpdated = createAction("expense/updated/reset");
export const resetExpDeleted = createAction("expense/deleted/reset");

//Create Expense
export const addNewWalAction = createAsyncThunk(
  "expense/created",
  async (expense, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.post(
        `${baseUrl}/api/wallet`,
        {
          // title: expense?.title,
          // description: expense?.description,
          amount: expense?.amount,
        },
        config
      );
      //dispatch
      dispatch(resetExpCreated());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch All Exp
export const fetchExpensesAction = createAsyncThunk(
  "expense/list",
  async (page, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(
        `${baseUrl}/api/expenses?page=${page}`,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch Single Wal
export const fetchWalenseAction = createAsyncThunk(
  "expense/details",
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
      const { data } = await axios.get(
        `${baseUrl}/api/wallet/${id}`,

        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Fetch Single Exp
export const fetchOrderAction = createAsyncThunk(
  "expense/details",
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
      const { data } = await axios.get(
        `http://localhost:5000/api/orders/${id}`,

        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete
export const deleteExpenseAction = createAsyncThunk(
  "expense/delete",
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
      const { data } = await axios.delete(
        `${baseUrl}/api/expenses/${id}`,
        config
      );
      //dispatch
      dispatch(resetExpDeleted());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updateWalletAction = createAsyncThunk(
  "expense/update",
  async (expense, { rejectWithValue, getState, dispatch }) => {
    // console.log(expense);
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
        //`${baseUrl}/api/expenses/${expense?.id}`,
        `${baseUrl}/api/wallet/${expense?.id}`,
        {
          // title: expense?.title,
          // description: expense?.description,
          amount: expense?.amount,
        },
        config
      );
      dispatch(resetExpUpdated());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
