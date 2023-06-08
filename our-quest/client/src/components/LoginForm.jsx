import React, { useState, useEffect } from 'react';
import useUserStore from '../hooks/UserStore';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen font-dm-sans pt-10 bg-darker-purp min-h-screen overflow-x-hidden">
      <div className="bg-gray-700 rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-5rem]">
        <div className="text-3xl text-center text-white mb-10 pt-2 rounded-t-lg font-bold">LOGIN</div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <p className="text-xl text-center text-white mb-3 pt-3 pb-10">Find your next quest</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Username"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none max-w-[18rem] translate-x-[4rem]"
          />
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            required
            className="input mb-10 rounded-sm p-3 bg-white focus:outline-none max-w-[18rem] translate-x-[4rem]"
          />
          <button
            type="submit"
            className="justify-center rounded-full text-white py-2 px-4 bg-blue-500 mb-4 max-w-[13rem] translate-x-[6.5rem]"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white pt-10">Don't have an account?</p>
        <Link to="/signup" className="text-center text-blue-500 hover:underline block">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
