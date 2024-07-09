import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog, faLock } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import MessageModal from './MessageModal';

const Header = ({
  isLoggedIn,
  handleLogout,
  userPhoto,
  userRole,
  unreadMessages,
}) => {
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);

  const toggleMessageModal = () => {
    setMessageModalOpen(!isMessageModalOpen);
  };

  return (
    <div className="header-container">
      <Link className="header-title" to="/">
        Waste Food Management
      </Link>
      <div className="header-buttons">
        {isLoggedIn ? (
          <>
            {userRole === 'donor' && (
              <Link className="header-button-btn" to="/donate-food">
                Donate Now
              </Link>
            )}
            {userRole === 'NGO' && (
              <>
                <button
                  className="header-button-btn"
                  onClick={toggleMessageModal}
                  style={{ position: 'relative' }}
                >
                  Messages
                  {unreadMessages > 0 && (
                    <span
                      className="new-message-indicator"
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '0.2em 0.5em',
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                      }}
                    >
                      {unreadMessages}
                    </span>
                  )}
                </button>
                <MessageModal
                  isOpen={isMessageModalOpen}
                  toggleModal={toggleMessageModal}
                />
              </>
            )}
            <div className="user-dropdown">
              {userPhoto ? (
                <img
                  className="profile-photo"
                  src={`http://localhost:5000/uploads/${encodeURIComponent(
                    userPhoto
                  )}`}
                  alt="User"
                />
              ) : (
                <div className="profile-photo placeholder">No Photo</div>
              )}
              <div className="dropdown-content">
                <Link to="/manage-account">
                  <FontAwesomeIcon icon={faCog} className="icon" />
                  Manage Account
                </Link>
                <Link to="/change-password">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  Change Password
                </Link>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link className="header-button register-button" to="/register">
              Register
            </Link>
            <Link className="header-button login-button" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
