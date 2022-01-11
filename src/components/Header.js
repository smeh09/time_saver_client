import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/header.css";

export default function Header({ title, token, setToken }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/user/`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      const profileData = await response.json();
      if (profileData.success) {
        setName(profileData.data.name);
      }
    };
    fetchData();
  });

  if (token) {
    const profilePhotoURL = localStorage.getItem("profilePhotoURL");

    return (
      <header className="logged_in">
        <Link to="/" id="title">
          {title}
        </Link>
        <nav>
          <ul id="nav-list">
            <li className="nav-list-item">
              <Link className="nav-link" to="/tables">
                Tables
              </Link>
            </li>
            <li
              className="nav-list-item"
              onClick={() => navigate("/account/profile")}
            >
              <img
                style={{ cursor: "pointer" }}
                src={profilePhotoURL}
                alt="pfp"
                className="pfp"
              />
              <div>{name}</div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  return (
    <header className="logged_out">
      <Link to="/" id="title">
        {title}
      </Link>
      <nav>
        <ul id="nav-list">
          <li className="nav-list-item">
            <Link className="nav-link" to="/authenticate?type=sign_up">
              Register
            </Link>
          </li>
          <li className="nav-list-item">
            <Link className="nav-link" to="/authenticate?type=sign_in">
              Sign in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
