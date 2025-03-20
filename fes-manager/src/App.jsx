import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';

const App = () => {
  return (
    // <WelcomePage />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
  );
};

export default App;
