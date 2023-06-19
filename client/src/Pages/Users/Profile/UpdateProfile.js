import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";

import { updateUserAction } from "../../../redux/slices/users/usersSlices";
import navigate from "../../../utils/navigate";
import SuccessMessage from "../../../components/SuccessMessage";

//Form validation
const formSchema = Yup.object({
  pin: Yup.string().required("Enter Current Pin is required"),
  newpin: Yup.string().required("Enter New Pin is required"),
  // email: Yup.string().required("email is required"),
});

const UpdateProfile = ({ location: { state: data } }) => {
  //dispatch action
  const dispatch = useDispatch();

  //users
  const user = useSelector((state) => state?.users);
  const { userLoading, userAppErr, userServerErr, isUpdated } = user;
  //console.log(user);
  // console.log(userLoading, isUpdated);

  const history = useHistory();
  //initialize form
  const formik = useFormik({
    // initialValues: {
    //   firstname: data?.data?.firstname,
    //   lastname: data?.data?.lastname,
    //   email: data?.data?.email,
    // },
    initialValues: {
      pin: "",
      newpin: "",
      // email: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      const user = {
        ...values,
        id: data?.data?.id,
      };
      dispatch(updateUserAction(user));
      // dispatch();
    },
    validationSchema: formSchema,
  });

  if (isUpdated) {
    navigate(history, "profile", undefined);
  }
  return (
    <>
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                {isUpdated ? (
                  <SuccessMessage
                    msg=" Registration Successfully"
                    tipOne=" An Email is sent to your mail please verifier"
                    tipTwo=" For a successul Login"
                  />
                ) : (
                  <>
                    {/* Display Err */}
                    {userAppErr || userServerErr ? (
                      <div class="alert alert-danger" role="alert">
                        {userAppErr || userServerErr}
                      </div>
                    ) : null}
                    <form onSubmit={formik.handleSubmit}>
                      <span className="text-muted">Update Profile</span>
                      <h4 className="mb-4 fw-light">
                        <i>
                          Hi,{" "}
                          <b className="text-primary">
                            {data?.data?.firstname}
                          </b>{" "}
                          Change Your
                        </i>
                      </h4>

                      <div className="mb-3 input-group">
                        <input
                          value={formik.values.pin}
                          onBlur={formik.handleBlur("pin")}
                          onChange={formik.handleChange("pin")}
                          className="form-control"
                          type="text"
                          placeholder="Enter Current Pin"
                        />
                      </div>
                      {/* Err */}
                      <div className="text-danger mb-2">
                        {formik.touched.pin && formik.errors.pin}
                      </div>
                      <div className="mb-3 input-group">
                        <input
                          value={formik.values.newpin}
                          onBlur={formik.handleBlur("newpin")}
                          onChange={formik.handleChange("newpin")}
                          className="form-control"
                          type="text"
                          placeholder="Enter New Pin"
                        />
                      </div>
                      {/* Err */}
                      <div className="text-danger mb-2">
                        {formik.touched.newpin && formik.errors.newpin}
                      </div>

                      {/* <div className="mb-3 input-group">
                    <input
                      value={formik.values.firstname}
                      onBlur={formik.handleBlur("firstname")}
                      onChange={formik.handleChange("firstname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter firstname"
                    />
                  </div> */}
                      {/* Err */}
                      {/* <div className="text-danger mb-2">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.lastname}
                      onBlur={formik.handleBlur("lastname")}
                      onChange={formik.handleChange("lastname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter lastname"
                    />
                  </div> */}
                      {/* Err */}
                      {/* <div className="text-danger mb-2">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div> */}
                      {/* <div className="mb-3 input-group">
                    <input
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                      className="form-control"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div> */}
                      {/* Err */}
                      {/* <div className="text-danger mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div> */}

                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <button type="submit" class="btn btn-warning">
                          Update
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
