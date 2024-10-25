import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Client } from '@stomp/stompjs'; // Import the STOMP client
import UserSidebar from './UserSidebar';
import ChatBody from './ChatBody';
import { fetchUsersList } from '../../../api/endpoint';
import './chat.css';

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
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const fetchUsers = async (page = 0) => {
      try {
        const response = await axios.get(fetchUsersList, {
          params: { page },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const { users, totalPages, totalElements, currentPage } = response.data;
        
        setUsers(users); 
        setPagination({ totalPages, totalElements, currentPage });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Connect to the WebSocket server
    const connectWebSocket = () => {
      const client = new Client({
        brokerURL: 'ws://localhost:8080/api/protected/chat', // Update with your WebSocket URL
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.log(str);
        },
        onConnect: () => {
          console.log('WebSocket connected');
          if (selectedUser) {
            subscribeToMessages(selectedUser.id);
          }
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },
      });

      client.activate();
      setStompClient(client);
    };

    fetchUsers();
    connectWebSocket();

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [token, selectedUser]); // Add selectedUser as a dependency

  const subscribeToMessages = (userId) => {
    if (stompClient) {
      stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }
  };

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(`${fetchUsersList}/${user.id}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
      subscribeToMessages(user.id); // Subscribe to messages for the selected user
    } catch (error) {
      console.error(`Error fetching messages for user ${user.id}:`, error);
      setMessages([]);
    }
  };

  const handleSendMessage = (text) => {
    if (stompClient && selectedUser) {
      const newMessage = { text, isMine: true }; // Prepare new message
      stompClient.publish({
        destination: `/app/private.${selectedUser.id}`, // Publish to the correct destination
        body: JSON.stringify(newMessage), // Convert message to JSON
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <Container fluid className="chat-interface">
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
