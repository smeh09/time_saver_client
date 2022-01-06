import React from 'react';
import fetchUpdate from '../../modules/fetchUpdate';

const DayRowHeaderChild = ({ id, tableSampleData, i }) => {

  const addColumn = async () => {

    await fetchUpdate(id, tableSampleData);
    const tableData = [...tableSampleData];

    tableData.forEach(dayData => {
      dayData.data.splice(i, 0, { task: '', teacher: '', timings: ['00:00', '00:00'] });
    });
    await fetchUpdate(id, tableData);
    window.location.reload();
  }

  const removeColumn = async () => {

    await fetchUpdate(id, tableSampleData);
    const tableData = [...tableSampleData];
    tableData.forEach(dayData => {
      dayData.data.splice(i - 1, 1);
    });
    await fetchUpdate(id, tableData);
    window.location.reload();
  }

  return (
    <div className='day-row-edit-buttons'>
      <button className='day-row-edit-header-button' onClick={addColumn} title={`Insert Column at position ${i + 2}`}><i className="fa fa-plus fa-edit-button-icon" aria-hidden="true"></i></button>
      <button className='day-row-edit-header-button' onClick={removeColumn} title={`Remove Column at position ${i + 1}`}><i className="fa fa-trash-o fa-edit-button-icon" aria-hidden="true"></i></button>
    </div>
  );
};

export default DayRowHeaderChild;