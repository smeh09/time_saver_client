import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinTable = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchUpdate = async () => {
      const res = await fetch(`http://localhost:5000/api/table/${code}`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const result = await res.json();
      if (result.success) {
        navigate(`/table/${result.result._id}`);
      } else {
        alert(result.msg);
      }
    };
    fetchUpdate();
  };

  return (
    <div id="authentication-modal-outer">
      <div id="authentication-modal-inner">
        <h2 className="create-table-heading">Join a table</h2>
        <div className="authentication-component-table">
          <form>
            <div className="authenticate-form-control">
              <div className="authenticate-form-control-input-label">
                Code of table
              </div>
              <input
                required
                type="text"
                className="authenticate-form-control-input"
                placeholder="Please enter the code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div id="authenticate-submit-button-container">
              <button
                type="submit"
                id="authenticate-submit-button"
                onClick={(e) => handleSubmit(e)}
              >
                Join Table{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinTable;
