import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Test from './components/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/create-user" element={<CreateUser/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
