import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/members.css";
import Member from "./Member";

const Members = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [members, setMembers] = useState([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  const leave = () => {
    const fetchData = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/table/leave/${id}`,
        {
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        navigate("/tables");
      } else {
        alert(result.msg);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/table/${id}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const tableSampleData = await response.json();
      if (tableSampleData.success) {
        setMembers(tableSampleData.members);
      } else {
        alert(tableSampleData.msg);
      }
    };
    const isAdminFetch = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/admin/isAdmin/${id}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const isAdminData = await response.json();
      if (isAdminData.success) {
        setIsCurrentUserAdmin(isAdminData.isAdmin);
      } else {
        alert(isAdminData.msg);
      }
    };
    fetchData();
    isAdminFetch();
  }, [navigate, id]);

  if (members.length === 0) return <div className="loader"></div>;

  return (
    <div className="members-container">
      <h2 className="members-heading">Members</h2>
      <div className="button-container">
        {isCurrentUserAdmin ? (
          <button
            className="add-table-button"
            onClick={() => navigate(`/members/add/${id}`)}
            title="Add a member"
          >
            Add a member
          </button>
        ) : (
          <></>
        )}
        <button
          title="Leave"
          className="add-table-button members-button"
          onClick={leave}
        >
          Leave Table
        </button>
        <button
          title="Leave"
          className="add-table-button members-button"
          onClick={() => navigate(`/table/${id}`)}
        >
          Back
        </button>
      </div>
      <div className="members">
        {members.map((member, i) => {
          return (
            <Member
              key={i}
              name={member.name}
              email={member.email}
              profilePhoto={member.profilePhoto}
              isUserAdmin={member.isUserAdmin}
              isCurrentUserAdmin={isCurrentUserAdmin}
              id={member.id}
              tableId={id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Members;
