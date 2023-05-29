import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/slices/users/usersSlices";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";

const PrivateNavbar = () => {
  const users = useSelector((state) => state?.users);
  const { profile, userLoading, userAppErr, userServerErr, userAuth } = users;
  //console.log(profile);
  const dispatch = useDispatch();
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to="/" className="navbar-brand">
            <i class="bi bi-currency-exchange fs-1 text-warning "></i>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li class="nav-item">
                <Link to="/expenses" className="nav-link active">
                  Payements List
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/incomes" className="nav-link active">
                  Deposits List
                </Link>
              </li> */}
              <li class="nav-item mb-2">
                <Link to="/" className="btn  text-info me-2 disabled">
                  Hi, {profile?.firstname}
                </Link>
              </li>
              <li class="nav-item mb-2">
                <Link to="/" className="btn  btn-outline-warning me-2">
                  Home
                </Link>
              </li>

              <li class="nav-item mb-2">
                <Link to="/profile" className="btn  btn-outline-warning me-2">
                  User Dashboard
                </Link>
              </li>
              <li class="nav-item mb-2">
                <a
                  className="btn  btn-outline-warning me-2"
                  href="http://localhost:3000/shop"
                >
                  Campus Store
                </a>
              </li>
              {/* <li class="nav-item">
                <Link to="/profile" className="btn  btn-outline-primary me-2">
                  Dashboard
                </Link>
              </li> */}
            </ul>
            <form class="d-flex">
              <Link to="/add-expense" className="btn btn-danger me-2">
                Make Payments
              </Link>
              <Link to="/add-fees" className="btn btn-info me-2">
                School Fees
              </Link>
              {/* <Link to="/add-income" className="btn btn-success me-2">
                Activate Wallet
              </Link> */}
              <button
                onClick={() => dispatch(logoutAction())}
                className="btn btn-warning me-2"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrivateNavbar;
