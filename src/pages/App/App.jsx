import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { signUp } from '../utilities/users-service';
import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import AuthPage from '../AuthPage/AuthPage';
import ChatPage from '../ChatPage/ChatPage';
import RoomPage from '../RoomPage/RoomPage';
import NavBar from '../../components/NavBar/NavBar';
// import MsgService from '../../../services/MsgService';
import HomePage from '../HomePage/HomePage';
import io from 'socket.io-client';

 const socket = io.connect('http://localhost:4000');

export default function App() {
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState('');

    useEffect(() => {
      axios.get('http://localhost:3001/api')
      .then((response) => response.json())
    //   .then((data) => setMessage(data.message));
  }, []);

    return (
        <main className="App">
        { user ?
            <>
            <NavBar user={user} />
            <Routes>
                {/* Route components in here */}
                <Route path="/" element={<HomePage 
                user={user} 
                setUser={setUser} 
                room={room}
                setRoom={setRoom}
                socket={socket} />} />
                <Route path="/chat/room" element={<RoomPage />} />
                <Route path='/chat' element={<ChatPage user={user} room={room} socket={socket} />}
          />
            </Routes>
            </>
            :
            <AuthPage setUser={setUser} />
        }
        {/* socket io server for instant communication */}
        <script src="/socket.io/socket.io.js"></script>
            <script>
            var socket = io();
        </script>
        </main>
        
);

}
