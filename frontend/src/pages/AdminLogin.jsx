import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
  event.preventDefault();

  const validAdmins = [
    {
      username: 'admin',
      password: 'admin123',
    },
    {
      username: 'py77750@gmail.com',
      password: '1234567890',
    },
  ];

  const isValidAdmin = validAdmins.some(
    (admin) =>
      admin.username === username &&
      admin.password === password
  );

  if (isValidAdmin) {
    setError('');
    navigate('/admin/dashboard');
  } else {
    setError('Invalid username or password');
  }
};

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <h1>Admin Login</h1>
        <p>Login to manage study materials</p>

        <form onSubmit={handleLogin}>

          <div className="login-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="login-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminLogin;