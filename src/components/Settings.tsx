import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Eye,
  Globe,
  Moon,
  Sun,
  Monitor,
  Mail,
  MessageSquare,
  Users,
  Lock,
  Key,
  Smartphone,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Save,
  RefreshCw,
  Database,
  Activity,
  Zap,
  Clock,
  FileText,
  Camera,
  Mic,
  MapPin,
  Calendar,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import Section from './Section';
import SectionHeader from './SectionHeader';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'privacy' | 'security' | 'preferences' | 'data' | 'billing'>('notifications');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    teamInvitations: true,
    labResponses: true,
    weeklyDigest: false,
    marketingEmails: false,
    pushNotifications: true,
    desktopNotifications: true,
    soundNotifications: false,
    taskReminders: true,
    deadlineAlerts: true,
    collaboratorActivity: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'organization',
    projectVisibility: 'team',
    activityVisibility: 'private',
    contactInfoVisibility: 'team',
    expertiseVisibility: 'public',
    allowDirectMessages: true,
    allowProjectInvitations: true,
    showOnlineStatus: true,
    indexInSearch: true,
    allowDataCollection: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '24',
    loginNotifications: true,
    deviceManagement: true,
    apiAccess: false,
    auditLog: true
  });

  const [preferenceSettings, setPreferenceSettings] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    currency: 'USD',
    measurementUnit: 'metric',
    defaultProjectView: 'grid',
    itemsPerPage: '20',
    autoSave: true,
    compactMode: false,
    animationsEnabled: true
  });

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'data', label: 'Data & Storage', icon: Database },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setHasUnsavedChanges(false);
    setIsLoading(false);
  };

  const handleReset = () => {
    // Reset to default values
    setHasUnsavedChanges(false);
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const updatePrivacySetting = (key: string, value: string | boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const updateSecuritySetting = (key: string, value: string | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const updatePreferenceSetting = (key: string, value: string | boolean) => {
    setPreferenceSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const renderToggle = (checked: boolean, onChange: (value: boolean) => void, disabled = false) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
    </label>
  );

  const renderNotifications = () => (
    <div className="space-y-8">
      <Section>
        <SectionHeader 
          title="Email Notifications" 
          subtitle="Control what emails you receive from the platform"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Project Updates</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about project progress and milestones</p>
              </div>
            </div>
            {renderToggle(notificationSettings.projectUpdates, (value) => updateNotificationSetting('projectUpdates', value))}
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Team Invitations</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails when invited to join projects</p>
              </div>
            </div>
            {renderToggle(notificationSettings.teamInvitations, (value) => updateNotificationSetting('teamInvitations', value))}
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Lab Responses</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when laboratories respond to your requests</p>
              </div>
            </div>
            {renderToggle(notificationSettings.labResponses, (value) => updateNotificationSetting('labResponses', value))}
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Weekly Digest</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Summary of your research activity and updates</p>
              </div>
            </div>
            {renderToggle(notificationSettings.weeklyDigest, (value) => updateNotificationSetting('weeklyDigest', value))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader 
          title="Push Notifications" 
          subtitle="Real-time notifications in your browser"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Desktop Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Show notifications on your desktop</p>
              </div>
            </div>
            {renderToggle(notificationSettings.desktopNotifications, (value) => updateNotificationSetting('desktopNotifications', value))}
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Task Reminders</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Remind me about upcoming deadlines and tasks</p>
              </div>
            </div>
            {renderToggle(notificationSettings.taskReminders, (value) => updateNotificationSetting('taskReminders', value))}
          </div>
        </div>
      </Section>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-8">
      <Section>
        <SectionHeader 
          title="Profile Visibility" 
          subtitle="Control who can see your profile information"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Profile Visibility</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Who can see your basic profile information</p>
              </div>
            </div>
            <select 
              value={privacySettings.profileVisibility}
              onChange={(e) => updatePrivacySetting('profileVisibility', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="private">Private</option>
              <option value="team">Team Members</option>
              <option value="organization">Organization</option>
              <option value="public">Public</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Project Visibility</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Who can see your project involvement</p>
              </div>
            </div>
            <select 
              value={privacySettings.projectVisibility}
              onChange={(e) => updatePrivacySetting('projectVisibility', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="private">Private</option>
              <option value="team">Team Members</option>
              <option value="organization">Organization</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader 
          title="Communication Preferences" 
          subtitle="Control how others can contact you"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Direct Messages</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to send you direct messages</p>
              </div>
            </div>
            {renderToggle(privacySettings.allowDirectMessages, (value) => updatePrivacySetting('allowDirectMessages', value))}
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Project Invitations</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to invite you to projects</p>
              </div>
            </div>
            {renderToggle(privacySettings.allowProjectInvitations, (value) => updatePrivacySetting('allowProjectInvitations', value))}
          </div>
        </div>
      </Section>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <Section>
        <SectionHeader 
          title="Account Security" 
          subtitle="Protect your account with additional security measures"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {securitySettings.twoFactorEnabled ? (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                  Enabled
                </span>
              ) : (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Enable 2FA
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Session Timeout</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after inactivity</p>
              </div>
            </div>
            <select 
              value={securitySettings.sessionTimeout}
              onChange={(e) => updateSecuritySetting('sessionTimeout', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="1">1 hour</option>
              <option value="8">8 hours</option>
              <option value="24">24 hours</option>
              <option value="168">1 week</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Login Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified of new login attempts</p>
              </div>
            </div>
            {renderToggle(securitySettings.loginNotifications, (value) => updateSecuritySetting('loginNotifications', value))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader 
          title="API & Integrations" 
          subtitle="Manage external access to your account"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">API Access</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Allow third-party applications to access your data</p>
              </div>
            </div>
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium">
              Manage Keys
            </button>
          </div>
        </div>
      </Section>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-8">
      <Section>
        <SectionHeader 
          title="Appearance" 
          subtitle="Customize how the platform looks and feels"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred color scheme</p>
              </div>
            </div>
            <select 
              value={preferenceSettings.theme}
              onChange={(e) => updatePreferenceSetting('theme', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Language</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
              </div>
            </div>
            <select 
              value={preferenceSettings.language}
              onChange={(e) => updatePreferenceSetting('language', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader 
          title="Regional Settings" 
          subtitle="Configure date, time, and currency formats"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Timezone</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your local timezone for scheduling</p>
              </div>
            </div>
            <select 
              value={preferenceSettings.timezone}
              onChange={(e) => updatePreferenceSetting('timezone', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">GMT</option>
              <option value="Europe/Paris">CET</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Date Format</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">How dates are displayed</p>
              </div>
            </div>
            <select 
              value={preferenceSettings.dateFormat}
              onChange={(e) => updatePreferenceSetting('dateFormat', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </Section>
    </div>
  );

  const renderData = () => (
    <div className="space-y-8">
      <Section>
        <SectionHeader 
          title="Data Export" 
          subtitle="Download your data and research history"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Export Profile Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download your profile information and settings</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Export Project Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download all your project data and collaborations</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Download
            </button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader 
          title="Data Management" 
          subtitle="Manage your stored data and storage usage"
        />
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Storage Usage</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2.4 GB of 10 GB used</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">24%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 dark:text-red-300 mb-2">Danger Zone</h4>
                <p className="text-sm text-red-800 dark:text-red-400 mb-4">
                  These actions are permanent and cannot be undone. Please proceed with caution.
                </p>
                <div className="space-y-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete All Data</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      <Section>
        <SectionHeader 
          title="Subscription" 
          subtitle="Manage your AxisOne subscription and billing"
        />
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Professional Plan</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Full access to all research collaboration features
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Next billing: March 15, 2025</span>
                <span>•</span>
                <span>$49/month</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$49</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader 
          title="Payment Method" 
          subtitle="Manage your payment information"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2027</p>
              </div>
            </div>
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium">
              Update
            </button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader 
          title="Billing History" 
          subtitle="View your past invoices and payments"
        />
        <div className="space-y-4">
          {[
            { date: 'Feb 15, 2025', amount: '$49.00', status: 'Paid' },
            { date: 'Jan 15, 2025', amount: '$49.00', status: 'Paid' },
            { date: 'Dec 15, 2024', amount: '$49.00', status: 'Paid' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{invoice.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Professional Plan</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900 dark:text-white">{invoice.amount}</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                  {invoice.status}
                </span>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Settings
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Manage your account preferences and platform settings
        </p>
      </div>

      {/* Save Banner */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                You have unsaved changes
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors text-sm font-medium"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors text-sm font-medium"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
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
      {activeTab === 'notifications' && renderNotifications()}
      {activeTab === 'privacy' && renderPrivacy()}
      {activeTab === 'security' && renderSecurity()}
      {activeTab === 'preferences' && renderPreferences()}
      {activeTab === 'data' && renderData()}
      {activeTab === 'billing' && renderBilling()}
    </div>
  );
};

export default Settings;