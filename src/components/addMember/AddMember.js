import React from "react";
import { useParams, Link } from "react-router-dom";
import "./styles/addMember.css";

const AddMember = () => {
  const { id } = useParams();

  return (
    <div className="add-member-container">
      <h2 className="add-member-heading">Add a member</h2>
      <div className="controls">
        <div className="add-member-control">
          <div className="add-member-control-heading">Code</div>
          <div className="add-member-control-code">{id}</div>
        </div>
        <div className="add-member-control">
          <div className="add-member-control-heading">Link</div>
          <Link
            to={`/table/join/link/${id}`}
            className="add-member-control-link"
          >
            {`http://localhost:3000/table/join/link/${id}`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
