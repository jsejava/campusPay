import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  const users = useSelector((state) => state?.users);

  const { userAuth } = users;
  //return <>{userAuth ? <PrivateNavbar /> : <PublicNavbar />}</>;
  if (userAuth) {
    return userAuth.isAdmin ? <AdminNavbar /> : <PrivateNavbar />;
  } else return <PublicNavbar />;
};

export default Navbar;
