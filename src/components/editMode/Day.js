export default function Day({ dayData }) {
  return (
    <div className="day edit-box edit-day">{dayData.day.toUpperCase()}</div>
  );
}
