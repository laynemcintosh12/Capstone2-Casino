import React, { useState, useEffect } from 'react';
import CasinoAPI from '../../api';

function Profile({ user }) {
  const [userData, setUserData] = useState({
    password: '',
    balance: 0,
  });

  useEffect(() => {
    getUserData(user);
  }, [user]);

  async function getUserData(username) {
    try {
      const userData = await CasinoAPI.getUser(username);
      setUserData(userData.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '50vw' }}>
      <div className="card p-4 bg-dark text-white text-center">
        <h2 className="mb-4">Profile</h2>
        {user && (
          <div>
            <p><strong>Username:</strong> {user}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Balance:</strong> {userData.balance}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
