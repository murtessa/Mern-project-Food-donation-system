// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const ViewProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/user/me',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., redirect to login page
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="manage-account">
      <div className="profile-container">
        {user && (
          <div className="profile-details">
            <div className="profile-header">
              {user.userPhoto && (
                <img
                  className="profile-photo"
                  src={`http://localhost:5000/uploads/${user.userPhoto}`}
                  alt="User"
                />
              )}
              <h2>{user.fullName}'s Profile</h2>
            </div>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            <p>Role:{user.role}</p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
      <div className="gridView"></div>
    </div>
  );
};

export default ViewProfile;
