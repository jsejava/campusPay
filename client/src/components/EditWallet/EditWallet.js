import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import moneySVG from "../../img/money.svg";
import ErrorDisplayMessage from "../ErrorDisplayMessage";
import SuccessMessage from "../SuccessMessage";
import { updateExpenseAction } from "../../redux/slices/expenses/expenseAction";
// import {
//   userAction,
//   userProfileAction,
// } from "../../redux/slices/users/usersSlices";
import {
  userAction,
  userProfileAction,
} from "../../redux/slices/users/usersSlices";
import { addNew } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../DisabledButton";
import redirectUser from "../../utils/redirect";
import navigate from "../../utils/navigate";
import CustomSelect from "./CustomSelect";
import LoadingComponent from "../Loading/Loading";
//import Selector from "./Selector";

//Form validation
const formSchema = Yup.object({
  id: Yup.string().required("user name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});
const EditWallet = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const { profile, userLoading, userAppErr, userServerErr } = user;
  console.log(profile);
  // const item = Object.values(profile);
  // console.log(item);
  useEffect(() => {
    dispatch(userAction());
  }, [dispatch]);
  // let score;
  // for (score of profile) {
  //   console.log(score);
  // }
  // console.log(profile);
  // const item = Object.values(profile);
  // console.log(item);
  // dispatch(userAction());
  //console.log(profile);
  // let items;
  // if (profile) {
  //   items = profile?.map((item) => ({
  //     id: item._id,
  //     fname: item.firstname,
  //     lname: item.lastname,
  //   }));
  // } else {
  // }

  // let names = "";
  // items?.forEach((element, index, array) => {
  //   names += element.lname + " ";
  // });

  // for (let index = 0; index < items?.length; index++) {
  //   const element = items[index];
  //   console.log(element.lname);
  // }
  //console.log("profile", profile);
  // console.log("name", items);
  // const { data } = state;
  // console.log("data", data?.user._id);
  //dispatch action
  //history

  //expense
  const expenses = useSelector((state) => state?.expenses);
  const { isExpUpdated, expLoading, expAppErr, expServerErr, isExpCreated } =
    expenses;
  //income
  const income = useSelector((state) => state?.income);
  const { isIncUpdated, incLoading, incAppErr, incServerErr } = income;
  //initialize form
  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      //description: data?.description,
      description: Math.floor(Math.random() * 100000000000 + 1),
      amount: "",
    },
    onSubmit: (values) => {
      console.log(values);
      navigate(history, "incomes", undefined);

      return dispatch(addNew(values));
    },
    validationSchema: formSchema,
  });

  //redirect
  useEffect(() => {
    if (isExpUpdated) {
      navigate(history, "user-profile-expenses", undefined);
    }
    if (isIncUpdated) {
      navigate(history, "user-profile-income", undefined);
    }
  }, [isExpUpdated, isIncUpdated]);
  return (
    <>
      <section className="py-5 bg-success vh-100">
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
              src="./logo/pay-1.png"
              alt="SVGeXPENSES"
              width="100"
            />
          </div>
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">CampusPay</span>
                  <h2 className="mb-4 fw-light">Wallet Top Up</h2>
                  {/* Display income Err */}
                  {incServerErr || incAppErr ? (
                    <div className="alert alert-danger" role="alert">
                      {incServerErr} {incAppErr}
                    </div>
                  ) : null}
                  {/* <div className="mb-3 input-group "> */}
                  {/* <div> */}
                  {profile ? (
                    <CustomSelect
                      options={profile}
                      value={formik.values.id}
                      // className={"form-select d-inline-block"}
                      onChange={(value) =>
                        formik.setFieldValue("id", value.value)
                      }
                    />
                  ) : (
                    <div>Loading...</div>
                  )}

                  {/* <Selector
                    options={profile}
                    value={formik.values.id}
                    // className={"form-select d-inline-block"}
                    onChange={(value) =>
                      formik.setFieldValue("id", value.value)
                    }
                  /> */}

                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.id && formik.errors.id}
                  </div>
                  {/* <Link className="btn btn-success ms-2" to="#">
                    <i className="fas fa-print"></i>
                  </Link> */}
                  {/* </div> */}
                  {/* </div> */}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.title}
                      onBlur={formik.handleBlur("title")}
                      onChange={formik.handleChange("title")}
                      className="form-control"
                      type="text"
                      placeholder="Agent Name"
                    />
                  </div>
                  {/* Err */}
                  {/* <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div> */}
                  {/* <div className="mb-3 input-group">
                    <input
                      value={formik.values.description}
                      onBlur={formik.handleBlur("description")}
                      onChange={formik.handleChange("description")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div> */}
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
                    {formik.touched.amount && formik.errors.amount}
                  </div>
                  {incLoading ? (
                    <DisabledButton />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success mb-4 w-100"
                    >
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditWallet;

//  <select
//    className="form-select d-inline-block"
//    style={{ maxWidth: "200px" }}
//    value={formik.values.id}
//    onchange={formik.setFieldValue("id", value.value)}
//  >
//    {items?.length <= 0 ? (
//      <h2>No transaction Found</h2>
//    ) : (
//      items?.map((item) => (
//        <option value={item.id}>
//          {item.fname} {item.lname}
//        </option>
//      ))
//    )}
//  </select>;
