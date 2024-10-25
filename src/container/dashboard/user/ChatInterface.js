import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserSidebar from './UserSidebar';
import ChatBody from './ChatBody';

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const mockUsers = [
      { id: 1, username: 'User1' },
      { id: 2, username: 'User2' },
      { id: 3, username: 'User3' }
    ];
    setUsers(mockUsers);
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear previous chat (replace with fetch messages from API)
  };

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isMine: true }]);
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
