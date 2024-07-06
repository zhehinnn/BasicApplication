import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('User registered successfully');
    } catch (err) {
      alert('Error registering user: ' + (err.response ? err.response.data : err.message));
    }
  };

  return (
    <div className="register-container">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <Link to="/login">
    <button>
      Switch to Login
    </button>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </Link>
  </div>
  );
};

export default Register;