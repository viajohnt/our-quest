import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('/signup/', { email, password });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
