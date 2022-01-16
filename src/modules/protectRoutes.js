export default function protectRoutes() {
  const token = localStorage.getItem("token");
  if (!token || token === "null") {
    return true;
  } else {
    return false;
  }
}
