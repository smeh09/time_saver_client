import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/editProfile.css";

const EditProfile = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [userClass, setUserClass] = useState("");
  const [userSection, setUserSection] = useState("");
  const [userSchool, setUserSchool] = useState("");

  const token = localStorage.getItem("token");

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
        setEmail(profileData.data.email);
        setProfileURL(profileData.data.profilePhoto);
        setUserSection(profileData.data.section);
        setUserClass(profileData.data.class);
        setUserSchool(profileData.data.school);
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

  const save = async () => {
    const response = await fetch(
      `https://time-saver-server.herokuapp.com/api/user/`,
      {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          name,
          email,
          class: userClass,
          section: userSection,
          school: userSchool,
        }),
      }
    );
    const profileData = await response.json();
    if (profileData.success) {
      navigate("/account/profile");
    } else {
      alert(profileData.msg);
    }
  };

  if (!name && !email && !profileURL) return <div className="loader"></div>;

  return (
    <div className="profile-outer">
      <div className="profile">
        <img alt="pfp" src={profileURL} className="profile-img" />
        <div className="profile-data">
          <div className="details">
            <input
              className="label data data-name edit-profile-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div className="user-details-group">
              <div className="label">Email</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="label edit-profile-input"
                placeholder="Email"
                value={email}
              />
              <div className="data"></div>

              <div className="label">School</div>
              <input
                onChange={(e) => setUserSchool(e.target.value)}
                type="string"
                className="label edit-profile-input"
                placeholder="School"
                value={userSchool}
              />
              <div className="data"></div>

              <div className="label">Class</div>
              <input
                onChange={(e) => setUserClass(e.target.value)}
                type="email"
                className="label edit-profile-input"
                placeholder="Class"
                value={userClass}
              />
              <div className="data"></div>

              <div className="label">Section</div>
              <input
                type="email"
                onChange={(e) => setUserSection(e.target.value)}
                className="label edit-profile-input"
                placeholder="Section"
                value={userSection}
              />
              <div className="data"></div>
            </div>
          </div>
          <div className="user-danger-stuff">
            <button onClick={save} className="user-log-out" title="Log out! ">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
