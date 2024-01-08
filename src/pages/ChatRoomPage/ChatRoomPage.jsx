import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';



const ENDPOINT = 'http://localhost:3000';

export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((msgs) => [...msgs, message]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (message && socket) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
    </div>
  );
}
