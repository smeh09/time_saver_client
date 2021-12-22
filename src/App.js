import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Authenticate from './components/Authenticate';

function App() {
  return (
    <div>
      <Router>
        <Header title='Time Table Manager' />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/authenticate' element={<Authenticate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;