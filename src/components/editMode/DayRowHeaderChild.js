import React, { useState } from "react";
import fetchUpdate from "../../modules/fetchUpdate";
import InputPopup from "../inputPopup/InputPopup";
import PopUpModal from "../popup/PopupModal";

const DayRowHeaderChild = ({ id, tableSampleData, i }) => {
  const [popUpData, setPopUpData] = useState(null);
  const [popUpConfirmData, setPopUpConfirmData] = useState(null);

  const addColumn = async () => {
    if (tableSampleData[0].data.length === 10) {
      setPopUpConfirmData({
        title: "Error",
        message: "You can only make 10 columns per table!",
        onConfirm: function () {
          setPopUpConfirmData(null);
          return;
        },
      });
    } else {
      await fetchUpdate(id, tableSampleData);

      const tableData = [...tableSampleData];

      setPopUpData({
        title: "Add a column",
        message: "Please enter default time for the column",
        inputLabel: "Default start time",
        inputPlaceHolder: "Please enter default start time (24hr clock)",
        inputLabel2: "Default end time",
        inputPlaceHolder2: "Please enter default end time (24hr clock)",
        defaultInput1: "00:00",
        defaultInput2: "00:00",
        isTime: true,
        onConfirm: async (startTime, endTime) => {
          setPopUpData(null);
          if (!startTime || !endTime) {
            return;
          }

          if (startTime === "") {
            startTime = "00:00";
          }

          if (endTime === "") {
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
        },
        onCancel: () => {
          setPopUpData(null);
        },
      });
    }
  };

  const removeColumn = async () => {
    setPopUpConfirmData({
      title: "Confirm",
      message: "Are you sure you want to delete this column",
      onConfirm: async () => {
        setPopUpConfirmData(null);
        await fetchUpdate(id, tableSampleData);
        const tableData = [...tableSampleData];
        tableData.forEach((dayData) => {
          dayData.data.splice(i - 1, 1);
        });
        await fetchUpdate(id, tableData);
        window.location.reload();
      },
      onCancel: () => {
        setPopUpConfirmData(null);
      },
    });
  };

  return (
    <>
      {popUpData ? (
        <InputPopup
          title={popUpData.title}
          message={popUpData.message}
          inputLabel={popUpData.inputLabel}
          inputPlaceHolder={popUpData.inputPlaceHolder}
          inputLabel2={popUpData.inputLabel2}
          inputPlaceHolder2={popUpData.inputPlaceHolder2}
          defaultInput1={popUpData.defaultInput1}
          defaultInput2={popUpData.defaultInput2}
          isTime={popUpData.isTime}
          onConfirm={popUpData.onConfirm}
          onCancel={popUpData.onCancel}
        />
      ) : (
        <></>
      )}
      {popUpConfirmData ? (
        <PopUpModal
          title={popUpConfirmData.title}
          message={popUpConfirmData.message}
          onConfirm={popUpConfirmData.onConfirm}
          onCancel={popUpConfirmData.onCancel}
        />
      ) : (
        <></>
      )}
      <div className="day edit-box edit-day edit-day-row-header-child-btns">
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
    </>
  );
};

export default DayRowHeaderChild;
