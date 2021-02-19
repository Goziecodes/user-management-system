import React from "react";
import Navbar from "./components/Nav";

const AppShell = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-8 py-2 bg-gray-100">{children}</div>
    </>
  );
};

export default AppShell;
