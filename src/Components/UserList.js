// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Import your CSS file for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/donate/user'
        );
        setUsers(response.data.data.users);
        console.log(response.data.data.users);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-list-container">
      <h2>All Users</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-photo">
              {user.userPhoto && (
                <img
                  src={`http://localhost:5000/uploads/${user.userPhoto}`}
                  alt="User"
                />
              )}
            </div>

            <div className="user-info">
              <p>Name: {user.fullName}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Address: {user.address}</p>
              <p>Role: {user.role} </p>
              {/* console.log(`Image URL: http://localhost:5000/uploads/$
              {user.userPhoto}`); */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
