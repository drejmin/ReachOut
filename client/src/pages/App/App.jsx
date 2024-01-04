import {useState} from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import ChatRoomPage from '../ChatRoomPage/ChatRoomPage';
import HomePage from '../HomePage/HomePage';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
        <NavBar user = {user} setUser= {setUser}/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/chats" element={<ChatRoomPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
    }
      
      
