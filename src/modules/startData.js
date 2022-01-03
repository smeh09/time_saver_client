const genStartData = (columns) => {
  const startData = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  for (let i = 0; i < 7; i++) {
    startData.push({day: days[i], data: []});
    for (let j = 0; j < columns; j++) {
      startData[i].data.push({ task: '', teacher: '', timings: ['00:00', '00:00'] });
    }
  }
  return startData;
}

export default genStartData;