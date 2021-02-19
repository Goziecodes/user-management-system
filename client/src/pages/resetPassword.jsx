import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";

function ResetPassword(props) {
  const [tokenError, setTokenError] = useState(true);
  const [error, setError] = useState(false);

  const history = useHistory();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    axios({
      method: "POST",
      data: { token },
      withCredentials: true,
      url: "http://localhost:5000/confirmPasswordToken",
    })
      .then((res) => {
        if (res.status === 200) {
          setTokenError((tokenError) => !tokenError);
        }
      })
      .catch((err) => {
        return setError((error) => !error);
      });
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(5, "Password is too short.")
        .max(20, "Password is too long.")
        .required("Password is required."),
      passwordConfirm: yup
        .string()
        .label("Password Confirm")
        .required()
        .oneOf([yup.ref("password")], "Passwords does not match"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      axios({
        method: "POST",
        data: { password: values.password, token },
        withCredentials: true,
        url: "http://localhost:5000/updatePassword",
      }).then((res) => {
        if (res.status === 200) {
          return history.push("/login");
        }
      });
    },
  });

  console.log(token, "i cant believe it");

  return (
    <>
      {tokenError ? (
        <div className="container mx-auto w-1/2  text-center mt-40 border-2 border-indigo-300">
          <p className="text-sm">
            {error
              ? "confirmation failed, use token sent to your mail..."
              : "confirming token please wait..."}
          </p>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Reset password 🚀</h1>

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password (5 characters and above)"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  {...formik.getFieldProps("passwordConfirm")}
                />
                {formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm ? (
                  <div>{formik.errors.passwordConfirm}</div>
                ) : null}
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  reset 🚀
                </button>
              </div>

              <div className="text-grey-dark flex justify-between w-4/5">
                <h3>Already have an account?</h3>
                <Link
                  className="no-underline border-b border-blue text-blue"
                  to="/login"
                >
                  Sign in
                </Link>
                .
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default ResetPassword;
