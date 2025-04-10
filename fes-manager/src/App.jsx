import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';

// Directly imported page components
import ProjectListPage from './components/Pages/ProjectListPage';
import WelcomePage from './components/Pages/WelcomePage';
import ProjectDetails from './components/Pages/ProjectDetails';
import WishList from './components/Pages/WishList';
import MyArk from './components/Pages/MyArk';
import SuggestedProjects from './components/Pages/SuggestedProjects';
import DonorWalletPage from './components/Pages/DonorWalletPage';
import UserMessages from './components/Pages/UserMessages';
import UserNotification from './components/Pages/UserNotifications';
import UserHelpCenter from './components/Pages/UserHelpCenter';
import UserProfileSettings from './components/Pages/UserProfileSettings';
import SignupPage from './components/Pages/SignUpPage';
import CreateProfilePage from './components/Pages/CreateProfile';
import NotFound from './components/pages/404Page';

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public route for landing */}
        <Route path="/" element={<WelcomePage />} />

        {/* Authentication routes */}
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/CreateProfile" element={<CreateProfilePage />} />

        {/* Project-related routes */}
        <Route path="/LiveProjects" element={<ProjectListPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/Suggested-Projects" element={<SuggestedProjects />} />

        {/* User experience routes */}
        <Route path="/WishList" element={<WishList />} />
        <Route path="/MyArk" element={<MyArk />} />

        {/* Financial and data routes */}
        {/* <Route path="/My-Data" element={<DonorData />} /> */}
        <Route path="/MyWallet" element={<DonorWalletPage />} />

        {/* Utility and messaging routes */}
        <Route path="/Messages" element={<UserMessages />} />
        <Route path="/Notifications" element={<UserNotification />} />
        <Route path="/Settings" element={<UserProfileSettings />} />
        <Route path="/Help" element={<UserHelpCenter />} />

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
