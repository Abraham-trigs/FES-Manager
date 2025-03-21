import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { ProjectListPage } from './components/ProjectFeed/ProjectListPage';

const App = () => {
  return (
    // <WelcomePage />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/ProjectList" element={<ProjectListPage />} />
      </Routes>
  );
};

export default App;
