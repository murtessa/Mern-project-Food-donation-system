import React, { useState } from 'react';
import axios from 'axios';
import styles from './NGORegistration.module.css'; // Import CSS module
import { Link } from 'react-router-dom';

const NGORegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    address: '',
    userPhoto: null, // New state for image file
    role: 'NGO', // Default role set to NGO
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, userPhoto: imageFile }); // Update userPhoto state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('fullName', formData.fullName);
      formDataWithImage.append('email', formData.email);
      formDataWithImage.append('password', formData.password);
      formDataWithImage.append('passwordConfirm', formData.passwordConfirm);
      formDataWithImage.append('phone', formData.phone);
      formDataWithImage.append('address', formData.address);
      formDataWithImage.append('userPhoto', formData.userPhoto); // Append image file to FormData
      formDataWithImage.append('role', formData.role); // Append role to FormData

      // Send NGO registration data with image to backend API
      const response = await axios.post(
        'http://localhost:5000/api/donate/user/signup',
        formDataWithImage,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type for FormData
          },
        }
      );

      if (response.data.message) {
        setMessage(response.data.message); // Set success or error message from backend
      } else {
        setMessage('Registration failed. Please try again.'); // Set default error message
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.'); // Set error message
      console.error('Registration error:', error);
    }
  };

  return (
    <div className={styles.ngoRegistrationContainer}>
      <h2>NGO Registration</h2>
      {message && (
        <p
          className={message.includes('failed') ? styles.error : styles.success}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className={styles.inputField}
        />
        <div className={styles.roleField}>
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.selectField}
          >
            <option value="NGO">NGO</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
        <div className={styles.fileInputContainer}>
          <label htmlFor="userPhoto" className={styles.fileInputLabel}>
            Upload Photo
          </label>
          <input
            type="file"
            name="userPhoto"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      <p className={styles.authSwitch}>
        Already have an account?{' '}
        <Link to="/login" className={styles.loginLink}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default NGORegistration;
