import { useState, useEffect } from "react";

export default function Task({setTableSampleData, tableSampleData, j, i, task}) {
  const [time1, setTime1] = useState(task.timings[0]);
  const [time2, setTime2] = useState(task.timings[1]);
  const [name, setName] = useState(task.task);
  const [teacher, setTeacher] = useState(task.teacher);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  function update(time1, time2, name, teacher) {
    const table = [...tableSampleData];
    table[i].data[j].task = name;
    table[i].data[j].teacher = teacher;
    table[i].data[j].timings = [time1, time2];
    table[i].day = days[i];
    setTableSampleData(table);
  }

  return (
    <div className='table-task box'>
      <div className='table-task-time-container'>
        <input placeholder='hh:mm' className='table-task-time-edit' value={time1} onChange={e => { setTime1(e.target.value); update(e.target.value, time2, name, teacher); }} />
        <input placeholder='hh:mm' className='table-task-time-edit' value={time2} onChange={e => { setTime2(e.target.value); update(time1, e.target.value, name, teacher); }} />
      </div>
      <input type='text' placeholder='task' className='table-task-name highlighted' value={name} onChange={e => { setName(e.target.value); update(time1, time2, e.target.value, teacher); }} />
      <input type='text' placeholder='teacher' className='table-task-teacher' value={teacher} onChange={ e => { setTeacher(e.target.value); update(time1, time2, name, e.target.value); }} />
    </div>
  );
}