import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/posts",
    }).then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap w-full mb-4">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Socialize today!
              </h1>
              <div class="h-1 w-20 bg-blue-500 rounded"></div>
            </div>
            <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
              create awesome posts and discuss with people in the comment
              section. Dont forget to update your profile for better
              identification!
            </p>
          </div>

          <div className="w-full container mx-auto flex justify-center items-center mb-20">
            <button
              className="bg-blue-500 text-white text-2xl px-10 rounded-full"
              type="button"
            >
              <a href="/new">Add New Post</a>
            </button>
          </div>

          {posts.length >= 0 ? (
            posts.map((post) => (
              <div key={post._id} class="flex flex-wrap -m-4">
                <div class="xl:w-1/4 md:w-1/2 p-4">
                  <div class="bg-gray-100 p-6 rounded-lg">
                    <h3 class="tracking-widest text-blue-500 text-xs font-medium title-font">
                      TITLE
                    </h3>
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                      {post.title}
                    </h2>
                    <p class="leading-relaxed text-base">
                      {post.body.slice(0, 120)} ...
                    </p>

                    <h3 class="tracking-widest text-blue-500 text-xs font-medium title-font mt-2">
                      AUTHOR
                    </h3>
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                      {post.author.username}
                    </h2>

                    <div className="w-full container mx-auto flex justify-center items-center mt-8">
                      <button
                        className="bg-white text-blue-500 text-2xl px-5 rounded-full"
                        type="button"
                      >
                        <Link
                          to={{
                            pathname: "/post",
                            state: {
                              post: post,
                            },
                          }}
                        >
                          Read more...
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts yet, add Some!</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
