import { useState, useEffect } from "react";

export default function Task({call, setCallSetData, setData, dayData, i, isTaskNow, task}) {
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
    <div className='table-task box' id={isTaskNow(dayData.day, task.timings[0], task.timings[1]) ? 'selected-box2' : ''}>
      <div className='table-task-time-container'>
        <input placeholder='h:m' className='table-task-time-edit' value={time1} onChange={e => setTime1(e.target.value)} />
        <input placeholder='h:m' className='table-task-time-edit' value={time2} onChange={e => setTime2(e.target.value)} />
      </div>
      <input type='text' className='table-task-name highlighted' value={name} onChange={e => setName(e.target.value)} />
      <input type='text' className='table-task-teacher' value={teacher} onChange={e => setTeacher(e.target.value)} />
    </div>
  );
}