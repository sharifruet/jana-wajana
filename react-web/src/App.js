import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './AppRoutes'; // Import your route configuration component

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;