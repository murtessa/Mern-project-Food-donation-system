import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    userPhoto: null,
  });
  const [message, setMessage] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState('');

  useEffect(() => {
    // Fetch existing user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/user/me',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const user = response.data.data.user;
        setFormData({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          userPhoto: null, // Initialize to null, we'll use a separate state for the existing photo
        });
        if (user.userPhoto) {
          setExistingPhoto(`http://localhost:5000/uploads/${user.userPhoto}`);
          console.log('Exsting photo', user.userPhoto);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, userPhoto: e.target.files[0] });
    setExistingPhoto(URL.createObjectURL(e.target.files[0])); // Update existing photo preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = new FormData();
      updateData.append('fullName', formData.fullName);
      updateData.append('email', formData.email);
      updateData.append('phone', formData.phone);
      updateData.append('address', formData.address);
      if (formData.userPhoto) {
        updateData.append('userPhoto', formData.userPhoto);
      }

      const response = await axios.patch(
        'http://localhost:5000/api/donate/user/updateMe',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // setMessage('Profile updated successfully!');
      setExistingPhoto(response.data.data.user.userPhoto); // Update the existing photo state
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="update-profile-container">
      {message && (
        <p
          className={
            message.includes('Error') ? 'error-message' : 'success-message'
          }
        >
          {message}
        </p>
      )}
      <form className="update-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPhoto">User Photo:</label>
          <input
            type="file"
            id="userPhoto"
            name="userPhoto"
            onChange={handleImageChange}
          />
          {existingPhoto && (
            <div className="existing-photo">
              <img src={existingPhoto} alt="User" className="user-photo" />
            </div>
          )}
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
