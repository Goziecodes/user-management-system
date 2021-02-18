import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, Redirect, Route, Switch } from "react-router-dom";

function Verify(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      token: "",
    },
    validationSchema: yup.object({
      token: yup.string().required("token is required."),
      email: yup.string().email().required("email is required."),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "POST",
        data: values,
        withCredentials: true,
        url: "http://localhost:5000/verify",
      }).then((res) => {
        if (res.status === 200) {
          // console.log(`meee ${JSON.stringify(res)}`);
          props.history.push("/");
        } else {
          props.history.push("/verify");
        }
      });
      // }).then((res) => console.log(`meee ${JSON.stringify(res)}`));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">
                Verify your Email with token sent to your mail before you can be
                able to login{" "}
              </h1>
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

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="token"
                placeholder="token"
                {...formik.getFieldProps("token")}
              />
              {formik.touched.token && formik.errors.token ? (
                <div>{formik.errors.token}</div>
              ) : null}

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Verify Email 🚀
              </button>
            </div>

            <div className="text-grey-dark flex justify-between w-4/5">
              <h3>Dont have an account?</h3>
              <Link
                className="no-underline border-b border-blue text-blue"
                to="/signup"
              >
                Sign up
              </Link>
              .
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Verify;
