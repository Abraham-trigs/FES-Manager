import React, { useEffect, lazy, Suspense } from 'react';
import './index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Lazy-loaded page components to improve performance by splitting bundles
const ProjectListPage = lazy(() => import('./components/Pages/ProjectListPage'));
const WelcomePage = lazy(() => import('./components/Pages/WelcomePage'));
const ProjectDetails = lazy(() => import('./components/Pages/ProjectDetails'));
const WishList = lazy(() => import('./components/Pages/WishList'));
const MyArk = lazy(() => import('./components/Pages/MyArk'));
const SuggestedProjects = lazy(() => import('./components/Pages/SuggestedProjects'));
const DonorWalletPage = lazy(() => import('./components/Pages/DonorWalletPage'));
const UserMessages = lazy(() => import('./components/Pages/UserMessages'));
const UserNotification = lazy(() => import('./components/Pages/UserNotifications'));
const UserHelpCenter = lazy(() => import('./components/Pages/UserHelpCenter'));
const UserProfileSettings = lazy(() => import('./components/Pages/UserProfileSettings'));
const SignupPage = lazy(() => import('./components/Pages/SignUpPage'));
const CreateProfilePage = lazy(() => import('./components/Pages/CreateProfile'));
const NotFound = lazy(() => import('./components/pages/404Page')); 

const App = () => {


  return (
    <div>
      {/* Suspense fallback shown while lazy components load */}
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
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
      </Suspense>
    </div>
  );
};

export default App;
