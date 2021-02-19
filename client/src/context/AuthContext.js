import axios from "axios";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const userInfo = localStorage.getItem("userInfo");

  const logout = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/logout",
    });
    localStorage.removeItem("userInfo");
    setAuthState({});
    history.push("/login");
  };

  const [authState, setAuthState] = useState({
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setAuthState({
      userInfo,
    });
  };

  const isAuthenticated = () => {
    if (authState.userInfo) {
      return true;
    }
    return false;
    // return authState.username ? true : false;
  };

  const isAdmin = () => {
    return authState?.userInfo?.role === "admin";
  };

  const isBlocked = () => {
    return authState?.userInfo.blocked;
  };

  const isVerified = () => {
    return authState?.userInfo.isVerified;
  };

  //   console.log(authState, "i am auth state");
  //   console.log(isAuthenticated(), "i am authenticated");
  //   console.log(isAdmin(), "i am admin");

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
        isBlocked,
        isVerified,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
