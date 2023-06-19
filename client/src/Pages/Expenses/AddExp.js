import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewExpAction } from "../../redux/slices/expenses/expenseAction";
import navigate from "../../utils/navigate";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import calTransaction from "../../utils/accStatistics";
import {
  getOrderDetailsAction,
  payOrderAction,
} from "../../redux/slices/orders/ordersAction";
import { logoutAction } from "../../redux/slices/users/usersSlices";
import pay from "../../img/pay-1.png";

const AddExp = ({ match }) => {
  const { host, hostname, href, origin, pathname, port, protocol, search } =
    window.location;
  const myArray = pathname.split("/");

  const orderId = myArray[2];

  let at = "At";
  let btn = "Send";

  const [expResult, setExpResult] = useState([]);
  const [incResult, setIncResult] = useState([]);
  const [feesResult, setFeesResult] = useState([]);
  const [userid, setUserid] = useState("");
  const [useremail, setUseremail] = useState("");
  const [total, setTotal] = useState();
  const [product, setProduct] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  //income

  useEffect(() => {
    dispatch(userProfileAction());
    dispatch(getOrderDetailsAction(orderId));
  }, []);

  const order = useSelector((state) => state?.order);

  const {
    orderDetails,
    orderLoading,
    orderAppErr,
    orderServerErr,
    isOrderCreated,
  } = order;
  // console.log(order);
  const user = orderDetails?.user;
  // console.log(user.email);
  const paymentResult = {
    disId: orderId,
    id: user?._id,
    update_time: Date.now(),
    email_address: user?.email,
  };

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
    if (orderDetails?.orderItems) {
      const items = orderDetails?.orderItems?.map((item) => ({
        value: item.name,
      }));
      let product;
      for (let x = 0; x < items?.length; x++) {
        product += " " + items[x].value + " ";
      }
      setProduct(product);
      setTotal(orderDetails?.totalPrice);
    }
  }, [
    profile?.income,
    profile?.expenses,
    profile?.fees,
    profile?.id,
    orderDetails?.orderItems,
  ]);

  const formik = useFormik({
    initialValues: {
      title: product,
      description: "",
      amount: total,
    },

    onSubmit: (values) => {
      dispatch(
        addNewExpAction({
          title: product,
          description: values.description,
          amount: total,
        })
      );
    },
  });
  let balance;
  //Redirect
  useEffect(() => {
    if (isExpCreated) {
      dispatch(payOrderAction(paymentResult));
      navigate(history, "success-payement", undefined);
      // <Balance />;
      //Redirect
      setTimeout(() => {
        navigate(history, "order-list", undefined);
      }, 3000);
    }
  }, [isExpCreated]);

  return (
    <>
      {adminAuth ? (
        <>
          {/* <Header /> */}
          <div className="container">
            <div
              style={{
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",

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
          {/* </div> */}
        </>
      ) : (
        <section className="py-5 bg-danger vh-100">
          <div className="container text-center">
            <div className="d-inline-block mb-5">
              <img
                className="img-fluid"
                src={pay}
                alt="SVGeXPENSES"
                width="100"
              />
            </div>
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">CampusPay</span>
                    <h2 className="fw-light">Payments</h2>

                    {/* Display income Err */}
                    {expServerErr || expAppErr ? (
                      <div className="alert alert-danger" role="alert">
                        {expServerErr} {expAppErr}
                      </div>
                    ) : null}
                    <div className="mb-3 mt-4 input-group">
                      {orderDetails?.orderItems.length ? (
                        <>
                          <table
                            className="table table-bordered"
                            style={{
                              backgroundColor: "#f3f3f3",
                            }}
                          >
                            <tbody>
                              {orderDetails.orderItems.map((item, index) => (
                                <>
                                  <tr>
                                    <td>
                                      <strong>Product</strong>
                                    </td>
                                    <td> {item.name} </td>
                                  </tr>

                                  <tr>
                                    <td>
                                      <strong>Price</strong>
                                    </td>
                                    <td>Gh₵ {item.price}</td>
                                  </tr>
                                </>
                              ))}
                              <tr className="text text-danger">
                                <td>
                                  <strong>Total</strong>
                                </td>
                                <td>Gh₵ {orderDetails.totalPrice}</td>
                              </tr>
                            </tbody>
                          </table>

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
                          <div className="mb-3 input-group"></div>
                          <button
                            type="submit"
                            className="btn btn-danger mb-4 w-100"
                          >
                            Send
                          </button>
                        </>
                      ) : (
                        <p>Loading</p>
                      )}
                    </div>
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

export default AddExp;
