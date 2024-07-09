import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from './AuthForm.module.css'; // Import CSS module for styling

const LoginForm = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login data to backend API
      const response = await axios.post(
        'http://127.0.0.1:5000/api/donate/user/login',
        loginData
      );

      // Store JWT token in local storage
      localStorage.setItem('token', response.data.token);

      setIsLoggedIn(true); // Update isLoggedIn state
      if (response.data.message) {
        setMessage(response.data.message); // Set success or error message from backend
      }
      setMessage('Logged in successfully!'); // Set success message
      const role = response.data.role; // Assuming the role is returned from the backend
      switch (role) {
        case 'donor':
          navigate('/donate-history');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'NGO':
          navigate('/ngo-home');
          break;
        case 'delivery':
          navigate('/create-ngo-delivery');
          break;
        default:
          navigate('/'); // Navigate to default page if role is not recognized
          break;
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.'); // Set error message
      console.error('Login error:', error);
    }
  };

  const loginWithGoogle = () => {
    window.open('http://localhost:5000/auth/google/callback', '_self');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>Login</h2>
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
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
        {/* Links for registration and forgot password */}
        <div className={styles.authSwitch}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </p>
          <p>
            <Link to="/forget-password" className={styles.link}>
              Forgot Password?
            </Link>
          </p>
          <button className={styles.googleButton} onClick={loginWithGoogle}>
            <img
              src="/google-icon.png"
              alt="Google Icon"
              className={styles.googleIcon}
            />
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
