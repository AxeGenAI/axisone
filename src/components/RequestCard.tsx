import React from 'react';
import { Calendar, Clock, CheckCircle2, Beaker } from 'lucide-react';

interface RequestCardProps {
  title: string;
  status: 'approved' | 'pending' | 'completed';
  submittedDate: string;
  description?: string;
  labName?: string;
  estimatedCompletion?: string;
  priority?: 'high' | 'medium' | 'low';
}

const RequestCard: React.FC<RequestCardProps> = ({ 
  title, 
  status, 
  submittedDate, 
  description,
  labName,
  estimatedCompletion,
  priority
}) => {
  const statusConfig = {
    approved: {
      label: 'Approved',
      color: 'text-green-600',
      bg: 'bg-green-50/80',
      icon: CheckCircle2
    },
    pending: {
      label: 'Pending',
      color: 'text-orange-600',
      bg: 'bg-orange-50/80',
      icon: Clock
    },
    completed: {
      label: 'Completed',
      color: 'text-blue-600',
      bg: 'bg-blue-50/80',
      icon: CheckCircle2
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-base line-clamp-2 flex-1">{title}</h3>
        <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} flex-shrink-0 ml-3`}>
          <StatusIcon className="w-3 h-3" />
          <span>{config.label}</span>
        </div>
      </div>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{description}</p>
      )}
      
      {labName && (
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs mb-4 font-medium bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 min-w-0">
          <Beaker className="w-4 h-4 mr-2" />
          <span className="truncate">{labName}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{submittedDate}</span>
        </div>
        {estimatedCompletion && (
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{estimatedCompletion}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;