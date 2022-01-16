import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../popup/PopupModal";
import protectRoutes from "../../modules/protectRoutes";

const JoinTable = () => {
  const [code, setCode] = useState("");
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

    const fetchUpdate = async () => {
      const res = await fetch(
        `https://time-saver-server.herokuapp.com/api/table/${code}`,
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
    </>
  );
};

export default JoinTable;
