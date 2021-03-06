import { useState, useEffect } from "react";

export default function Task({
  setTableSampleData,
  tableSampleData,
  j,
  call,
  setCallSetData,
  setData,
  i,
  task,
}) {
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
  }, [name, teacher, time1, time2, i, call, setData, setCallSetData]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function update(time1, time2, name, teacher) {
    const table = [...tableSampleData];
    table[i].data[j].task = name;
    table[i].data[j].teacher = teacher;
    table[i].data[j].timings = [time1, time2];
    table[i].day = days[i];
  }

  return (
    <div className="table-task edit-box">
      <div className="table-task-time-container">
        <input
          placeholder="hh:mm"
          className="table-task-time-edit"
          type="time"
          value={time1}
          onChange={(e) => {
            setTime1(e.target.value);
            update(e.target.value, time2, name, teacher);
          }}
          maxLength="5"
        />
        <input
          placeholder="hh:mm"
          className="table-task-time-edit"
          type="time"
          value={time2}
          onChange={(e) => {
            setTime2(e.target.value);
            update(time1, e.target.value, name, teacher);
          }}
          maxLength="5"
        />
      </div>
      <input
        type="text"
        placeholder="task"
        className="table-task-name highlighted table-task-edit-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          update(time1, time2, e.target.value, teacher);
        }}
        minLength="3"
        maxLength="20"
      />
      <input
        type="text"
        placeholder="teacher"
        className="table-task-teacher table-task-edit-input"
        value={teacher}
        onChange={(e) => {
          setTeacher(e.target.value);
          update(time1, time2, name, e.target.value);
        }}
        minLength="3"
        maxLength="20"
      />
    </div>
  );
}
