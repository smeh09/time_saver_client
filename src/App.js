import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Authenticate from './components/Authenticate';
import Table from "./components/Table";
import EditTable from "./components/editMode/Table";
import NewTable from "./components/newTable/NewTable";

function App() {
  return (
    <div>
      <Router>
        <Header title='Time Table Manager' />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/authenticate' element={<Authenticate />} />
          <Route path='/table/:id' element={<Table />} />
          <Route path='/table/edit/:id' element={<EditTable />} />
          <Route path='/table/new' element={<NewTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;