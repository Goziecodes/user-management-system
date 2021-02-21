import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";

function AdminMore(props) {
  const [edited, setEdited] = useState(false);
  const [edituser, setEditUser] = useState(false);
  const [user, setUser] = useState({});

  const history = useHistory();
  const search = useLocation().search;
  const userID = new URLSearchParams(search).get("userID");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      address: `${user.address}`,
      city: `${user.city}`,
      state: `${user.state}`,
      role: `${user.role}`,
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required."),
      lastName: yup.string().required("Last name is required."),
      address: yup.string().required("address is required."),
      city: yup.string().required("city is required."),
      state: yup.string().required("state is required."),
      role: yup.string().required("role is required."),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      axios({
        method: "PUT",
        data: values,
        withCredentials: true,
        url: `http://localhost:5000/admin/edit/${userID}`,
      })
        .then((res) => {
          if (res.status === 200) {
            res.status === 200 && setEdited((edited) => !edited);
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
      url: `http://localhost:5000/admin/user/${userID}`,
    })
      .then((res) => {
        res.status === 200 && setUser(res.data);
      })
      .catch((error) => {
        error.response.status === 400 && history.push("/");
      });
  }, [userID, edited]);

  const handleBlock = () => {
    axios({
      method: "PUT",
      withCredentials: true,
      url: `http://localhost:5000/admin/block/${userID}`,
    })
      .then((res) => {
        res.status === 200 && setEdited((edited) => !edited);
      })
      .catch((error) => {
        error.response.status === 400 && history.push("/");
      });
  };

  const handleUnblock = () => {
    axios({
      method: "PUT",
      withCredentials: true,
      url: `http://localhost:5000/admin/unblock/${userID}`,
    })
      .then((res) => {
        res.status === 200 && setEdited((edited) => !edited);
      })
      .catch((error) => {
        error.response.status === 400 && history.push("/");
      });
  };

  console.log(user, "kokoko");
  return (
    <>
      {edituser ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="bg-grey-lighter  flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Edit User 🚀</h1>

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="firstName"
                  value={formik.values.firstName}
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

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="role"
                  placeholder="role"
                  {...formik.getFieldProps("role")}
                />
                {formik.touched.role && formik.errors.role ? (
                  <div>{formik.errors.role}</div>
                ) : null}

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Edit User 🚀
                </button>
                <div className="flex justify-center">
                  <button
                    onClick={() => setEditUser((edituser) => !edituser)}
                    type="button"
                    className=" bg-green-600 mt-2 rounded-lg text-center px-2 text-white"
                  >
                    Finish Editing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <section class="antialiased bg-gray-50 font-sans pt-8">
          <div class="max-w-6xl mx-auto ">
            <div class="flex flex-col w-full items-center justify-center ">
              <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3 bg-gray-200">
                <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                  <div class="bg-cover bg-center h-56 p-4">
                    {user.image ? (
                      <img className="w-full h-full" src={user.image} alt="" />
                    ) : (
                      <img
                        className="w-full h-full"
                        src="https://dummyimage.com/720x400"
                        alt=""
                      />
                    )}
                  </div>
                </div>

                <div class="px-4 pt-3 pb-4 border-t border-gray-300 mt-8 rounded-lg bg-gray-100">
                  <div class="text-xs uppercase font-bold text-gray-600 tracking-wide">
                    Details
                  </div>
                  <div class="flex items-center pt-2">
                    <div
                      class="bg-cover bg-center w-10 h-10 rounded-full mr-3"
                      style={{
                        backgroundImage: `url(${user.image})`,
                      }}
                    ></div>
                    <div>
                      <p class="font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p class="text-sm text-indigo-700">@{user.username}</p>
                    </div>
                  </div>
                  <div class="p-4">
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      first name • {user.firstName}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      last name • {user.lastName}
                    </p>

                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      email • {user.email}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      address • {user.address}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      user name • {user.username}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      city • {user.city ? user.city : "---"}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      state • {user.state ? user.state : "---"}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      verified • {`${user.isVerified}`}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      blocked • {`${user.blocked}`}
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      Registered IP Address • coming
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      last login IP Address • coming
                    </p>
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                      last login date • coming
                    </p>
                    {/* <p class="text-gray-700">{user.address}</p> */}
                  </div>
                  <div className="text-center flex justify-between">
                    <button
                      onClick={() => setEditUser((edituser) => !edituser)}
                      type="button"
                      className=" bg-indigo-500 mt-2 rounded-lg px-2 text-white"
                    >
                      Edit User Details
                    </button>
                    {user.blocked ? (
                      <button
                        onClick={handleUnblock}
                        type="button"
                        className=" bg-green-500 mt-2 rounded-lg px-2 text-white"
                      >
                        Unblock User
                      </button>
                    ) : (
                      <button
                        onClick={handleBlock}
                        type="button"
                        className=" bg-red-500 mt-2 rounded-lg px-2 text-white"
                      >
                        Block User
                      </button>
                    )}
                  </div>
                </div>

                <div class="flex p-4 border-t border-gray-300 text-gray-700">
                  <div class="flex w-full items-center justify-around">
                    <p>
                      <span class="text-gray-900 font-bold">
                        {user?.posts?.length}
                      </span>{" "}
                      {user?.posts?.length >= 2 ? "Posts" : "Post"}
                    </p>
                  </div>
                  <div class="flex-1 inline-flex items-center"></div>
                </div>
                {user?.posts?.length >= 0 ? (
                  user.posts.map((post) => (
                    <section class="container mx-auto max-w-sm mb-4 flex flex-col space-y-4 justify-center items-center">
                      <div class="bg-white w-full flex  items-center p-2 rounded-xl shadow border">
                        <div className="w-full flex">
                          <div class="relative flex items-center space-x-4">
                            <img
                              src={user.image}
                              alt="My profile"
                              class="w-16 h-16 rounded-full"
                            />
                          </div>
                          <div class="flex-grow p-3">
                            <div class="font-semibold text-gray-700 mb-2">
                              {post.title}
                            </div>
                            <div class="text-md text-gray-500">
                              <Link
                                to={`/post?postId=${post._id}`}
                                className="bg-indigo-500 text-white px-2  rounded-full"
                              >
                                view post
                              </Link>
                            </div>
                          </div>
                          <div class="p-2">
                            <span class="block h-4 w-4 bg-blue-400 rounded-full bottom-0 right-0"></span>
                          </div>
                        </div>
                      </div>
                    </section>
                  ))
                ) : (
                  <p>no posts by this user yet</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AdminMore;
