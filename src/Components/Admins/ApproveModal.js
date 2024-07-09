import React from 'react';
import './ApproveModal.css';

const ApproveModal = ({ show, onApprove, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Approval</h3>
        <p>Are you sure you want to approve this donation?</p>
        <div className="buttons">
          <button className="confirm-button" onClick={onApprove}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
