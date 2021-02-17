import React from "react";

function Home() {
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

          <div class="flex flex-wrap -m-4">
            <div class="xl:w-1/4 md:w-1/2 p-4">
              <div class="bg-gray-100 p-6 rounded-lg">
                {/* <img
                  class="h-40 rounded w-full object-cover object-center mb-6"
                  src="https://dummyimage.com/720x400"
                  alt="content"
                /> */}
                <h3 class="tracking-widest text-blue-500 text-xs font-medium title-font">
                  TITLE
                </h3>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                  Chichen Itza
                </h2>
                <p class="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waistcoat.
                  Distillery hexagon disrupt edison bulbche.
                </p>
                <div className="w-full container mx-auto flex justify-center items-center">
                  <button
                    className="bg-white text-blue-500 text-2xl px-5 rounded-full"
                    type="button"
                  >
                    <a href="/new">Read more...</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
