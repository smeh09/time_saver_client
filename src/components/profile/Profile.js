import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/profile.css";

const Profile = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileURL, setProfileURL] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/user/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const profileData = await response.json();
      if (profileData.success) {
        setName(profileData.data.name);
        setEmail(profileData.data.email);
        setProfileURL(profileData.data.profilePhoto);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const logOut = () => {
    setToken(false);
    localStorage.setItem("token", "null");
    navigate("/");
  };

  return (
    <div className="profile">
      <img src={profileURL} className="profile-img" />
      <div className="profile-data">
        <div className="details">
          <div className="user-details-group">
            <div className="label">USERNAME</div>
            <div className="data">{name}</div>
          </div>
          <div className="user-details-group">
            <div className="label">EMAIL</div>
            <div className="data">{email}</div>
          </div>
        </div>
        <div className="user-danger-stuff">
          <button onClick={logOut} className="user-log-out" title="Log out! ">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
