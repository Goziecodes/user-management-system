import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const [updated, setUpdated] = useState("");

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required."),
      lastName: yup.string().required("Last name is required."),
      address: yup.string().required("address is required."),
      city: yup.string().required("city is required."),
      state: yup.string().required("state is required."),
    }),
    onSubmit: (values) => {
      // console.log(values);
      axios({
        method: "PUT",
        data: values,
        withCredentials: true,
        url: "http://localhost:5000/update",
      })
        .then((res) => {
          if (res.status === 200) {
            setUpdated("updated");
            // setUser(() => res.data);
            //   console.log(res.data, "moooo");
          }
        })
        .catch((error) => {
          error.response.status === 400 && history.push("/login");
        });
    },
  });

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((error) => {
        error.response.status === 400 && history.push("/login");
      });
  }, [updated]);

  const handleEdit = () => {
    setEdit((edit) => !edit);
  };
  console.log(user, "mine");
  return (
    <>
      <section className="text-gray-600 body-font w-full ">
        <div className="container px-5 py-5 flex justify-center ">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 ">
              <div className="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                <div className="container relative mx-auto lg:h-48 md:h-36 h-36 w-60 ">
                  {user.image ? (
                    <img
                      className="h-full  w-full object-cover object-center"
                      src={user.image}
                      alt=""
                    />
                  ) : (
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src="https://dummyimage.com/720x400"
                      alt=""
                    />
                  )}
                  <button
                    type="button"
                    className="text-sm bg-indigo-400 text-white px-2 py rounded-full absolute bottom-5 left-48"
                  >
                    <Link to="/upload">Edit</Link>
                  </button>
                </div>

                <div className="p-6">
                  <h2 className="tracking-widest text-sm title-font font-medium text-gray-900 mb-1">
                    Details
                  </h2>
                  <h2 className="title-font text-md font-medium text-gray-500 ">
                    Full name:{" "}
                    <span className="text-indigo-800">{`${
                      user.firstName ? user.firstName : ""
                    } ${user.lastName ? user.lastName : ""}`}</span>
                  </h2>
                  <h2 className="title-font text-md font-medium text-gray-500 ">
                    User name:{" "}
                    <span className="text-indigo-800">{`${
                      user.username ? user.username : ""
                    }`}</span>
                  </h2>
                  <h2 className="title-font text-md font-medium text-gray-500 ">
                    adress:{" "}
                    <span className="text-indigo-800">{`${
                      user.address ? user.address : ""
                    }`}</span>
                  </h2>
                  <h2 className="title-font text-md font-medium text-gray-500 ">
                    city and state:{" "}
                    <span className="text-indigo-800">
                      {" "}
                      {`${user.city ? user.city : ""} ${
                        user.state ? user.state : ""
                      }`}
                    </span>
                  </h2>
                  <div className="flex items-center flex-wrap justify-center mt-5">
                    <button
                      onClick={handleEdit}
                      className="bg-indigo-500 text-white px-5 py-2 rounded-full inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      {edit ? "Done" : "Edit profile"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${edit ? "block" : "hidden"}`}>
        {/* <section className="hidden"> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="bg-grey-lighter  flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Registration 🚀</h1>

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
                  name="address"
                  placeholder="Address"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div>{formik.errors.address}</div>
                ) : null}

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="city"
                  placeholder="City "
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div>{formik.errors.city}</div>
                ) : null}

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="state"
                  placeholder="State"
                  {...formik.getFieldProps("state")}
                />
                {formik.touched.state && formik.errors.state ? (
                  <div>{formik.errors.state}</div>
                ) : null}

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Edit Account 🚀
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default ProfilePage;
