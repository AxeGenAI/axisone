import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  MoreHorizontal,
  UserPlus,
  Settings,
  Award,
  Clock,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Building2,
  Globe
} from 'lucide-react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import MetricCard from './MetricCard';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone?: string;
  location: string;
  joinedDate: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  activeProjects: number;
  completedTasks: number;
  rating: number;
  expertise: string[];
  lastActive: string;
}

const MyTeam: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock team data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Senior Research Scientist',
      department: 'Molecular Biology',
      email: 'sarah.chen@research.com',
      phone: '+1 (555) 123-4567',
      location: 'Stanford, CA',
      joinedDate: 'March 2023',
      avatar: 'SC',
      status: 'online',
      activeProjects: 4,
      completedTasks: 23,
      rating: 4.9,
      expertise: ['Molecular Biology', 'Protein Analysis', 'Bioinformatics'],
      lastActive: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      role: 'Bioinformatics Specialist',
      department: 'Data Science',
      email: 'michael.rodriguez@research.com',
      phone: '+1 (555) 234-5678',
      location: 'Boston, MA',
      joinedDate: 'January 2023',
      avatar: 'MR',
      status: 'away',
      activeProjects: 3,
      completedTasks: 31,
      rating: 4.8,
      expertise: ['Bioinformatics', 'Machine Learning', 'Data Analysis'],
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Dr. Emily Watson',
      role: 'Research Associate',
      department: 'Biochemistry',
      email: 'emily.watson@research.com',
      location: 'New York, NY',
      joinedDate: 'June 2023',
      avatar: 'EW',
      status: 'online',
      activeProjects: 2,
      completedTasks: 18,
      rating: 4.7,
      expertise: ['Biochemistry', 'Cell Culture', 'Microscopy'],
      lastActive: '5 minutes ago'
    },
    {
      id: '4',
      name: 'Dr. James Liu',
      role: 'Lab Manager',
      department: 'Operations',
      email: 'james.liu@research.com',
      phone: '+1 (555) 345-6789',
      location: 'San Francisco, CA',
      joinedDate: 'November 2022',
      avatar: 'JL',
      status: 'offline',
      activeProjects: 5,
      completedTasks: 42,
      rating: 4.9,
      expertise: ['Lab Management', 'Quality Control', 'Protocols'],
      lastActive: '2 days ago'
    },
    {
      id: '5',
      name: 'Dr. Lisa Park',
      role: 'Postdoctoral Fellow',
      department: 'Genetics',
      email: 'lisa.park@research.com',
      location: 'Seattle, WA',
      joinedDate: 'August 2023',
      avatar: 'LP',
      status: 'online',
      activeProjects: 3,
      completedTasks: 15,
      rating: 4.6,
      expertise: ['Genetics', 'CRISPR', 'Gene Therapy'],
      lastActive: '30 minutes ago'
    },
    {
      id: '6',
      name: 'Dr. Robert Kim',
      role: 'Data Analyst',
      department: 'Analytics',
      email: 'robert.kim@research.com',
      location: 'Austin, TX',
      joinedDate: 'February 2023',
      avatar: 'RK',
      status: 'away',
      activeProjects: 4,
      completedTasks: 28,
      rating: 4.8,
      expertise: ['Statistical Analysis', 'R Programming', 'Visualization'],
      lastActive: '3 hours ago'
    }
  ];

  // Filter team members
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'online' && member.status === 'online') ||
                         (filterBy === 'active' && member.activeProjects > 0) ||
                         (filterBy === 'recent' && member.lastActive.includes('minutes'));
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  // Calculate metrics
  const totalMembers = teamMembers.length;
  const onlineMembers = teamMembers.filter(m => m.status === 'online').length;
  const totalProjects = teamMembers.reduce((sum, m) => sum + m.activeProjects, 0);
  const completedTasks = teamMembers.reduce((sum, m) => sum + m.completedTasks, 0);

  const metrics = [
    {
      title: 'Team Members',
      value: totalMembers,
      icon: Users,
      color: 'blue' as const,
      trend: { value: '+2', isPositive: true },
      subtitle: 'Total researchers'
    },
    {
      title: 'Online Now',
      value: onlineMembers,
      icon: TrendingUp,
      color: 'green' as const,
      trend: { value: `${Math.round((onlineMembers/totalMembers)*100)}%`, isPositive: true },
      subtitle: 'Currently active'
    },
    {
      title: 'Active Projects',
      value: totalProjects,
      icon: CheckCircle2,
      color: 'orange' as const,
      trend: { value: '+5', isPositive: true },
      subtitle: 'Across all members'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'purple' as const,
      trend: { value: '+12', isPositive: true },
      subtitle: 'This month'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          My Team
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Manage your research team and collaborate effectively
        </p>
      </div>

      {/* Team Metrics */}
      <Section>
        <SectionHeader 
          title="Team Overview" 
          subtitle="Key metrics and team performance"
        />
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </Section>

      {/* Team Management */}
      <Section>
        <div className="flex items-center justify-between mb-6">
          <SectionHeader 
            title="Team Members" 
            subtitle={`${filteredMembers.length} active researchers`}
          />
          
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search team members..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Members</option>
              <option value="online">Online Only</option>
              <option value="active">Active Projects</option>
              <option value="recent">Recently Active</option>
            </select>
            
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Member Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white dark:border-gray-800`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Member Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span>{member.department}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{member.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Last active: {member.lastActive}</span>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {member.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                      +{member.expertise.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Member Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{member.activeProjects}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{member.completedTasks}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
                
                <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
                
                {member.phone && (
                  <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Team Members Found</h3>
            <p className="text-gray-600 dark:text-gray-400">No team members match your current search criteria.</p>
          </div>
        )}
      </Section>

      {/* Invite Modal Placeholder */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Invite Team Member</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Send an invitation to join your research team.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>Select Role</option>
                <option>Research Scientist</option>
                <option>Research Associate</option>
                <option>Postdoctoral Fellow</option>
                <option>Lab Manager</option>
                <option>Data Analyst</option>
              </select>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeam;