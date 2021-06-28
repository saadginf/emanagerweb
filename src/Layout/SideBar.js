import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import {
  FaHome,
  FaCalendar,
  FaSearch,
  FaPlus,
  FaUsersCog,
} from "react-icons/fa";
import AuthContext from "../auth/context";

const SideBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar-container">
      <div className="sidebarLinkContainer">
        <NavLink
          to="/home"
          className="sideBarlink"
          activeClassName="sideBarlinkSelected"
        >
          <FaHome size="50" />
        </NavLink>
      </div>
      <div className="sidebarLinkContainer">
        <NavLink
          to="/calendar"
          className="sideBarlink"
          activeClassName="sideBarlinkSelected"
        >
          <FaCalendar size="50" />
        </NavLink>
      </div>
      <div className="sidebarLinkContainer">
        <NavLink
          to="/search"
          className="sideBarlink"
          activeClassName="sideBarlinkSelected"
        >
          <FaSearch size="50" />
        </NavLink>
      </div>
      <div className="sidebarLinkContainer">
        <NavLink
          to="/addevent"
          className="sideBarlink"
          activeClassName="sideBarlinkSelected"
        >
          <FaPlus size="50" />
        </NavLink>
      </div>
      {user.role.includes("admin") && (
        <div className="sidebarLinkContainer">
          <NavLink
            to="/users"
            className="sideBarlink"
            activeClassName="sideBarlinkSelected"
          >
            <FaUsersCog size="50" />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default SideBar;
