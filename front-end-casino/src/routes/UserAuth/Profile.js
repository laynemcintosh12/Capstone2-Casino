import React, { useState, useEffect } from 'react';
import CasinoAPI from '../../api';


function Profile({ user, editUser }) {
  const [userData, setUserData] = useState({
    password: '',
    email: '',
    applications: []
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUserData(user);
  }, [user]);

  async function getUserData(username) {
    try {
      const userData = await CasinoAPI.getUser(username);
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(userData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      {user && (
        <div>
          <p>Username: {user}</p>
          <p>Email: {userData.email}</p>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          ) : (
            <button onClick={handleEdit} className="btn btn-primary">Edit</button>
          )}

          
        
        </div>
      )}
    </div>
  );
}

export default Profile;
