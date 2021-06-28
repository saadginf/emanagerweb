import React from "react";
import image from "../assets/home.png";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-contaainer">
      <img src={image} alt="home" width="800px" />
      <br />
      <a href="/addEvent" className="home-link">
        Get Started
      </a>
    </div>
  );
};

export default Home;
