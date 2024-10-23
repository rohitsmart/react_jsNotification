import React from 'react';
import avtar from '../../assests/icons/profile.png';

const Header = () => {
  return (
    <header className="header">
      <div className="profile-section">
        <img src={avtar} alt="Profile" className="profile-avatar" />
        <span className="username">{localStorage.getItem("username")}</span>
      </div>
    </header>
  );
};

export default Header;
