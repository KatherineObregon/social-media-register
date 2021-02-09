import './App.css';
import { UserContextProvider } from './contexts/user';
import { Home } from './pages';
import Register from './pages/register';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { UserInfoContext, UserInfoContextProvider } from './contexts/userInfo';


function App() {
  return (
    <UserInfoContextProvider>
    <UserContextProvider>
     
      <div className="app">
      <Router>
      <Switch>
        <Route path="/register">
          <Register/>
        </Route>  
        <Route path="/">
          <Home />         
        </Route>
       

      </Switch>
    </Router>
      
    </div>
    </UserContextProvider>
    </UserInfoContextProvider>
  );
}

export default App;
