import React from "react";
import { Link } from "react-router-dom";
const PublicNavbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              style={{
                borderRadius: "50px",
              }}
              alt="logo"
              //src="/logo/camPay1.png"
              src="https://media.istockphoto.com/id/980110018/photo/letter-p-uppercase-alphabet-plastic-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=1VNAt2GG4c9HANzz9M53A1zCm763ptsmQMeOk5WE3mY="
              width="50"
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
              <li class="nav-item mb-2">
                <Link to="/" className="btn  btn-outline-warning me-2">
                  Home
                </Link>
              </li>
              {/* 
              <li class="nav-item mb-2">
                <Link
                  to="/add-expense"
                  className="btn  btn-outline-warning me-2"
                >
                  New Expense
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="/add-income"
                  className="btn  btn-outline-primary me-2"
                >
                  New Income
                </Link>
              </li> */}
            </ul>
            <form class="d-flex">
              <Link to="/login" className="btn btn-outline-secondary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;
