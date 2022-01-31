import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModal from "./popup/PopupModal";
import protectRoutes from "../modules/protectRoutes";
import "./styles/table.css";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const date = new Date();
const renderedDate = date.toDateString();
const day = days[date.getDay()];
const hour = date.getHours();
const mins = date.getMinutes();

function formatTime(time) {
  const formatted_time = time.split(":");
  return formatted_time;
}

const isTaskNow = (d, time1, time2) => {
  const formattedTime1 = formatTime(time1);
  const formattedTime2 = formatTime(time2);

  if (d.toLowerCase() !== day.toLowerCase()) return false;
  if (hour < parseInt(formattedTime1[0]) || mins < parseInt(formattedTime1[1]))
    return false;
  if (
    hour > parseInt(formattedTime2[0]) ||
    (hour === parseInt(formattedTime2[0]) || mins > parseInt(formattedTime2[1]))
  )
    return false;
  return true;
};

export default function Table() {
  const [tableSampleData, setTableSampleData] = useState(false);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const [popUpData, setPopUpData] = useState(null);

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
        setIsAdmin(tableSampleData.isAdmin);
      } else {
        setPopUpData({
          title: "Error",
          message: tableSampleData.msg,
          onConfirm: () => {
            setPopUpData(null);
            navigate("/tables");
          },
        });
      }
    };
    fetchData();
  }, [navigate, id]);

  if (!tableSampleData) {
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
  } else {
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
        <div className="table-outer">
          <h2 className="table-date">{renderedDate}</h2>
          <h2 className="table-heading-name">{name}</h2>
          <div className="buttons">
            {isAdmin ? (
              <button
                title="Edit"
                onClick={() => navigate(`/table/edit/${id}`)}
                className="update-btn-edit"
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
                Edit
              </button>
            ) : (
              ""
            )}
            <button
              title="Refresh"
              className="update-btn-edit"
              onClick={() => window.location.reload()}
            >
              <i className="fa fa-refresh" aria-hidden="true"></i> Refresh
            </button>
            <button
              title="Members"
              className="update-btn-edit"
              onClick={() => navigate(`/table/members/${id}`)}
            >
              Members
            </button>
          </div>
          <div className="table">
            {tableSampleData.map((dayData, i) => {
              return (
                <div className="day-row" key={i}>
                  <div className="index-stuff">
                    {i === 0 ? (
                      <div id="first-index" className="index"></div>
                    ) : (
                      <></>
                    )}
                    <div className="day box">{dayData.day.toUpperCase()}</div>
                  </div>
                  <div className="table-row">
                    {dayData.data.map((task, j) => {
                      return (
                        <div key={j} className="index-stuff">
                          {i === 0 ? (
                            <div
                              className={
                                j === tableSampleData[i].data.length - 1
                                  ? "last-index index"
                                  : "index"
                              }
                            >
                              {j + 1}
                            </div>
                          ) : (
                            <></>
                          )}
                          <div
                            className="table-task box"
                            id={
                              isTaskNow(
                                dayData.day,
                                task.timings[0],
                                task.timings[1]
                              )
                                ? "selected-box"
                                : ""
                            }
                          >
                            <div className="table-task-time">
                              {task.timings.map((time, i) =>
                                i === task.timings.length - 1
                                  ? `${time}`
                                  : `${time} - `
                              )}
                            </div>
                            <div className="table-task-name">{task.task}</div>
                            <div className="table-task-teacher">
                              {task.teacher}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
