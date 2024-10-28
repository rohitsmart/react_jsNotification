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
                console.log("Connected to WebSocket");
                onConnected();
            },
            (error) => {
                isConnected = false;
                console.error("WebSocket connection error:", error);
                onError(error);
                
                setTimeout(() => connectWebSocket(onConnected, onError), 3000);
            }
        );
    }
};

export const subscribeToUserMessages = (userId, onMessageReceived) => {
    if (stompClient && isConnected) {
        stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
            try {
                const receivedMessage = JSON.parse(message.body);
                onMessageReceived(receivedMessage);
            } catch (error) {
                console.error("Error parsing received message:", error);
            }
        });
    } else {
        console.warn('STOMP client is not connected, cannot subscribe to messages.');
    }
};

export const unsubscribeFromUserMessages = (userId) => {
    if (stompClient && isConnected) {
        stompClient.unsubscribe(`/user/${userId}/queue/messages`);
        console.log(`Unsubscribed from messages for user: ${userId}`);
    } else {
        console.warn('STOMP client is not connected, cannot unsubscribe from messages.');
    }
};

export const sendMessage = (userId, message) => {
    const senderId = localStorage.getItem('userId');
    console.log('Sender ID:', senderId);

    if (stompClient && isConnected) {
        stompClient.send(`/app/private.${userId}`, {}, JSON.stringify({
            content: message.content,
            senderId: senderId
        }));
        console.log(`Message sent to ${userId}:`, message.content);
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
