import React, { useState } from "react";
import './DashboardLayout.css';
import { FaHome, FaFutbol, FaListUl, FaUsers, FaLock, FaSignOutAlt, FaComments } from 'react-icons/fa';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

import Home from './Home';
import Courts from './Courts';
import Sports from './Sports';
import UserList from './UserList';
import Chat from './Chat';
import ChangePassword from './ChangePassword';
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState('home'); // Tracks which component to display
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // Function to dynamically render components
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />;
      case 'courts':
        return <Courts />;
      case 'sports':
        return <Sports />;
      case 'userlist':
        return <UserList />;
      case 'chat':
        return <Chat />;
      case 'change-password':
        return <ChangePassword />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Header /> {/* Using the Header component */}

      <div className="layout-body">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h2>{isSidebarOpen ? 'Tennis Mate' : 'TM'}</h2>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
              {isSidebarOpen ? <MdOutlineArrowBackIos /> : <MdOutlineArrowForwardIos />}
            </button>
          </div>
          <ul className="sidebar-nav">
            <li><button onClick={() => setActiveComponent('home')}><FaHome /> {isSidebarOpen && <span>Home</span>}</button></li>
            <li><button onClick={() => setActiveComponent('courts')}><FaFutbol /> {isSidebarOpen && <span>Courts</span>}</button></li>
            <li><button onClick={() => setActiveComponent('sports')}><FaListUl /> {isSidebarOpen && <span>Sports</span>}</button></li>
            <li><button onClick={() => setActiveComponent('userlist')}><FaUsers /> {isSidebarOpen && <span>User List</span>}</button></li>
            <li><button onClick={() => setActiveComponent('chat')}><FaComments /> {isSidebarOpen && <span>Chat</span>}</button></li>
            <li><button onClick={() => setActiveComponent('change-password')}><FaLock /> {isSidebarOpen && <span>Change Password</span>}</button></li>
            <li><button onClick={handleLogout}><FaSignOutAlt /> {isSidebarOpen && <span>Logout</span>}</button></li>
          </ul>
        </aside>

        <main className="main-content">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
