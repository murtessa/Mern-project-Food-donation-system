// DonorPage.js

import React from 'react';
import './DonorPage.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const DonorPage = () => {
  return (
    <div className="donor-page-container">
      <h2>Welcome, Donor!</h2>
      <div className="donor-info">
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Phone: +1234567890</p>
        <p>Address: 123 Main Street, City</p>
      </div>
      <div className="donor-actions">
        <Link to="/donate-food" className="donate-button">
          Donate Now
        </Link>
        <Link to="/donate-history" className="view-history-button">
          View Donation History
        </Link>{' '}
        <Link className="donate-button" to="/user-list">
          View Your Detail
        </Link>
      </div>
    </div>
  );
};

export default DonorPage;
