import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './DashboardLayout.css';

// Importing icons from react-icons
import { FaHome, FaFutbol, FaListUl, FaUsers, FaLock, FaSignOutAlt, FaComments } from 'react-icons/fa';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import avtar from '../../assests/icons/profile.png';

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
              {isSidebarOpen ? <MdOutlineArrowBackIos /> : <MdOutlineArrowForwardIos />}
            </button>
          </div>
          <ul className="sidebar-nav">
            <li><Link to="/dashboard/home"><FaHome /> {isSidebarOpen && <span>Home</span>}</Link></li>
            <li><Link to="/dashboard/courts"><FaFutbol /> {isSidebarOpen && <span>Courts</span>}</Link></li>
            <li><Link to="/dashboard/sports"><FaListUl /> {isSidebarOpen && <span>Sports</span>}</Link></li>
            <li><Link to="/dashboard/userlist"><FaUsers /> {isSidebarOpen && <span>User List</span>}</Link></li>
            <li><Link to="/dashboard/chat"><FaComments /> {isSidebarOpen && <span>Chat</span>}</Link></li>
            <li><Link to="/dashboard/change-password"><FaLock /> {isSidebarOpen && <span>Change Password</span>}</Link></li>
            <li><button onClick={handleLogout}><FaSignOutAlt /> {isSidebarOpen && <span>Logout</span>}</button></li>
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
