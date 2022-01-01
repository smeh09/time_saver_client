import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Authenticate from './components/Authenticate';
import Table from "./components/Table";
import EditTable from "./components/editMode/Table";

function App() {
  return (
    <div>
      <Router>
        <Header title='Time Table Manager' />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/authenticate' element={<Authenticate />} />
          <Route path='/table' element={<Table />} />
          <Route path='/edit/table' element={<EditTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;