import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './DashboardLayout.css';
import avtar from '../../assests/icons/profile.png';
import leftArrow from '../../assests/icons/left-arrow.png';
import rightArrow from '../../assests/icons/right-arrow.png';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <header className="header">
        <div className="profile-section">
          <img src={avtar} alt="Profile" className="profile-avatar" />
          <span className="username">{localStorage.getItem("username")}</span>
        </div>
      </header>

      <div className="layout-body">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h2>{isSidebarOpen ? 'Tennis Mate' : 'TM'}</h2>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
              <img src={isSidebarOpen ? leftArrow : rightArrow} alt="toggle arrow" />
            </button>
          </div>
          <ul className="sidebar-nav">
            <li><Link to="/dashboard/home"><i className="icon-home"></i> {isSidebarOpen && "Home"}</Link></li>
            <li><Link to="/dashboard/courts"><i className="icon-courts"></i> {isSidebarOpen && "Courts"}</Link></li>
            <li><Link to="/dashboard/sports"><i className="icon-sports"></i> {isSidebarOpen && "Sports"}</Link></li>
            <li><Link to="/dashboard/userlist"><i className="icon-users"></i> {isSidebarOpen && "User List"}</Link></li>
            <li><Link to="/dashboard/chat"><i className="icon-chat"></i> {isSidebarOpen && "Chat"}</Link></li>
            <li><Link to="/dashboard/change-password"><i className="icon-password"></i> {isSidebarOpen && "Change Password"}</Link></li>
            <li><button onClick={handleLogout}><i className="icon-logout"></i> {isSidebarOpen && "Logout"}</button></li>
          </ul>
        </aside>

        <main className="main-content">
          <Outlet /> {/* This will load the child routes dynamically */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
