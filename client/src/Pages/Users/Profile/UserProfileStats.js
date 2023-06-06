import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrencyFormatter from "../../../hooks/useCurrencyFormatter";

const UserProfileStats = ({
  avgExp,
  totalExp,
  minExp,
  maxExp,
  numOfTransExp,
  avgInc,
  totalInc,
  minInc,
  maxInc,
  numOfTransInc,
  numOfTransFees,
  avgFees,
  totalFees,
  minFees,
  maxFees,
  netProfit,
}) => {
  //format curr
  const formattedAmt = useCurrencyFormatter("GHS", totalExp);
  const formattedAmtInc = useCurrencyFormatter("GHS", totalInc);
  const formattedAmtfees = useCurrencyFormatter("GHS", totalFees);
  const formattedNetProfit = useCurrencyFormatter("GHS", netProfit);
  //format date

  return (
    <section class="py-6">
      <div class="container">
        {/* Net Profit */}
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h2 className="text-success">Wallet : {formattedNetProfit}</h2>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 mdivb-6">
            <div class="p-0 border rounded-2">
              <div class="d-flex mb-6 align-items-start justify-content-between">
                {/* class="d-flex mb-6 align-items-start justify-content-between" */}
                <span
                  class="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>
                {/* Expenses Start */}
                <span class="badge fs-2 bg-primary-light text-primary">
                  Store & Services
                </span>
              </div>
              <h1 class="mb-0 p-2">{formattedAmt}</h1>
              <p class="mb-0">
                <span>Number of Transactions</span>
                <span class="text-danger ms-1">
                  <span>{numOfTransExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Minimum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{minExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Maximum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{maxExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Average Transactions</span>
                <span class="text-danger ms-1">
                  <span>{avgExp}</span>
                </span>
              </p>
            </div>
          </div>
          {/* limit */}
          {/* <div class="col-12 col-md-6 mb-6"> */}
          <div class="col-12 col-md-4 mdivb-6">
            <div class="p-8 border rounded-2">
              <div class="d-flex mb-6 align-items-start justify-content-between">
                <span
                  class="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>

                {/* Income Start */}
                <span class="badge fs-2 bg-primary-light text-primary">
                  School Fees
                </span>
              </div>
              <h1 class="mb-0 p-2">{formattedAmtfees}</h1>

              <p class="mb-0">
                <span>Number of Transactions</span>
                <span class="text-danger ms-1">
                  <span>{numOfTransFees}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Minimum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{minFees}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Maximum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{maxFees}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Average Transactions</span>
                <span class="text-danger ms-1">
                  <span>{avgFees}</span>
                </span>
              </p>
            </div>
          </div>
          {/* limit */}
          <div class="col-12 col-md-4 mdivb-6">
            <div class="p-8 border rounded-2">
              <div class="d-flex mb-6 align-items-start justify-content-between">
                <span
                  class="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>

                {/* Income Start */}
                <span class="badge fs-2 bg-primary-light text-primary">
                  Deposits
                </span>
              </div>
              <h1 class="mb-0 p-2">{formattedAmtInc}</h1>
              {/* totalInc */}
              {/* <p class="mb-0">
                <span>Total Transactions</span>
                <span class="text-danger ms-1">
                  <span>{totalInc}</span>
                </span>
              </p> */}
              <p class="mb-0">
                <span>Number of Transactions</span>
                <span class="text-danger ms-1">
                  <span>{numOfTransInc}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Minimum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{minInc}</span>
                </span>
              </p>
              <p class="mb-0">
                <span>Maximum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{maxInc}</span>
                </span>
              </p>
              <p class="mb-0">
                <span>Average Transactions</span>
                <span class="text-danger ms-1">
                  <span>{avgInc}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileStats;
