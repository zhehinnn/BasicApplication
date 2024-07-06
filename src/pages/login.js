import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true });
        alert('Login successful');
        setIsLoggedIn(true);
        window.location.href = '/profile';
      } catch (err) {
        alert('Error logging in: ' + (err.response ? err.response.data : err.message));
      }
    };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <Link to="/register">
        
      <button>
        Switch to Sign Up
      </button>
      </Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;