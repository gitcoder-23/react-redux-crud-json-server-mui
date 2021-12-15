import { Switch, Route } from 'react-router-dom';
import './App.css';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/adduser" component={AddUser} />
        <Route exact path="/edituser/:userId" component={EditUser} />
      </Switch>
    </div>
  );
}

export default App;
