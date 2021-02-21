import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPicture() {
  // const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const history = useHistory();

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (image) => {
    try {
      await axios({
        method: "POST",
        headers: { "Content-type": "application/json" },
        // data: image,
        data: { data: JSON.stringify(image) },
        withCredentials: true,
        url: "http://localhost:5000/upload",
      })
        .then((res) => {
          if (res.status === 200) {
            //   setUser(() => res.data);
            console.log(res.data, "moooo");
          }
        })
        .catch((error) => {
          error.response.status === 400 && history.push("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="">
        <form onSubmit={handleSubmit}>
          <div className="bg-grey-lighter  flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-xl text-center">
                  Upload Profile Picture
                </h1>

                <input
                  onChange={handleFileInput}
                  type="file"
                  // value={fileInputState}
                  className="block text-sm border border-grey-light w-full p-3 rounded mb-4"
                  name="image"
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Upload 🚀
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="container mx-auto ">
          {previewSource && (
            <div>
              <img className="w-full" src={previewSource} alt="" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default UploadPicture;
