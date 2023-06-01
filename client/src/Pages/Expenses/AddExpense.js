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

const AddExpense = () => {
  // const cookieval = document.cookie;
  let at = "At";
  let btn = "Send";
  let item = document.cookie
    .split(";")
    .find((row) => row.startsWith("item="))
    ?.split("=")[1];
  //console.log(item);
  const total = document.cookie
    .split(" ")
    .find((row) => row.startsWith("total="))
    ?.split("=")[1];

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
  //history
  // const history = useHistory();
  const users = useSelector((state) => state?.users);
  const expenses = useSelector((state) => state?.expenses);
  const { profile, userLoading, userAppErr, userServerErr, userAuth } = users;

  const adminAuth = profile?.isAdmin;
  //const id = profile?.id;

  const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;

  //income
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
    // if (profile?.isAdmin) {
    //   navigate(history, "dashboard", undefined)
    // }
  }, [profile?.income, profile?.expenses, profile?.fees, profile?.id]);

  //expense

  //const adminAuth = profile?.isAdmin;
  //console.log(profile?.id);

  // useEffect(() => {
  //   if (balance && userid) {
  //     const user = {
  //       id: userid,
  //       Wallet: balance,
  //     };
  //     dispatch(updateUserWalletAction(user));
  //   }
  // }, [balance, userid]);

  //console.log("id", userid);

  //initialize form

  const formik = useFormik({
    initialValues: {
      title: item,
      description: "",
      amount: total,
    },

    onSubmit: (values) => {
      //console.log(values);
      // console.log("wallet", incResult.sumTotal);
      // console.log("amount", values.amount);
      // const wallet = incResult.sumTotal;
      // const amount = values.amount;
      // if (amount > wallet) {
      //   window.alert("insuffisance wallet");
      //   return;
      // }
      // const user = {
      //   id: userid,
      //   Wallet: balance,
      // };
      // dispatch(updateUserWalletAction(user));

      dispatch(addNewExpAction(values));
    },
    //validationSchema: formSchema,
  });
  let balance;
  //Redirect
  useEffect(() => {
    if (isExpCreated) {
      document.cookie = `total=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure;path=/add-expense`;
      document.cookie = `item=; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/add-expense`;

      //window.location.replace("http://localhost:3000/ConfOrder");
      //navigate(history, "user-profile-expenses", undefined);
      navigate(history, "success-payement", undefined);
      // <Balance />;
      //Redirect
      setTimeout(() => {
        window.location.replace("http://localhost:3001/ConfOrder");
      }, 3000);

      // console.log("wallet", incResult);
      // console.log("amount", amount);

      // const totalExp = expResult?.sumTotal;
      // const totalInc = incResult?.sumTotal;
      // const totalFees = feesResult?.sumTotal;
      // balance = totalInc - (totalExp + totalFees);
    }
  }, [isExpCreated]);

  // useEffect(() => {
  //   if (balance && userid) {
  //     const user = {
  //       id: userid,
  //       Wallet: balance,
  //     };
  //     dispatch(updateUserWalletAction(user));
  //   }
  // }, [balance, userid, isExpCreated]);

  return (
    <>
      {adminAuth ? (
        <>
          <>
            {/* <Header /> */}
            <div className="container">
              {/* <div className="row order-detail"> */}
              <div
                style={{
                  // display: "flex",
                  // height: "10px",
                  // width: "100%",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // flexDirection: "column",
                  marginTop: "50px",
                }}
                className="row order-detail"
              >
                {/* <div className="col-lg-8 col-sm-8 mb-lg-8 mb-5 mb-sm-0"> */}
                {/* <div className="row "> */}
                {/* <div className="col-md-8 center"></div> */}
                <h1
                  style={{
                    display: "flex",
                    // height: "10px",
                    // width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // marginTop: "40px",
                  }}
                >
                  <i>
                    Admin Account Not Authorised, Pls Lougout and Use a User
                    Account
                  </i>
                </h1>
                {/* <div className="col-md-8 center"></div> */}
                {/* </div> */}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                height: "10px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "40px",
              }}
            >
              <button
                onClick={() => dispatch(logoutAction())}
                type="button"
                class="btn btn-primary btn-lg"
              >
                Lougout
              </button>
            </div>
            {/* </div> */}
          </>
          {/* <h1>Admin not Authorised</h1> */}
        </>
      ) : (
        <section className="py-5 bg-danger vh-100">
          <div className="container text-center">
            <a className="d-inline-block mb-5">
              {/* <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="200"
            /> */}
            </a>
            <div className="row mb-4">
              {/* <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <UserProfileStats
                numOfTransExp={profile?.expenses?.length}
                avgExp={expResult?.avg}
                totalExp={expResult?.sumTotal}
                minExp={expResult?.min}
                maxExp={expResult?.max}
                numOfTransInc={profile?.income?.length}
                avgInc={incResult?.avg}
                totalInc={incResult?.sumTotal}
                minInc={incResult?.min}
                maxInc={incResult?.max}
              />
            </div> */}
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">CampusPay</span>
                    <h2 className="mb-4 fw-light">Make Payments</h2>
                    {/* Display income Err */}
                    {expServerErr || expAppErr ? (
                      <div className="alert alert-danger" role="alert">
                        {expServerErr} {expAppErr}
                      </div>
                    ) : null}
                    <div className="mb-3 input-group">
                      {item ? (
                        <>
                          <i className="btn btn-success  w-100 disabled">
                            {item}
                          </i>
                          <i className="btn btn-primary w-100 disabled">At</i>{" "}
                          <i className="btn btn-success mb-4 w-100 disabled">
                            {total}
                          </i>
                          {/* Err */}
                          <div className="text-danger mb-2">
                            {formik.touched.title && formik.errors.title}
                          </div>
                          <div className="mb-3 input-group">
                            <input
                              value={formik.values.description}
                              onBlur={formik.handleBlur("description")}
                              onChange={formik.handleChange("description")}
                              className="form-control"
                              type="text"
                              placeholder="Enter Pin"
                            />
                          </div>
                          {/* Err */}
                          <div className="text-danger mb-2">
                            {formik.touched.description &&
                              formik.errors.description}
                          </div>
                          <div className="mb-3 input-group">
                            {/* <input
                      value={cookieTotal}
                      onBlur={formik.handleBlur("amount")}
                      onChange={formik.handleChange("amount")}
                      className="form-control"
                      type="number"
                      disabled
                    /> */}
                          </div>
                          {/* Err */}
                        </>
                      ) : (
                        <i className="btn btn-success  w-100">
                          PLS visit Campus Store to Make A purchase
                        </i>
                      )}
                      {/* <i className="btn btn-success">{total} </i>{" "} */}
                      {/* <i className="btn btn-primary">Gh₵</i>{" "} */}
                      {/* <input
                      //value={formik.values.title}
                      value={cookieName}
                      onBlur={formik.handleBlur("title")}
                      onChange={formik.handleChange("title")}
                      className="form-control"
                      type="text"
                      // placeholder="Enter reference"
                      disabled
                    /> */}
                    </div>

                    <div className="text-danger mb-2">
                      {formik.touched.amount && formik.errors.amount}
                    </div>
                    {expLoading ? (
                      <DisabledButton />
                    ) : (
                      <>
                        {item ? (
                          <button
                            type="submit"
                            className="btn btn-danger mb-4 w-100"
                          >
                            Send
                          </button>
                        ) : (
                          <a
                            href="http://localhost:3000/shop"
                            className="btn btn-danger mb-4 w-100"
                          >
                            visit
                            {/* <button>visit</button> */}
                          </a>
                        )}
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddExpense;
