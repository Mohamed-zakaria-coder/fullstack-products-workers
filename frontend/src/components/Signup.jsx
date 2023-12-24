import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    // Basic form validation
    if (!signupData.name || !signupData.email || !signupData.password) {
      console.error('Please enter all required fields.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Check if the signup was successful using a property (e.g., 'success') in the response
        if (responseData.success) {
          // Redirect or perform any other action upon successful signup
        } else {
          console.error('Signup failed:', responseData.error);
        }
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  

  return (
    <div class="form-container">
  <h2>Signup</h2>
  <div class="form-group">
    <label class="label">Name:</label>
    <input
      type="text"
      name="name"
      value={signupData.name}
      onChange={handleInputChange}
      class="input-field"
      required
    />
  </div>
  <div class="form-group">
    <label class="label">Email:</label>
    <input
      type="email"
      name="email"
      value={signupData.email}
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
      value={signupData.password}
      onChange={handleInputChange}
      class="input-field"
      required
    />
  </div>
  <button onClick={handleSignup} class="button">Signup</button>
  <Link to="/login" class="signup-link">
    <button class="button signup-button">Login</button>
  </Link>
</div>

  );
};

export default Signup;
