import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
import { useHistory } from "react-router-dom";
//import { addNewExpAction } from "../../redux/slices/expenses/expenseAction";
import { addNewExpAction } from "../../redux/slices/fees/feesAction";
import DisabledButton from "../../components/DisabledButton";
import redirectUser from "../../utils/redirect";
import navigate from "../../utils/navigate";
//import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
//import calTransaction from "../../../utils/accStatistics";
import calTransaction from "../../utils/accStatistics";
//import UserProfileStats from "./UserProfileStats";
import UserProfileStats from "../Users/Profile/UserProfileStats";
import { logoutAction } from "../../redux/slices/users/usersSlices";

//Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Pin is required"),
  amount: Yup.number().required("Amount is required"),
});

const AddFees = () => {
  // const cookieval = document.cookie;
  let at = "At";
  let btn = "Send";
  let item = document.cookie
    .split(";")
    .find((row) => row.startsWith("item="))
    ?.split("=")[1];
  console.log(item);
  const total = document.cookie
    .split(" ")
    .find((row) => row.startsWith("total="))
    ?.split("=")[1];
  console.log(total);
  console.log(typeof total);
  // if (!item) {
  //   item = "PLS visit Campus Store to Make A purchase";
  //   at = "";
  //   btn = "Okay";
  // }
  // const y = item
  //   .split(";")
  //   .find((row) => row.startsWith("total="))
  //   ?.split("=")[1];
  // console.log("Y : ", y);
  // const total = document.cookie
  //   .split(";")
  //   .find((row) => row.startsWith("total="))
  //   ?.split("=")[1];
  // console.log(total);
  // const itemObj = JSON.parse(item);
  // console.log(itemObj[0].name);
  // const total = document.cookie
  //   .split(";")
  //   .find((row) => row.startsWith("total="))
  //   ?.split("=")[1];
  //   console.log(total);
  // console.log(total);
  // const obj = JSON.parse(cookieval);
  // console.log(cookieTotal);
  // const cookieName = document.cookie
  // .split("; ")
  // .find((row) => row.startsWith("name="))
  // ?.split("=")[1];

  // console.log(total);

  const [expResult, setExpResult] = useState([]);
  const [incResult, setIncResult] = useState([]);
  //const dispatch = useDispatch();
  //dispatch action
  const dispatch = useDispatch();
  const history = useHistory();
  //income

  //expense
  const expenses = useSelector((state) => state?.expenses);
  const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;
  //initialize form
  const formik = useFormik({
    initialValues: {
      title: item,
      description: "",
      amount: total,
    },
    onSubmit: (values) => {
      // console.log("wallet", incResult.sumTotal);
      // console.log("amount", values.amount);
      // const wallet = incResult.sumTotal;
      // const amount = values.amount;
      // if (amount > wallet) {
      //   window.alert("insuffisance wallet");
      //   return;
      // }
      dispatch(addNewExpAction(values));
    },
    validationSchema: formSchema,
  });

  //Redirect

  useEffect(() => {
    dispatch(userProfileAction());
  }, []);
  //history
  // const history = useHistory();
  const users = useSelector((state) => state?.users);
  const { profile, userLoading, userAppErr, userServerErr, userAuth } = users;
  const adminAuth = profile?.isAdmin;
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
  }, [profile?.income]);

  useEffect(() => {
    if (isExpCreated) {
      navigate(history, "user-profile-fees", undefined);
      // document.cookie = `total=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure;path=/add-expense`;
      // document.cookie = `item=; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/add-expense`;
      // //navigate(history, "user-profile-expenses", undefined);
      // window.location.replace("http://localhost:3000/ConfOrder");
      // console.log("wallet", incResult);
      // console.log("amount", amount);
    }
  }, [isExpCreated]);

  // //console.log(results);
  // const income = profile?.income;
  // const totalIncome = income
  //   ?.map((inc) => inc?.amount)
  //   .reduce((acc, curr) => {
  //     return acc + curr;
  //   }, 0);

  // //Total Expenses
  // expenses = profile?.expenses;
  // const totalExp = expenses
  //   ?.map((inc) => inc?.amount)
  //   .reduce((acc, curr) => {
  //     return acc + curr;
  //   }, 0);

  // //Average expenses
  // const averageExp = totalExp / 2;

  // //min Expense

  // const expensesArr = profile?.expenses?.map((exp) => exp?.amount);
  // const minExpenses = Math.min(...expensesArr);
  // const maxExpenses = Math.max(...expensesArr);

  // console.log(maxExpenses, totalExp);

  return (
    <>
      {adminAuth ? (
        <>
          {/* <Header /> */}
          <div className="container">
            {/* <div className="row order-detail"> */}
            {/* <div
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
            > */}
            {/* <div className="col-lg-8 col-sm-8 mb-lg-8 mb-5 mb-sm-0"> */}
            {/* <div className="row "> */}
            {/* <div className="col-md-8 center"></div> */}
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
            {/* <div className="col-md-8 center"></div> */}
            {/* </div> */}
          </div>
          {/* </div> */}
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
                src="./logo/pay-9.png"
                alt="SVGeXPENSES"
                width="150"
              />
            </div>
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">Campus Pay</span>
                    <h2 className="mb-4 fw-light">School Fees</h2>
                    {/* Display income Err */}
                    {expServerErr || expAppErr ? (
                      <div className="alert alert-danger" role="alert">
                        {expServerErr} {expAppErr}
                      </div>
                    ) : null}
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.title}
                        onBlur={formik.handleBlur("title")}
                        onChange={formik.handleChange("title")}
                        className="form-control"
                        type="text"
                        placeholder="Enter ID Number"
                      />
                    </div>

                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.description && formik.errors.description}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.amount}
                        onBlur={formik.handleBlur("amount")}
                        onChange={formik.handleChange("amount")}
                        className="form-control"
                        type="number"
                        placeholder="Enter Amount"
                      />
                    </div>
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
                        placeholder="Enter PIN"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.amount && formik.errors.amount}
                    </div>
                    {expLoading ? (
                      <DisabledButton />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-danger mb-4 w-100"
                      >
                        Send
                      </button>
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

export default AddFees;
