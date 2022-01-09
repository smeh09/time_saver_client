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
      } else {
        setName(false);
        setEmail(false);
        setProfileURL(false);
        alert(profileData.msg);
      }
    };
    fetchData();
  }, [token]);

  const navigate = useNavigate();

  const logOut = () => {
    setToken(false);
    localStorage.setItem("token", "null");
    localStorage.setItem("profilePhotoURL", "null");
    navigate("/");
  };

  if (!name && !email && !profileURL) return <div className="loader"></div>;

  return (
    <div className="profile-outer">
      <div className="profile">
        <img alt="pfp" src={profileURL} className="profile-img" />
        <div className="profile-data">
          <div className="details">
            <div className="data data-name">{name}</div>
            <div className="user-details-group">
              <div className="label">Email</div>
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
    </div>
  );
};

export default Profile;
