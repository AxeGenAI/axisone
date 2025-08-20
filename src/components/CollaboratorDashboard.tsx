import React, { useState } from 'react';
import CollaboratorProjectView from './CollaboratorProjectView';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  Upload,
  Star,
  Activity,
  Zap,
  Target,
  Award
} from 'lucide-react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import MetricCard from './MetricCard';

interface CollaboratorProject {
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
}

interface RecentActivity {
  id: string;
  type: 'comment' | 'file' | 'task' | 'mention';
  project: string;
  description: string;
  timestamp: string;
  author: string;
  avatar: string;
}

interface PendingTask {
  id: string;
  title: string;
  project: string;
  assignedBy: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'review' | 'analysis' | 'feedback' | 'approval';
}

const CollaboratorDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedProject, setSelectedProject] = useState<CollaboratorProject | null>(null);
  const [showProjectView, setShowProjectView] = useState(false);
  const [projectViewMode, setProjectViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for collaborator's projects
  const collaboratorProjects: CollaboratorProject[] = [
    {
      id: '1',
      title: 'Neural Network Analysis',
      description: 'Deep learning models for protein structure prediction',
      role: 'collaborator',
      progress: 78,
      lastActivity: '2 hours ago',
      owner: 'Dr. Richardson',
      teamSize: 12,
      priority: 'high',
      status: 'active',
      dueDate: 'Mar 15, 2025',
      unreadMessages: 3,
      pendingTasks: 2
    },
    {
      id: '2',
      title: 'Microbiome Research',
      description: 'Gut microbiome composition analysis',
      role: 'viewer',
      progress: 62,
      lastActivity: '1 day ago',
      owner: 'Dr. Sarah Chen',
      teamSize: 9,
      priority: 'medium',
      status: 'active',
      dueDate: 'Aug 20, 2025',
      unreadMessages: 1,
      pendingTasks: 0
    },
    {
      id: '3',
      title: 'AI-Driven Drug Discovery',
      description: 'Machine learning for drug-target interactions',
      role: 'collaborator',
      progress: 45,
      lastActivity: '3 hours ago',
      owner: 'Dr. Michael Rodriguez',
      teamSize: 15,
      priority: 'high',
      status: 'active',
      dueDate: 'Dec 10, 2025',
      unreadMessages: 5,
      pendingTasks: 1
    },
    {
      id: '4',
      title: 'CRISPR Gene Editing',
      description: 'Optimizing CRISPR-Cas9 systems',
      role: 'admin',
      progress: 100,
      lastActivity: '1 week ago',
      owner: 'Dr. Emily Watson',
      teamSize: 14,
      priority: 'medium',
      status: 'completed',
      dueDate: 'Completed',
      unreadMessages: 0,
      pendingTasks: 0
    }
  ];

  // Mock recent activity data
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'mention',
      project: 'Neural Network Analysis',
      description: 'Dr. Richardson mentioned you in a comment about protein binding results',
      timestamp: '30 minutes ago',
      author: 'Dr. Richardson',
      avatar: 'DR'
    },
    {
      id: '2',
      type: 'file',
      project: 'AI-Driven Drug Discovery',
      description: 'New dataset uploaded: molecular_compounds_v3.csv',
      timestamp: '2 hours ago',
      author: 'Dr. Michael Rodriguez',
      avatar: 'MR'
    },
    {
      id: '3',
      type: 'task',
      project: 'Neural Network Analysis',
      description: 'Task assigned: Review binding affinity calculations',
      timestamp: '4 hours ago',
      author: 'Dr. Richardson',
      avatar: 'DR'
    },
    {
      id: '4',
      type: 'comment',
      project: 'Microbiome Research',
      description: 'New discussion thread: Statistical significance of results',
      timestamp: '1 day ago',
      author: 'Dr. Sarah Chen',
      avatar: 'SC'
    }
  ];

  // Mock pending tasks
  const pendingTasks: PendingTask[] = [
    {
      id: '1',
      title: 'Review binding affinity calculations',
      project: 'Neural Network Analysis',
      assignedBy: 'Dr. Richardson',
      dueDate: 'Today',
      priority: 'high',
      type: 'review'
    },
    {
      id: '2',
      title: 'Provide feedback on methodology',
      project: 'Neural Network Analysis',
      assignedBy: 'Dr. Richardson',
      dueDate: 'Tomorrow',
      priority: 'medium',
      type: 'feedback'
    },
    {
      id: '3',
      title: 'Analyze compound interaction data',
      project: 'AI-Driven Drug Discovery',
      assignedBy: 'Dr. Michael Rodriguez',
      dueDate: 'Jan 25',
      priority: 'high',
      type: 'analysis'
    }
  ];

  // Filter projects based on search and filter
  const filteredProjects = collaboratorProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'active' && project.status === 'active') ||
                         (filterBy === 'my-role' && project.role === 'collaborator') ||
                         (filterBy === 'high-priority' && project.priority === 'high');
    
    return matchesSearch && matchesFilter;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'mention': return <Bell className="w-5 h-5 text-orange-600" />;
      case 'file': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'task': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'comment': return <MessageSquare className="w-5 h-5 text-purple-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'collaborator': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'viewer': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'review': return <Eye className="w-4 h-4" />;
      case 'analysis': return <TrendingUp className="w-4 h-4" />;
      case 'feedback': return <MessageSquare className="w-4 h-4" />;
      case 'approval': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleOpenProject = (project: CollaboratorProject) => {
    setSelectedProject(project);
    setShowProjectView(true);
  };

  const handleBackToDashboard = () => {
    setShowProjectView(false);
    setSelectedProject(null);
  };

  // Calculate metrics
  const totalProjects = collaboratorProjects.length;
  const activeProjects = collaboratorProjects.filter(p => p.status === 'active').length;
  const totalTasks = pendingTasks.length;
  const unreadMessages = collaboratorProjects.reduce((sum, p) => sum + p.unreadMessages, 0);

  const metrics = [
    {
      title: 'My Projects',
      value: totalProjects,
      icon: Target,
      color: 'blue' as const,
      trend: { value: '+2', isPositive: true },
      subtitle: 'Collaborating on'
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: TrendingUp,
      color: 'green' as const,
      trend: { value: `${Math.round((activeProjects/totalProjects)*100)}%`, isPositive: true },
      subtitle: 'Currently active'
    },
    {
      title: 'Pending Tasks',
      value: totalTasks,
      icon: Clock,
      color: 'orange' as const,
      trend: { value: '-1', isPositive: true },
      subtitle: 'Awaiting action'
    },
    {
      title: 'Unread Messages',
      value: unreadMessages,
      icon: MessageSquare,
      color: 'purple' as const,
      trend: { value: '+3', isPositive: false },
      subtitle: 'New notifications'
    }
  ];

  // Show project view if selected
  if (showProjectView && selectedProject) {
    return (
      <CollaboratorProjectView
        project={selectedProject}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Welcome back, Dr. Chen
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Your collaborative research workspace
        </p>
      </div>

      {/* Metrics Overview */}
      <Section>
        <SectionHeader 
          title="Collaboration Overview" 
          subtitle="Your activity across research projects"
        />
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </Section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Projects */}
        <div className="col-span-2 space-y-8">
          {/* My Projects */}
          <Section>
            <div className="flex items-center justify-between mb-6">
              <SectionHeader 
                title="My Projects" 
                subtitle={`${filteredProjects.length} active collaborations`}
              />
              
              {/* Search and Filter */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Projects</option>
                  <option value="active">Active Only</option>
                  <option value="my-role">My Collaborations</option>
                  <option value="high-priority">High Priority</option>
                </select>
                
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
                  <button
                    onClick={() => setProjectViewMode('grid')}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      projectViewMode === 'grid'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.4)]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60'
                    }`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setProjectViewMode('list')}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      projectViewMode === 'list'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.4)]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60'
                    }`}
                  >
                    <div className="w-4 h-4 flex flex-col space-y-0.5">
                      <div className="bg-current h-0.5 rounded-full"></div>
                      <div className="bg-current h-0.5 rounded-full"></div>
                      <div className="bg-current h-0.5 rounded-full"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {projectViewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.12),0_8px_24px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.4),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:bg-white/95 dark:hover:bg-gray-800/95 hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getRoleColor(project.role)}`}>
                            {project.role}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Owner: {project.owner}</span>
                          <span>Due: {project.dueDate}</span>
                        </div>
                      </div>
                      
                      {/* Notification Badges */}
                      <div className="flex flex-col space-y-2">
                        {project.unreadMessages > 0 && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold">
                            <MessageSquare className="w-3 h-3" />
                            <span>{project.unreadMessages}</span>
                          </div>
                        )}
                        {project.pendingTasks > 0 && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-bold">
                            <Clock className="w-3 h-3" />
                            <span>{project.pendingTasks}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => handleOpenProject(project)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Open Project
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.12),0_8px_24px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.4),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:bg-white/95 dark:hover:bg-gray-800/95 hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getRoleColor(project.role)}`}>
                            {project.role}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.priority)}`}>
                            {project.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{project.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Owner: {project.owner}</span>
                          <span>Team: {project.teamSize} members</span>
                          <span>Due: {project.dueDate}</span>
                        </div>
                      </div>
                      
                      {/* Notification Badges */}
                      <div className="flex items-center space-x-2">
                        {project.unreadMessages > 0 && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold">
                            <MessageSquare className="w-3 h-3" />
                            <span>{project.unreadMessages}</span>
                          </div>
                        )}
                        {project.pendingTasks > 0 && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-bold">
                            <Clock className="w-3 h-3" />
                            <span>{project.pendingTasks}</span>
                          </div>
                        )}
                        <button 
                          onClick={() => handleOpenProject(project)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          Open Project
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Last activity: {project.lastActivity}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{project.teamSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* Right Column - Activity & Tasks */}
        <div className="space-y-8">
          {/* Pending Tasks */}
          <Section>
            <SectionHeader 
              title="Pending Tasks" 
              subtitle={`${pendingTasks.length} items need attention`}
            />
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg flex items-center justify-center">
                      {getTaskTypeIcon(task.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {task.project} • by {task.assignedBy}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Due: {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Recent Activity */}
          <Section>
            <SectionHeader 
              title="Recent Activity" 
              subtitle="Latest updates from your projects"
            />
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 group cursor-pointer hover:bg-white/40 dark:hover:bg-gray-800/40 hover:backdrop-blur-sm p-3 rounded-xl transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white leading-relaxed font-medium line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                        {activity.project}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;