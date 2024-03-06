import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/SignUpForm.css'

function SignUpForm({ signUp }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mr-3">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
