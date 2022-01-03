import './styles/table.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewTable() {
  const [columns, setColumns] = useState(3);
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const genStartData = (columns) => {
    const startData = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (let i = 0; i < 7; i++) {
      startData.push({day: days[i], data: []});
      for (let j = 0; j < columns; j++) {
        startData[i].data.push({task: '', teacher: '', timings: ['00:00', '00:00']});
      }
    }
    return startData;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || columns <= 0) return;

    const startData = genStartData(columns);

    const fetchUpdate = async () => {
      const res = await fetch(`http://localhost:5000/api/table/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: startData,
          name,
        })
      });
      const result = await res.json();
      if (result.success) {
        navigate(`/table/edit/${result.result._id}`);
      } else {
        alert(result.msg);
      }
    }
    fetchUpdate();
  }

  return (
    <div id='authentication-modal-outer'>
      <div id='authentication-modal-inner'>
        <h2 className='create-table-heading'>Create a new table</h2>
        <div className='authentication-component-table'>
          <form>
            <div className='authenticate-form-control'>
              <div className='authenticate-form-control-input-label'>Number of columns</div>
              <input required type='number' className='authenticate-form-control-input' placeholder='Please enter your number of columns' value={columns} onChange={e => setColumns(e.target.value)} />
            </div>

            <div className='authenticate-form-control'>
              <div className='authenticate-form-control-input-label'>Name of table</div>
              <input required type='text' className='authenticate-form-control-input' placeholder='Please enter the name of your table' value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div id='authenticate-submit-button-container'>
              <button type='submit' id='authenticate-submit-button' onClick={(e) => handleSubmit(e)}>Create Table </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}