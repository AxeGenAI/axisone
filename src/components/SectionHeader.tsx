import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">{title}</h2>
        {subtitle && (
          <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">{subtitle}</p>
        )}
      </div>
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-[15px] flex items-center space-x-2 transition-all duration-300 hover:translate-x-1 px-5 py-3 rounded-2xl hover:bg-blue-50/70 dark:hover:bg-blue-900/30 group"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;