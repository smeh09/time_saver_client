import React from "react";
import "./styles/popUpModal.css";

const PopUpModal = (props) => {
  return (
    <div className="popup-modal">
      <div className="backdrop"></div>
      <div className="modal">
        <div className="title">
          <div className="modal-title">{props.title}</div>
        </div>
        <div className="modal-msg">{props.message}</div>
        <div className="modal-buttons">
          <button className="modal-button" onClick={props.onConfirm}>
            Ok
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
  );
};

export default PopUpModal;
