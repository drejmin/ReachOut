import './HomePage.css';
import {React, useEffect, useState} from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
// import LoginForm from '../../components/authorization/LoginForm';
// import SignUpForm from '../../components/authorization/SignUpForm';



export default function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(getUser());


    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
  
      if (user) navigate.push("/chats");
    }, [navigate]);
  
  return (
    <div>
       { user ?
        <>
        <NavBar user = {user} setUser= {setUser}/>

          <h1>Welcome to the Chat App!</h1>
          <p>Connect and chat in real-time with people around the world.</p>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/chats" element={<ChatRoomPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
          {/* <Link to="/chats">Go to Chat Rooms</Link> 
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
          </>
        :
        <AuthPage setUser={setUser}/>
      }
    </div>
  );
}
// import {useState} from 'react';
// import './App.css';
// import {Routes, Route} from 'react-router-dom';

// import ChatRoomPage from '../ChatRoomPage/ChatRoomPage';
// import HomePage from '../HomePage/HomePage';


// export default function App() {
//   const [user, setUser] = useState(getUser());

//   return (
//     <main className="App">
//       { user ?
//         <>
//         <NavBar user = {user} setUser= {setUser}/>
//         <Routes>
//           <Route exact path="/" element={<HomePage />} />
//           <Route path="/chats" element={<ChatRoomPage />} />
//           <Route path="/orders" element={<OrderHistoryPage />} />
//         </Routes>
//         </>
//         :
//         <AuthPage setUser={setUser}/>
//       }
//     </main>
//   );
//     }