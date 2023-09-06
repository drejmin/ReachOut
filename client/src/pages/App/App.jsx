import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
      axios.get('http://localhost:3001/')
      .then(response => {
          console.log(response.data);
      });
  }, []);

  return (
      <div className="App">
          <h1>MERN Stack</h1>
      </div>
  );
}


export default App;
