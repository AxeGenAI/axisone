import React from 'react';
import { Calendar, Users, TrendingUp, Clock, CheckCircle2, DollarSign, MoreHorizontal, UserPlus } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  collaborators: number;
  budget: string;
  deadline: string;
  lastUpdated: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  onInviteClick?: (projectId: string) => void;
  onCollaborateClick?: (projectId: string) => void;
}

interface ProjectListViewProps {
  projects: Project[];
}

const ProjectListView: React.FC<ProjectListViewProps> = ({ projects }) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        label: 'Active',
        color: 'text-green-700 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-900/30',
        border: 'border-green-200 dark:border-green-800',
        icon: TrendingUp
      },
      completed: {
        label: 'Completed',
        color: 'text-blue-700 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/30',
        border: 'border-blue-200 dark:border-blue-800',
        icon: CheckCircle2
      },
      pending: {
        label: 'Pending',
        color: 'text-orange-700 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-900/30',
        border: 'border-orange-200 dark:border-orange-800',
        icon: Clock
      }
    };
    return configs[status as keyof typeof configs];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
      medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      low: 'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => {
        const statusConfig = getStatusConfig(project.status);
        const StatusIcon = statusConfig.icon;
        
        return (
          <div
            key={project.id}
            className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.12),0_8px_24px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.4),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:bg-white/95 dark:hover:bg-gray-800/95 hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.priority)}`}>
                        {project.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status and Actions */}
                  <div className="flex items-center space-x-3 ml-6">
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{statusConfig.label}</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          project.onCollaborateClick?.(project.id);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <Users className="w-4 h-4" />
                        <span>Collaborate</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          project.onInviteClick?.(project.id);
                        }}
                        className="flex items-center justify-center px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 text-sm font-medium hover:scale-105"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                      
                      <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-700 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.4)]"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-medium tracking-wide">BUDGET</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{project.budget}</p>
                  </div>
                  
                  <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-medium tracking-wide">DEADLINE</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{project.deadline}</p>
                  </div>
                  
                  <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-medium tracking-wide">TEAM</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{project.collaborators} members</p>
                  </div>
                  
                  <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium tracking-wide">UPDATED</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{project.lastUpdated}</p>
                  </div>
                  
                  <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium tracking-wide">STATUS</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm capitalize">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectListView;