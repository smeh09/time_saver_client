import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DayRow from "./DayRow";
import DayRowHeader from "./DayRowHeader";
import genStartData from "../../modules/startData";
import PopUpModal from "../popup/PopupModal";
import InputPopup from "../inputPopup/InputPopup";
import protectRoutes from "../../modules/protectRoutes";
import "./styles/table.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function EditTable() {
  const [tableSampleData, setTableSampleData] = useState([]);

  const [name, setName] = useState("");
  const [popUpData, setPopUpData] = useState(null);
  const [popUpData2, setPopUpData2] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [popUpData3, setPopUpData3] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const isNotAuthenticated = protectRoutes();
    if (isNotAuthenticated) {
      navigate("/authenticate?type=sign_up");
      return;
    }
    const fetchData = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/table/${id}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const tableSampleData = await response.json();
      if (tableSampleData.success) {
        setTableSampleData(tableSampleData.data);
        setName(tableSampleData.name);
        if (!tableSampleData.isAdmin) {
          navigate("/tables");
        }
      } else {
        setAlertData({
          title: "Error",
          message: tableSampleData.msg,
          onConfirm: () => {
            setAlertData(null);
            navigate("/tables");
          },
        });
      }
    };
    fetchData();
  }, [navigate, id]);

  let finalData = [];
  const [callSetData, setCallSetData] = useState(false);

  const handleSubmit = () => {
    setPopUpData({
      title: "Confirm",
      message: "Are you sure, you want to save changes?",
      onConfirm: () => {
        setCallSetData(true);
        setPopUpData(null);
      },
      onCancel: () => {
        setPopUpData(null);
      },
    });
  };

  const getTotalObjs = () => {
    let totalObjs = 0;
    if (tableSampleData) {
      tableSampleData.forEach((dayObj) => {
        dayObj.data.forEach(() => {
          totalObjs++;
        });
      });
    }
    return totalObjs;
  };

  const tempData = [];

  const setData = (data) => {
    tempData.push(data);

    const totalObjs = getTotalObjs();

    if (tempData.length === totalObjs) {
      let previousDay = -1;

      tempData.forEach((obj) => {
        if (previousDay === obj.day) {
          finalData[obj.day].data.push({
            task: obj.task,
            teacher: obj.teacher,
            timings: obj.timings,
          });
        } else {
          finalData.push({
            day: days[obj.day],
            data: [
              { task: obj.task, teacher: obj.teacher, timings: obj.timings },
            ],
          });
        }
        previousDay = obj.day;
      });

      const fetchUpdate = async () => {
        const res = await fetch(
          `https://time-saver-server.herokuapp.com/api/table/${id}`,
          {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              data: finalData,
            }),
          }
        );
        const result = await res.json();
        if (result.success) {
          setAlertData({
            title: "Success",
            message: "Successfully saved changes! ",
            onConfirm: () => {
              setAlertData(null);
            },
          });
          setTableSampleData(result.result.data);
        } else {
          setAlertData({
            title: "Error",
            message: result.msg,
            onConfirm: () => {
              setAlertData(null);
            },
          });
        }
      };
      fetchUpdate();
    }
  };

  const getCells = () => {
    let cells = [];
    tableSampleData.forEach((dayData) => {
      cells.push(dayData.data.length);
    });
    return Math.max(...cells);
  };

  const clearTable = async () => {
    setPopUpData2({
      title: "Confirm",
      message: "Are you sure, you want to clear this table?",
      onConfirm: async () => {
        setPopUpData2(null);

        const res = await fetch(
          `https://time-saver-server.herokuapp.com/api/table/${id}`,
          {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              data: genStartData(getCells()),
            }),
          }
        );

        const result = await res.json();

        if (result.success) {
          navigate(`/table/${id}`);
        } else {
          setAlertData({
            title: "Error",
            message: result.msg,
          });
        }
      },
      onCancel: () => {
        setPopUpData2(null);
      },
    });
  };

  const deleteTable = async () => {
    setPopUpData({
      title: "Confirm",
      message: "Are you sure, you want to delete this table?",
      onConfirm: async () => {
        const response = await fetch(
          `https://time-saver-server.herokuapp.com/api/table/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const result = await response.json();
        if (result.success) {
          navigate("/tables");
        } else {
          setAlertData({
            title: "Error",
            message: result.msg,
          });
        }
        setPopUpData(null);
      },
      onCancel: () => {
        setPopUpData(null);
      },
    });
  };

  const editName = () => {
    setPopUpData3({
      title: "Edit table name",
      message: "Please enter the new name of the table",
      inputLabel: "Name of the table",
      inputPlaceHolder: "Please enter the name of the tabke",
      defaultInput1: name,
      onConfirm: async (inputData) => {
        console.log(inputData);
        const response = await fetch(
          `https://time-saver-server.herokuapp.com/api/table/name/${id}`,
          {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              name: inputData,
            }),
          }
        );
        const result = await response.json();
        if (result.success) {
          setName(inputData);
        } else {
          setAlertData({
            title: "Error",
            message: result.msg,
          });
        }
        setPopUpData3(null);
      },
      onCancel: () => {
        setPopUpData3(null);
      },
    });
  };

  if (!tableSampleData || tableSampleData === []) {
    return <div className="loader"></div>;
  } else {
    return (
      <>
        {popUpData ? (
          <PopUpModal
            title={popUpData.title}
            message={popUpData.message}
            onConfirm={popUpData.onConfirm}
            onCancel={popUpData.onCancel}
          />
        ) : (
          <></>
        )}
        {popUpData2 ? (
          <PopUpModal
            title={popUpData2.title}
            message={popUpData2.message}
            onConfirm={popUpData2.onConfirm}
            onCancel={popUpData2.onCancel}
          />
        ) : (
          <></>
        )}
        {alertData ? (
          <PopUpModal
            title={alertData.title}
            message={alertData.message}
            onConfirm={alertData.onConfirm}
          />
        ) : (
          <></>
        )}
        {popUpData3 ? (
          <InputPopup
            title={popUpData3.title}
            message={popUpData3.message}
            inputLabel={popUpData3.inputLabel}
            inputPlaceHolder={popUpData3.inputPlaceHolder}
            defaultInput1={popUpData3.defaultInput1}
            onConfirm={popUpData3.onConfirm}
            onCancel={popUpData3.onCancel}
          />
        ) : (
          <></>
        )}
        <div className="table-outer">
          <div className="table-name-edit-mode">
            <h2 className="table-heading-name table-edit-heading-name">
              {name}
              <i
                className="fa fa-pencil-square-o edit-table-name"
                aria-hidden="true"
                title="Edit Table"
                onClick={editName}
              ></i>{" "}
            </h2>
          </div>
          <div className="buttons">
            <button
              className="update-btn-edit"
              title="Save Table"
              onClick={handleSubmit}
            >
              <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
            </button>
            <button
              className="update-btn-edit update-btn-back"
              title="Save Table"
              onClick={() => navigate(`/table/${id}`)}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
            </button>
            <button
              title="Clear"
              className="update-btn-edit"
              onClick={clearTable}
            >
              <i className="fa fa-trash-o" aria-hidden="true"></i> Clear
            </button>
            <button
              title="Delete"
              className="update-btn-edit edit-redirect-btn"
              onClick={deleteTable}
            >
              Delete
            </button>
          </div>
          <div className="table">
            {tableSampleData.map((dayData, i) => {
              return (
                <div key={i}>
                  {i === 0 ? (
                    <>
                      <div className="buttons-setting-header">
                        <DayRowHeader
                          setTableSampleData={setTableSampleData}
                          id={id}
                          tableSampleData={tableSampleData}
                          length={dayData.data.length}
                        />
                      </div>
                      <DayRow
                        setTableSampleData={setTableSampleData}
                        tableSampleData={tableSampleData}
                        i={i}
                        dayData={dayData}
                        callSetData={callSetData}
                        setData={setData}
                        setCallSetData={setCallSetData}
                      />
                    </>
                  ) : (
                    <DayRow
                      setTableSampleData={setTableSampleData}
                      tableSampleData={tableSampleData}
                      i={i}
                      dayData={dayData}
                      callSetData={callSetData}
                      setData={setData}
                      setCallSetData={setCallSetData}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
