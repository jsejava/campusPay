import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { registerUserAction } from "../../../redux/slices/users/usersSlices";
import SuccessMessage from "../../../components/SuccessMessage";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import DisabledButton from "../../../components/DisabledButton";

import { addNewWalAction } from "../../../redux/slices/wallet/walletAction";

//Form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  // pin: Yup.string().required("pin is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
});

const Register = ({ history }) => {
  const [Empty, setEmpty] = useState(false);

  // useEffect(() => {}, []);
  //dispatch action
  const dispatch = useDispatch();
  //store state
  const users = useSelector((state) => state?.users);
  const { userLoading, userAppErr, userServerErr, isRegistered, registered } =
    users;

  // console.log("isRegistered", isRegistered);
  // console.log("registered", registered);
  //initialize form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      // pin: "",
      amount: 5,
    },
    onSubmit: (values) => {
      ////console.log(values);
      if (
        values.firstname.trim().length === 0 ||
        values.lastname.trim().length === 0
      )
        return setEmpty(true);
      dispatch(registerUserAction(values));
      //// dispatch(addNewWalAction(values));
    },
    validationSchema: formSchema,
  });

  //Redirect
  setTimeout(() => {
    if (isRegistered) history.push("/profile");
  }, 5000);
  //console.log(isRegistered);
  return (
    <section className="position-relative py-5 overflow-hidden vh-100">
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                Fast Secure and Reliable...
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">New User</span>
                <h3 className="fw-bold mb-5">Register</h3>
                {/* Success msg */}
                {registered ? (
                  <>
                    <SuccessMessage
                      msg=" Registration Successfully"
                      tipOne=" An Email is sent to your mail please verifier"
                      tipTwo=" For a successul Login"
                    />
                  </>
                ) : (
                  <>
                    {/* Display Err */}
                    {userServerErr || userAppErr ? (
                      <div class="alert alert-danger" role="alert">
                        {userServerErr}
                        {userAppErr}
                      </div>
                    ) : null}
                    <input
                      value={formik.values.firstname}
                      onBlur={formik.handleBlur("firstname")}
                      onChange={formik.handleChange("firstname")}
                      className="form-control mb-2"
                      type="text"
                      placeholder="First Name"
                    />
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.firstname && formik.errors.firstname}
                      {Empty && formik.values.firstname.trim().length <= 0 ? (
                        <label>First Name can't be Empty</label>
                      ) : (
                        ""
                      )}
                    </div>
                    <input
                      value={formik.values.lastname}
                      onBlur={formik.handleBlur("lastname")}
                      onChange={formik.handleChange("lastname")}
                      className="form-control mb-2"
                      type="TEXT"
                      placeholder="Last Name"
                    />
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.lastname && formik.errors.lastname}
                      {Empty && formik.values.lastname.trim().length <= 0 ? (
                        <label>Last Name can't be Empty</label>
                      ) : (
                        ""
                      )}
                    </div>
                    <input
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                      className="form-control mb-2"
                      type="email"
                      placeholder="Email"
                    />
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <input
                      value={formik.values.password}
                      onBlur={formik.handleBlur("password")}
                      onChange={formik.handleChange("password")}
                      className="form-control mb-2"
                      type="password"
                      placeholder="Password"
                    />
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.password && formik.errors.password}
                    </div>
                    {/* <input
                      value={formik.values.pin}
                      onBlur={formik.handleBlur("pin")}
                      onChange={formik.handleChange("pin")}
                      className="form-control mb-2"
                      type="password"
                      placeholder="pin"
                    /> */}
                    {/* Err */}
                    {/* <div className="text-danger mb-2">
                      {formik.touched.pin && formik.errors.pin}
                    </div> */}
                    {/* userLoading */}
                    {userLoading ? (
                      <DisabledButton />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary py-2 w-100 mb-4"
                      >
                        Register
                      </button>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
