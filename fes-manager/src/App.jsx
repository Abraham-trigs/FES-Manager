import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import ProjectFeed from './components/ProjectFeed';

const App = () => {
  return (
    // <WelcomePage />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/ProjectFeed" element={<ProjectFeed />} />

      </Routes>
  );
};

export default App;
