import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const auth = useContext(AuthContext);
  const { authState } = auth;

  return (
    <>
      <div className="w-full h-10 text-md bg-gray-400 flex justify-between items-center text-white px-10">
        <div>
          <h1>{authState?.userInfo?.username}</h1>
        </div>
        <div className="flex gap-2">
          <a href="/">Home</a>
          <a href="/Profile">Profile</a>
          {auth.isAuthenticated() ? (
            <button onClick={auth.logout} type="button">
              logout
            </button>
          ) : (
            <a href="/login">login</a>
          )}
        </div>
      </div>
      {/* <>
      <div className="w-full h-10 text-md bg-gray-400 flex justify-between items-center text-white px-10">
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
      </div> */}
    </>
  );
}

export default Nav;
