import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/tableCard.css";

const TableCard = ({ name, users, id }) => {
  const usersLength = users.length;
  const navigate = useNavigate();
  return (
    <div className="table-card" onClick={() => navigate(`/table/${id}`)}>
      <div className="table-card-heading">{name}</div>
      <div className="table-card-users">
        {usersLength} {usersLength === 1 ? "user" : "users"}
      </div>
    </div>
  );
};

export default TableCard;
