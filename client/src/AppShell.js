import React from "react";
import Navbar from "./components/Nav";

const AppShell = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
};

export default AppShell;
