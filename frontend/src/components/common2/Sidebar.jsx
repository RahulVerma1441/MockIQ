import { BarChart3, FileText, MessageSquare, Settings, Trophy, Home, User, Bell, Shield, Palette, ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Sidebar Component
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'engineering', label: 'Engineering', icon: FileText, path: '/dashboard/engineering' },
    { id: 'medical', label: 'Medical', icon: FileText, path: '/dashboard/medical' },
    { id: 'analysis', label: 'Analysis', icon: BarChart3, path: '/dashboard/analysis' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/dashboard/leaderboard' },
    { id: 'contactus', label: 'Contact Us', icon: MessageSquare, path: '/dashboard/contactus' },
  ];

  const settingsSubmenu = [
    { id: 'profile', label: 'Profile', icon: User, tab: 'profile' },
    { id: 'notifications', label: 'Notifications', icon: Bell, tab: 'notifications' },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield, tab: 'privacy' },
    { id: 'appearance', label: 'Appearance', icon: Palette, tab: 'appearance' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSettingsNavigation = (tab) => {
    navigate(`/dashboard/settings?tab=${tab}`);
  };

  const handleSettingsClick = () => {
    setSettingsExpanded(!settingsExpanded);
    // If settings is not expanded, navigate to default settings page (profile)
    if (!settingsExpanded) {
      navigate('/dashboard/settings?tab=profile');
    }
  };

  const isSettingsActive = location.pathname.startsWith('/dashboard/settings');

  // Check if a specific settings tab is active
  const isSettingsTabActive = (tab) => {
    return location.pathname === '/dashboard/settings' && location.search.includes(`tab=${tab}`);
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
          
          {/* Settings with submenu */}
          <li>
            <button
              onClick={handleSettingsClick}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                isSettingsActive
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </div>
              <div className={`transform transition-transform duration-300 ${
                settingsExpanded ? 'rotate-180' : 'rotate-0'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            
            {/* Settings Submenu */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              settingsExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <ul className="mt-2 ml-4 space-y-1">
                {settingsSubmenu.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isSubActive = isSettingsTabActive(subItem.tab);
                  
                  return (
                    <li key={subItem.id} className="transform transition-all duration-200">
                      <button
                        onClick={() => handleSettingsNavigation(subItem.tab)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm transform hover:translate-x-1 ${
                          isSubActive
                            ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                      >
                        <SubIcon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;