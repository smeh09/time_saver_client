import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard/TableCard";
import PopUpModal from "../popup/PopupModal";
import "./tables.css";

const Tables = () => {
  const token = localStorage.getItem("token");

  const [tables, setTables] = useState(false);

  const navigate = useNavigate();

  const [popUpData, setPopUpData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/table/`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      const tables = await response.json();
      if (tables.success) {
        setTables(tables.tables);
      } else {
        setPopUpData({
          title: "Error",
          message: tables.msg,
          onConfirm: () => setPopUpData(null),
        });
      }
    };
    fetchData();
  }, [token]);

  if (!tables) {
    return <div className="loader"></div>;
  } else {
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
        <div className="table-container">
          <h2 className="table-heading">Tables</h2>
          <div className="button-container">
            <button
              className="add-table-button"
              onClick={() => navigate("/table/add/type")}
              title="Add a table"
            >
              Add a table
            </button>
          </div>
          <div className="main-page-tables">
            {tables.map((table, i) => (
              <TableCard
                key={i}
                name={table.name}
                users={table.users}
                id={table._id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Tables;
