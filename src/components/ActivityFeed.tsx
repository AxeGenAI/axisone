import React from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Users, 
  Clock,
  TrendingUp
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'completion' | 'comment' | 'submission' | 'collaboration' | 'update';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar: string;
  };
}

interface ActivityFeedProps {
  viewMode: 'feed' | 'compact';
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ viewMode }) => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'completion',
      title: 'NGS Analysis Completed',
      description: 'Genomic sequencing results are now available for download',
      timestamp: '2 hours ago',
      user: {
        name: 'Dr. Sarah Chen',
        avatar: 'SC'
      }
    },
    {
      id: '2',
      type: 'comment',
      title: 'New Comment on Protein Expression',
      description: 'Lab technician added notes about purification process',
      timestamp: '4 hours ago',
      user: {
        name: 'Lab Tech Mike',
        avatar: 'MT'
      }
    },
    {
      id: '3',
      type: 'submission',
      title: 'New Request Submitted',
      description: 'Histopathology analysis request sent to Stanford Lab',
      timestamp: '6 hours ago'
    },
    {
      id: '4',
      type: 'collaboration',
      title: 'Team Member Added',
      description: 'Dr. James Wilson joined the Neurological Research project',
      timestamp: '1 day ago',
      user: {
        name: 'Dr. James Wilson',
        avatar: 'JW'
      }
    },
    {
      id: '5',
      type: 'update',
      title: 'Project Milestone Reached',
      description: 'Molecular Biology project reached 75% completion',
      timestamp: '2 days ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completion':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'submission':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'collaboration':
        return <Users className="w-5 h-5 text-orange-600" />;
      case 'update':
        return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {viewMode === 'feed' ? (
        <div className="space-y-8">
        {activities.slice(0, 5).map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-5 group cursor-pointer hover:bg-white/40 dark:hover:bg-gray-800/40 hover:backdrop-blur-sm p-4 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate pr-4">
                  {activity.title}
                </h4>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg whitespace-nowrap flex-shrink-0">{activity.timestamp}</span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-3 line-clamp-2">
                {activity.description}
              </p>
              
              {activity.user && (
                <div className="flex items-center space-x-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20 min-w-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {activity.user.avatar}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-semibold truncate">{activity.user.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 8).map((activity, index) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-white/40 dark:hover:bg-gray-800/40 rounded-xl transition-all duration-300 group cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
                  {activity.title}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  {activity.user && <span>{activity.user.name}</span>}
                  <span>•</span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;