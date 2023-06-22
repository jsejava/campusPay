import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import calTransaction from "../../../utils/accStatistics";
import DashboardData from "../../../components/Dashboard/DashboardData";
import navigate from "../../../utils/navigate";
import UserProfileStats from "./UserProfileStats";
import DataGraph from "../../../components/Dashboard/DataGrap";
import useDateFormatter from "../../../hooks/useDateFormatter";
import LoadingComponent from "../../../components/Loading/Loading";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import UserDataGrap from "./UserDataGrap";
import moment from "moment";
import { listMyOrdersAction } from "../../../redux/slices/orders/ordersAction";

const Profile = () => {
  const [expResult, setExpResult] = useState([]);
  const [incResult, setIncResult] = useState([]);
  const [feeResult, setFeeResult] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
    dispatch(listMyOrdersAction());
  }, []);
  //history
  const history = useHistory();
  const users = useSelector((state) => state?.users);
  const { profile, userLoading, userAppErr, userServerErr, userAuth } = users;
  const order = useSelector((state) => state?.order);
  const {
    orderList,
    orderLoading,
    orderAppErr,
    orderServerErr,
    isOrderCreated,
  } = order;
  //console.log(orderList);

  //income
  useEffect(() => {
    if (profile?.expenses) {
      const expenses = calTransaction(profile?.expenses);
      setExpResult(expenses);
    }
    if (profile?.income) {
      const income = calTransaction(profile?.income);
      setIncResult(income);
    }
    if (profile?.fees) {
      const fees = calTransaction(profile?.fees);
      setFeeResult(fees);
    }
    //   if (profile?.income) {
    //   const income = calWallet(profile?.income, profile?.expenses);
    //   setIncResult(income);
    // }
  }, [profile?.income]);

  // console.log(results);
  // const income = profile?.income;
  // const totalIncome = income
  //   ?.map(inc => inc?.amount)
  //   .reduce((acc, curr) => {
  //     return acc + curr;
  //   }, 0);

  // //Total Expenses
  // const expenses = profile?.expenses;
  // const totalExp = expenses
  //   ?.map(inc => inc?.amount)
  //   .reduce((acc, curr) => {
  //     return acc + curr;
  //   }, 0);

  // //Average expenses
  // const averageExp = totalExp / 2;

  // //min Expense

  // const expensesArr = profile?.expenses?.map(exp => exp?.amount);
  // const minExpenses = Math.min(...expensesArr);
  // const maxExpenses = Math.max(...expensesArr);

  // console.log(maxExpenses, totalExp);

  return (
    <>
      {userLoading ? (
        <LoadingComponent />
      ) : userAppErr || userServerErr ? (
        <>
          <ErrorDisplayMessage>
            {userServerErr} {userAppErr}
          </ErrorDisplayMessage>
        </>
      ) : (
        <section className="py-5">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <div className="d-flex mb-6 align-items-center">
                <div>
                  <div
                    style={{
                      marginLeft: 220,
                    }}
                  >
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "red",
                        position: "absolute",
                        top: 10,
                        borderRadius: 100,
                        marginLeft: 20,

                        fontSize: 12,
                      }}
                    >
                      {profile?.expenses?.length + profile?.fees?.length}
                    </span>
                    <i class="bi bi-wallet-fill"></i>
                  </div>
                  {/* <h6 className="fw-bold mb-0"> */}
                  <button type="button" className="fw-bold mb-5 ms-5">
                    <img
                      className="img-fluid me-1 rounded-2"
                      width={50}
                      //   style="width: 64px; height: 64px;"
                      //src="https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;cs=tinysrgb&amp;fit=crop&amp;h=128&amp;w=128"
                      //src="https://media.istockphoto.com/id/117285644/photo/speech.jpg?s=612x612&w=0&k=20&c=C4dEhyFgiRR98FhjDi8Lc6t8HAJwCCpVNbUWWap3IvE="
                      src="./logo/user-2.png"
                      alt=""
                    />
                    {profile?.firstname?.slice(0, 7)}{" "}
                    {profile?.lastname?.slice(0, 7)}
                    {/* jocelyne akugaowuwtvsbdhshsjabnakjnasjbcsahjbajkc */}
                    {/* <span className="badge ms-2 bg-primary-light text-primary">
                      {profile?.expenses?.length + profile?.fees?.length}{" "}
                      Transactions
                    </span> */}
                    {/* </h6> */}
                    <p className="mb-0">{profile?.email}</p>
                    <p className="mb-0">
                      Joined {moment(profile?.createdAt).format("LL")}
                    </p>
                    <button
                      onClick={() =>
                        navigate(history, "update-profile", profile)
                      }
                      className="btn"
                    >
                      <i class="bi bi-pen fs-3 text-primary"></i>
                    </button>
                  </button>
                </div>

                {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                 }}
                > */}
                <UserDataGrap
                  income={
                    incResult?.sumTotal -
                    (expResult?.sumTotal + feeResult?.sumTotal)
                  }
                  //income={incResult?.sumTotal}
                  expenses={expResult?.sumTotal}
                  fees={feeResult?.sumTotal}
                  // fees={
                  //   incResult?.sumTotal -
                  //   (expResult?.sumTotal + feeResult?.sumTotal)
                  // }
                />
                {/* </div> */}
              </div>

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
                numOfTransFees={profile?.fees?.length}
                avgFees={feeResult?.avg}
                totalFees={feeResult?.sumTotal}
                minFees={feeResult?.min}
                maxFees={feeResult?.max}
                netProfit={
                  incResult?.sumTotal -
                  (expResult?.sumTotal + feeResult?.sumTotal)
                }
              />
              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={() => navigate(history, "user-profile-expenses", "")}
                  className="btn btn-outline-danger d-flex align-items-center justify-content-center me-5 ms-5"
                >
                  <span>History</span>
                </button>
                <button
                  onClick={() => navigate(history, "order-list", "")}
                  className="btn btn-outline-danger d-flex align-items-center justify-content-center me-5"
                >
                  <span>orders</span>
                </button>
                <button
                  onClick={() => navigate(history, "request-list", "")}
                  className="btn  btn-outline-danger d-flex align-items-center justify-content-center me-5"
                >
                  <span>Requests</span>
                </button>

                <button
                  onClick={() => navigate(history, "user-profile-fees", "")}
                  className="btn me-4 w-100 btn-outline-info d-flex align-items-center justify-content-center "
                >
                  <span>History</span>
                </button>
                <button
                  onClick={() => navigate(history, "user-profile-income", "")}
                  className="btn w-100 btn-outline-success d-flex align-items-center justify-content-center"
                >
                  <span>History</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
