import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Authenticate from "./components/Authenticate";
import Table from "./components/Table";
import EditTable from "./components/editMode/Table";
import NewTable from "./components/newTable/NewTable";
import Profile from "./components/profile/Profile";
import Tables from "./components/Tables/Tables";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") !== "null" && localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false
  );

  return (
    <div>
      <Router>
        <Header title="Time Table Manager" token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<></>} />
          <Route
            path="/authenticate"
            element={<Authenticate token={token} setToken={setToken} />}
          />
          <Route path="/table/:id" element={<Table />} />
          <Route path="/table/edit/:id" element={<EditTable />} />
          <Route path="/table/new" element={<NewTable />} />
          <Route
            path="/account/profile"
            element={<Profile setToken={setToken} />}
          />
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
