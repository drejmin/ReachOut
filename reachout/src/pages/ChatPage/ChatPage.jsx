import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChatPage({user, room, socket }){
  const [chats, setChats]=useState([]);

  const fetchChats = async ()=>{
    const {data} = await axios.get('/api/chat');

    console.log(data);
  };

  useEffect(()=>{
    fetchChats()
  }, []);

  return (
    <div>
      <div>
        {chats.map((chat) => (
        <div key = {chat.id}>{chat.chatName}</div>
        ))}
        {/* <MessagesReceived socket={socket} />
        <MsgSend socket={socket} user={user} room={room} /> */}
      </div>
    </div>
  );
};
