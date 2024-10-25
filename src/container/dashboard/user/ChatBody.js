import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import { IoSend } from 'react-icons/io5';

const ChatBody = ({ selectedUser, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-body bg-white d-flex flex-column p-4">
      {selectedUser ? (
        <>
          <h5 className="mb-3 text-primary">Chat with {selectedUser.username}</h5>
          <div className="chat-messages flex-grow-1 mb-3 p-3" style={{ overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.isMine ? 'text-end' : 'text-start'}`}>
                <div className={`d-inline-block p-2 rounded ${msg.isMine ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                  {msg.text}
                </div>
                <small className="text-muted d-block mt-1">{msg.isMine ? 'You' : selectedUser.username}</small>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="me-2"
            />
            <Button color="primary" onClick={handleSendMessage}>
              <IoSend size={20} />
            </Button>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <p className="text-muted">Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default ChatBody;
