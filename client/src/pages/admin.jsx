import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/admin",
    }).then((res) => {
      res.status === 200 && setUsers(res.data);
    });
  }, []);

  console.log(users);
  return (
    <div className="container mx-auto bg-gray-100 py-10 flex flex-wrap justify-around">
      {users.length >= 0 ? (
        users.map((user) => (
          <div className="bg-white w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out">
            <div className="bg-gray-300 h-60">
              <img
                src="https://picsum.photos/400/300"
                alt=""
                className="rounded-t"
              />
            </div>
            <div className="p-4">
              <h2 className="text-2xl uppercase">{user.username}</h2>
              <p className="font-light text-gray-500 text-lg my-2">
                {user.email}
              </p>
              <p className="font-light text-gray-500 text-lg my-2">
                verified: {user.isVerified ? "true" : "false"}
              </p>
              <Link
                to={`/admin/more?userID=${user._id}`}
                className="block bg-gray-300 py-2 px-2 text-gray-600 text-center rounded shadow-lg uppercase font-light mt-6 hover:bg-gray-400 hover:text-white duration-300 ease-in-out"
              >
                More...
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No users Yet</p>
      )}
    </div>
  );
}
// {

// }
export default Admin;

{
  /* <h2 classNameName="title-font font-medium text-gray-500 ">
                city and state:{" "}
                <span classNameName="text-indigo-800">
                  {" "}
                  {`${user.city ? user.city : ""} ${
                    user.state ? user.state : ""
                  }`}
                </span>
              </h2>
              <h2 classNameName="title-font  font-medium text-gray-500 ">
                Last Login:
              </h2>
              <h2 classNameName="title-font font-medium text-gray-500 ">
                Last Login IP Address:
              </h2>
              <h2 classNameName="title-font  font-medium text-gray-500 ">
                Registered IP Address:
              </h2> */
}
