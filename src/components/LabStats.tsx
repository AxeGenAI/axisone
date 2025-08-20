import React from 'react';
import { MapPin, Star, Clock, Users, Award, TrendingUp, Globe, Zap } from 'lucide-react';

interface LabStatsProps {
  totalLabs: number;
  averageResponseTime: string;
  activeProjects: number;
}

const LabStats: React.FC<LabStatsProps> = ({
  totalLabs,
  averageResponseTime,
  activeProjects,
}) => {
  const stats = [
    {
      title: 'Total Labs',
      value: totalLabs,
      icon: MapPin,
      color: 'blue',
      trend: { value: '+12%', isPositive: true },
      subtitle: 'Global network'
    },
    {
      title: 'Avg Response Time',
      value: averageResponseTime,
      icon: Clock,
      color: 'purple',
      trend: { value: '-15%', isPositive: true },
      subtitle: 'Faster responses'
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: TrendingUp,
      color: 'green',
      trend: { value: '+22%', isPositive: true },
      subtitle: 'Currently running'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        text: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30'
      },
      green: {
        text: 'text-green-600 dark:text-green-400',
        bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30'
      },
      yellow: {
        text: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30'
      },
      purple: {
        text: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30'
      },
      orange: {
        text: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3),0_8px_25px_-8px_rgba(0,0,0,0.2)] mb-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Laboratory Network</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Key metrics for our global laboratory network</p>
      </div>
      
      <div className="grid grid-cols-3 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = getColorClasses(stat.color);
          
          return (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.12),0_8px_24px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.4),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${colorClasses.bg} group-hover:scale-110 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                {stat.trend && (
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    stat.trend.isPositive 
                      ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50' 
                      : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200/50 dark:border-red-800/50'
                  }`}>
                    {stat.trend.value}
                  </div>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{stat.value}</div>
              <h3 className="text-[15px] font-semibold text-gray-600 dark:text-gray-300 leading-tight mb-1">{stat.title}</h3>
              {stat.subtitle && (
                <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">{stat.subtitle}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabStats;