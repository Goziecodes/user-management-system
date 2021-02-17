import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, Redirect, Route, Switch } from "react-router-dom";

function SignUp(props) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required."),
      lastName: yup.string().required("Last name is required."),
      email: yup.string().email().required("email name is required."),
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
      username: yup.string().required("User name is required."),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "POST",
        data: values,
        withCredentials: true,
        url: "http://localhost:5000/signup",
      }).then((res) => {
        if (res.status === 200) {
          // console.log(`meee ${JSON.stringify(res)}`);
          props.history.push("/verify");
        } else {
          props.history.push("/signup");
        }
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Registration 🚀</h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="User Name"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstName"
                placeholder="First Name"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lastName"
                placeholder="Last Name"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}

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
                Create Account 🚀
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
    </>
  );
}

export default SignUp;
