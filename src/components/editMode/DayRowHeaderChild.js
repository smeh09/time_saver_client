import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import fetchUpdate from '../../modules/fetchUpdate';

const DayRowHeaderChild = ({ id, setTableSampleData, tableSampleData, i }) => {

  const navigate = useNavigate();

  useEffect(() => {
    setTableSampleData([{"day":"Monday","data":[{"task":"1","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"2","teacher":"","timings":["00:00","00:00"]}]},{"day":"Tuesday","data":[{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]}]},{"day":"Wednesday","data":[{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]}]},{"day":"Thursday","data":[{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]}]},{"day":"Friday","data":[{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]}]},{"day":"Saturday","data":[{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]}]},{"day":"Sunday","data":[{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]},{"task":"","teacher":"","timings":["00:00","00:00"]}]}]);
    console.log('1');
  }, [setTableSampleData]);

  const addColumn = async () => {

    const tableData = [...tableSampleData];
    tableData.forEach(dayData => {
      dayData.data.splice(i, 0, { task: '', teacher: '', timings: ['00:00', '00:00'] });
    });
    console.log(tableData);
    setTableSampleData(tableData);
  }

  const removeColumn = async () => {
    
    const tableData = [...tableSampleData];
    tableData.forEach(dayData => {
      dayData.data.splice(i - 1, 1);
    });
    console.log(tableData);
    setTableSampleData(tableData);
  }

  return (
    <div className='day-row-edit-buttons'>
      <button className='day-row-edit-header-button' onClick={addColumn} title={`Insert Column at position ${i + 2}`}><i className="fa fa-plus fa-edit-button-icon" aria-hidden="true"></i></button>
      <button className='day-row-edit-header-button' onClick={removeColumn} title={`Remove Column at position ${i + 1}`}><i className="fa fa-trash-o fa-edit-button-icon" aria-hidden="true"></i></button>
    </div>
  );
};

export default DayRowHeaderChild;