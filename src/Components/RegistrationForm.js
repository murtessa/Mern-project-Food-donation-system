import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './AuthForm_2.module.css'; // Updated import for CSS module

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    address: '',
    userPhoto: null, // New state for image file
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, userPhoto: imageFile }); // Update userPhoto state

    // Log the image URL for debugging
    console.log(`Image URL: http://localhost:5000/uploads/${imageFile.name}`);
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

      // Send registration data with image to backend API
      const response = await axios.post(
        'http://localhost:5000/api/donate/user/signup',
        formDataWithImage,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type for FormData
          },
        }
      );
      setMessage('Registered successfully!'); // Set success message
      console.log(response.data); // Handle response from server as needed
    } catch (error) {
      setMessage('Registration failed. Please try again.'); // Set error message
      console.error('Registration error:', error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>Register</h2>
        {message && (
          <p
            className={
              message.includes('failed') ? styles.error : styles.success
            }
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
            <div className={styles.formGroup}>
              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
            <div className={styles.formGroup}>
              <label>
                Address
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
            <div className={styles.formGroup}>
              <label>
                User Image
                <input
                  type="file"
                  name="userPhoto"
                  onChange={handleImageChange}
                  className={styles.input}
                />
              </label>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>
                Confirm Password
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
        <p className={styles.authSwitch}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
