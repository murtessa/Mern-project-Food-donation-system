import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faUsers,
  faChartBar,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import NGORegistration from './CreateNGOandDelivery';
import UserManagement from './Admins/UserManagement';
import DashboardStats from './Admins/DashboardStats';
import DonationManagement from './Admins/DonationManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedContent, setSelectedContent] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
        {isSidebarOpen && <h2 className="admin">Admin Dashboard</h2>}
        <ul className="icons">
          <li
            onClick={() => handleSidebarItemClick('dashboard')}
            className={selectedContent === 'dashboard' ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faChartBar} />
            {isSidebarOpen && (
              <span className="link-text">Dashboard Stats</span>
            )}
          </li>
          <li
            onClick={() => handleSidebarItemClick('users')}
            className={selectedContent === 'users' ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faUsers} />
            {isSidebarOpen && <span className="link-text">Manage Users</span>}
          </li>
          <li
            onClick={() => handleSidebarItemClick('donations')}
            className={selectedContent === 'donations' ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            {isSidebarOpen && (
              <span className="link-text">Manage Donations</span>
            )}
          </li>

          <li
            onClick={() => handleSidebarItemClick('ngoRegistration')}
            className={selectedContent === 'ngoRegistration' ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            {isSidebarOpen && (
              <span className="link-text">NGO Registration</span>
            )}
          </li>
        </ul>
      </div>
      <div
        className={`content ${isSidebarOpen ? 'with-sidebar' : 'full-width'}`}
      >
        {selectedContent === 'dashboard' && <DashboardStats />}
        {selectedContent === 'users' && <UserManagement />}
        {selectedContent === 'donations' && <DonationManagement />}
        {selectedContent === 'ngoRegistration' && <NGORegistration />}
      </div>
    </div>
  );
};

export default AdminDashboard;
