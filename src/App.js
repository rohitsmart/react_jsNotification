import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { NotificationProvider } from './container/NotificationContext';
import LoginForm from './container/LoginForm';
import DashboardLayout from './container/dashboard/DashboardLayout';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
