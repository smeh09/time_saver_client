import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/addMember.css";

const AddMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
      const profileData = await response.json();
      if (profileData.success) {
        if (!profileData.isAdmin) {
          setIsAdmin(false);
          navigate(`/table/${id}`);
        } else {
          setIsAdmin(true);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (!isAdmin) return <div className="loader"></div>;
  return (
    <div className="add-member-container-container">
      <div className="add-member-container">
        <h2 className="add-member-heading">Add a member</h2>
        <p className="add-member-descr">
          Please send this code/link to add a member
        </p>
        <div className="controls">
          <div className="add-member-control">
            <div className="add-member-control-heading">Code</div>
            <div className="add-member-control-code">{id}</div>
          </div>
          <div className="add-member-control">
            <div className="add-member-control-heading">
              Link (for registered users)
            </div>
            <a
              href={`https://time-table-manager-app.vercel.app/table/join/link/${id}`}
              className="add-member-control-link"
            >
              {`https://time-table-manager-app.vercel.app/table/join/link/${id}`}
            </a>
          </div>
          <div className="add-member-control">
            <div className="add-member-control-heading">
              Link (for non registered users)
            </div>
            <a
              href={`https://time-table-manager-app.vercel.app/viewTable/${id}`}
              className="add-member-control-link"
            >
              {`https://time-table-manager-app.vercel.app/viewTable/${id}`}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
