import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-3 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] dark:shadow-[0_8px_24px_-4px_rgba(59,130,246,0.6)] scale-105'
                : 'text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-105 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default Pagination;