import React from "react";
import { useNavigate } from "react-router-dom";
import HomePageImage from "./img.svg";
import "./styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="text">
        <h2 className="heading">Time Table Manager!</h2>
        <div className="descr">
          A time table manager app for you to help you manage your time tables!
          You can create time tables here, and it shows the exact period that is
          currently happening based on day and time! You will also be able to
          share the tables, with people, which is extremely helpful in
          organisations such as schools!
        </div>
        <button
          onClick={() => navigate("/authenticate?type=sign_up")}
          className="home-button"
        >
          Get Started now!{" "}
        </button>
      </div>
      <img alt="img" className="home-page-img" src={HomePageImage} />
    </div>
  );
};

export default Home;
