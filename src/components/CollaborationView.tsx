import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Settings, 
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit3,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Share2,
  Bell,
  Activity,
  X
} from 'lucide-react';

interface CollaborationViewProps {
  projectId: string;
  projectTitle: string;
  userRole: 'viewer' | 'collaborator' | 'admin';
  onClose: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'collaborator' | 'admin';
  avatar: string;
  department: string;
  lastActive: string;
  status: 'online' | 'away' | 'offline';
  joinedDate: string;
}

interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
  status: 'processing' | 'ready' | 'error';
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
  attachments?: string[];
}

const CollaborationView: React.FC<CollaborationViewProps> = ({ 
  projectId, 
  projectTitle, 
  userRole, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'discussions' | 'team' | 'activity'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState('');

  // Mock data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Richardson',
      email: 'richardson@companyX.com',
      role: 'admin',
      avatar: 'DR',
      department: 'Principal Researcher',
      lastActive: 'Now',
      status: 'online',
      joinedDate: 'Project Creator'
    },
    {
      id: '2',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@companyX.com',
      role: 'collaborator',
      avatar: 'SC',
      department: 'Molecular Biology',
      lastActive: '2 hours ago',
      status: 'away',
      joinedDate: '3 days ago'
    },
    {
      id: '3',
      name: 'Dr. Michael Rodriguez',
      email: 'michael.rodriguez@companyX.com',
      role: 'collaborator',
      avatar: 'MR',
      department: 'Bioinformatics',
      lastActive: '1 day ago',
      status: 'offline',
      joinedDate: '1 week ago'
    },
    {
      id: '4',
      name: 'Dr. Emily Watson',
      email: 'emily.watson@companyX.com',
      role: 'viewer',
      avatar: 'EW',
      department: 'Data Science',
      lastActive: '3 hours ago',
      status: 'online',
      joinedDate: '2 days ago'
    }
  ];

  const projectFiles: ProjectFile[] = [
    {
      id: '1',
      name: 'Neural_Network_Analysis_v3.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Dr. Richardson',
      uploadedAt: '2 hours ago',
      version: 3,
      status: 'ready'
    },
    {
      id: '2',
      name: 'Dataset_Protein_Structures.csv',
      type: 'CSV',
      size: '15.7 MB',
      uploadedBy: 'Dr. Sarah Chen',
      uploadedAt: '1 day ago',
      version: 1,
      status: 'ready'
    },
    {
      id: '3',
      name: 'Analysis_Results_Q1.xlsx',
      type: 'Excel',
      size: '5.2 MB',
      uploadedBy: 'Dr. Michael Rodriguez',
      uploadedAt: '3 days ago',
      version: 2,
      status: 'processing'
    }
  ];

  const discussions: Comment[] = [
    {
      id: '1',
      author: 'Dr. Sarah Chen',
      avatar: 'SC',
      content: 'The latest protein structure analysis shows promising results. The binding affinity has improved by 23% compared to our previous model.',
      timestamp: '2 hours ago',
      replies: [
        {
          id: '1-1',
          author: 'Dr. Richardson',
          avatar: 'DR',
          content: 'Excellent work! Can you share the detailed binding kinetics data?',
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: '2',
      author: 'Dr. Michael Rodriguez',
      avatar: 'MR',
      content: 'I\'ve updated the bioinformatics pipeline. The new algorithm reduces processing time by 40% while maintaining accuracy.',
      timestamp: '1 day ago',
      attachments: ['pipeline_update_v2.py']
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'activity', label: 'Activity', icon: Clock }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'collaborator': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'viewer': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Project Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Team Members</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{teamMembers.length}</p>
          <p className="text-sm text-gray-500">Active collaborators</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Project Files</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectFiles.length}</p>
          <p className="text-sm text-gray-500">Shared documents</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <MessageSquare className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Discussions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{discussions.length}</p>
          <p className="text-sm text-gray-500">Active threads</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Progress</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
          <p className="text-sm text-gray-500">Completion rate</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">Dr. Richardson</span> uploaded Neural_Network_Analysis_v3.pdf
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">Dr. Sarah Chen</span> commented on protein structure analysis
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      {/* File Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        
        {(userRole === 'collaborator' || userRole === 'admin') && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
          </button>
        )}
      </div>

      {/* Files List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {projectFiles.map((file) => (
            <div key={file.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{file.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{file.type}</span>
                      <span>{file.size}</span>
                      <span>v{file.version}</span>
                      <span>by {file.uploadedBy}</span>
                      <span>{file.uploadedAt}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    file.status === 'ready' ? 'text-green-700 bg-green-100' :
                    file.status === 'processing' ? 'text-yellow-700 bg-yellow-100' :
                    'text-red-700 bg-red-100'
                  }`}>
                    {file.status === 'ready' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                    {file.status === 'processing' && <Clock className="w-3 h-3 inline mr-1" />}
                    {file.status === 'error' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                    {file.status}
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                  
                  {(userRole === 'collaborator' || userRole === 'admin') && (
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-6">
      {/* New Comment */}
      {(userRole === 'collaborator' || userRole === 'admin') && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
              DR
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts or ask a question..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
                <button
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments */}
      <div className="space-y-6">
        {discussions.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{comment.author}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>
                
                {comment.attachments && (
                  <div className="flex items-center space-x-2 mb-3">
                    {comment.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">{attachment}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <button className="hover:text-blue-600 dark:hover:text-blue-400">Reply</button>
                  <button className="hover:text-yellow-600 dark:hover:text-yellow-400">
                    <Star className="w-4 h-4 inline mr-1" />
                    Star
                  </button>
                </div>
                
                {comment.replies && (
                  <div className="mt-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {String(reply.avatar)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium text-gray-900 dark:text-white text-sm">{reply.author}</h5>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{reply.timestamp}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      {/* Team Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members ({teamMembers.length})</h3>
        {userRole === 'admin' && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Invite Members</span>
          </button>
        )}
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white dark:border-gray-800`}></div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.department}</p>
                </div>
              </div>
              
              {userRole === 'admin' && member.role !== 'admin' && (
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Role</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                  {member.role}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last Active</span>
                <span className="text-sm text-gray-900 dark:text-white">{member.lastActive}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Joined</span>
                <span className="text-sm text-gray-900 dark:text-white">{member.joinedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.5)] max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{projectTitle}</h1>
            <p className="text-gray-500 dark:text-gray-400">Collaborative workspace</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 px-8 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'files' && renderFiles()}
          {activeTab === 'discussions' && renderDiscussions()}
          {activeTab === 'team' && renderTeam()}
          {activeTab === 'activity' && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Activity Feed</h3>
              <p className="text-gray-600 dark:text-gray-400">Detailed activity tracking coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationView;