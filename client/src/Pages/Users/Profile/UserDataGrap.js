import { Doughnut, Pie } from "react-chartjs-2";

import React from "react";

const UserDataGrap = ({ income, expenses, fees }) => {
  const data1 = {
    labels: ["Store", "Wallet"],
    datasets: [
      {
        label: "# expenses",
        data: [expenses, income],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["School Fees", "Wallet"],
    datasets: [
      {
        label: "# expenses",
        data: [fees, income],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      {/* <div>
        <h3> Transactions</h3>
      </div> */}
      <div
        style={{
          display: "flex",
          height: "60px%",
          width: "20%",
          // justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginLeft: "200px",
        }}
      >
        <Pie data={data1} />
        <Pie data={data2} />
      </div>
    </>
  );
};

export default UserDataGrap;
