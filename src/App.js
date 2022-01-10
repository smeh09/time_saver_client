import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Authenticate from "./components/Authenticate";
import Table from "./components/Table";
import EditTable from "./components/editMode/Table";
import NewTable from "./components/newTable/NewTable";
import Profile from "./components/profile/Profile";
import Tables from "./components/Tables/Tables";
import AddMethod from "./components/addMethod/AddMethod";
import JoinTable from "./components/joinTable/JoinTable";
import Members from "./components/members/Members";
import AddMembers from "./components/addMembers/AddMembers";
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
          <Route path="/table/join" element={<JoinTable />} />
          <Route
            path="/account/profile"
            element={<Profile setToken={setToken} />}
          />
          <Route path="/tables" element={<Tables />} />
          <Route path="/table/add/type" element={<AddMethod />} />
          <Route path="/table/members/:id" element={<Members />} />
          <Route path="/member/add/:id" element={<AddMembers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
