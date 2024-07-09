import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResetPassword.css'; // Import the CSS file

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [message, setMessage] = useState('');
  const { token } = useParams(); // Extract the token from the URL

  useEffect(() => {
    console.log('Token:', token);
    if (!token) {
      console.log('Token not found in URL');
      // Token not found in URL, handle accordingly (e.g., redirect to error page)
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/donate/user/resetPassword/${token}`, // Use the extracted token in the URL
        {
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        }
      );

      if (response.status === 200) {
        setMessage('Password reset successful');
      } else {
        setMessage('Password reset failed');
      }
    } catch (error) {
      setMessage('Server error: Password reset failed'); // Handle error message from backend
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      {message && (
        <p className={message.includes('failed') ? 'error' : 'success'}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="reset-password-form">
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="passwordConfirm">Confirm New Password:</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        <button type="submit" className="reset-password-button">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
