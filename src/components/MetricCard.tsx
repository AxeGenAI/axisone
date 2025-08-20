import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'blue' | 'orange' | 'green' | 'purple';
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color, subtitle, trend }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };

  const iconBgClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
    orange: 'bg-gradient-to-br from-orange-50 to-orange-100',
    green: 'bg-gradient-to-br from-green-50 to-green-100',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100',
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.12),0_8px_24px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.4),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:-translate-y-2 group cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${iconBgClasses[color]} group-hover:scale-110 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
        {trend && (
          <div className={`text-sm font-bold px-3 py-1 rounded-full ${
            trend.isPositive 
              ? 'text-green-700 bg-green-50 border border-green-200/50' 
              : 'text-red-700 bg-red-50 border border-red-200/50'
          }`}>
            {trend.value}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{value}</div>
      <h3 className="text-[15px] font-semibold text-gray-600 dark:text-gray-300 leading-tight mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">{subtitle}</p>
      )}
    </div>
  );
};

export default MetricCard;