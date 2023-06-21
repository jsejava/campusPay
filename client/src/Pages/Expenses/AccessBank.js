import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { addNewExpAction } from "../../redux/slices/expenses/expenseAction";
import DisabledButton from "../../components/DisabledButton";
import redirectUser from "../../utils/redirect";
import navigate from "../../utils/navigate";
//import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
//import calTransaction from "../../../utils/accStatistics";
import calTransaction from "../../utils/accStatistics";
//import UserProfileStats from "./UserProfileStats";
import UserProfileStats from "../Users/Profile/UserProfileStats";
//import { logoutAction } from "../../../redux/slices/users/usersSlices";
import {
  logoutAction,
  updateUserWalletAction,
} from "../../redux/slices/users/usersSlices";

const AccessBank = () => {
  const [expResult, setExpResult] = useState([]);
  const [incResult, setIncResult] = useState([]);
  const [feesResult, setFeesResult] = useState([]);
  const [userid, setUserid] = useState("");
  //const dispatch = useDispatch();
  //dispatch action
  const dispatch = useDispatch();
  const history = useHistory();
  //income

  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  const users = useSelector((state) => state?.users);
  const { profile, userLoading, userAppErr, userServerErr, userAuth } = users;

  //expense
  const expenses = useSelector((state) => state?.expenses);
  const adminAuth = profile?.isAdmin;

  useEffect(() => {
    if (profile?.expenses) {
      let expenses = calTransaction(profile?.expenses);
      setExpResult(expenses);
    }
    if (profile?.income) {
      const income = calTransaction(profile?.income);
      setIncResult(income);
    }
    if (profile?.fees) {
      const fees = calTransaction(profile?.fees);
      setFeesResult(fees);
    }
    if (profile?.id) {
      const _id = profile?.id;
      setUserid(_id);
    }
  }, [profile?.income, profile?.expenses, profile?.fees, profile?.id]);

  const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;
  const totalExp = expResult?.sumTotal;
  const totalInc = incResult?.sumTotal;
  const totalFees = feesResult?.sumTotal;
  const balance = totalInc - (totalExp + totalFees);

  useEffect(() => {
    if (balance && userid) {
      const user = {
        id: userid,
        Wallet: balance,
      };
      dispatch(updateUserWalletAction(user));
    }
  }, [balance, userid]);

  //console.log(updateUserWalletAction);

  return <></>;
};

export default AccessBank;
