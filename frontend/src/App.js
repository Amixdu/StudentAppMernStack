import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Notes from './components/Notes'
import UserInfoPage from "./components/UserInfoPage";
import AdminPage from "./components/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import PrivateUserInfoRoute from "./components/PrivateUserInfoRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/create-user" element={<PrivateAdminRoute> <CreateUser/> </PrivateAdminRoute>}/>
        <Route exact path="/notes" element={<PrivateRoute> <Notes/> </PrivateRoute>}/>
        <Route exact path="/add-info" element={<PrivateUserInfoRoute> <UserInfoPage/> </PrivateUserInfoRoute>}/>
        <Route exact path="/admin" element={<PrivateAdminRoute> <AdminPage/> </PrivateAdminRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
