import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FaUserCircle } from 'react-icons/fa';

const UserSidebar = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className="user-sidebar bg-light p-3">
      <h5 className="mb-4 text-primary">Chat Users</h5>
      <ListGroup>
        {users.map((user) => (
          <ListGroupItem
            key={user.id}
            active={selectedUser?.id === user.id}
            onClick={() => onSelectUser(user)}
            className="d-flex align-items-center user-item"
            style={{ cursor: 'pointer' }}
          >
            <FaUserCircle size={24} className="me-3 text-secondary" />
            {user.username}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserSidebar;
