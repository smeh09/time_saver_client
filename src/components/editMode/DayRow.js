import Task from "./Task";
import Day from "./Day";

const DayRow = ({tableSampleData, i, dayData, callSetData, setData, setCallSetData}) => {
  return (
    <div className='day-row' key={i}>
      <Day dayData={dayData} />
      <div className='table-row'>
        {dayData.data.map((task, j) => {
          return (
            <Task key={j} call={callSetData} setData={setData} setCallSetData={setCallSetData} dayData={dayData} i={i} task={task} />
          )
        })}
      </div>
    </div>
  );
};

export default DayRow;