import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Tennis Mate</h2>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
            {isSidebarOpen ? '<' : '>'}
          </button>
        </div>
        <ul className="sidebar-nav">
          <li><Link to="/dashboard/home">Home</Link></li>
          <li><Link to="/dashboard/courts">Courts</Link></li>
          <li><Link to="/dashboard/sports">Sports</Link></li>
          <li><Link to="/dashboard/userlist">User List</Link></li>
          <li><Link to="/dashboard/chat">Chat</Link></li>
          <li><Link to="/dashboard/change-password">Change Password</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </aside>

      <div className="content">
        <header className="header">
          <div className="profile-section">
            <img src="path/to/avatar.jpg" alt="Profile" className="profile-avatar" />
            <span className="username">{localStorage.getItem("username")}</span>
          </div>
        </header>

        <main className="main-content">
          <Outlet /> {/* This will load the child routes dynamically */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
