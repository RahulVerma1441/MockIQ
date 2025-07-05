import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Trash2, 
  Eye, 
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Book,
  Target,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Smartphone,
  Lock,
  Key,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  Save,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  // const location = useLocation();
  // const { section } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    exam: true,
    results: true,
    updates: false
  });
  const [profile, setProfile] = useState({
    name: 'Rahul Verma',
    email: 'verma.rahul1441v@gmail.com',
    phone: '+91 7501999004',
    location: 'Durgapur, West Bengal',
    birthDate: '2003-06-16',
    bio: 'Preparing for competitive exams'
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'friends',
    showEmail: false,
    showPhone: false,
    dataCollection: true
  });

  // Update active tab when URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'notifications', 'privacy', 'appearance'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-indigo-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            RS
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50">
            <Camera className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
          <p className="text-gray-600">Click the camera icon to update your photo</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={profile.birthDate}
            onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-800">
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notification Preferences</span>
        </div>
        <p className="text-blue-700 text-sm mt-1">Choose how you want to be notified about important updates</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Communication</h3>
        <div className="space-y-4 bg-gray-50 rounded-lg p-4">
          <ToggleSwitch
            enabled={notifications.email}
            onChange={() => handleNotificationChange('email')}
            label="Email Notifications"
          />
          <ToggleSwitch
            enabled={notifications.push}
            onChange={() => handleNotificationChange('push')}
            label="Push Notifications"
          />
          <ToggleSwitch
            enabled={notifications.sms}
            onChange={() => handleNotificationChange('sms')}
            label="SMS Notifications"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Exam & Results</h3>
        <div className="space-y-4 bg-gray-50 rounded-lg p-4">
          <ToggleSwitch
            enabled={notifications.exam}
            onChange={() => handleNotificationChange('exam')}
            label="Exam Reminders"
          />
          <ToggleSwitch
            enabled={notifications.results}
            onChange={() => handleNotificationChange('results')}
            label="Result Notifications"
          />
          <ToggleSwitch
            enabled={notifications.updates}
            onChange={() => handleNotificationChange('updates')}
            label="Feature Updates"
          />
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-800">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Privacy & Security</span>
        </div>
        <p className="text-yellow-700 text-sm mt-1">Control your privacy settings and account security</p>
      </div>

      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Password & Security</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Key className="w-4 h-4" />
            Change Password
          </button>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Privacy Controls</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select 
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <ToggleSwitch
            enabled={privacy.showEmail}
            onChange={() => handlePrivacyChange('showEmail')}
            label="Show Email to Others"
          />
          <ToggleSwitch
            enabled={privacy.showPhone}
            onChange={() => handlePrivacyChange('showPhone')}
            label="Show Phone Number"
          />
          <ToggleSwitch
            enabled={privacy.dataCollection}
            onChange={() => handlePrivacyChange('dataCollection')}
            label="Allow Data Collection for Improvement"
          />
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-purple-800">
          <Palette className="w-5 h-5" />
          <span className="font-medium">Appearance Settings</span>
        </div>
        <p className="text-purple-700 text-sm mt-1">Customize how the app looks and feels</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50 cursor-pointer hover:border-indigo-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Light Mode</h4>
                <p className="text-sm text-gray-600">Default theme</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <Moon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-600">Easy on eyes</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Auto</h4>
                <p className="text-sm text-gray-600">System default</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Display</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option>English</option>
              <option>Hindi</option>
              <option>Bengali</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return renderProfileSettings();
    }
  };

  // Get the current section title
  const getSectionTitle = () => {
    switch (activeTab) {
      case 'profile':
        return 'Profile Settings';
      case 'notifications':
        return 'Notification Settings';
      case 'privacy':
        return 'Privacy & Security';
      case 'appearance':
        return 'Appearance Settings';
      default:
        return 'Profile Settings';
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{getSectionTitle()}</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
        {renderTabContent()}
        
        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Changes are saved automatically</p>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;