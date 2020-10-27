import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { AppFrame } from './components/AppFrame';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppFrame />
    </Router>
  );
}

export default App;
