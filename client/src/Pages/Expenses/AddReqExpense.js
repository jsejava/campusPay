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

const AddReqExpense = () => {
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
  const [useremail, setUseremail] = useState("");
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
  // const orders = useSelector((state) => state?.orders);

  const users = useSelector((state) => state?.users);
  const expenses = useSelector((state) => state?.expenses);

  const { profile, userLoading, userAppErr, userServerErr, userAuth } = users;

  const adminAuth = profile?.isAdmin;
  const id = profile?.id;
  // console.log(id);
  const ordersFromStorage = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : null;
  //console.log(ordersFromStorage);

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
    if (profile?.email) {
      const email = profile?.email;
      setUseremail(email);
    }
    // if (profile?.isAdmin) {
    //   navigate(history, "dashboard", undefined)
    // }
  }, [profile?.income, profile?.expenses, profile?.fees, profile?.id]);

  // console.log(userid);
  // console.log(useremail);
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
      document.cookie = `total=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure;path=/add-reqexp`;
      document.cookie = `item=; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/add-reqexp`;

      document.cookie = `userid=${userid}; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/service/pay`;
      document.cookie = `useremail=${useremail} expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/service/pay`;

      //window.location.replace("http://localhost:3000/ConfOrder");
      //navigate(history, "user-profile-expenses", undefined);
      navigate(history, "success-payement", undefined);
      // <Balance />;
      //Redirect
      setTimeout(() => {
        window.location.replace("http://localhost:3000/service/pay");
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
          {/* <Header /> */}
          <div className="container">
            {/* <div className="row order-detail"> */}
            <div
              style={{
                display: "flex",
                // height: "10px",
                // width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                // marginTop: "40px",
                marginTop: "50px",
              }}
            >
              <h2 className="text-danger">Admin Account Not Authorised,</h2>
              <p>Pls Lougout and Use a User Account</p>
              <button
                onClick={() => dispatch(logoutAction())}
                type="button"
                class="btn btn-primary btn-lg"
              >
                Lougout
              </button>
              <img
                alt="NotAdmin"
                className=" img-fluid m-3"
                width={300}
                src="https://media.istockphoto.com/id/473976598/photo/small-person-standing-on-word-no.jpg?s=612x612&w=0&k=20&c=AY3FjTdXaRHBovy5vuGirMypxNDQpX42G2E1fd6F1dY="
              />
            </div>
          </div>
        </>
      ) : (
        <section className="py-5 bg-danger vh-100">
          <div className="container text-center">
            <div className="d-inline-block mb-5">
              {/* <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="200"
            /> */}
              <img
                className="img-fluid"
                src="./logo/pay-7.png"
                alt="SVGeXPENSES"
                width="150"
              />
            </div>
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
                    <h2 className="fw-light">Payments</h2>
                    <i className="mb-4">
                      Refresh The Page To See On Going Request
                    </i>
                    {/* Display income Err */}
                    {expServerErr || expAppErr ? (
                      <div className="alert alert-danger" role="alert">
                        {expServerErr} {expAppErr}
                      </div>
                    ) : null}
                    <div className="mb-3 mt-4 input-group">
                      {item ? (
                        <>
                          <table
                            className="table table-bordered"
                            style={{
                              backgroundColor: "#f3f3f3",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Products</strong>
                                </td>
                                <td> {item} </td>
                              </tr>

                              <tr>
                                <td>
                                  <strong>Price</strong>
                                </td>
                                <td>Gh₵ {total}</td>
                              </tr>
                            </tbody>
                          </table>
                          {/* <i className="btn btn-success  w-100 disabled">
                            {item}
                          </i>
                          <i className="btn btn-primary w-100 disabled">At</i>{" "}
                          <i className="btn btn-success mb-4 w-100 disabled">
                            {total}
                          </i> */}
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
                              type="password"
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
                        <a
                          className="btn btn-success w-100"
                          href="http://localhost:3000/service"
                        >
                          Click For A New Service Request
                        </a>
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
                        ) : // <a
                        //   href="http://localhost:3000/shop"
                        //   className="btn btn-danger mb-4 w-100"
                        // >
                        //   visit
                        //   {/* <button>visit</button> */}
                        // </a>
                        null}
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

export default AddReqExpense;
