//  import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header';
// import Footer from './Footer';
// import OurWorks from './OurWorks';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import Home from './Components/Home';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import DonorPage from './Components/DonorPage';
import UserList from './Components/UserList';
import CreateNGOandDelivery from './Components/CreateNGOandDelivery';
import NGOHome from './Components/NGOHomePage';
import EditDonation from './Components/EditDonation';
import AdminDashboard from './Components/AdminDashboard';

import ManageAccount from './Components/ManageAccount';
import DonateFood from './Components/DonateFood';
import ErrorBoundary from './Components/ErrorBoundary';

import DonationHistory from './Components/DonationHistory';
import ChangePassword from './Components/ChangePassword';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    // Check if the user is logged in

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserImage = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/donate/user/me',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data && response.data.data && response.data.data.user) {
        const { userPhoto, role } = response.data.data.user;
        setUserPhoto(userPhoto);
        setUserRole(role);
      } else {
        console.error('User data not found in response data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUnreadMessages = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/messages/unread',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      console.log('Full response data:', response.data);

      // Access the unreadMessagesCount from the response
      const unreadMessagesCount = response.data.data.unreadMessagesCount;
      setUnreadMessages(unreadMessagesCount);
      console.log('Unread Message ', unreadMessagesCount);
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  const handleLogout = () => {
    // Clear user session or JWT token
    localStorage.removeItem('token'); // Assuming token is stored in localStorage
    // Redirect to login page after logout
    // window.location.href = '/login'; // Example redirect to login page
    window.open('http://localhost:5000/logout', '_self');
    setIsLoggedIn(false);
    setUserPhoto(null);
    setUserRole(null);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserImage();
      fetchUnreadMessages();
    }
  }, [isLoggedIn]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="app-container">
          <Header
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            userPhoto={userPhoto} // Pass userPhoto to Header
            userRole={userRole}
            unreadMessages={unreadMessages}
          />
          <Routes>
            {/* <Route path="/header" element={<Header />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/donor-page" element={<DonorPage />} />
            <Route path="/user-list" element={<UserList />} />
            <Route
              path="/create-ngo-delivery"
              element={<CreateNGOandDelivery />}
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/donate-food" element={<DonateFood />} />
            <Route path="/donate-history" element={<DonationHistory />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/manage-account" element={<ManageAccount />} />
            <Route path="/ngo-home" element={<NGOHome />} />
            <Route path="/edit-donation/:id" element={<EditDonation />} />

            {/* <Route path="/" element={<OurWorks />} /> */}
          </Routes>

          {/* <Footer /> */}
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
