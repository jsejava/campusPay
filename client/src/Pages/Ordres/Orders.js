import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Message from "../LoadingError/Error";
// import Loading from "../LoadingError/Loading";

import LoadingComponent from "../../components/Loading/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { listMyOrdersAction } from "../../redux/slices/orders/ordersAction";

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listMyOrdersAction());
  }, []);

  const order = useSelector((state) => state?.order);
  const {
    orderList,
    orderLoading,
    orderAppErr,
    orderServerErr,
    isOrderCreated,
  } = order;
  // console.log(order);
  // const { loading, error, orders } = props;
  //console.log("next", orders?.length);

  // const items = orderList?.map((item) => ({
  //   value: item.name,
  //   label: item.qty,
  // }));
  // console.log(items);
  // {
  //   orderList?.map((order) =>
  //     order?.map((item) => ({
  //       value: item.name,

  //       label: item.qty,
  //     }))
  //   );
  // }
  return (
    <>
      {orderLoading ? (
        <LoadingComponent />
      ) : orderAppErr || orderServerErr ? (
        <>
          <ErrorDisplayMessage>
            {orderServerErr} {orderAppErr}
          </ErrorDisplayMessage>
        </>
      ) : (
        <div className=" d-flex justify-content-center align-items-center flex-column">
          {orderList?.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/shop"
                style={{
                  fontSize: "12px",
                }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <>
              <div className="align-items-center">
                <h1 className="mb-4">YOUR ORDERS</h1>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>STATUS</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList?.map((order) => (
                      <tr
                        className={`${
                          order.isPaid ? "alert-success" : "alert-danger"
                        }`}
                        key={order._id}
                      >
                        <td>
                          <a
                            href={`/add-expense/${order._id}`}
                            className="link"
                          >
                            {order._id}
                          </a>
                        </td>
                        <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                        <td>
                          {order.isPaid
                            ? moment(order.paidAt).calendar()
                            : moment(order.createdAt).calendar()}
                        </td>
                        <td>Gh₵ {order.totalPrice}</td>
                        {/* <td>Gh₵ {order.totalPrice}</td>
                        <td>Gh₵ {order.totalPrice}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="align-items-center mb-4">
                <p className="mb-4 mt-5">
                  <i>
                    Click on <b className="link">Order ID </b>To See Order
                    Details And <b className="btn-info mb-4">Make Payement</b>{" "}
                    If <b className="alert-danger">Not Paid</b>
                  </i>
                </p>
              </div>
              <i>
                <p>
                  Note That Only <b className="alert-success">Paid</b> Order
                  Will Be Delivered
                </p>
              </i>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
