import { useState, useEffect } from 'react';

export default function Messages({ socket }){
  const [messagesRecieved, setMessagesReceived] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          user: data.user,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div>
      {messagesRecieved.map((msg, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{msg.user}</span>
            <span >
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};
