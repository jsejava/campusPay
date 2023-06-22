import React from "react";
import { useSelector } from "react-redux";
import AccessBank from "../../Pages/Expenses/AccessBank";
import AdminNavbar from "./admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const AdNavbar = () => {
  <AccessBank />;
  const users = useSelector((state) => state?.users);
  // console.log("admin", users);
  const { userAuth } = users;
  // console.log("admin", userAuth.isAdmin);
  return <>{userAuth.isAdmin ? <AdminNavbar /> : <PrivateNavbar />}</>;
};

export default AdNavbar;
