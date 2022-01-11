import React from "react";
import fetchUpdate from "../../modules/fetchUpdate";

const DayRowHeaderChild = ({ id, tableSampleData, i }) => {
  const addColumn = async () => {
    await fetchUpdate(id, tableSampleData);

    const tableData = [...tableSampleData];

    let startTime = window.prompt("Please enter default start time", "00:00");
    let endTime = window.prompt("Please enter default end time", "00:00");

    if (!startTime || startTime === "") {
      startTime = "00:00";
    }

    if (!endTime || endTime === "") {
      endTime = "00:00";
    }

    tableData.forEach((dayData) => {
      dayData.data.splice(i, 0, {
        task: "",
        teacher: "",
        timings: [startTime, endTime],
      });
    });
    await fetchUpdate(id, tableData);
    window.location.reload();
  };

  const removeColumn = async () => {
    await fetchUpdate(id, tableSampleData);
    const tableData = [...tableSampleData];
    tableData.forEach((dayData) => {
      dayData.data.splice(i - 1, 1);
    });
    await fetchUpdate(id, tableData);
    window.location.reload();
  };

  return (
    <div className="day-row-edit-buttons">
      <button
        className="day-row-edit-header-button"
        onClick={addColumn}
        title={`Insert Column at position ${i + 1}`}
      >
        <i className="fa fa-plus fa-edit-button-icon" aria-hidden="true"></i>
      </button>
      {i !== 0 ? (
        <button
          className="day-row-edit-header-button"
          onClick={removeColumn}
          title={`Remove Column at position ${i}`}
        >
          <i
            className="fa fa-trash-o fa-edit-button-icon"
            aria-hidden="true"
          ></i>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DayRowHeaderChild;
