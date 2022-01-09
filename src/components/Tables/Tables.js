import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard/TableCard";
import "./tables.css";

const Tables = () => {
  const token = localStorage.getItem("token");

  const [tables, setTables] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/table/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const tables = await response.json();
      if (tables.success) {
        setTables(tables.tables);
      } else {
        alert(tables.msg);
      }
    };
    fetchData();
  }, [token]);

  if (!tables) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="table-container">
        <h2 className="table-heading">Tables</h2>
        <div className="tables">
          {tables.map((table, i) => (
            <TableCard
              key={i}
              name={table.name}
              users={table.users}
              id={table._id}
            />
          ))}
        </div>
        <button
          className="add-table-button"
          onClick={() => navigate("/table/new")}
          title="Add a table"
        >
          +
        </button>
      </div>
    );
  }
};

export default Tables;
