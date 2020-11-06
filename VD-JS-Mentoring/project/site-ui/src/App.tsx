import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppFrame } from './components/AppFrame';
import './App.css';

function App() {
  return (
    <Router>
      <AppFrame />
    </Router>
  );
}

export default App;
