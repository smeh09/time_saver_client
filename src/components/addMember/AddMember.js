import React from "react";
import { useParams } from "react-router-dom";
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
          <a
            href={`https://time-saver-client.vercel.app/table/join/link/${id}`}
            className="add-member-control-link"
          >
            {`https://time-saver-client.vercel.app/table/join/link/${id}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
