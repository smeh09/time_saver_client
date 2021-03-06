import React from "react";
import DayRowHeaderChild from "./DayRowHeaderChild";

const DayRowHeader = ({ setTableSampleData, id, tableSampleData, length }) => {
  length = length + 1;

  let output = [];

  for (let i = 0; i < length; i++) {
    output.push(
      <DayRowHeaderChild
        setTableSampleData={setTableSampleData}
        id={id}
        tableSampleData={tableSampleData}
        key={i}
        i={i}
      />
    );
  }

  return output;
};

export default DayRowHeader;
