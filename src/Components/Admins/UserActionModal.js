import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import './UserActionModal.css';

const UserActionModal = ({ show, handleClose, handleConfirm, actionType }) => {
  const actionIcon = actionType === 'disable' ? faUserSlash : faUserCheck;
  const actionText = actionType === 'disable' ? 'Disable' : 'Enable';

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="user-action-modal">
        <h3>{actionText} User</h3>
        <p>Are you sure you want to {actionText.toLowerCase()} this user?</p>
        <div className="buttons">
          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={handleClose}>
            Cancel
          </button>
        </div>
        <FontAwesomeIcon icon={actionIcon} className="action-icon" />
      </div>
    </div>
  );
};

export default UserActionModal;
