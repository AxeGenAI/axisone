import React, { useState } from 'react';
import { 
  ArrowLeft,
  Users, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Download,
  Upload,
  Eye,
  Edit3,
  Send,
  Plus,
  Star,
  Bell,
  Activity,
  Target,
  Zap,
  Award,
  MoreHorizontal,
  Filter,
  Search,
  X,
  Paperclip,
  ThumbsUp,
  Reply,
  Flag
} from 'lucide-react';

interface CollaboratorProjectViewProps {
  project: {
    id: string;
    title: string;
    description: string;
    role: 'viewer' | 'collaborator' | 'admin';
    progress: number;
    lastActivity: string;
    owner: string;
    teamSize: number;
    priority: 'high' | 'medium' | 'low';
    status: 'active' | 'pending' | 'completed';
    dueDate: string;
    unreadMessages: number;
    pendingTasks: number;
  };
  onBack: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: 'viewer' | 'collaborator' | 'admin';
  avatar: string;
  department: string;
  status: 'online' | 'away' | 'offline';
  lastActive: string;
}

interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'error';
  canEdit: boolean;
}

interface Discussion {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
  isLiked: boolean;
  attachments?: string[];
  priority?: 'high' | 'medium' | 'low';
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedBy: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  type: 'review' | 'analysis' | 'feedback' | 'approval';
}

