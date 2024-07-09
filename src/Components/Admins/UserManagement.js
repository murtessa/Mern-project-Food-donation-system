import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faSearch,
  faTimes,
  faUserSlash,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import './UserManagement.css';
import UserActionModal from './UserActionModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState(null);
  const [confirmActionUserId, setConfirmActionUserId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'disable' or 'enable'
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/user',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log('Fetched users:', response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        setError(`Error fetching users: ${error.message}`);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    setConfirmDeleteUserId(userId);
  };

  const confirmAndDeleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/donate/user/${confirmDeleteUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== confirmDeleteUserId));
      setConfirmDeleteUserId(null);
    } catch (error) {
      setError(`Error deleting user: ${error.message}`);
    }
  };

  const cancelDeleteUser = () => {
    setConfirmDeleteUserId(null);
  };

  const handleToggleUserStatus = (userId, currentStatus) => {
    const action = currentStatus ? 'disable' : 'enable';
    setConfirmActionUserId(userId);
    setActionType(action);
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = async () => {
    try {
      const endpoint = actionType === 'disable' ? 'disable' : 'enable';
      await axios.patch(
        `http://localhost:5000/api/donate/user/${endpoint}/${confirmActionUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const response = await axios.get(
        'http://localhost:5000/api/donate/user',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUsers(response.data.users);
      setShowConfirmationModal(false);
    } catch (error) {
      setError(`Error toggling user status: ${error.message}`);
    }
  };

  const handleCancelAction = () => {
    setShowConfirmationModal(false);
    setConfirmActionUserId(null);
    setActionType(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management">
      <h2>Manage Users</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users..."
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        {searchTerm && (
          <FontAwesomeIcon
            icon={faTimes}
            className="clear-icon"
            onClick={clearSearch}
          />
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${user.userPhoto}`}
                  alt={user.fullName}
                  className="user-photo"
                />
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                  className="togle-btn"
                  onClick={() => handleToggleUserStatus(user._id, user.active)}
                >
                  <FontAwesomeIcon
                    icon={user.active ? faUserSlash : faUserCheck}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserActionModal
        show={showConfirmationModal}
        handleClose={handleCancelAction}
        handleConfirm={handleConfirmAction}
        actionType={actionType}
      />

      {confirmDeleteUserId && (
        <div className="confirmation-modal">
          <div className="user-action-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="buttons">
              <button className="confirm-button" onClick={confirmAndDeleteUser}>
                Confirm
              </button>
              <button className="cancel-button" onClick={cancelDeleteUser}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
