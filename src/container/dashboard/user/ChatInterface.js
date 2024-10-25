import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import UserSidebar from './UserSidebar';
import ChatBody from './ChatBody';
import { fetchUsersList } from '../../../api/endpoint';

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalElements: 0,
    currentPage: 0,
  });
  
  const token = localStorage.getItem('token'); // Retrieving the token from localStorage

  // Fetch Users on Component Mount
  useEffect(() => {
    const fetchUsers = async (page = 0) => {
      try {
        const response = await axios.get(fetchUsersList, {
          params: { page },
          headers: {
            Authorization: `Bearer ${token}`, // Adding token to the request header
          },
        });
        
        const { users, totalPages, totalElements, currentPage } = response.data;
        
        setUsers(users); 
        setPagination({ totalPages, totalElements, currentPage });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers(); // Fetch first page on load
  }, [token]);

  // Fetch Messages for Selected User
  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(`${fetchUsersList}/${user.id}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data); // Assuming response contains an array of messages
    } catch (error) {
      console.error(`Error fetching messages for user ${user.id}:`, error);
      setMessages([]);
    }
  };

  // Send Message to API and Update Messages
  const handleSendMessage = async (text) => {
    const newMessage = { text, isMine: true };
    try {
      await axios.post(
        `${fetchUsersList}/${selectedUser.id}/send`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container fluid className="chat-interface vh-100">
      <Row className="h-100">
        <Col md={3} className="border-end p-0 bg-light">
          <UserSidebar users={users} selectedUser={selectedUser} onSelectUser={handleSelectUser} />
        </Col>
        <Col md={9} className="p-0">
          <ChatBody selectedUser={selectedUser} messages={messages} onSendMessage={handleSendMessage} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;
