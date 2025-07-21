import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', message);
    setChat([...chat, message]);
    setMessage('');
  };

  return (
    <div>
      <h2>Real-time Chat</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {chat.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
    </div>
  );
};

export default Dashboard;
