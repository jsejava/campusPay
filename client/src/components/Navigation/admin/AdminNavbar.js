import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/slices/users/usersSlices";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-currency-exchange fs-1 text-warning "></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mb-2">
                <Link to="/" className="btn  text-info me-2 disabled">
                  Hi, Administration
                </Link>
              </li>

              <li className="nav-item mb-2">
                <Link to="/dashboard" className="btn btn-outline-danger me-2">
                  Admin Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/expenses" className="btn btn-outline-warning me-2">
                  Payments List
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/fees" className="btn btn-outline-primary me-2">
                  school fees List
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/incomes" className="btn btn-outline-warning me-2">
                  Deposits List
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/edit-wallet"
                  className="btn btn-outline-primary me-2"
                >
                  Load Wallet
                </Link>
              </li>
            </ul>
            <form className="d-flex">
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

export default AdminNavbar;
