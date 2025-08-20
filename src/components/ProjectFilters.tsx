import React from 'react';
import { Search, Filter, Calendar, Users, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Projects', icon: Filter, count: 24 },
    { value: 'active', label: 'Active', icon: TrendingUp, count: 12 },
    { value: 'pending', label: 'Pending', icon: Clock, count: 8 },
    { value: 'completed', label: 'Completed', icon: CheckCircle2, count: 4 }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'progress', label: 'Progress' },
    { value: 'deadline', label: 'Deadline' },
    { value: 'budget', label: 'Budget' },
    { value: 'collaborators', label: 'Team Size' }
  ];

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3),0_8px_25px_-8px_rgba(0,0,0,0.2)] mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by name, description, or collaborator..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm shadow-inner text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 font-medium text-[15px] hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center space-x-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
            {statusOptions.map((option) => {
              const Icon = option.icon;
              const isActive = statusFilter === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => onStatusFilterChange(option.value)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-white/90 dark:hover:bg-gray-800/90"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
            <button
              onClick={() => onViewModeChange('grid')}
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
              onClick={() => onViewModeChange('list')}
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
      </div>
    </div>
  );
};

export default ProjectFilters;