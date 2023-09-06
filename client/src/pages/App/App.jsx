import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import AuthPage from '../AuthPage/AuthPage';
import ChatPage from '../ChatPage/ChatPage';
import AuthPage from '../RoomPage/RoomPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
    const [user, setUser] = useState(getUser());
  
    useEffect(() => {
      axios.get('http://localhost:3001/')
      .then(response => {
          console.log(response.data);
      });
  }, []);

    return (
        <main className="App">
        { user ?
            <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
                {/* Route components in here */}
                <Route path="/chat/msg" element={<ChatPage />} />
                <Route path="/chat/room" element={<RoomPage />} />
            </Routes>
            </>
            :
            <AuthPage setUser={setUser} />
        }
    </main>
);

}

