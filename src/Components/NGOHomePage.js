import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './HomePageNGO.css'; // Import your CSS file for styling

const NGOHome = () => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  useEffect(() => {
    const fetchAvailableDonations = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/food',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              q: searchQuery, // Pass searchQuery as a parameter to the backend
            },
          }
        );
        console.log('API Response:', response.data); // Log the entire response

        if (response.data && response.data.data) {
          setAvailableDonations(response.data.data.foods);
        } else {
          setAvailableDonations([]);
        }
      } catch (error) {
        console.error('Error fetching available donations:', error);
        setError(`Error fetching available donations: ${error.message}`);
      }
    };

    fetchAvailableDonations();
  }, [searchQuery]);

  const handleRequestDonation = async (donationId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/donate/food/request-donation/${donationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Request Response:', response.data); // Log the response

      if (response.data && response.data.data) {
        setAvailableDonations(response.data.data.availableDonations);
      }
    } catch (error) {
      setError(`Error requesting food: ${error.message}`);
      console.error('Error requesting food:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchMessage('');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="ngo-home-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or category..."
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

      <h2 className="available-donation">Available Donations</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="donation-cards">
        {availableDonations.length > 0 ? (
          availableDonations.map((donation) => (
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
              <p>
                Expiry Date:{' '}
                {new Date(donation.expiryDate).toLocaleDateString()}
              </p>
              <p className="status">Status: {donation.status}</p>
              {donation.status === 'Pending' && (
                <button onClick={() => handleRequestDonation(donation._id)}>
                  Request Food
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-result">No donations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default NGOHome;
