import React from 'react';

const DayRowHeaderChild = ({ i }) => {
  return (
    <div className='day-row-edit-buttons'>
      <button className='day-row-edit-header-button' title={`Insert Column at position ${i + 2}`}><i className="fa fa-plus fa-edit-button-icon" aria-hidden="true"></i></button>
      <button className='day-row-edit-header-button' title={`Remove Column at position ${i + 1}`}><i className="fa fa-trash-o fa-edit-button-icon" aria-hidden="true"></i></button>
    </div>
  );
};

export default DayRowHeaderChild;