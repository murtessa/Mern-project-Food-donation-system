import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        'http://localhost:5000/api/donate/user/updateMyPassword',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
      setMessage('Password updated successfully!');
    } catch (error) {
      console.error('Password update error:', error.response.data.message);
      setMessage('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="change-password-container">
      <h2>Update Password</h2>
      {message && (
        <p className={message.includes('failed') ? 'error' : 'success'}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="passwordCurrent">Current Password:</label>
          <input
            type="password"
            id="passwordCurrent"
            name="passwordCurrent"
            value={formData.passwordCurrent}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm New Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
