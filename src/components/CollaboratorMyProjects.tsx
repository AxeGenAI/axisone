import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Star,
  MessageSquare,
  FileText,
  Eye,
  ArrowRight,
  Target,
  Award,
  Activity
} from 'lucide-react';

interface CollaboratorMyProjectsProps {
  onOpenProject: (project: any) => void;
}

interface Project {
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
  category: string;
}

const CollaboratorMyProjects: React.FC<CollaboratorMyProjectsProps> = ({ onOpenProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('list');

  // Mock projects data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Neural Network Analysis',
      description: 'Deep learning models for protein structure prediction and drug discovery applications',
      role: 'collaborator',
      progress: 78,
      lastActivity: '2 hours ago',
      owner: 'Dr. Richardson',
      teamSize: 12,
      priority: 'high',
      status: 'active',
      dueDate: 'Mar 15, 2025',
      unreadMessages: 3,
      pendingTasks: 2,
      category: 'AI/ML'
    },
    {
      id: '2',
      title: 'Microbiome Research',
      description: 'Investigating gut microbiome composition and its effects on drug metabolism',
      role: 'viewer',
      progress: 62,
      lastActivity: '1 day ago',
      owner: 'Dr. Sarah Chen',
      teamSize: 9,
      priority: 'medium',
      status: 'active',
      dueDate: 'Aug 20, 2025',
      unreadMessages: 1,
      pendingTasks: 0,
      category: 'Biology'
    },
    {
      id: '3',
      title: 'AI-Driven Drug Discovery',
      description: 'Machine learning models for predicting molecular properties and drug-target interactions',
      role: 'collaborator',
      progress: 45,
      lastActivity: '3 hours ago',
      owner: 'Dr. Michael Rodriguez',
      teamSize: 15,
      priority: 'high',
      status: 'active',
      dueDate: 'Dec 10, 2025',
      unreadMessages: 5,
      pendingTasks: 1,
      category: 'Pharmaceutical'
    },
    {
      id: '4',
      title: 'CRISPR Gene Editing Optimization',
      description: 'Developing more precise and efficient CRISPR-Cas9 systems for therapeutic applications',
      role: 'admin',
      progress: 100,
      lastActivity: '1 week ago',
      owner: 'Dr. Emily Watson',
      teamSize: 14,
      priority: 'medium',
      status: 'completed',
      dueDate: 'Completed',
      unreadMessages: 0,
      pendingTasks: 0,
      category: 'Genetics'
    },
    {
      id: '5',
      title: 'Quantum Computing Molecular Simulation',
      description: 'Leveraging quantum algorithms for complex molecular dynamics simulations',
      role: 'collaborator',
      progress: 34,
      lastActivity: '5 hours ago',
      owner: 'Dr. James Wilson',
      teamSize: 8,
      priority: 'high',
      status: 'active',
      dueDate: 'Jun 30, 2025',
      unreadMessages: 2,
      pendingTasks: 3,
      category: 'Quantum Computing'
    },
    {
      id: '6',
      title: 'Biomarker Discovery Platform',
      description: 'Multi-omics approach to identify novel biomarkers for early disease detection',
      role: 'viewer',
      progress: 89,
      lastActivity: '12 hours ago',
      owner: 'Dr. Lisa Park',
      teamSize: 11,
      priority: 'medium',
      status: 'active',
      dueDate: 'Sep 15, 2025',
      unreadMessages: 0,
      pendingTasks: 0,
      category: 'Diagnostics'
    }
  ];

  // Filter and sort projects
  let filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'active' && project.status === 'active') ||
                         (filterBy === 'my-role' && project.role === 'collaborator') ||
                         (filterBy === 'high-priority' && project.priority === 'high') ||
                         (filterBy === 'completed' && project.status === 'completed');
    
    return matchesSearch && matchesFilter;
  });

  // Sort projects
  filteredProjects.sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return b.progress - a.progress;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'due-date':
        if (a.dueDate === 'Completed') return 1;
        if (b.dueDate === 'Completed') return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'recent':
      default:
        return 0;
    }
  });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-50 border-green-200';
      case 'pending': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'completed': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  // Calculate stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalTasks = projects.reduce((sum, p) => sum + p.pendingTasks, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          My Projects
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Projects you're collaborating on across the research network
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Target className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Total Projects</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalProjects}</p>
          <p className="text-sm text-gray-500">All collaborations</p>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Active</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeProjects}</p>
          <p className="text-sm text-gray-500">In progress</p>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle2 className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Completed</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedProjects}</p>
          <p className="text-sm text-gray-500">Finished</p>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Pending Tasks</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalTasks}</p>
          <p className="text-sm text-gray-500">Need attention</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
              />
            </div>
            
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Projects</option>
              <option value="active">Active Only</option>
              <option value="my-role">My Collaborations</option>
              <option value="high-priority">High Priority</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="progress">Progress</option>
              <option value="priority">Priority</option>
              <option value="due-date">Due Date</option>
            </select>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid'
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
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  viewMode === 'list'
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
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredProjects.length} of {totalProjects} projects
          </div>
        </div>
      </div>

      {/* Projects List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getRoleColor(project.role)}`}>
                      {project.role}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>Owner: {project.owner}</span>
                    <span>Due: {project.dueDate}</span>
                  </div>
                </div>
                
                {/* Notification Badges */}
                <div className="flex flex-col space-y-1">
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

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Last activity: {project.lastActivity}</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{project.teamSize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleColor(project.role)}`}>
                      {project.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <span>Owner: {project.owner}</span>
                    <span>Team: {project.teamSize} members</span>
                    <span>Category: {project.category}</span>
                    <span>Due: {project.dueDate}</span>
                  </div>
                </div>
                
                {/* Notification Badges */}
                <div className="flex items-center space-x-3">
                  {project.unreadMessages > 0 && (
                    <div className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-bold">
                      <MessageSquare className="w-4 h-4" />
                      <span>{project.unreadMessages}</span>
                    </div>
                  )}
                  {project.pendingTasks > 0 && (
                    <div className="flex items-center space-x-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-bold">
                      <Clock className="w-4 h-4" />
                      <span>{project.pendingTasks}</span>
                    </div>
                  )}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
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
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>Files</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>Discuss</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Projects Found</h3>
          <p className="text-gray-600 dark:text-gray-400">No projects match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default CollaboratorMyProjects;