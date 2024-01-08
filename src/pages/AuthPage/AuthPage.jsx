// import { set } from "mongoose";
import { useState } from "react";
import LoginForm from "../../components/authorization/LoginForm";
import SignUpForm from "../../components/authorization/SignUpForm";
export default function AuthPage({setUser}){
    const [showLogin, setShowLogin]= useState(true);

    return(
        <main>
            <h1>AuthPage</h1>
            <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up' : 'Log In'}</h3>
            {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
        </main>
    );
}