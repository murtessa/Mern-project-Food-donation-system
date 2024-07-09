// ForgetPassword.js

import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import './ForgetPassword.css'; // Import your CSS file for styling

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // const navigate = useNavigate(); // Initialize useHistory

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to backend API for password reset
      const response = await axios.post(
        'http://127.0.0.1:5000/api/donate/user/forgetPassword',
        { email }
      );
      setMessage('Password reset link sent to your email.');
      setMessage(response.data.message); // Assuming backend sends a success message
      // Redirect to ResetPassword page after sending the reset link
      // navigate('/resetPassword/:token');
    } catch (error) {
      setMessage('Password reset failed. Please try again.');
      console.error('Password reset error:', error);
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-form">
        <h2>Forget Password</h2>
        {message && (
          <p className={message.includes('failed') ? 'error' : 'success'}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
          <button type="submit">Send Reset Token</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
