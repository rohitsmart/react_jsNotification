import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import UserSidebar from './UserSidebar';
import ChatBody from './ChatBody';
import { fetchUsersList } from '../../../api/endpoint';
import {
  connectWebSocket,
  subscribeToUserMessages,
  unsubscribeFromUserMessages,
  sendMessage,
  disconnectWebSocket,
} from '../../components/websocketService';

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalElements: 0,
    currentPage: 0,
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(fetchUsersList, {
          params: { page: pagination.currentPage },
          headers: { Authorization: `Bearer ${token}` },
        });
        const { users, totalPages, totalElements, currentPage } = response.data;
        setUsers(users);
        setPagination({ totalPages, totalElements, currentPage });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [token, pagination.currentPage]);

  useEffect(() => {
    const onConnected = () => {
      console.log('Connected to WebSocket');
      if (selectedUser) {
        subscribeToUserMessages(selectedUser.id, handleMessageReceived);
      }
    };

    const onError = (error) => {
      console.error('WebSocket connection error:', error);
    };

    connectWebSocket(onConnected, onError);
    
    return () => {
      disconnectWebSocket();
    };
  }, [selectedUser]);

  useEffect(() => {
    // Unsubscribe when selectedUser changes
    return () => {
      if (selectedUser) {
        unsubscribeFromUserMessages(selectedUser.id);
      }
    };
  }, [selectedUser]);

  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSelectUser = async (user) => {
    if (selectedUser) {
      unsubscribeFromUserMessages(selectedUser.id);
    }
    setSelectedUser(user);
    try {
      const response = await axios.get(`${fetchUsersList}/${user.id}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error(`Error fetching messages for user ${user.id}:`, error);
    }
  };

  const handleSendMessage = (text) => {
    if (selectedUser && token) {
      const newMessage = {
        content: text,
        senderId: localStorage.getItem("userId"),
      };

      console.log('Sending message to:', selectedUser.id);
      sendMessage(selectedUser.id, newMessage);
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, isMine: true }
      ]);
    }
  };

  return (
    <Container fluid className="chat-interface">
      <Row className="h-100">
        <Col md={3} className="border-end p-0 bg-light">
          <UserSidebar 
            users={users} 
            selectedUser={selectedUser} 
            onSelectUser={handleSelectUser} 
          />
        </Col>
        <Col md={9} className="p-0">
          <ChatBody 
            selectedUser={selectedUser} 
            messages={messages} 
            onSendMessage={handleSendMessage} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;
