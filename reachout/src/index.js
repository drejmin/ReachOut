import * as React from 'react';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from '../src/pages/App/App';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'


const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);

