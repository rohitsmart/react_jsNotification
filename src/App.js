import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { NotificationProvider } from './container/NotificationContext';
import LoginForm from './container/LoginForm';
import DashboardLayout from './container/dashboard/DashboardLayout';
import Home from './container/dashboard/Home';
import Courts from './container/dashboard/Courts';
import Sports from './container/dashboard/Sports';
import UserList from './container/dashboard/UserList';
import Chat from './container/dashboard/Chat';
import ChangePassword from './container/dashboard/ChangePassword';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="courts" element={<Courts />} />
            <Route path="sports" element={<Sports />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="chat" element={<Chat />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
