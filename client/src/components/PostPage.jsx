import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

function PostPage(props) {
  const [comments, setComments] = useState([]);
  const post = props.location.state.post;

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: yup.object({
      text: yup.string().required("comment is required."),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm({ values: "" });
      axios({
        method: "POST",
        data: values,
        withCredentials: true,
        url: `http://localhost:5000/comment/${post._id}`,
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data, "mgbada");
          setComments(res.data);
          // console.log(`meee ${JSON.stringify(res)}`);
        } else {
          props.history.push("/verify");
        }
      });
    },
  });

  useEffect(() => {
    setComments(() => post.comments);
  }, []);
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-2 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            {/* <div class="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                class="object-cover object-center h-full w-full"
                src="https://dummyimage.com/1200x500"
              />
            </div> */}
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">
                    {post?.author?.username}
                  </h2>
                  <div class="w-12 h-1 bg-blue-500 rounded mt-2 mb-4"></div>
                  <p class="text-base">{post?.title}</p>
                </div>
                <span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 sm:text-left">
                <p class="leading-relaxed text-md ">{post?.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="w-full h-1 flex justify-center">
        <div class="w-1/2 h-1 bg-blue-500 rounded mt-2 mb-4 flex self-center"></div>
      </div>
      <section class="text-gray-600 body-font overflow-hidden mt-8">
        <div class="md:w-full md:mb-0 mb-8 px-5">
          <h1 class="font-semibold title-font text-gray-700 text-lg">
            Comments
          </h1>
        </div>
        <div class="container px-5  mx-auto">
          {comments.length >= 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                class="-my-8 divide-y-2 divide-gray-100 border-b-2 border-gray-400 mb-10"
              >
                <div class="py-2 flex flex-wrap md:flex-nowrap">
                  <div class="md:flex-grow text-md">
                    <p class="text-indigo-500 inline-flex items-center mt-4">
                      {comment.author.username}
                    </p>

                    <p class="leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Be the first to comment!</p>
          )}
        </div>
      </section>
      <section className="">
        <div className="w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-grey-lighter  flex flex-col">
              <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white rounded shadow-md text-black w-full">
                  <textarea
                    className="block border border-grey-light w-full p-3 rounded mb-4 h-20"
                    name="text"
                    placeholder="enter your comment here..."
                    {...formik.getFieldProps("text")}
                  ></textarea>

                  {formik.touched.text && formik.errors.text ? (
                    <div>{formik.errors.text}</div>
                  ) : null}

                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                  >
                    comment🚀
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default PostPage;