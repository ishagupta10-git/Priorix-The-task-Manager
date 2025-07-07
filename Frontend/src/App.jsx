import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login.jsx';import SignUp from './pages/Auth/SignUp.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import ManageTasks from './pages/Admin/ManageTasks.jsx';
import CreateTask from './pages/Admin/CreateTask.jsx';
import ManageUsers from './pages/Admin/ManageUsers.jsx';
import ViewTaskDetails from './pages/User/ViewTaskDetails.jsx';
import UserDashboard from './pages/User/UserDashboard.jsx';
import MyTasks from './pages/User/MyTasks.jsx';
import TailwindTest from './components/TailwindTest.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TailwindTest />} />
          <Route path="/test" element={<TailwindTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* Admin routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/details/:id" element={<ViewTaskDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
//1:35:00