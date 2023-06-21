import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContentDetails from "../../../components/ContentDetails/ContentDetails";

import LoadingComponent from "../../../components/LoadingComponent";

import UserProfileExpListDetails from "../../../components/UserProfile/UserProfileExpListDetails";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";

const UserProfileExpList = () => {
  const dispatch = useDispatch();
  //user Expenses
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);
  const user = useSelector((state) => state.users);
  const { profile, userLoading, userAppErr, userServerErr } = user;

  return (
    <>
      <section className="py-2">
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            {/* <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a> */}
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0 fs-3">Recent Payements</h6>
              <p className="mb-0">
                Below is the history of your Payements transactions records
              </p>
              {/* <Link
                to="/add-expense"
                className="btn  btn-outline-danger me-2 m-2"
              >
                New Expense
              </Link> */}
            </div>
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th scope="col">
                    <button className="btn d-flex align-items-center text-uppercase">
                      <small>Description</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-center text-uppercase">
                      <small>Amount</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small></small>
                    </button>
                  </th>

                  <th scope="col">
                    <button className="btn d-flex align-items-center text-uppercase">
                      <small>Date</small>
                    </button>
                  </th>
                  {/* <th scope="col">
                    <button className="btn d-flex align-items-center text-uppercase">
                      <small></small>
                    </button>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                <>
                  {userLoading ? (
                    <LoadingComponent />
                  ) : userAppErr || userServerErr ? (
                    <div>err</div>
                  ) : profile?.expenses?.length <= 0 ? (
                    <h2>No Expense Found</h2>
                  ) : (
                    profile?.expenses?.map((exp) => (
                      <UserProfileExpListDetails item={exp} key={exp?._id} />
                    ))
                  )}
                </>
              </tbody>
            </table>
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div> */}
      </section>
    </>
  );
};

export default UserProfileExpList;
