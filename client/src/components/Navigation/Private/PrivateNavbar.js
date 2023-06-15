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
            <img
              style={{
                borderRadius: "100%",
              }}
              alt="logo"
              //src="/logo/camPay1.png"
              //src="https://img.freepik.com/premium-vector/wallet-logo-design-vector-template_306040-2194.jpg?w=2000"
              //src="https://w7.pngwing.com/pngs/1024/970/png-transparent-black-wallet-logo-money-wallet-computer-icons-payment-finance-wallet-icons-no-attribution-text-service-logo.png"
              src="./logo/pay-5.png"
              width={50}
            />
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
              {profile ? (
                <li class="nav-item mb-2">
                  <Link to="/" className="btn  btn-outline-warning me-2">
                    Hi. {profile?.firstname}
                  </Link>
                </li>
              ) : (
                <li class="nav-item mb-2">
                  <Link to="/" className="btn  btn-outline-warning me-2">
                    Home
                  </Link>
                </li>
              )}

              <li class="nav-item mb-2">
                <Link to="/profile" className="btn  btn-outline-warning me-2">
                  User Dashboard
                </Link>
              </li>
              <li class="nav-item mb-2">
                <a
                  className="btn  btn-outline-warning me-2"
                  href="http://localhost:3000"
                >
                  Campus
                </a>
              </li>
              {/* <li class="nav-item">
                <Link to="/profile" className="btn  btn-outline-primary me-2">
                  Dashboard
                </Link>
              </li> */}
            </ul>
            <form class="d-flex">
              <Link to="/add-expense" className="btn btn-outline-danger me-2">
                Order Payments
              </Link>
              <Link to="/add-reqexp" className="btn btn-outline-success me-2">
                Request Payments
              </Link>
              <Link to="/add-fees" className="btn btn-outline-info me-2">
                School Fees
              </Link>
              {/* <Link to="/add-income" className="btn btn-success me-2">
                Activate Wallet
              </Link> */}
              <button
                onClick={() => dispatch(logoutAction())}
                className="btn btn-outline-warning me-2"
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
