import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Test from './components/Test';
import Notes from './components/Notes'
import AddNotes from "./components/AddNotes";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/create-user" element={<CreateUser/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/notes" element={<Notes/>}/>
        <Route exact path="/add-notes" element={<AddNotes/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
