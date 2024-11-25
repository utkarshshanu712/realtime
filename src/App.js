import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Create a socket connection to the backend server when the component mounts
  useEffect(() => {
    const socket = io('https://server-0zem.onrender.com'); // Backend URL

    // Listen for incoming messages from the backend
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup: Disconnect from socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send a message to the backend
  const handleSendMessage = () => {
    if (message.trim()) {
      const socket = io('https://server-0zem.onrender.com');
      socket.emit('message', message); // Send message to the backend
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p> // Display received messages
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update message state
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button> {/* Send message */}
    </div>
  );
};

export default App;
