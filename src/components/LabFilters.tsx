import React from 'react';
import { Search, Filter, MapPin, Star, Clock, Users, Award, Zap } from 'lucide-react';

interface LabFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  locationFilter: string;
  onLocationFilterChange: (location: string) => void;
  specialtyFilter: string;
  onSpecialtyFilterChange: (specialty: string) => void;
  ratingFilter: number;
  onRatingFilterChange: (rating: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
  verifiedOnly: boolean;
  onVerifiedOnlyChange: (verified: boolean) => void;
}

const LabFilters: React.FC<LabFiltersProps> = ({
  searchTerm,
  onSearchChange,
  locationFilter,
  onLocationFilterChange,
  specialtyFilter,
  onSpecialtyFilterChange,
  ratingFilter,
  onRatingFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  verifiedOnly,
  onVerifiedOnlyChange
}) => {
  const locationOptions = [
    { value: 'all', label: 'All Locations', count: 127 },
    { value: 'local', label: 'Within 50km', count: 12 },
    { value: 'regional', label: 'Within 500km', count: 45 },
    { value: 'national', label: 'National', count: 89 },
    { value: 'international', label: 'International', count: 38 }
  ];

  const specialtyOptions = [
    { value: 'all', label: 'All Specialties', count: 127, icon: Filter },
    { value: 'genomics', label: 'Genomics', count: 34, icon: Zap },
    { value: 'proteomics', label: 'Proteomics', count: 28, icon: Award },
    { value: 'cell-culture', label: 'Cell Culture', count: 22, icon: Users },
    { value: 'microscopy', label: 'Microscopy', count: 19, icon: Search },
    { value: 'mass-spec', label: 'Mass Spectrometry', count: 15, icon: Star },
    { value: 'biochemical', label: 'Biochemical', count: 18, icon: Clock },
    { value: 'histology', label: 'Histopathology', count: 12, icon: MapPin }
  ];

  const sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Rating' },
    { value: 'response-time', label: 'Response Time' },
    { value: 'active-projects', label: 'Active Projects' },
    { value: 'recent', label: 'Recently Added' }
  ];

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3),0_8px_25px_-8px_rgba(0,0,0,0.2)] mb-8">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search laboratories by name, location, or specialty..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm shadow-inner text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 font-medium text-[15px] hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            />
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Location Filter */}
          <div className="flex items-center space-x-2 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
            {locationOptions.map((option) => {
              const isActive = locationFilter === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => onLocationFilterChange(option.value)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:scale-105'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
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

          {/* Specialty Filter */}
          <div className="flex items-center space-x-2 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
            {specialtyOptions.slice(0, 4).map((option) => {
              const Icon = option.icon;
              const isActive = specialtyFilter === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => onSpecialtyFilterChange(option.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 text-sm font-semibold ${
                    isActive
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-[0_8px_24px_-4px_rgba(34,197,94,0.4)] scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{option.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
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

          {/* Verified Only Toggle */}
          <button
            onClick={() => onVerifiedOnlyChange(!verifiedOnly)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-semibold border ${
              verifiedOnly
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-[0_8px_24px_-4px_rgba(147,51,234,0.4)] border-purple-500 scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60 border-gray-200 dark:border-gray-700 hover:scale-105'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Verified Only</span>
          </button>

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
            <button
              onClick={() => onViewModeChange('map')}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.4)]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabFilters;
