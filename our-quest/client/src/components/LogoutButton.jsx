import React from 'react';
import axios from 'axios';
import useUserStore from '../hooks/UserStore';

const LogoutButton = () => {
  const { user, logout } = useUserStore();

  const handleLogout = async () => {
    const csrftoken = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('csrftoken='))
      .split('=')[1];
    try {
      await axios.post('/logout/', {}, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      });
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    user ? <button onClick={handleLogout} className='font-bold font-dm-sans text-white'>Logout</button> : null
  );
};

export default LogoutButton;

