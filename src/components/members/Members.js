import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/members.css";
import Member from "./Member";

const Members = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/table/${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const tableSampleData = await response.json();
      if (tableSampleData.success) {
        setMembers(tableSampleData.members);
      } else {
        alert(tableSampleData.msg);
      }
    };
    fetchData();
  }, [navigate, id]);

  if (members.length === 0) return <div className="loader"></div>;

  console.log(members);

  return (
    <div className="members-container">
      <h2 className="members-heading">Members</h2>
      <div className="members">
        {members.map((member, i) => {
          return (
            <Member
              key={i}
              name={member.name}
              email={member.email}
              profilePhoto={member.profilePhoto}
              isUserAdmin={member.isUserAdmin}
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
