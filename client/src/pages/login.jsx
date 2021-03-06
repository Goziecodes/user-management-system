import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login(props) {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("User name is required."),
      password: yup
        .string()
        .min(5, "Password is too short.")
        .max(20, "Password is too long.")
        .required("Password is required."),
    }),
    onSubmit: (values) => {
      // console.log(values);
      axios({
        method: "POST",
        data: values,
        withCredentials: true,
        url: "http://localhost:5000/login",
      }).then((res) => {
        if (res.status === 200) {
          authContext.setAuthState(res.data.user);
          history.push("/");
        } else {
          history.push("/login");
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
              <h1 className="mb-8 text-3xl text-center">LOGIN </h1>
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
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password (5 characters and above)"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Login 🚀
              </button>
              <div className="flex justify-end">
                {" "}
                <button
                  type="button"
                  className="bg-green-600 px-2 py  rounded-md text-white"
                >
                  <Link
                    className="no-underline  text-xs border-b border-blue text-blue "
                    to="/forgot"
                  >
                    forgot password?
                  </Link>
                </button>
              </div>
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

export default Login;
