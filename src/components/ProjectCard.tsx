import React from 'react';
import { Users, TrendingUp, Clock, CheckCircle2, UserPlus } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  collaborators: number;
  lastUpdated: string;
  budget?: string;
  deadline?: string;
  onInviteClick?: () => void;
  onCollaborateClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  status,
  progress,
  collaborators,
  lastUpdated,
  budget,
  deadline,
  onInviteClick,
  onCollaborateClick
}) => {
  const statusConfig = {
    active: {
      label: 'Active',
      color: 'text-green-600',
      bg: 'bg-green-50/80',
      icon: TrendingUp
    },
    completed: {
      label: 'Completed',
      color: 'text-blue-600',
      bg: 'bg-blue-50/80',
      icon: CheckCircle2
    },
    pending: {
      label: 'Pending',
      color: 'text-orange-600',
      bg: 'bg-orange-50/80',
      icon: Clock
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {/* Header with title and status */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 flex-1">
          {title}
        </h3>
        <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} flex-shrink-0 ml-3`}>
          <StatusIcon className="w-3 h-3" />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Progress</span>
          <span className="text-xs font-semibold text-gray-900 dark:text-white">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Footer with key metrics */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>{collaborators}</span>
        </div>
        
        <div className="text-right">
          {budget && (
            <div className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">
              {budget}
            </div>
          )}
          {deadline && (
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Due {deadline}
            </div>
          )}
        </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCollaborateClick?.();
            }}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Users className="w-4 h-4" />
            <span>Collaborate</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInviteClick?.();
            }}
            className="flex items-center justify-center px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 text-sm font-medium hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;