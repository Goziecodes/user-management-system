import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function NewPost(props) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: yup.object({
      title: yup.string().required(" title is required."),
      body: yup.string().required(" body is required."),
    }),

    onSubmit: (values) => {
      // console.log(values);
      axios({
        method: "POST",
        data: values,
        withCredentials: true,
        url: "http://localhost:5000/posts",
      })
        .then((res) => {
          if (res.status === 200) {
            history.push("/");
          }
        })
        .catch((error) => {
          error.response.status === 400 && history.push("/login");
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-20 px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Create Post </h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="title"
                placeholder="Title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}

              <textarea
                className="block border border-grey-light w-full p-3 rounded mb-4 h-96"
                name="body"
                placeholder="enter your post here..."
                {...formik.getFieldProps("body")}
              ></textarea>

              {formik.touched.body && formik.errors.body ? (
                <div>{formik.errors.body}</div>
              ) : null}

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Publish 🚀
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewPost;
