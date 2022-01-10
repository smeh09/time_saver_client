import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/member.css";

const Member = ({
  tableId,
  id,
  name,
  email,
  isCurrentUserAdmin,
  profilePhoto,
  isUserAdmin,
}) => {
  const [myEmail, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(isUserAdmin);

  const [userClass, setUserClass] = useState("");
  const [userSection, setUserSection] = useState("");
  const [userSchool, setUserSchool] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/user/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const profileData = await response.json();
      if (profileData.success) {
        setEmail(profileData.data.email);
        setUserSection(profileData.data.section);
        setUserClass(profileData.data.class);
        setUserSchool(profileData.data.school);
      } else {
        alert(profileData.msg);
      }
    };
    fetchData();
  }, [tableId]);

  const makeAdmin = () => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/admin/makeAdmin/${tableId}`,
        {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setIsAdmin(true);
      } else {
        alert(result.msg);
      }
    };
    fetchData();
  };

  const removeAdmin = () => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/admin/removeAdmin/${tableId}`,
        {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        navigate(`/table/members/${tableId}`);
      } else {
        alert(result.msg);
      }
    };
    fetchData();
  };

  const removeUser = () => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/table/remove/${tableId}`,
        {
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        navigate(`/table/${tableId}`);
      } else {
        alert(result.msg);
      }
    };
    fetchData();
  };

  return (
    <div className="member">
      <div className="member-name-pfp">
        <img src={profilePhoto} className="pfp member-pfp" alt={name} />
        <div className="name" id={isAdmin ? "admin" : ""}>
          {name.toUpperCase()}{" "}
          {isAdmin ? <span className="admin-bold"> (ADMIN)</span> : ""}
          <div className="email">{isCurrentUserAdmin ? email : ""}</div>
        </div>
        <div className="school-details">
          <div className="school-detail school">SCHOOL : {userSchool}</div>
          <div className="school-detail class">CLASS : {userClass}</div>
          <div className="school-detail section">SECTION : {userSection}</div>
        </div>
      </div>
      <div className="members-setting-buttons">
        {isCurrentUserAdmin && isAdmin && !(myEmail === email) ? (
          <button
            title="Remove Admin"
            className="add-table-button members-button"
            onClick={removeAdmin}
          >
            Remove as Admin
          </button>
        ) : (
          <></>
        )}
        {isCurrentUserAdmin && !isAdmin ? (
          <button
            title="Make Admin"
            className="add-table-button members-button"
            onClick={makeAdmin}
          >
            Make an Admin
          </button>
        ) : (
          <></>
        )}
        {isCurrentUserAdmin && myEmail !== email ? (
          <button
            title="Remove User"
            className="add-table-button members-button"
            onClick={removeUser}
          >
            Remove User
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Member;
