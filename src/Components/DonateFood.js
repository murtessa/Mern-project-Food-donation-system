import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DonateFood.css'; // Ensure your CSS file is imported correctly

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    expiryDate: '',
    status: 'Pending',
    foodImage: null,
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      foodImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('category', formData.category);
      formDataWithImage.append('quantity', formData.quantity);
      formDataWithImage.append('expiryDate', formData.expiryDate);
      formDataWithImage.append('status', formData.status);
      formDataWithImage.append('foodImage', formData.foodImage);

      const res = await axios.post(
        'http://localhost:5000/api/donate/food',
        formDataWithImage,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data);
      setMessage('Food Donated Successfully');
    } catch (error) {
      setMessage('Food Donation Failed. Please try again');
      console.error('Error donating food:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Redirect to login if not logged in
    }
  }, []);

  return (
    <div className="donation-container">
      <h2>Food Donation</h2>
      {message && (
        <p
          className={
            message.includes('failed') ? 'error-message' : 'success-message'
          }
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="donation-form">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Expiry Date:
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Food Image:
            <input
              type="file"
              name="foodImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="donate-button">
          Donate Food
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
