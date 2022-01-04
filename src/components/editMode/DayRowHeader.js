import React from 'react';
import DayRowHeaderChild from './DayRowHeaderChild';

const DayRowHeader = ({ id, setTableSampleData, tableSampleData, length }) => {
  length = length + 1;

  let output = [];
  
  for (let i=0; i<length; i++) {
    output.push(<DayRowHeaderChild id={id} setTableSampleData={setTableSampleData} tableSampleData={tableSampleData} key={i} i={i} />)
  }

  return output;
};

export default DayRowHeader;