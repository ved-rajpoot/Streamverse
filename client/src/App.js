import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import HomePage from './Components/User/Homepage';
import Dashboard from './Components/User/Dashboard';

const App = () =>{
  return (
      <>
      <div>
        <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/SignUp" element={<SignUp />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/homepage" element={<HomePage />} />
            </Routes>
          </Router>
      </div>
      </>
    )
}

export default App;
