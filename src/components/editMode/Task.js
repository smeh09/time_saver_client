import { useState, useEffect } from "react";

export default function Task({call, setCallSetData, setData, i, task}) {
  const [time1, setTime1] = useState(task.timings[0]);
  const [time2, setTime2] = useState(task.timings[1]);
  const [name, setName] = useState(task.task);
  const [teacher, setTeacher] = useState(task.teacher);

  useEffect(() => {
    if (call) {
      const timings = [time1, time2];
  
      setData({
        task: name,
        teacher,
        timings,
        day: i,
      });
      setCallSetData(false);
    }
  });

  return (
    <div className='table-task box'>
      <div className='table-task-time-container'>
        <input placeholder='hh:mm' className='table-task-time-edit' value={time1} onChange={e => setTime1(e.target.value)} />
        <input placeholder='hh:mm' className='table-task-time-edit' value={time2} onChange={e => setTime2(e.target.value)} />
      </div>
      <input type='text' placeholder='task' className='table-task-name highlighted' value={name} onChange={e => setName(e.target.value)} />
      <input type='text' placeholder='teacher' className='table-task-teacher' value={teacher} onChange={e => setTeacher(e.target.value)} />
    </div>
  );
}