import React from 'react';
import { MapPin, Star, Clock, Users, Award, Phone, Mail, Globe, Calendar } from 'lucide-react';

interface Lab {
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  distance: string;
  responseTime: string;
  activeProjects: number;
  verified: boolean;
  image?: string;
  description?: string;
  contact?: {
    phone: string;
    email: string;
    website: string;
  };
  availability?: string;
  certifications?: string[];
}

interface LabListViewProps {
  labs: Lab[];
}

const LabListView: React.FC<LabListViewProps> = ({ labs }) => {
  return (
    <div className="space-y-6">
      {labs.map((lab, index) => (
        <div
          key={index}
          className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.12),0_8px_24px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.4),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:bg-white/95 dark:hover:bg-gray-800/95 hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
        >
          <div className="flex items-start space-x-6">
            {/* Lab Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-900/30 dark:via-blue-800/30 dark:to-indigo-900/30 rounded-2xl overflow-hidden shadow-lg">
                {lab.image ? (
                  <img src={lab.image} alt={lab.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {lab.name}
                    </h3>
                    {lab.verified && (
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-[0_4px_16px_-2px_rgba(34,197,94,0.4)]">
                        <Award className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{lab.location} • {lab.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">{lab.rating}</span>
                    </div>
                  </div>

                  {lab.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {lab.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {lab.specialties.slice(0, 4).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold shadow-[0_2px_8px_-2px_rgba(59,130,246,0.2)] border border-blue-200/40 dark:border-blue-800/40"
                      >
                        {specialty}
                      </span>
                    ))}
                    {lab.specialties.length > 4 && (
                      <span className="px-3 py-1 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-gray-200/40 dark:border-gray-600/40">
                        +{lab.specialties.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col space-y-2 ml-6">
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-[0_4px_16px_-4px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(59,130,246,0.5)] hover:scale-105">
                    Contact Lab
                  </button>
                  <button className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100/80 dark:border-gray-700/80">
                <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium tracking-wide">RESPONSE</span>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{lab.responseTime}</p>
                </div>
                
                <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-medium tracking-wide">PROJECTS</span>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{lab.activeProjects} active</p>
                </div>
                
                <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-medium tracking-wide">AVAILABILITY</span>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{lab.availability || 'Available'}</p>
                </div>
                
                <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Star className="w-4 h-4" />
                    <span className="text-xs font-medium tracking-wide">RATING</span>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{lab.rating}/5.0</p>
                </div>
              </div>

              {/* Contact Information */}
              {lab.contact && (
                <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-100/80 dark:border-gray-700/80">
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{lab.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{lab.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Globe className="w-4 h-4" />
                    <span>{lab.contact.website}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabListView;