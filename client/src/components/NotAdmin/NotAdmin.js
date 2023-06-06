import React from "react";
import notAdmin from "../../img/notadmin.svg";
const NotAdmin = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      <h1 className="text-danger">You Are Not Authorized</h1>
      <p className="text-success">Please Login For To Get Access</p>
      <img
        alt="NotAdmin"
        className=" img-fluid m-3"
        width={300}
        src="https://media.istockphoto.com/id/473976598/photo/small-person-standing-on-word-no.jpg?s=612x612&w=0&k=20&c=AY3FjTdXaRHBovy5vuGirMypxNDQpX42G2E1fd6F1dY="
      />
    </div>
  );
};

export default NotAdmin;
