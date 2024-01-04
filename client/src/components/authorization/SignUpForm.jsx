import React, { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState(''); 
  const [lastname, setLastname] = useState('');   
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstname, lastname, email }), 
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Redirect user or update UI
      } else {
        // Handle errors (show message to user)
      }
    } catch (error) {
      // Handle network errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)} 
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)} 
        placeholder="Last Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">SignUp</button>
    </form>
  );
}
