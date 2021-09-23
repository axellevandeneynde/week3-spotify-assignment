import './App.css';
import './bulma.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {  
  RecoilRoot,  
  atom,  
  selector,  
  useRecoilState,  
  useRecoilValue,} from 'recoil';

import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';

function App() {
  return (
    <RecoilRoot>
    <Router>
      <Switch>
      <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
      </Switch>
    </Router>
    <nav className="navbar is-primary is-fixed-top">
    <div className="navbar-brand">
      <div className="navbar-item">
      <h1>Spotify assignment</h1>
      </div>
    </div>
    </nav>
    </RecoilRoot>
  );
}

export default App;
