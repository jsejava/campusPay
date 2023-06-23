import React from "react";

import homeUrl from "../components/appUrl/homeUrl";
import serviceUrl from "../components/appUrl/serviceUrl";
import shopUrl from "../components/appUrl/shopUrl";
import connectionUrl from "../components/appUrl/connectionUrl";
const Home = () => {
  return (
    <>
      <section className="position-relative pb-5">
        <img
          className="d-none d-lg-block position-absolute top-0 start-0 bottom-0  img-fluid"
          style={{ objectFit: "cover" }}
          src="https://img.freepik.com/premium-vector/money-wallet-earning-concept-online-payment-flat-vector-illustration-banner-landing-page_128772-922.jpg"
          alt=""
        />
        <div className="position-relative">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-lg-5 ms-auto">
                <div
                  className="mb-5"
                  style={{
                    marginLeft: 80,
                  }}
                >
                  <div className="display-12 fw-bold">
                    <h2>
                      {" "}
                      <span className="text-success">Campus</span>
                      <span className="text-Primary">Pay</span>
                    </h2>
                  </div>

                  <i className="lead text-muted">Fastest And Secure</i>
                </div>
                {/* <h1 className="text-danger">Admin Login </h1>
                <p>User name: admin@gmail.com</p>
                <p>password: 12345</p> */}
                <div className="row align-items-center pt-5">
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <a href={homeUrl}>
                      <img
                        className="d-inline-block img-fluid"
                        //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm9_fQeyx5KkAhwNezfxroN4B3QVSpcCDr9OSf1iburTIkvCKZWWGqUjjmLpnPvSahSUQ&usqp=CAU"
                        src="./logo/house.png"
                        alt=""
                        width={35}
                      />
                    </a>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <a href={shopUrl}>
                      <img
                        className="d-inline-block img-fluid"
                        //src="https://media.istockphoto.com/id/1409239968/vector/small-shopping-cart-place-on-a-laptop-computer-with-an-orange-screen.jpg?s=612x612&w=0&k=20&c=A9shw5R2di2okMhTqGy9JD7gPWTUyN01rI930Wx51qA="
                        src="./logo/shop.png"
                        alt=""
                        width={55}
                      />
                    </a>
                  </div>

                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <a href={serviceUrl}>
                      <img
                        className="d-inline-block img-fluid"
                        src="./logo/service.png"
                        alt=""
                        width={40}
                      />
                    </a>
                  </div>

                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 text-center mb-5">
                    <a href={connectionUrl}>
                      <img
                        className="d-inline-block img-fluid"
                        //src="https://www.creativefabrica.com/wp-content/uploads/2019/02/Money-payment-logo-vector-by-DEEMKA-STUDIO-3.jpg"
                        src="./logo/chat.png"
                        alt=""
                        width={35}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
