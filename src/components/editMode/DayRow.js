import Task from "./Task";
import Day from "./Day";

const DayRow = ({setTableSampleData, tableSampleData, i, dayData, callSetData, setData, setCallSetData}) => {
  return (
    <div className='day-row' key={i}>
      <Day dayData={dayData} />
      <div className='table-row'>
        {dayData.data.map((task, j) => {
          return (
            <Task setTableSampleData={setTableSampleData} tableSampleData={tableSampleData} j={j} key={j} call={callSetData} setData={setData} setCallSetData={setCallSetData} dayData={dayData} i={i} task={task} />
          )
        })}
      </div>
    </div>
  );
};

export default DayRow;