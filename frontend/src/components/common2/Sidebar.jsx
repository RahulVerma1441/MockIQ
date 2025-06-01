import { BarChart3, FileText, MessageSquare, Settings, Trophy, Home } from 'lucide-react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Sidebar Component
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'engineering', label: 'Engineering', icon: FileText, path: '/dashboard/engineering' },
    { id: 'medical', label: 'Medical', icon: FileText, path: '/dashboard/medical' },
    { id: 'analysis', label: 'Analysis', icon: BarChart3, path: '/dashboard/analysis' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/dashboard/leaderboard' },
    { id: 'contactus', label: 'Contact Us', icon: MessageSquare, path: '/dashboard/contactus' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;