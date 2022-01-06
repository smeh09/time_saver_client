import Task from "./Task";
import Day from "./Day";

const DayRow = ({ i, dayData, setData }) => {
  return (
    <div className='day-row' key={i}>
      <Day dayData={dayData} />
      <div className='table-row'>
        {dayData.data.map((task, j) => {
          return (
            <Task key={j} setData={setData} dayData={dayData} i={i} task={task} />
          )
        })}
      </div>
    </div>
  );
};

export default DayRow;