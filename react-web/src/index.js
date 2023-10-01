import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Replace with your main App component
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
