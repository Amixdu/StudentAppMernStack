import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Notes from './pages/Notes'
import UserInfoPage from "./pages/UserInfoPage";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import PrivateUserInfoRoute from "./components/PrivateUserInfoRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/notes" element={<PrivateRoute> <Notes/> </PrivateRoute>}/>
        <Route exact path="/add-info" element={<PrivateUserInfoRoute> <UserInfoPage/> </PrivateUserInfoRoute>}/>
        <Route exact path="/admin" element={<PrivateAdminRoute> <AdminPage/> </PrivateAdminRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;