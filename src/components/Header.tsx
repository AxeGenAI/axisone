import React from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
interface HeaderProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, onSettingsClick, onLogoutClick }) => {
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-gray-100/50 dark:border-gray-800/50 px-10 py-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search across your research ecosystem..."
              className="w-full pl-14 pr-6 py-4 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm shadow-inner text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 font-medium text-[15px] hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
          
          {/* Notifications */}
          <button className="relative p-3.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-200 group">
            <Bell className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg border-2 border-white dark:border-gray-900"></span>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50/60 dark:hover:bg-gray-800/50 px-5 py-3 rounded-2xl transition-all duration-200 group"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <span className="text-white text-sm font-semibold tracking-wide">DR</span>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-[15px] tracking-tight">Dr. Richardson</p>
                <p className="text-gray-500 dark:text-gray-400 text-[13px] font-medium">Principal Researcher</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                  <div className="p-2">
                    {/* Profile Section */}
                    <button
                      onClick={() => {
                        if (onProfileClick) {
                          onProfileClick();
                        }
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-sm">View Profile</span>
                    </button>

                    {/* Settings */}
                    <button
                      onClick={() => {
                        onSettingsClick?.();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <Settings className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-sm">Settings</span>
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        onLogoutClick?.();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;