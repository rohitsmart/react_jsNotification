import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { WEBSOCKET_CONNECTION } from '../../api/endpoint';

let stompClient = null;
let isConnected = false;

export const connectWebSocket = (onConnected, onError) => {
  if (!stompClient || !isConnected) {
    const socket = new SockJS(WEBSOCKET_CONNECTION);
    stompClient = over(socket);

    const token = localStorage.getItem('token');

    stompClient.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        isConnected = true;
        onConnected();
      },
      (error) => {
        isConnected = false;
        onError(error);
        setTimeout(() => connectWebSocket(onConnected, onError), 3000);
      }
    );
  }
};

export const subscribeToUserMessages = (userId, onMessageReceived) => {
  if (stompClient && isConnected) {
    stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
      const receivedMessage = JSON.parse(message.body);
      onMessageReceived(receivedMessage);
    });
  } else {
    console.warn('STOMP client is not connected, cannot subscribe to messages.');
  }
};

export const sendMessage = (userId, message) => {
    const senderId = localStorage.getItem('userId');
    console.log('Sender ID:', senderId); // Log senderId to verify
    if (stompClient && isConnected) {
        stompClient.send(`/app/private.${userId}`, {}, JSON.stringify({
            content: message.text,
            chat: { id: message.chatId },
            senderId: senderId // Include senderId in the message
        }));
    } else {
        console.warn('STOMP client is not connected, cannot send messages.');
    }
};


  

export const disconnectWebSocket = () => {
  if (stompClient && isConnected) {
    stompClient.disconnect(() => {
      isConnected = false;
      stompClient = null;
      console.log("Disconnected from WebSocket");
    });
  }
};
