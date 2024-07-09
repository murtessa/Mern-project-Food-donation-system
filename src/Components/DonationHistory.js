import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './DonationHistory.css';

const DonationHistory = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/food/donation/history',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data && response.data.data) {
          setDonationHistory(response.data.data.donationHistory);
        } else {
          setDonationHistory([]);
        }
      } catch (error) {
        console.error('Error fetching donation history:', error);
      }
    };

    fetchDonationHistory();
  }, []);

  const handleDelete = async (donationId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/donate/food/${donationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setDonationHistory(
        donationHistory.filter((donation) => donation._id !== donationId)
      );
      closeModal();
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  const openModal = (donationId) => {
    setSelectedDonationId(donationId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDonationId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchMessage('');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredDonations = donationHistory.filter(
    (donation) =>
      donation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (filteredDonations.length === 0 && searchQuery !== '') {
      setSearchMessage('Oops! No results found.');
    } else {
      setSearchMessage('');
    }
  }, [filteredDonations, searchQuery]);

  return (
    <div className="donation-history-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        {searchQuery && (
          <FontAwesomeIcon
            icon={faTimes}
            className="clear-icon"
            onClick={clearSearch}
          />
        )}
      </div>

      {searchMessage && <p className="search-message">{searchMessage}</p>}

      <div className="donation-cards">
        {filteredDonations.map((donation) => (
          <div key={donation._id} className="donation-card">
            {donation.foodImage && (
              <img
                src={`http://localhost:5000/Images/${donation.foodImage}`} // Adjust the image URL based on your backend setup
                alt={donation.name}
                className="food-image"
              />
            )}
            <h3>{donation.name}</h3>
            <p>Category: {donation.category}</p>
            <p>Quantity: {donation.quantity}</p>
            <p className="status">Status: {donation.status}</p>
            <div className="card-actions">
              <Link to={`/edit-donation/${donation._id}`}>
                <FontAwesomeIcon icon={faEdit} className="icon edit-icon" />
              </Link>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="icon delete-icon"
                onClick={() => openModal(donation._id)}
              />
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this donation?</p>
            <div className="modal-actions">
              <button
                className="modal-button cancel-button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="modal-button delete-button"
                onClick={() => handleDelete(selectedDonationId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
