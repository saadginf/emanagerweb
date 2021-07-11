import React, { useContext } from "react";
import "./TopBar.css";
import logo from "../assets/logo.jpeg";
import { FaSignOutAlt, FaUser, FaSortDown } from "react-icons/fa";
import { removeToken } from "../auth/storage";
import AuthContext from "../auth/context";
import { Dropdown } from "react-bootstrap";

const TopBar = () => {
  const handlCick = () => {
    removeToken();
    window.location.reload();
  };
  const authContext = useContext(AuthContext);
  let user = authContext.user;
  console.log("user from the sidebar" + user.sub);
  return (
    <div className="top-bar">
      <h3>Gestion des Activités de la Division Technique</h3>
      <div style={{ height: "100%", width: "200px" }}>
        <img src={logo} alt="logo" height="100px" />
      </div>
      <div
        style={{
          height: "50%",
          width: "200px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <FaSignOutAlt
          style={{ cursor: "pointer" }}
          size="50px"
          color="#5faeb6"
          onClick={handlCick}
        /> */}

        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            <FaUser style={{ cursor: "pointer" }} size="20px" color="white" />
            {"  "}
            {user.sub}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handlCick}>
              <FaSignOutAlt
                style={{ cursor: "pointer" }}
                size="20px"
                color="#5faeb6"
              />{" "}
              <span>Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopBar;
