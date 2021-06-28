import React from "react";
import "./TopBar.css";
import logo from "../assets/logo.jpeg";
import { FaSignOutAlt } from "react-icons/fa";
import { removeToken } from "../auth/storage";
const TopBar = () => {
  const handlCick = () => {
    removeToken();
    window.location.reload();
  };
  return (
    <div className="top-bar">
      <h3>Gestion des Activités de la Division Technique</h3>
      <div style={{ height: "100%", width: "200px" }}>
        <img src={logo} alt="logo" height="100px" />
      </div>
      <div
        style={{
          height: "100%",
          width: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <FaSignOutAlt
          style={{ cursor: "pointer" }}
          size="50px"
          color="#5faeb6"
          onClick={handlCick}
        />
      </div>
    </div>
  );
};

export default TopBar;
