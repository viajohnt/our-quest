import React, { useState } from 'react';
import logo from "../assets/images/logo.png";
import userImg from "../assets/images/default-user-img.png";
import dropdown from "../assets/images/dropdown.png";
import door from "../assets/images/door.png";
import gear from "../assets/images/gear.png";
import { Link } from "react-router-dom";
import useUserStore from "../hooks/UserStore";
import axios from 'axios';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
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
    <header className="main-header bg-dark-purp flex justify-between items-center font-dm-sans shadow-2xl">
      <div>
        <Link to="/"> 
          <img className="main-logo max-h-[6rem] pl-[3rem] pt-5 pb-5" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="relative flex items-center mr-10">
        {user ? (
          <>
            <img className="user-image max-h-[3rem] rounded-full mr-3" src={user?.profile?.avatar === "/avatar.svg" ? userImg : user?.profile?.avatar} alt="User" />
            <p className="font-bold font-dm-sans text-blue-200">@{user.username}</p>
            <button onClick={() => setShowDropdown(!showDropdown)} className="font-bold ml-3">
              <img src={dropdown} alt="dropdown" className="h-5 w-5"/>
            </button>
            {showDropdown && (
              <div className="absolute mt-[9rem] translate-x-[-1rem] w-48 bg-light-purp rounded-md overflow-hidden shadow-2xl z-10">
                <Link to="/settings" className="flex items-center px-[3.5rem] py-2 text-sm text-white hover:bg-dark-purp hover:text-white">
                  <img src={gear} alt="settings" className="h-5 w-5 mr-2"/>
                  Settings
                </Link>
                <button onClick={handleLogout} className="flex items-center w-full text-left px-[4rem] py-2 text-sm text-white hover:bg-dark-purp">
                  <img src={door} alt="logout" className="h-4 w-4 mr-2"/>
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" className="login-link text-white font-bold text-lg">LOGIN</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
