import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import './DonationManagement.css';
import ApproveModal from './ApproveModal'; // Import the new component

const DonationManagement = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteFoodId, setConfirmDeleteFoodId] = useState(null);
  const [approveFoodId, setApproveFoodId] = useState(null); // New state for approving donations
  const [showApproveModal, setShowApproveModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/food/admin-donate',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setFoods(response.data.data.foods || []);
      } catch (error) {
        setError(`Error fetching foods: ${error.message}`);
      }
    };

    fetchFoods();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleDeleteFood = (foodId) => {
    setConfirmDeleteFoodId(foodId);
  };

  const confirmAndDeleteFood = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/donate/food/${confirmDeleteFoodId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFoods(foods.filter((food) => food._id !== confirmDeleteFoodId));
      setConfirmDeleteFoodId(null);
    } catch (error) {
      setError(`Error deleting food: ${error.message}`);
    }
  };

  const cancelDeleteFood = () => {
    setConfirmDeleteFoodId(null);
  };

  const handleApproveFood = (foodId) => {
    setApproveFoodId(foodId);
    setShowApproveModal(true);
  };

  const confirmAndApproveFood = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/donate/food/${approveFoodId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Update the status of the approved food in the state
      setFoods(
        foods.map((food) =>
          food._id === approveFoodId ? { ...food, status: 'Approved' } : food
        )
      );
      setApproveFoodId(null);
      setShowApproveModal(false);
    } catch (error) {
      setError(`Error approving food: ${error.message}`);
    }
  };

  const cancelApproveFood = () => {
    setApproveFoodId(null);
    setShowApproveModal(false);
  };

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="donation-management">
      <h2>Manage Donations</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
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
      {error && <p className="error-message">{error}</p>}
      <table className="donations-table">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Category</th>
            <th>Donors</th>
            <th>Requested NGO</th>
            <th>Status</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category}</td>
                <td>{`${food.donor.fullName} (${food.donor.email})`}</td>
                <td>
                  {typeof food.recipient === 'object'
                    ? `${food.recipient.fullName} (${food.recipient.email})`
                    : food.recipient}
                </td>
                <td className={`status ${food.status.toLowerCase()}`}>
                  {food.status}
                </td>
                <td className="image">
                  <img
                    src={`http://localhost:5000/Images/${food.foodImage}`} // Adjust the image URL based on your backend setup
                    alt={food.name}
                    className="food-image"
                  />
                </td>
                <td>
                  {food.status === 'Requested' && (
                    <button
                      className="approve-button"
                      onClick={() => handleApproveFood(food._id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteFood(food._id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No donations found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {confirmDeleteFoodId && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this donation?</p>
            <div className="buttons">
              <button className="confirm-button" onClick={confirmAndDeleteFood}>
                Confirm
              </button>
              <button className="cancel-button" onClick={cancelDeleteFood}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ApproveModal
        show={showApproveModal}
        onApprove={confirmAndApproveFood}
        onCancel={cancelApproveFood}
      />
    </div>
  );
};

export default DonationManagement;
