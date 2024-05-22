import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Navbar = ({ showSearch, onSearch }) => {
  const navigate = useNavigate();
  const { isLoggedIn, userData, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };


  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFillFormClick = () => {
    navigate('/Form');
  };

  const handleLogoutClick = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            logout();
            // Additional actions after logout (e.g., redirect to home)
            navigate('/');
          },
        },
        {
          label: 'No',
          onClick: () => { },
        },
      ],
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile')
  };

  return (
    <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="flex max-w-[1240px] mx-auto items-center p-4 justify-between">
        <div className="cursor-pointer" onClick={handleLogoClick}>
          <h1 className='font-bold text-3xl sm:text-4xl lg:text-4xl '>DishDiscovery</h1>
        </div>
        <div className='flex'>
          {showSearch && (
            <div className="flex justify-center bg-gray-200 h-10 rounded-md sm:pl-2 sm:w-[400px] lg:w-[400px] items-center">
              <input
                type="search"
                className='hidden sm:flex bg-transparent p-2 sm:w-full focus:outline-none text-black'
                placeholder='Search..'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch
                size={5}
                className="bg-black text-white p-[10px] h-10 rounded-md w-10 font-bold"
                onClick={handleSearch}
              />
            </div>
          )}
          <div className="login">
            {isLoggedIn ? (
              <>
                <button onClick={handleFillFormClick} className='bg-black text-white px-5 py-1 ml-2 h-10 w-[150px] rounded-md'>Add Recipe</button>
                <div className="relative inline-block text-left ml-2">
                  <button onClick={toggleDropdown} className="bg-black text-white p-2 h-10 w-10 rounded-full">
                    P
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={handleProfileClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</button>
                        <button onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button onClick={handleLoginClick} className='bg-black text-white px-5 py-1 ml-2 h-10 w-[100px] rounded-md'>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
