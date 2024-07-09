// manageAccount.js

import React, { useState } from 'react';
import ViewProfile from './ViewProfile'; // Import ViewProfile component
import UpdateProfile from './UpdateProfile'; // Import UpdateProfile component
import DeactivateAccount from './DeactivateAccount'; // Import DeactivateAccount component
import './manageAccount.css';

const ManageAccount = () => {
  const [activeMenu, setActiveMenu] = useState('updateProfile'); // Default active menu

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="manage-account-container">
      <div className="menu-container">
        <ul>
          <li
            className={activeMenu === 'updateProfile' ? 'active' : ''}
            onClick={() => handleMenuClick('updateProfile')}
          >
            Update Profile
          </li>
          <li
            className={activeMenu === 'deactivateAccount' ? 'active' : ''}
            onClick={() => handleMenuClick('deactivateAccount')}
          >
            Deactivate Account
          </li>
          <li
            className={activeMenu === 'viewProfile' ? 'active' : ''}
            onClick={() => handleMenuClick('viewProfile')}
          >
            View Profile
          </li>
          {/* Add more menu options as needed */}
        </ul>
      </div>
      <div className="content-container">
        {/* Render content based on the active menu */}
        {activeMenu === 'updateProfile' && <UpdateProfile />}
        {activeMenu === 'deactivateAccount' && <DeactivateAccount />}
        {activeMenu === 'viewProfile' && <ViewProfile />}
        {/* Add more content components for other menus */}
      </div>
    </div>
  );
};

export default ManageAccount;
