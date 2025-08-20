import React from 'react';
import { MapPin, Star, Clock, Users, Award } from 'lucide-react';

interface LabCardProps {
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  distance: string;
  responseTime: string;
  activeProjects: number;
  verified: boolean;
  image?: string;
}

const LabCard: React.FC<LabCardProps> = ({
  name,
  location,
  rating,
  specialties,
  distance,
  responseTime,
  activeProjects,
  verified,
  image
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
      {/* Lab Image */}
      <div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 relative overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        )}
        {verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white">
            <Award className="w-2.5 h-2.5" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate text-xs">{location} • {distance}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {specialties.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-xs font-medium"
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
              +{specialties.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{responseTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{activeProjects} active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabCard;