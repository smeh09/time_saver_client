import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DayRow from "./DayRow";
import DayRowHeader from "./DayRowHeader";
import genStartData from "../../modules/startData";
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

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/table/${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const tableSampleData = await response.json();
      if (tableSampleData.success) {
        setTableSampleData(tableSampleData.data);
        setName(tableSampleData.name);
      }
    };
    fetchData();
  }, [id]);

  let finalData = [];
  const [callSetData, setCallSetData] = useState(false);

  const handleSubmit = () => {
    setCallSetData(true);
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
        const res = await fetch(`http://localhost:5000/api/table/${id}`, {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: finalData,
          }),
        });
        const result = await res.json();
        if (result.success) {
          alert("Saved changes! ");
          setTableSampleData(result.result.data);
        } else {
          alert(result.msg);
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
    const res = await fetch(`http://localhost:5000/api/table/${id}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: genStartData(getCells()),
      }),
    });

    const result = await res.json();

    if (result.success) {
      navigate(`/table/${id}`);
    } else {
      alert(result.msg);
    }
  };

  if (!tableSampleData) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="table-outer">
        <h2 className="table-heading-name">{name}</h2>
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
            className="update-btn-edit edit-redirect-btn"
            onClick={clearTable}
          >
            <i className="fa fa-trash-o" aria-hidden="true"></i> Clear
          </button>
        </div>
        <div className="table">
          {tableSampleData.map((dayData, i) => {
            return (
              <div key={i}>
                {i === 0 ? (
                  <div className="buttons-setting-header">
                    <DayRowHeader
                      setTableSampleData={setTableSampleData}
                      id={id}
                      tableSampleData={tableSampleData}
                      length={dayData.data.length}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <DayRow
                  setTableSampleData={setTableSampleData}
                  tableSampleData={tableSampleData}
                  i={i}
                  dayData={dayData}
                  callSetData={callSetData}
                  setData={setData}
                  setCallSetData={setCallSetData}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
