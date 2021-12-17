import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>

          </Route>
          <Route exact path='/log_in'>
            
          </Route>
          <Route exact path='/sign_up'>

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;