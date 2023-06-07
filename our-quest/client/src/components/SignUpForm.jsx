import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('/signup/', { 
        first_name: firstName, 
        last_name: lastName, 
        username, 
        email, 
        password 
      });
      if (response.data) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500 font-dm-sans pt-[8rem]">
      <div className="bg-gray-700 rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
        <div className="text-3xl text-center text-white rounded-t-lg">SIGN UP</div> 
        <p className="text-xl text-center text-white pt-3 pb-10">Looking for a quest?</p> 
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              placeholder="First Name"
              required
              className="input w-1/2 rounded-sm p-3 bg-white"
            />
            <input
              type="text"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              placeholder="Last Name"
              required
              className="input w-1/2 rounded-sm p-3 bg-white"
            />
          </div>
          <input
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Username"
            required
            className="input mb-4 rounded-sm p-3 bg-white"
          />
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
            required
            className="input mb-4 rounded-sm p-3 bg-white"
          />
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            required
            className="input mb-4 rounded-sm p-3 bg-white"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder="Confirm Password"
            required
            className="input mb-4 rounded-sm p-3 bg-white"
          />
          {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
          <button type="submit" className="btn btn-primary rounded-full text-white py-2 px-4 bg-blue-500 mb-10">Sign Up</button> 
        </form>
        <p className="text-center text-white">Already have an account?</p>
        <Link to="/login" className="text-center text-blue-500 underline block">Sign In</Link>
      </div>
    </div>
  );
};

export default SignupForm;
