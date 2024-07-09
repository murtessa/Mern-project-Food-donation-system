import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faHandsHelping,
  faTruck,
  faBuilding,
  faUserShield,
  faClock,
  faClipboardList,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import './DashboardStats.css';

const DashboardStats = () => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/food/stats',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setStats(response.data.stats);
      } catch (error) {
        setError(`Error fetching stats: ${error.message}`);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-stats">
      <h2>Dashboard Stats</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="stats-container">
        <div className="stat-card">
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <p>Total Users</p>
          <h2 className="total-users">{stats.totalUsers}</h2>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faHandsHelping} className="icon" />
          <p>Total Donations</p>
          <h2 className="total-donations">{stats.totalDonations}</h2>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faUserShield} className="icon" />
          <p>Total Donors</p>
          <h2 className="total-donors">{stats.totalDonors}</h2>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faBuilding} className="icon" />
          <p>Total NGOs</p>
          <h2 className="total-ngos">{stats.totalNGOs}</h2>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faTruck} className="icon" />
          <p>Total Deliveries</p>
          <h2 className="total-deliveries">{stats.totalDeliveries}</h2>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faClock} className="icon" />
          <p>Pending Donations</p>
          <h2 className="pending-donations">{stats.pendingDonations}</h2>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <p>Requested Donations</p>
          <h2 className="requested-donations">{stats.requestedDonations}</h2>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faThumbsUp} className="icon" />
          <p>Approved Donations</p>
          <h2 className="approved-donations">{stats.approvedDonations}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
