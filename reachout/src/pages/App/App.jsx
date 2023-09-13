//App.js
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import NavBar from "../../components/NavBar/NavBar";
import {Routes, Route} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import RoomPage from '../RoomPage/RoomPage';
import LoginPage from '../../components/LoginForm/LoginForm';
import ChatPage from '../ChatPage/ChatPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState('');
  const [response, setResponse] = useState("");
  const [endpoint] = useState("http://localhost:3000");
  const socket = socketIOClient(endpoint);

  const login = async () => {
    const { data } = await axios.post('http://localhost:3000/login', {
      username: 'username',
      password: 'password'
    });
    setToken(data);
  };

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    socket.emit("message", "Hello From the Client!");
  }, [endpoint]);

  return (
    <main className="App">
    {/* { //user ? */}
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
            <Route path='/chat' element={<ChatPage user={user} room={room} socket={socket} />}/>
        </Routes>
        {/* <p>
          {response}
        </p> */}
        </>
        </main>
        );
      }
        {/* <button onClick={login}>Login</button>
        </>
        :
       <LoginPage setUser={setUser} /> */}
      
