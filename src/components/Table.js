import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/table.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = new Date();
const day = days[date.getDay()];
const hour = date.getHours();
const mins = date.getMinutes();

function formatTime(time) {
  const formatted_time = time.split(':');
  return formatted_time;
}

const isTaskNow = (d, time1, time2) => {

  const formattedTime1 = formatTime(time1);
  const formattedTime2 = formatTime(time2);

  if (d.toLowerCase() !== day.toLowerCase()) return false;
  if (hour < parseInt(formattedTime1[0]) || mins < parseInt(formattedTime1[1])) return false;
  if (hour > parseInt(formattedTime2[0]) || (hour === parseInt(formattedTime2[0]) && mins > parseInt(formattedTime2[1]))) return false;
  return true;
}

export default function Table() {

  const [tableSampleData, setTableSampleData] = useState(false);
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/table/${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
      const tableSampleData = await response.json();
      if (tableSampleData.success) {
        setTableSampleData(tableSampleData.data);
        setName(tableSampleData.name);
      }      
    }
    fetchData();
  }, [id])

  if (!tableSampleData) {
    return (
      <div className='loader'></div>
    );    
  } else {
    return (
      <div className='table-outer'>
        <h2 className='table-heading-name'>{name}</h2>
        <button onClick={() => navigate(`/table/edit/${id}`)} className='edit-redirect-btn update-btn'><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
        <div className='table'>
          {tableSampleData.map((dayData, i) => {
            return (
              <div className='day-row' key={i}>
                <div className='day box'>{dayData.day.toUpperCase()}</div>
                <div className='table-row'>
                  {dayData.data.map((task, j) => {
                    return (
                      <div key={j} className='table-task box' id={isTaskNow(dayData.day, task.timings[0], task.timings[1]) ? 'selected-box' : ''}>
                        <div className='table-task-time'>{task.timings.map((time, i) => i === task.timings.length - 1 ? `${time}` : `${time} - `)}</div>
                        <div className='table-task-name'>{task.task}</div>
                        <div className='table-task-teacher'>{task.teacher}</div>
                    </div>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button title='Refresh' className='update-btn-edit' onClick={() => window.location.reload()}><i className="fa fa-refresh" aria-hidden="true"></i> Refresh</button>
      </div>
    );
  }
}