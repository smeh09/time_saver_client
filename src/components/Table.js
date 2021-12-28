import React from 'react';
import Task from './Task';
import Day from './Day';
import './styles/table.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const date = new Date();
const day = days[date.getDay() - 1];
const hour = date.getHours();
const mins = date.getMinutes();

function formatTime(time) {
  const formatted_time = time.split(':');
  return formatted_time;
}

const isTaskNow = (d, time1, time2) => {

  const formattedTime1 = formatTime(time1);
  const formattedTime2 = formatTime(time2);

  if (d !== day) return false;
  if (hour < parseInt(formattedTime1[0]) || mins < parseInt(formattedTime1[1])) return false;
  if (hour > parseInt(formattedTime2[0]) || (hour === parseInt(formattedTime2[0]) && mins > parseInt(formattedTime2[1]))) return false;
  return true;
}

export default function Table() {

  const table_sample_data = [
    [
      {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['3:10', '3:30']}, {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['3:31', '3:43']}, {'task': 'MATHS', 'teacher': 'Vaishali Arora', 'timings': ['20:50', '21:25']}, {'task': 'HISTORY', 'teacher': 'Smita Mishra', 'timings': ['21:55', '22:30']}, {'task': 'BIOLOGY', 'teacher': 'Namita Sharma', 'timings': ['22:30', '23:05']}, {'task': 'ENGLISH', 'teacher': 'Malvika Gupta', 'timings': ['23:05', '23:40']}, {'task': 'GEOGRAPHY', 'teacher': 'Gargee Gargee', 'timings': ['23:40', '24:15']}
    ],
    [
      {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['141:40', '20:15']}, {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['20:15', '20:50']}, {'task': 'MATHS', 'teacher': 'Vaishali Arora', 'timings': ['20:50', '21:25']}, {'task': 'HISTORY', 'teacher': 'Smita Mishra', 'timings': ['21:55', '22:30']}, {'task': 'BIOLOGY', 'teacher': 'Namita Sharma', 'timings': ['22:30', '23:05']}, {'task': 'ENGLISH', 'teacher': 'Malvika Gupta', 'timings': ['23:05', '23:40']}, {'task': 'GEOGRAPHY', 'teacher': 'Gargee Gargee', 'timings': ['23:40', '24:15']}
    ],
    [
      {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['141:40', '20:15']}, {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['20:15', '20:50']}, {'task': 'MATHS', 'teacher': 'Vaishali Arora', 'timings': ['20:50', '21:25']}, {'task': 'HISTORY', 'teacher': 'Smita Mishra', 'timings': ['21:55', '22:30']}, {'task': 'BIOLOGY', 'teacher': 'Namita Sharma', 'timings': ['22:30', '23:05']}, {'task': 'ENGLISH', 'teacher': 'Malvika Gupta', 'timings': ['23:05', '23:40']}, {'task': 'GEOGRAPHY', 'teacher': 'Gargee Gargee', 'timings': ['23:40', '24:15']}
    ],
    [
      {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['00:40', '01:15']}, {'task': 'TEST', 'teacher': 'Mayank Malik', 'timings': ['20:15', '20:50']}, {'task': 'MATHS', 'teacher': 'Vaishali Arora', 'timings': ['20:50', '21:25']}, {'task': 'HISTORY', 'teacher': 'Smita Mishra', 'timings': ['21:55', '22:30']}, {'task': 'BIOLOGY', 'teacher': 'Namita Sharma', 'timings': ['22:30', '23:05']}, {'task': 'ENGLISH', 'teacher': 'Malvika Gupta', 'timings': ['23:05', '23:40']}, {'task': 'GEOGRAPHY', 'teacher': 'Gargee Gargee', 'timings': ['23:40', '24:15']}
    ]
  ];

  return (
    <div className='table-outer'>
      <div className='table'>
        {table_sample_data.map((row, i) => {
          return (
            <div className='day-row' key={i}>
              <Day days={days} i={i} />
              <div className='table-row'>
                {row.map((task, j) => {
                  return (
                    <Task days={days} j={j} isTaskNow={isTaskNow} i={i} task={task} />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <button className='update-btn' onClick={() => window.location.reload()}>Update</button>
    </div>
  );
}