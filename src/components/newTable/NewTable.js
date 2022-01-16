import "./styles/table.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import genStartData from "../../modules/startData";
import PopUpModal from "../popup/PopupModal";
import protectRoutes from "../../modules/protectRoutes";

export default function NewTable() {
  const columns = 0;
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const [popUpData, setPopUpData] = useState(null);

  useEffect(() => {
    const isNotAuthenticated = protectRoutes();
    if (isNotAuthenticated) {
      navigate("/authenticate?type=sign_up");
      return;
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") return;

    const startData = genStartData(columns);

    const fetchUpdate = async () => {
      const res = await fetch(
        `https://time-saver-server.herokuapp.com/api/table/`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            data: startData,
            name,
          }),
        }
      );
      const result = await res.json();
      if (result.success) {
        navigate(`/table/edit/${result.result._id}`);
      } else {
        setPopUpData({
          title: "Error",
          message: result.msg,
          onConfirm: () => setPopUpData(null),
        });
      }
    };
    fetchUpdate();
  };

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
      <div id="authentication-modal-outer">
        <div id="authentication-modal-inner">
          <h2 className="create-table-heading">Create a new table</h2>
          <div className="authentication-component-table">
            <form>
              <div className="authenticate-form-control">
                <div className="authenticate-form-control-input-label">
                  Name of table
                </div>
                <input
                  required
                  type="text"
                  className="authenticate-form-control-input"
                  placeholder="Please enter the name of your table"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div id="authenticate-submit-button-container">
                <button
                  type="submit"
                  id="authenticate-submit-button"
                  onClick={(e) => handleSubmit(e)}
                >
                  Create Table{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
