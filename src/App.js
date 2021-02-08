import './App.css';
import { UserContextProvider } from './contexts/user';
import { Home } from './pages';
import Register from './pages/register';



function App() {
  return (
    <UserContextProvider>
      <div className="app">
      {/* <Home /> */}
      <Register/>
    </div>
    </UserContextProvider>
  );
}

export default App;
