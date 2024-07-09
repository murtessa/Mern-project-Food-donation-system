import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditDonation.css';

const EditDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donation, setDonation] = useState({
    name: '',
    category: '',
    quantity: '',
    status: '',
    foodImage: '',
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/donate/food/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        const fetchedDonation = response.data.data.food;
        setDonation({
          name: fetchedDonation.name || '',
          category: fetchedDonation.category || '',
          quantity: fetchedDonation.quantity || '',
          status: fetchedDonation.status || '',
          foodImage: fetchedDonation.foodImage || '',
        });

        if (fetchedDonation.foodImage) {
          setImagePreview(
            `http://localhost:5000/Images/${fetchedDonation.foodImage}`
          );
        }
      } catch (error) {
        console.error('Error fetching donation details:', error);
      }
    };

    fetchDonation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation({
      ...donation,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDonation({
      ...donation,
      foodImage: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', donation.name);
    formData.append('category', donation.category);
    formData.append('quantity', donation.quantity);
    formData.append('status', donation.status);
    if (donation.foodImage instanceof File) {
      formData.append('foodImage', donation.foodImage);
    }

    try {
      await axios.patch(
        `http://localhost:5000/api/donate/food/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/donate-history');
    } catch (error) {
      console.error('Error updating donation:', error);
    }
  };

  return (
    <div className="edit-donation-container">
      <h2>Edit Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={donation.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={donation.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={donation.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                name="status"
                value={donation.status}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="foodImage">Food Image</label>
              <input
                type="file"
                id="foodImage"
                name="foodImage"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Update Donation
        </button>
      </form>
    </div>
  );
};

export default EditDonation;
