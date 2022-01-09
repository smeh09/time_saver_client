import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/addMethod.css";

const AddMethod = () => {
  const navigate = useNavigate();

  return (
    <div className="add-method-container">
      <div className="add-method">
        <h2 className="add-method-heading">Methods for adding a table</h2>
        <div className="add-method-options">
          <button
            className="add-method-option"
            onClick={() => navigate("/table/join")}
          >
            Join a table
          </button>
          <button
            className="add-method-option"
            onClick={() => navigate("/table/new")}
          >
            Create a table
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMethod;
