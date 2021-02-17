import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Router, BrowserRouter } from "react-router-dom";

function Nav() {
  const [currentUser, setcurrentUser] = useState({});
  useEffect(() => {
    console.log("here");

    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => {
      setcurrentUser(res.data);
      console.log(res);
    });
  }, []);

  return (
    <>
      <div className="w-full h-20 text-2xl bg-gray-400 flex justify-between items-center text-white px-10">
        <div>
          <h1>{currentUser?.username}</h1>
        </div>
        <div className="flex gap-2">
          <a href="/">Home</a>
          <a href="/Profile">Profile</a>
          {currentUser ? (
            <a href="/logout">logout</a>
          ) : (
            <a href="/login">login</a>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
