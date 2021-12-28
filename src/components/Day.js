export default function Task({days, i}) {
  return (
    <div className='day box'>{days[i].toUpperCase()}</div>
  );
}