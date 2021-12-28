export default function Task({days, j, isTaskNow, i, task}) {
  return (
    <div key={j} className='table-task box' id={isTaskNow(days[i], task.timings[0], task.timings[1]) ? 'selected-box' : ''}>
        <div className='table-task-time'>{task.timings.map((time, i) => i === task.timings.length - 1 ? `${time}` : `${time} - `)}</div>
        <div className='table-task-name'>{task.task}</div>
        <div className='table-task-teacher'>{task.teacher}</div>
    </div>
  );
}