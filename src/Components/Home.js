import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import OurWorks from './OurWorks';
import './Home.css';

const Home = () => {
  return (
    <div
      className="home-container"
      style={{ backgroundImage: "url('/Image_2.jpg')" }}
    >
      <div className="home-container">
        <div className="banner">
          <h1>Welcome to Waste Food Management and Donation</h1>
          <p>
            A platform to connect donors, NGOs, and recipients to reduce food
            waste and help those in need.
          </p>
        </div>
        <div className="features">
          {/* <h2>Key Features</h2>
          <ul>
            <li>Register as a Donor, NGO, or Recipient</li>
            <li>Donate excess or leftover food</li>
            <li>NGOs can manage food collection and distribution</li>
            <li>Recipients can request food assistance</li>
            <li>Track donations and food distribution</li>
          </ul> */}
        </div>
        <div className="actions">
          <Link to="/admin-dashboard" className="btn">
            Admin
          </Link>
          <Link to="/register" className="btn">
            Get Started
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </div>
      <OurWorks />
      <Footer />
    </div>
  );
};

export default Home;
