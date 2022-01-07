import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/header.css";

export default function Header({ title, token, setToken }) {
  const navigate = useNavigate();

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
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-list-item">
              <Link className="nav-link" to="/tables">
                Tables
              </Link>
            </li>
            <li className="nav-list-item">
              <img
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/account/profile")}
                src={profilePhotoURL}
                className="pfp"
              />
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
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-list-item">
            <Link className="nav-link" to="/authenticate?type=sign_up">
              Sign up
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
