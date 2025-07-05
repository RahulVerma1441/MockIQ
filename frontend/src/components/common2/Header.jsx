import React, { useState } from 'react';
import { User, LogOut, Bell, Settings, ChevronDown } from 'lucide-react';
import logo from "../../assets/logo2.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowLogoutModal(false);
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setShowDropdown(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Logo"
                className="w-auto h-12"
              />
              {/* <span className="text-xl font-bold text-gray-900">MockIQ</span> */}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 relative">
            <div 
              className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleProfileClick}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || 'Guest User'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'student' ? 'Student' : user?.role || 'User'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    // Add navigation to profile page here
                    // navigate('/profile');
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    // Add navigation to notifications page here
                    // navigate('/notifications');
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </>
  );
};

export default Header;