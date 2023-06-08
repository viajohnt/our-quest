import React, { useState, useEffect } from 'react';
import useUserStore from '../hooks/UserStore';
import { useNavigate, Link } from 'react-router-dom'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        console.log('Login failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-600 font-dm-sans pt-10 ">
      <div className="bg-gray-700 rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
        <div className="text-3xl text-center text-white mb-10 pt-2 rounded-t-lg font-bold">LOGIN</div> 
        <p className="text-xl text-center text-white mb-3 pt-3 pb-10">Find your next quest</p> 
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Username"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none" 
          />
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <button type="submit" className="rounded-full text-white py-2 px-4 bg-blue-500 max-w-[14rem] translate-x-[6rem] mb-4">Login</button> 
        </form>
        <p className="text-center text-white pt-10">Don't have an account?</p>
        <Link to="/signup" className="text-center text-blue-500 hover:underline block">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;

