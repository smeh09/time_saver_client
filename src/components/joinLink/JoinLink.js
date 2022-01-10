import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JoinLink = () => {
  const [tablesJoined, setTablesJoined] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpdate = async () => {
      const res = await fetch(`http://localhost:5000/api/table/${id}`, {
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

    const doStuff = async () => {
      const response = await fetch(`http://localhost:5000/api/user/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const profileData = await response.json();
      if (!profileData.success) {
        return;
      }
      setTablesJoined(profileData.data.tablesJoined);
      if (tablesJoined.includes(id)) {
        navigate(`/table/${id}`);
      } else {
        fetchUpdate();
      }
    };

    doStuff();
    // eslint-disable-next-line
  }, []);

  return <div className="loader"></div>;
};

export default JoinLink;
