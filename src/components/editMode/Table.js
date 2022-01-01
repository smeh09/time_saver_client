import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  if (d.toLowerCase() !== day.toLocaleLowerCase()) return false;
  if (hour < parseInt(formattedTime1[0]) || mins < parseInt(formattedTime1[1])) return false;
  if (hour > parseInt(formattedTime2[0]) || (hour === parseInt(formattedTime2[0]) && mins > parseInt(formattedTime2[1]))) return false;
  return true;
}

export default function EditTable() {

  const [tableSampleData, setTableSampleData] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/table/61d00eb0ad60b90e4e06d7db', {
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
  }, []);

  let finalData = [];
  const [callSetData, setCallSetData] = useState(false);

  const handleSubmit = () => {
    setCallSetData(true);
  }

  const getTotalObjs = () => {
    let totalObjs = 0;
    if (tableSampleData) {
      tableSampleData.forEach(dayObj => {
        dayObj.data.forEach(() => {
          totalObjs++;
        })
      });
    }
    return totalObjs;
  }

  const tempData = [];

  const setData = (data) => {
    tempData.push(data);

    const totalObjs = getTotalObjs();

    if (tempData.length === totalObjs) {

      let previousDay = -1;

      tempData.forEach(obj => {
        if (previousDay === obj.day) {
          finalData[obj.day].data.push({ task: obj.task, teacher: obj.teacher, timings: obj.timings });
        } else {
          finalData.push({ day: days[obj.day], data: [{ task: obj.task, teacher: obj.teacher, timings: obj.timings }] });
        }
        previousDay = obj.day;
      })

      const fetchUpdate = async () => {
        const res = await fetch(`http://localhost:5000/api/table/61d00eb0ad60b90e4e06d7db`, {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: finalData
          })
        });
        const result = await res.json();
        if (result.success) {
          navigate('/table');
        } else {
          alert(result.msg);
        }
      }
      fetchUpdate();
    }
  }

  if (!tableSampleData) {
    return (
      <div className='loader'></div>
    );
  } else {
    return (
      <div className='table-outer'>
        <div className='table'>
          {tableSampleData.map((dayData, i) => {
            return (
              <div className='day-row' key={i}>
                <Day dayData={dayData} />
                <div className='table-row'>
                  {dayData.data.map((task, j) => {
                    return (
                      <Task key={j} call={callSetData} setData={setData} setCallSetData={setCallSetData} dayData={dayData} i={i} isTaskNow={isTaskNow} task={task} />
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className='buttons'>
          <button className='update-btn-edit' title='Save Table' onClick={handleSubmit}><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
          <button className='update-btn-edit update-btn-back' title='Save Table' onClick={() => navigate('/table')}><i class="fa fa-times" aria-hidden="true"></i> Cancel</button>
        </div>
      </div>
    );
  }
}