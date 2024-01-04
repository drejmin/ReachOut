import './HomePage.css';
import {React, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import LoginForm from '../../components/authorization/LoginForm';
// import SignUpForm from '../../components/authorization/SignUpForm';



export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
  
      if (user) navigate.push("/chats");
    }, [navigate]);
  
  return (
    <div>
      <h1>Welcome to the Chat App!</h1>
      <p>Connect and chat in real-time with people around the world.</p>
      
      <Link to="/chats">Go to Chat Rooms</Link> 
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
    
  );
}
