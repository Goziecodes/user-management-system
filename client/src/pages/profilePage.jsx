import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});

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
      console.log(values);
      axios({
        method: "PUT",
        data: values,
        withCredentials: true,
        url: "http://localhost:5000/update",
      }).then((res) => {
        if (res.status === 200) {
          setUser(() => res.data);
          //   console.log(res.data, "moooo");
        }
      });
    },
  });

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
      }
    });
  }, []);

  const handleEdit = () => {
    setEdit((edit) => !edit);
  };

  console.log(user, "mnmn");
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-5 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/3">
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/720x400"
                  alt="blog"
                />
                <div class="p-6">
                  <h2 class="tracking-widest text-sm title-font font-medium text-gray-900 mb-1">
                    Details
                  </h2>
                  <h2 class="title-font text-md font-medium text-gray-500 ">
                    Full name:{" "}
                    <span className="text-indigo-800">{`${
                      user.firstName ? user.firstName : ""
                    } ${user.lastName ? user.lastName : ""}`}</span>
                  </h2>
                  <h2 class="title-font text-md font-medium text-gray-500 ">
                    User name:{" "}
                    <span className="text-indigo-800">{`${
                      user.username ? user.username : ""
                    }`}</span>
                  </h2>
                  <h2 class="title-font text-md font-medium text-gray-500 ">
                    adress:{" "}
                    <span className="text-indigo-800">{`${
                      user.address ? user.address : ""
                    }`}</span>
                  </h2>
                  <h2 class="title-font text-md font-medium text-gray-500 ">
                    city and state:{" "}
                    <span className="text-indigo-800">
                      {" "}
                      {`${user.city ? user.city : ""} ${
                        user.state ? user.state : ""
                      }`}
                    </span>
                  </h2>
                  <div class="flex items-center flex-wrap justify-center mt-5">
                    <button
                      onClick={handleEdit}
                      class="bg-indigo-500 text-white px-5 py-2 rounded-full inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Edit profile
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
