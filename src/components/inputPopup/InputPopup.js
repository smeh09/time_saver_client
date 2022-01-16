import React, { useState } from "react";
import "./styles/inputPopup.css";

const InputPopup = (props) => {
  const [inputData, setInputData] = useState(props.defaultInput1);
  const [inputData2, setInputData2] = useState(props.defaultInput2);

  return (
    <div className="popup-modal">
      <div className="backdrop"></div>
      <div className="modal input-modal">
        <div className="title">
          <div className="modal-title">{props.title}</div>
        </div>
        <div className="modal-msg input-msg">{props.message}</div>
        <div className="modal-inputs">
          <div className="modal-input-control">
            <div className="modal-input-label">{props.inputLabel}</div>
            <input
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="modal-input"
              placeholder={props.inputPlaceHolder}
              type={props.isTime ? "time" : "text"}
            />
          </div>
          {props.inputLabel2 ? (
            <div className="modal-input-control">
              <div className="modal-input-label">{props.inputLabel2}</div>
              <input
                value={inputData2}
                onChange={(e) => setInputData2(e.target.value)}
                className="modal-input"
                placeholder={props.inputPlaceHolder2}
                type={props.isTime ? "time" : "text"}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input-modal-button-container">
          <div className="modal-buttons">
            <button
              className="modal-button"
              onClick={() => {
                props.onConfirm(inputData, inputData2);
              }}
            >
              OK
            </button>
            {props.onCancel ? (
              <button className="modal-button" onClick={props.onCancel}>
                Cancel
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPopup;
