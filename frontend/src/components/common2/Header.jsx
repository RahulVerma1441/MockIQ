import React from 'react';
import { User } from 'lucide-react'; // Assuming you have lucide-react installed for icons
import logo from "../../assets/logo.svg";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8 cursor-pointer"
        onClick={() => navigate('/')}
            
        >
          <div className="flex items-center space-x-2">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-12 h-12 rounded-full"
                />
            <span className="text-xl font-bold text-gray-900">OTA</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;