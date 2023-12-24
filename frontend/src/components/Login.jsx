import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    // Basic form validation
    if (!loginData.email || !loginData.password) {
      console.error('Please enter both email and password.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Check if the login was successful using the 'user' property in the response
        if (responseData.user) {
          console.log('Login successful!');
  
          // Save token to local storage
          localStorage.setItem('token', responseData.token);
  
          // Set isAuthenticated state to true
          setIsAuthenticated(true);
  
          // Use navigate to redirect to the products page
          navigate('/');
        } else {
          console.error('Login failed:', responseData.error);
        }
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  

  return (
    <div class="form-container">
  <h2>Login</h2>
  <div class="form-group">
    <label class="label">Email:</label>
    <input
      type="email"
      name="email"
      value={loginData.email}
      onChange={handleInputChange}
      class="input-field"
      required
    />
  </div>
  <div class="form-group">
    <label class="label">Password:</label>
    <input
      type="password"
      name="password"
      value={loginData.password}
      onChange={handleInputChange}
      class="input-field"
      required
    />
  </div>
  <button onClick={handleLogin} class="button">Login</button>
  <Link to="/signup" class="signup-link">
    <button class="button signup-button">Signup</button>
  </Link>
</div>
  );
};

export default Login;
