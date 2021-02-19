import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

function Forgot(props) {
  const [emailError, setEmailError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [test, settest] = useState("i am testing");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("email is required."),
    }),
    onSubmit: (values) => {
      console.log(values, "value");
      axios({
        method: "POST",
        data: values,
        withCredentials: true,
        url: "http://localhost:5000/forgot",
      })
        .then((res) => {
          if (res.data.msg === "sent")
            return setEmailSent((emailSent) => !emailSent);
        })
        .catch((err) => {
          return setEmailError((emailError) => !emailError);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-sm border-2 border-indigo-200  text-center">
                Enter the email you registered with to recover your password
              </h1>
              {emailError && (
                <p className="text-sm">
                  No User registered with the email provided
                </p>
              )}
              {emailSent && (
                <p className="text-sm">
                  Check your mail for password recovery link
                </p>
              )}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Get recovery link 🚀
              </button>
            </div>

            <div className="text-grey-dark flex justify-between w-4/5">
              <h3>Dont have an account?</h3>
              <button
                type="button"
                className="bg-green-600 px-2 rounded-md text-white"
              >
                <Link
                  className="no-underline border-b border-blue text-blue "
                  to="/signup"
                >
                  Sign up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Forgot;
