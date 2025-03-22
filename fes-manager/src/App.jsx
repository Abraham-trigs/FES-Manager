import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { ProjectListPage } from './components/ProjectFeed/ProjectListPage';
import ProjectDetails from './components/ProjectFeed/ProjectDetails'; // ✅ Import Project Details Page

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/LiveProjects" element={<ProjectListPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} /> {/* ✅ Add Details Route */}
      </Routes>
  );
};

export default App;
