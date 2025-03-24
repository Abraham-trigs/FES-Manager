import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom'; // ❌ No extra Router here!
import { ProjectListPage } from './components/Pages/ProjectListPage';
import WelcomePage from './components/Pages/WelcomePage';
import ProjectDetails from './components/ProjectFeed/ProjectDetails';
import WishList from './components/Pages/WishList';
import UserProfilePage from './components/Pages/UserProfilePage';
import MyArk from './components/Pages/MyArk';
import SuggestedProjects from './components/Pages/SuggestedProjects';
import DonorData from './components/Pages/DonorData';
import DepositPage from './components/Pages/DepositPage';
import UserMessages from './components/Pages/UserMessages';
import UserNotification from './components/Pages/UserNotifications';
import UserHelpCenter from './components/Pages/UserHelpCenter';
import Transactions from './components/Pages/Transactions';
import UserProfileSettings from './components/Pages/UserProfileSettings';
import SignupPage from './components/Pages/SignUpPage';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/LiveProjects" element={<ProjectListPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} /> 
        <Route path="/WishList" element={<WishList />} /> 
        <Route path="/Profile" element={<UserProfilePage />} /> 
        <Route path="/MyArk" element={<MyArk />} /> 
        <Route path="/Suggested-Projects" element={<SuggestedProjects />} /> 
        <Route path="/My-Data" element={<DonorData />} /> 
        <Route path="/Deposit" element={<DepositPage />} /> 
        <Route path="/Transactions" element={<Transactions />} /> 
        <Route path="/Messages" element={<UserMessages />} /> 
        <Route path="/Notifications" element={<UserNotification />} /> 
        <Route path="/Settings" element={<UserProfileSettings />} /> 
        <Route path="/Help" element={<UserHelpCenter />} /> 
      </Routes>
    </div>
  );
};

export default App;
