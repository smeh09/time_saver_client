import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModal from "../popup/PopupModal";
import "./styles/members.css";
import Member from "./Member";

const Members = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [members, setMembers] = useState([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [name, setName] = useState("");

  const [popUpData, setPopUpData] = useState(null);

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
        setPopUpData({
          title: "Error",
          message: result.msg,
          onConfirm: () => setPopUpData(null),
        });
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
        setPopUpData({
          title: "Error",
          message: tableSampleData.msg,
          onConfirm: () => setPopUpData(null),
        });
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
        setPopUpData({
          title: "Error",
          message: isAdminData.msg,
          onConfirm: () => setPopUpData(null),
        });
      }
    };
    const fetchData2 = async () => {
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
        setName(tableSampleData.name);
      } else {
        setPopUpData({
          title: "Error",
          message: tableSampleData.msg,
          onConfirm: () => setPopUpData(null),
        });
      }
    };
    fetchData();
    fetchData2();
    isAdminFetch();
  }, [navigate, id]);

  if (members.length === 0) return <div className="loader"></div>;

  return (
    <>
      {popUpData ? (
        <PopUpModal
          title={popUpData.title}
          message={popUpData.message}
          onConfirm={popUpData.onConfirm}
        />
      ) : (
        <></>
      )}
      <div className="members-container">
        <h2 className="members-heading">{name} - Members</h2>
        <div className="button-container">
          {isCurrentUserAdmin ? (
            <button
              className="edit-redirect-btn update-btn"
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
            className="edit-redirect-btn update-btn"
            onClick={leave}
          >
            Leave Table
          </button>
          <button
            title="Leave"
            className="edit-redirect-btn update-btn"
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
    </>
  );
};

export default Members;
