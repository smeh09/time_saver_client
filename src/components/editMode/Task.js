import { useState } from "react";

export default function Task({ setData, i, task }) {
  const [time1, setTime1] = useState(task.timings[0]);
  const [time2, setTime2] = useState(task.timings[1]);
  const [name, setName] = useState(task.task);
  const [teacher, setTeacher] = useState(task.teacher);

  function compileData() {
    console.log('im dead');
    const timings = [time1, time2];

    setData({
      task: name,
      teacher,
      timings,
      day: i,
    });
  }

  return (
    <div className='table-task box'>
      <div className='table-task-time-container'>
        <input placeholder='hh:mm' className='table-task-time-edit' value={time1} onChange={e => { setTime1(e.target.value); compileData(); }} />
        <input placeholder='hh:mm' className='table-task-time-edit' value={time2} onChange={e => { setTime2(e.target.value); compileData(); }} />
      </div>
      <input type='text' placeholder='task' className='table-task-name highlighted' value={name} onChange={e => { setName(e.target.value); compileData(); }} />
      <input type='text' placeholder='teacher' className='table-task-teacher' value={teacher} onChange={e => { setTeacher(e.target.value); compileData(); }} />
    </div>
  );
}