const CollaboratorProjectView: React.FC<CollaboratorProjectViewProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'files' | 'discussions' | 'team'>('overview');
  const [newMessage, setNewMessage] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Mock data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Richardson',
      role: 'admin',
      avatar: 'DR',
      department: 'Principal Researcher',
      status: 'online',
      lastActive: 'Now'
    },
    {
      id: '2',
      name: 'Dr. Sarah Chen',
      role: 'collaborator',
      avatar: 'SC',
      department: 'Molecular Biology',
      status: 'away',
      lastActive: '2 hours ago'
    },
    {
      id: '3',
      name: 'Dr. Michael Rodriguez',
      role: 'collaborator',
      avatar: 'MR',
      department: 'Bioinformatics',
      status: 'offline',
      lastActive: '1 day ago'
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
      status: 'ready',
      canEdit: project.role !== 'viewer'
    },
    {
      id: '2',
      name: 'Dataset_Protein_Structures.csv',
      type: 'CSV',
      size: '15.7 MB',
      uploadedBy: 'Dr. Sarah Chen',
      uploadedAt: '1 day ago',
      status: 'ready',
      canEdit: project.role !== 'viewer'
    },
    {
      id: '3',
      name: 'Analysis_Results_Q1.xlsx',
      type: 'Excel',
      size: '5.2 MB',
      uploadedBy: 'You',
      uploadedAt: '3 days ago',
      status: 'processing',
      canEdit: true
    }
  ];

  const discussions: Discussion[] = [
    {
      id: '1',
      author: 'Dr. Richardson',
      avatar: 'DR',
      content: 'The latest protein structure analysis shows promising results. The binding affinity has improved by 23% compared to our previous model. I\'d like everyone to review the methodology section.',
      timestamp: '2 hours ago',
      replies: 3,
      likes: 5,
      isLiked: false,
      priority: 'high'
    },
    {
      id: '2',
      author: 'Dr. Sarah Chen',
      avatar: 'SC',
      content: 'I\'ve updated the bioinformatics pipeline. The new algorithm reduces processing time by 40% while maintaining accuracy. Please test with your datasets.',
      timestamp: '1 day ago',
      replies: 1,
      likes: 8,
      isLiked: true,
      attachments: ['pipeline_update_v2.py']
    }
  ];

  const myTasks: Task[] = [
    {
      id: '1',
      title: 'Review binding affinity calculations',
      description: 'Please review the updated binding affinity calculations in the latest analysis report and provide feedback on the methodology.',
      assignedBy: 'Dr. Richardson',
      dueDate: 'Today',
      priority: 'high',
      status: 'pending',
      type: 'review'
    },
    {
      id: '2',
      title: 'Analyze compound interaction data',
      description: 'Perform statistical analysis on the new compound interaction dataset and prepare summary report.',
      assignedBy: 'Dr. Richardson',
      dueDate: 'Tomorrow',
      priority: 'medium',
      status: 'in-progress',
      type: 'analysis'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'tasks', label: 'My Tasks', icon: CheckCircle2, badge: myTasks.filter(t => t.status === 'pending').length },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare, badge: project.unreadMessages },
    { id: 'team', label: 'Team', icon: Users }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'review': return <Eye className="w-4 h-4" />;
      case 'analysis': return <TrendingUp className="w-4 h-4" />;
      case 'feedback': return <MessageSquare className="w-4 h-4" />;
      case 'approval': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getRoleColor(project.role)}`}>
                {project.role}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getPriorityColor(project.priority)}`}>
                {project.priority} priority
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>Owner: {project.owner}</span>
              <span>Team: {project.teamSize} members</span>
              <span>Due: {project.dueDate}</span>
              <span>Last updated: {project.lastActivity}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Project Progress</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{myTasks.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">My Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{projectFiles.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Files</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{discussions.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Discussions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{teamMembers.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Team Members</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-semibold">Dr. Richardson</span> uploaded Neural_Network_Analysis_v3.pdf
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-semibold">You</span> completed task: Review methodology section
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {myTasks.filter(t => t.status === 'pending').length} pending
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {myTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSelectedTask(task);
              setShowTaskModal(true);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center">
                  {getTaskIcon(task.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{task.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      task.status === 'pending' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                      task.status === 'in-progress' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                      'text-green-700 bg-green-50 border-green-200'
                    } border`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Assigned by: {task.assignedBy}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Files</h2>
        {project.role !== 'viewer' && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {projectFiles.map((file) => (
          <div key={file.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{file.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{file.type}</span>
                    <span>{file.size}</span>
                    <span>by {file.uploadedBy}</span>
                    <span>{file.uploadedAt}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  file.status === 'ready' ? 'text-green-700 bg-green-100' :
                  file.status === 'processing' ? 'text-yellow-700 bg-yellow-100' :
                  'text-red-700 bg-red-100'
                }`}>
                  {file.status}
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
                {file.canEdit && (
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Discussions</h2>
      </div>

      {/* New Message */}
      {project.role !== 'viewer' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
              SC
            </div>
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts or ask a question..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  disabled={!newMessage.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discussions */}
      <div className="space-y-6">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                {discussion.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{discussion.author}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{discussion.timestamp}</span>
                  {discussion.priority && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(discussion.priority)}`}>
                      {discussion.priority}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{discussion.content}</p>
                
                {discussion.attachments && (
                  <div className="flex items-center space-x-2 mb-4">
                    {discussion.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">{attachment}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <button className={`flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 ${discussion.isLiked ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    <ThumbsUp className="w-4 h-4" />
                    <span>{discussion.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-600 dark:hover:text-green-400">
                    <Reply className="w-4 h-4" />
                    <span>{discussion.replies}</span>
                  </button>
                  <button className="hover:text-yellow-600 dark:hover:text-yellow-400">
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{teamMembers.length} members</span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white dark:border-gray-800`}></div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.department}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{member.lastActive}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Task Detail Modal
  const TaskModal = () => {
    if (!showTaskModal || !selectedTask) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Task Details</h2>
            <button
              onClick={() => setShowTaskModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center">
                {getTaskIcon(selectedTask.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedTask.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{selectedTask.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <span>Assigned by: {selectedTask.assignedBy}</span>
                  <span>Due: {selectedTask.dueDate}</span>
                  <span>Type: {selectedTask.type}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Progress Update</h4>
              <textarea
                placeholder="Add your progress update or comments..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Paperclip className="w-4 h-4" />
                  <span>Attach File</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Workspace</h1>
          <p className="text-gray-500 dark:text-gray-400">Collaborate and contribute to research</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold relative ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'files' && renderFiles()}
        {activeTab === 'discussions' && renderDiscussions()}
        {activeTab === 'team' && renderTeam()}
      </div>

      {/* Task Modal */}
      <TaskModal />
    </div>
  );
};

export default CollaboratorProjectView;