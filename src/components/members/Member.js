import React, { useState, useEffect } from "react";
import "./styles/member.css";

const Member = ({ tableId, id, name, email, profilePhoto, isUserAdmin }) => {
  const [myEmail, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(isUserAdmin);

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
      } else {
        alert(profileData.msg);
      }
    };
    fetchData();
  }, []);

  const makeAdmin = () => {
    const fetchData = async () => {
      console.log(id);
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
        setIsAdmin(false);
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
        </div>
      </div>
      <div className="members-setting-buttons">
        {isAdmin && !(myEmail === email) ? (
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
        {!isAdmin ? (
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
      </div>
    </div>
  );
};

export default Member;
