import React from "react";
import Footer from "./Footer";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  return (
    <>
      <TopBar />
      <SideBar />
      <div
        style={{
          marginLeft: "100px",
          marginTop: "100px",
          padding: "20px",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
