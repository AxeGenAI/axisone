import React from 'react';
import { 
  Home, 
  FolderOpen, 
  Plus, 
  MapPin, 
  Users, 
  User, 
  HelpCircle, 
  Settings, 
  LogOut,
  Microscope
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  // Get user type from localStorage or default to researcher
  const userType = localStorage.getItem('userType') || 'researcher';
  
  const researcherNavigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'My Projects', icon: FolderOpen },
    { id: 'new-request', label: 'New Request', icon: Plus },
    { id: 'nearby-labs', label: 'Nearby Labs', icon: MapPin },
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const collaboratorNavigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'My Projects', icon: FolderOpen },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const navigationItems = userType === 'collaborator' ? collaboratorNavigationItems : researcherNavigationItems;

  const bottomItems = [
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <div className="w-80 bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl border-r border-gray-100/80 dark:border-gray-800/80 flex flex-col h-screen shadow-[0_0_50px_0_rgba(0,0,0,0.03)] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.2)]">
      {/* Logo Section */}
      <div className="p-10 border-b border-gray-100/60 dark:border-gray-800/60">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
            <Microscope className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AxisOne</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">Research Platform</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-8 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50 dark:from-blue-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-100/50 dark:border-blue-800/50' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50/70 dark:hover:bg-gray-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${
                isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:scale-105'
              }`} />
              <span className={`font-semibold text-[15px] tracking-tight ${
                isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute right-4 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full shadow-lg"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-8 border-t border-gray-100/60 dark:border-gray-800/60">
        {/* User Type Toggle */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium tracking-wide">VIEW AS</p>
          <div className="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => onItemClick('switch-researcher')}
              className={`px-2 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                localStorage.getItem('userType') === 'researcher' || !localStorage.getItem('userType')
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Researcher
            </button>
            <button
              onClick={() => onItemClick('switch-collaborator')}
              className={`px-2 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                localStorage.getItem('userType') === 'collaborator'
                  ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Collaborator
            </button>
            <button
              onClick={() => onItemClick('switch-lab-owner')}
              className={`px-2 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                localStorage.getItem('userType') === 'lab-owner'
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Lab Owner
            </button>
          </div>
          
          {/* Back to Home */}
          <button
            onClick={() => window.location.reload()}
            className="w-full mt-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-300 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
          >
            ← Back to Home
          </button>
        </div>
        
        {bottomItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/70 dark:hover:bg-red-900/20 group"
            >
              <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-all duration-300 group-hover:scale-105" />
              <span className="font-semibold text-[15px] tracking-tight text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;