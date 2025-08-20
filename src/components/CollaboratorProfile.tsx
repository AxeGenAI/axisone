import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  MapPin, 
  Calendar, 
  Award, 
  Star, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  MessageSquare,
  Settings,
  Bell,
  Shield,
  Eye,
  Lock
} from 'lucide-react';

const CollaboratorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'activity' | 'settings'>('profile');
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Chen',
    title: 'Senior Research Scientist',
    department: 'Molecular Biology',
    organization: 'Stanford Research Institute',
    email: 'sarah.chen@stanford.edu',
    phone: '+1 (650) 555-0123',
    location: 'Stanford, CA',
    website: 'https://profiles.stanford.edu/sarah-chen',
    bio: 'Specialized in molecular biology and protein structure analysis with over 8 years of research experience. Passionate about collaborative research and advancing scientific discovery through interdisciplinary approaches.',
    expertise: ['Molecular Biology', 'Protein Analysis', 'Bioinformatics', 'Data Science'],
    joinedDate: 'March 2023'
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Projects', value: '6', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Collaborations', value: '24', icon: Users, color: 'text-green-600' },
    { label: 'Completed Tasks', value: '89', icon: CheckCircle2, color: 'text-purple-600' },
    { label: 'Team Rating', value: '4.9', icon: Star, color: 'text-yellow-600' }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'task',
      description: 'Completed protein binding analysis for Neural Network project',
      timestamp: '2 hours ago',
      project: 'Neural Network Analysis'
    },
    {
      id: '2',
      type: 'comment',
      description: 'Added feedback on methodology section',
      timestamp: '1 day ago',
      project: 'AI-Driven Drug Discovery'
    },
    {
      id: '3',
      type: 'file',
      description: 'Uploaded analysis results dataset',
      timestamp: '3 days ago',
      project: 'Microbiome Research'
    },
    {
      id: '4',
      type: 'collaboration',
      description: 'Joined Quantum Computing project team',
      timestamp: '1 week ago',
      project: 'Quantum Computing Simulation'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'file': return <Award className="w-4 h-4 text-purple-600" />;
      case 'collaboration': return <Users className="w-4 h-4 text-orange-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'activity', label: 'Activity', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderProfile = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                SC
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => setTempData({...tempData, name: e.target.value})}
                    className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={tempData.title}
                    onChange={(e) => setTempData({...tempData, title: e.target.value})}
                    className="text-lg bg-transparent border-b border-gray-300 focus:outline-none text-gray-600 dark:text-gray-400"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{profileData.name}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">{profileData.title}</p>
                  <p className="text-gray-500 dark:text-gray-500">{profileData.department}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${stat.color} bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
          {isEditing ? (
            <textarea
              value={tempData.bio}
              onChange={(e) => setTempData({...tempData, bio: e.target.value})}
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{profileData.bio}</p>
          )}
        </div>

        {/* Expertise */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.expertise.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => setTempData({...tempData, email: e.target.value})}
                    className="font-medium bg-transparent border-b border-gray-300 focus:outline-none text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{profileData.email}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempData.phone}
                    onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                    className="font-medium bg-transparent border-b border-gray-300 focus:outline-none text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{profileData.phone}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                {isEditing ? (
                  <input
                    type="url"
                    value={tempData.website}
                    onChange={(e) => setTempData({...tempData, website: e.target.value})}
                    className="font-medium bg-transparent border-b border-gray-300 focus:outline-none text-gray-900 dark:text-white"
                  />
                ) : (
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Organization</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.organization}
                    onChange={(e) => setTempData({...tempData, organization: e.target.value})}
                    className="font-medium bg-transparent border-b border-gray-300 focus:outline-none text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{profileData.organization}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.location}
                    onChange={(e) => setTempData({...tempData, location: e.target.value})}
                    className="font-medium bg-transparent border-b border-gray-300 focus:outline-none text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{profileData.location}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{activity.project}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Project Updates</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about project changes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Profile Visibility</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Who can see your profile</p>
              </div>
            </div>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>Team Members</option>
              <option>Organization</option>
              <option>Public</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add extra security to your account</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Profile
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Manage your profile information and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'profile' && renderProfile()}
      {activeTab === 'activity' && renderActivity()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  );
};

export default CollaboratorProfile;