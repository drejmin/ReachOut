import React, { useState } from 'react';

export default function MsgSend({ socket, user, room }){
  const [message, setMessage] = useState('');

  const MsgSend = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { user, room, message, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <div className={styles.MsgSendContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(evt) => setMessage(evt.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={MsgSend}>
        Send Message
      </button>
    </div>
  );
};