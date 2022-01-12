import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModal from "../popup/PopupModal";

const JoinLink = () => {
  const [tablesJoined, setTablesJoined] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [popUpData, setPopUpData] = useState(null);

  useEffect(() => {
    const fetchUpdate = async () => {
      const res = await fetch(
        `https://time-saver-server.herokuapp.com/api/table/${id}`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const result = await res.json();
      if (result.success) {
        navigate(`/table/${result.result._id}`);
      } else {
        setPopUpData({
          title: "Error",
          message: result.msg,
          onConfirm: () => setPopUpData(null),
        });
      }
    };

    const doStuff = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/user/`,
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
      <div className="loader"></div>
    </>
  );
};

export default JoinLink;
