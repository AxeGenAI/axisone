import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Users, 
  Mail, 
  Search, 
  UserPlus, 
  Building2, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Copy,
  Link,
  Globe
} from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectId: string;
  currentCollaborators: number;
  onInviteSent: (invites: InviteData[]) => void;
}

interface InviteData {
  email: string;
  role: 'viewer' | 'collaborator' | 'admin';
  message?: string;
  department?: string;
  organization?: string;
}

interface SuggestedUser {
  name: string;
  email: string;
  department: string;
  organization: string;
  avatar: string;
  lastActive: string;
  projectsShared: number;
}

const InviteModal: React.FC<InviteModalProps> = ({ 
  isOpen, 
  onClose, 
  projectTitle, 
  projectId,
  currentCollaborators,
  onInviteSent 
}) => {
  const [invites, setInvites] = useState<InviteData[]>([{ email: '', role: 'collaborator' }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [inviteMethod, setInviteMethod] = useState<'email' | 'link'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareableLink, setShareableLink] = useState('');

  // Mock suggested users from organization
  const suggestedUsers: SuggestedUser[] = [
    {
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@companyX.com',
      department: 'Molecular Biology',
      organization: 'Company X Research',
      avatar: 'SC',
      lastActive: '2 hours ago',
      projectsShared: 8
    },
    {
      name: 'Dr. Michael Rodriguez',
      email: 'michael.rodriguez@companyX.com',
      department: 'Bioinformatics',
      organization: 'Company X Research',
      avatar: 'MR',
      lastActive: '1 day ago',
      projectsShared: 12
    },
    {
      name: 'Dr. Emily Watson',
      email: 'emily.watson@companyX.com',
      department: 'Data Science',
      organization: 'Company X Research',
      avatar: 'EW',
      lastActive: '3 hours ago',
      projectsShared: 6
    },
    {
      name: 'Dr. James Liu',
      email: 'james.liu@companyX.com',
      department: 'Proteomics',
      organization: 'Company X Research',
      avatar: 'JL',
      lastActive: '5 hours ago',
      projectsShared: 15
    }
  ];

  const filteredUsers = suggestedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roles = [
    { 
      id: 'viewer', 
      label: 'Viewer', 
      description: 'Can view project details and progress',
      permissions: ['View project', 'View files', 'View comments']
    },
    { 
      id: 'collaborator', 
      label: 'Collaborator', 
      description: 'Can contribute to project and edit content',
      permissions: ['All viewer permissions', 'Edit content', 'Add comments', 'Upload files']
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      description: 'Full project management access',
      permissions: ['All collaborator permissions', 'Manage team', 'Project settings', 'Delete project']
    }
  ];

  const addInvite = () => {
    setInvites([...invites, { email: '', role: 'collaborator' }]);
  };

  const removeInvite = (index: number) => {
    if (invites.length > 1) {
      setInvites(invites.filter((_, i) => i !== index));
    }
  };

  const updateInvite = (index: number, field: keyof InviteData, value: string) => {
    setInvites(invites.map((invite, i) => 
      i === index ? { ...invite, [field]: value } : invite
    ));
  };

  const selectSuggestedUser = (user: SuggestedUser) => {
    const emptyInviteIndex = invites.findIndex(invite => !invite.email);
    if (emptyInviteIndex !== -1) {
      updateInvite(emptyInviteIndex, 'email', user.email);
      updateInvite(emptyInviteIndex, 'department', user.department);
      updateInvite(emptyInviteIndex, 'organization', user.organization);
    } else {
      setInvites([...invites, { 
        email: user.email, 
        role: 'collaborator',
        department: user.department,
        organization: user.organization
      }]);
    }
  };

  const generateShareableLink = () => {
    const link = `https://axisone.research/projects/${projectId}/invite?token=${Math.random().toString(36).substr(2, 9)}`;
    setShareableLink(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const validInvites = invites.filter(invite => invite.email.trim());
      onInviteSent(validInvites);
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.5)] max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invite Collaborators</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Add team members to <span className="font-semibold text-blue-600 dark:text-blue-400">"{projectTitle}"</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Left Panel - Invite Methods */}
          <div className="flex-1 p-8 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            {/* Invite Method Toggle */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
                <button
                  onClick={() => setInviteMethod('email')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold ${
                    inviteMethod === 'email'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Invites</span>
                </button>
                <button
                  onClick={() => setInviteMethod('link')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold ${
                    inviteMethod === 'link'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Link className="w-4 h-4" />
                  <span>Share Link</span>
                </button>
              </div>
            </div>

            {inviteMethod === 'email' ? (
              <>
                {/* Email Invites */}
                <div className="space-y-6">
                  {invites.map((invite, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Invite #{index + 1}</h4>
                        {invites.length > 1 && (
                          <button
                            onClick={() => removeInvite(index)}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={invite.email}
                            onChange={(e) => updateInvite(index, 'email', e.target.value)}
                            placeholder="colleague@companyX.com"
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Role
                          </label>
                          <select
                            value={invite.role}
                            onChange={(e) => updateInvite(index, 'role', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          >
                            {roles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.label} - {role.description}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addInvite}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Another Invite</span>
                  </button>
                </div>

                {/* Custom Message */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Custom Message (Optional)
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Add a personal message to your invitation..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                  />
                </div>
              </>
            ) : (
              /* Share Link */
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Shareable Link</h4>
                      <p className="text-sm text-blue-800 dark:text-blue-400 mb-4">
                        Anyone with this link can join the project with Collaborator permissions.
                      </p>
                      
                      {!shareableLink ? (
                        <button
                          onClick={generateShareableLink}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300"
                        >
                          <Link className="w-4 h-4" />
                          <span>Generate Link</span>
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-xl p-3 border border-blue-200 dark:border-blue-700">
                            <input
                              type="text"
                              value={shareableLink}
                              readOnly
                              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white font-mono"
                            />
                            <button
                              onClick={() => copyToClipboard(shareableLink)}
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-blue-700 dark:text-blue-400">
                            Link expires in 7 days. You can revoke access anytime from project settings.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Suggested Users */}
          <div className="w-80 p-8 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Suggested Colleagues</h3>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search colleagues..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Suggested Users List */}
            <div className="space-y-3">
              {filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer group"
                  onClick={() => selectSuggestedUser(user)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {user.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.department}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{user.projectsShared} shared projects</p>
                    </div>
                    <UserPlus className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                  </div>
                </div>
              ))}
            </div>

            {/* Current Team Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{currentCollaborators} current collaborators</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {inviteMethod === 'email' ? (
              `${invites.filter(i => i.email.trim()).length} invite${invites.filter(i => i.email.trim()).length !== 1 ? 's' : ''} ready to send`
            ) : (
              shareableLink ? 'Link generated and ready to share' : 'Generate a shareable link'
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
            
            {inviteMethod === 'email' && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !invites.some(i => i.email.trim())}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Invites</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;