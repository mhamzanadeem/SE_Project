import React, { useState } from 'react';
import { registerUser, loginUser, getCurrentUserProfile } from './api/userApi';

function TestAuth() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Concatenate first name and last name to create the 'name' field
    //const name = `${formData.first_name} ${formData.last_name}`;
    //console.log(name)
    // Prepare the payload for registration
    const payload = {
    //  name,
      fname: formData.first_name,
      lname: formData.last_name,
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };

    try {
      const response = await registerUser(payload);
      setMessage(`Registration successful: ${JSON.stringify(response)}`);
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      setMessage(`Login successful: ${JSON.stringify(response)}`);
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  const handleGetProfile = async () => {
    try {
      const response = await getCurrentUserProfile();
      setProfile(response);
      setMessage(`Profile fetched successfully`);
    } catch (error) {
      setMessage(`Failed to fetch profile: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test Authentication</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
          <input
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            placeholder="Username"
          /><br/>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Password"
          /><br/>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Email"
          /><br/>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
            placeholder="First Name"
          /><br/>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
            placeholder="Last Name"
          /><br/>
          <button type="submit">Register</button>
        </form>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <input
            name="username"
            value={loginData.username}
            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            placeholder="Username"
          /><br/>
          <input
            name="password"
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            placeholder="Password"
          /><br/>
          <button type="submit">Login</button>
        </form>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Get Profile</h3>
        <button onClick={handleGetProfile}>Get My Profile</button>
        {profile && (
          <div>
            <h4>Profile Data:</h4>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        )}
      </div>

      {message && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <strong>Status:</strong> {message}
        </div>
      )}
    </div>
  );
}

export default TestAuth;
