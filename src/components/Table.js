import React, { useState, useEffect } from 'react';
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

  const [tableSampleData, setTableSampleData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/table/61cd824b6533bf3f3f2b2d83', {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
      const tableSampleData = await response.json();
      if (tableSampleData.success) {
        setTableSampleData(tableSampleData.data);
      }      
    }
    fetchData();
  }, [])

  if (!tableSampleData) {
    return (
      <div className='loader'></div>
    );    
  } else {
    console.log(tableSampleData)
    return (
      <div className='table-outer'>
        <div className='table'>
          {tableSampleData.map((row, i) => {
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
}