import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Calendar,
  FileText,
  Camera,
  Upload,
  Target,
  Zap,
  Shield,
  Activity,
  MessageSquare,
  Bell,
  Settings as SettingsIcon,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Briefcase,
  Microscope,
  Beaker,
  FlaskConical,
  TestTube,
  X
} from 'lucide-react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import MetricCard from './MetricCard';
import Pagination from './Pagination';

interface Lab {
  id: string;
  name: string;
  description: string;
  location: string;
  specialties: string[];
  certifications: string[];
  status: 'active' | 'pending' | 'draft' | 'suspended';
  rating: number;
  totalProjects: number;
  activeProjects: number;
  revenue: string;
  responseTime: string;
  capacity: number;
  utilization: number;
  joinedDate: string;
  lastUpdated: string;
  image?: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  equipment: string[];
  availability: 'available' | 'busy' | 'full';
}

interface ProjectRequest {
  id: string;
  title: string;
  researcher: string;
  organization: string;
  type: string;
  budget: string;
  timeline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'declined';
  submittedDate: string;
  description: string;
  requirements: string[];
  estimatedValue: string;
}

const LabOwnerDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'labs' | 'requests' | 'analytics' | 'onboard'>('dashboard');
  const [myLabsViewMode, setMyLabsViewMode] = useState<'grid' | 'list'>('grid');
  const [recentRequestsViewMode, setRecentRequestsViewMode] = useState<'grid' | 'list'>('grid');
  const [labsViewMode, setLabsViewMode] = useState<'grid' | 'list'>('grid');
  const [requestsViewMode, setRequestsViewMode] = useState<'grid' | 'list'>('grid');
  const [dashboardLabsViewMode, setDashboardLabsViewMode] = useState<'grid' | 'list'>('grid');
  const [dashboardRequestsViewMode, setDashboardRequestsViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [showLabDetail, setShowLabDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [requestsPage, setRequestsPage] = useState(1);
  const [labsPage, setLabsPage] = useState(1);

  // Mock data for lab owner's laboratories
  const myLabs: Lab[] = [
    {
      id: '1',
      name: 'Advanced Genomics Laboratory',
      description: 'State-of-the-art genomic sequencing and analysis facility specializing in next-generation sequencing technologies',
      location: 'Stanford, CA',
      specialties: ['Genomics', 'NGS', 'Bioinformatics', 'Epigenetics'],
      certifications: ['CLIA', 'CAP', 'ISO 15189', 'GLP'],
      status: 'active',
      rating: 4.9,
      totalProjects: 156,
      activeProjects: 23,
      revenue: '$2.4M',
      responseTime: '< 2 hours',
      capacity: 50,
      utilization: 78,
      joinedDate: 'January 2023',
      lastUpdated: '2 hours ago',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      contact: {
        phone: '+1 (650) 555-0123',
        email: 'contact@advancedgenomics.com',
        website: 'https://advancedgenomics.com'
      },
      equipment: ['Illumina NovaSeq', 'Oxford Nanopore', 'PacBio Sequel', 'QIAGEN QIAcube'],
      availability: 'available'
    },
    {
      id: '2',
      name: 'Precision Proteomics Core',
      description: 'Comprehensive protein analysis facility offering mass spectrometry, protein purification, and structural analysis',
      location: 'Boston, MA',
      specialties: ['Proteomics', 'Mass Spectrometry', 'Protein Purification', 'Structural Biology'],
      certifications: ['ISO 17025', 'GLP', 'FDA Registered'],
      status: 'active',
      rating: 4.8,
      totalProjects: 89,
      activeProjects: 15,
      revenue: '$1.8M',
      responseTime: '< 4 hours',
      capacity: 30,
      utilization: 65,
      joinedDate: 'March 2023',
      lastUpdated: '1 day ago',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      contact: {
        phone: '+1 (617) 555-0456',
        email: 'info@precisionproteomics.com',
        website: 'https://precisionproteomics.com'
      },
      equipment: ['Orbitrap Fusion', 'Q Exactive', 'AKTA Pure', 'Biacore T200'],
      availability: 'busy'
    },
    {
      id: '3',
      name: 'Cell Culture Innovation Lab',
      description: 'Specialized cell culture facility with advanced bioreactor systems and stem cell capabilities',
      location: 'San Francisco, CA',
      specialties: ['Cell Culture', 'Stem Cells', 'Tissue Engineering', 'Bioreactors'],
      certifications: ['GMP', 'ISO 13485', 'FDA Registered'],
      status: 'pending',
      rating: 4.7,
      totalProjects: 42,
      activeProjects: 8,
      revenue: '$950K',
      responseTime: '< 6 hours',
      capacity: 20,
      utilization: 40,
      joinedDate: 'June 2023',
      lastUpdated: '3 days ago',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400',
      contact: {
        phone: '+1 (415) 555-0789',
        email: 'contact@cellculturelab.com',
        website: 'https://cellculturelab.com'
      },
      equipment: ['BioBLU Bioreactors', 'Incucyte Live Cell', 'BD FACSAria', 'Leica DMi8'],
      availability: 'available'
    }
  ];

  // Mock data for incoming project requests
  const projectRequests: ProjectRequest[] = [
    {
      id: 'REQ-2025-001',
      title: 'Whole Genome Sequencing for Rare Disease Study',
      researcher: 'Dr. Sarah Chen',
      organization: 'Stanford Medical School',
      type: 'Genomics',
      budget: '$15,000 - $25,000',
      timeline: '2-3 weeks',
      priority: 'high',
      status: 'new',
      submittedDate: '2 hours ago',
      description: 'We need comprehensive whole genome sequencing for 50 patient samples to identify rare genetic variants associated with a novel neurological disorder.',
      requirements: ['30x coverage minimum', 'Variant calling pipeline', 'CNV analysis', 'Quality reports'],
      estimatedValue: '$20,000'
    },
    {
      id: 'REQ-2025-002',
      title: 'Protein Expression and Purification',
      researcher: 'Dr. Michael Rodriguez',
      organization: 'MIT Biological Engineering',
      type: 'Proteomics',
      budget: '$8,000 - $12,000',
      timeline: '1-2 weeks',
      priority: 'medium',
      status: 'reviewing',
      submittedDate: '1 day ago',
      description: 'Expression and purification of recombinant proteins for structural studies. Need high purity and yield for crystallography experiments.',
      requirements: ['E. coli expression', '>95% purity', 'Endotoxin removal', 'Concentration >2mg/ml'],
      estimatedValue: '$10,000'
    },
    {
      id: 'REQ-2025-003',
      title: 'Single Cell RNA Sequencing Analysis',
      researcher: 'Dr. Emily Watson',
      organization: 'Harvard Stem Cell Institute',
      type: 'Genomics',
      budget: '$20,000 - $30,000',
      timeline: '3-4 weeks',
      priority: 'high',
      status: 'quoted',
      submittedDate: '3 days ago',
      description: 'Single cell RNA sequencing of neural stem cells under different differentiation conditions. Need comprehensive bioinformatics analysis.',
      requirements: ['10X Genomics platform', 'Cell Ranger analysis', 'Seurat pipeline', 'Pathway analysis'],
      estimatedValue: '$25,000'
    },
    {
      id: 'REQ-2025-004',
      title: 'Mass Spectrometry Metabolomics',
      researcher: 'Dr. James Liu',
      organization: 'UCSF Metabolomics Core',
      type: 'Mass Spectrometry',
      budget: '$5,000 - $8,000',
      timeline: '1 week',
      priority: 'medium',
      status: 'new',
      submittedDate: '6 hours ago',
      description: 'Untargeted metabolomics analysis of plasma samples from cancer patients. Need both positive and negative ionization modes.',
      requirements: ['LC-MS/MS', 'Untargeted analysis', 'Statistical analysis', 'Pathway mapping'],
      estimatedValue: '$6,500'
    }
  ];

  // Filter labs and requests
  const filteredLabs = myLabs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lab.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredRequests = projectRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Calculate metrics
  const totalLabs = myLabs.length;
  const activeLabs = myLabs.filter(l => l.status === 'active').length;
  const totalRevenue = myLabs.reduce((sum, lab) => sum + parseFloat(lab.revenue.replace(/[$MK,]/g, '')) * (lab.revenue.includes('M') ? 1000000 : lab.revenue.includes('K') ? 1000 : 1), 0);
  const newRequests = projectRequests.filter(r => r.status === 'new').length;

  const metrics = [
    {
      title: 'Active Labs',
      value: activeLabs,
      icon: Building2,
      color: 'blue' as const,
      trend: { value: '+2', isPositive: true },
      subtitle: 'Operational facilities'
    },
    {
      title: 'Total Revenue',
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'green' as const,
      trend: { value: '+18%', isPositive: true },
      subtitle: 'This year'
    },
    {
      title: 'New Requests',
      value: newRequests,
      icon: MessageSquare,
      color: 'orange' as const,
      trend: { value: '+5', isPositive: true },
      subtitle: 'Awaiting response'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      icon: Star,
      color: 'purple' as const,
      trend: { value: '+0.2', isPositive: true },
      subtitle: 'Customer satisfaction'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-50 border-green-200';
      case 'pending': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'draft': return 'text-gray-700 bg-gray-50 border-gray-200';
      case 'suspended': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'reviewing': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'quoted': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'accepted': return 'text-green-700 bg-green-50 border-green-200';
      case 'declined': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-700 bg-green-50 border-green-200';
      case 'busy': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'full': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Lab Owner Dashboard
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Manage your laboratory network and research partnerships
        </p>
      </div>

      {/* Metrics Overview */}
      <Section>
        <SectionHeader 
          title="Business Overview" 
          subtitle="Key performance metrics across your laboratory network"
        />
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </Section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Labs Overview */}
        <div className="col-span-2 space-y-8">
          <Section>
            <div className="flex items-center justify-between mb-6">
              <SectionHeader 
                title="My Laboratories" 
                subtitle={`${myLabs.length} facilities in your network`}
              />
              <button
                onClick={() => setActiveView('onboard')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lab</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {myLabs.slice(0, 4).map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
                  onClick={() => {
                    setSelectedLab(lab);
                    setShowLabDetail(true);
                  }}
                >
                  {/* Lab Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {lab.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(lab.status)}`}>
                          {lab.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{lab.location}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{lab.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{lab.activeProjects} active</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getAvailabilityColor(lab.availability)}`}>
                      {lab.availability}
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {lab.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {lab.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                        +{lab.specialties.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{lab.utilization}%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Utilization</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{lab.revenue}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setActiveView('labs')}
                className="px-6 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                View All Labs →
              </button>
            </div>
          </Section>
        </div>

        {/* Right Column - Recent Requests */}
        <div className="space-y-8">
          <Section>
            <SectionHeader 
              title="Recent Requests" 
              subtitle={`${newRequests} new requests`}
            />
            <div className="space-y-4">
              {projectRequests.slice(0, 4).map((request) => (
                <div
                  key={request.id}
                  className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {request.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {request.researcher} • {request.organization}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getRequestStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{request.budget}</span>
                    <span>{request.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <button
                onClick={() => setActiveView('requests')}
                className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors text-sm"
              >
                View All Requests →
              </button>
            </div>
          </Section>

          {/* Quick Actions */}
          <Section>
            <SectionHeader 
              title="Quick Actions" 
              subtitle="Common tasks and shortcuts"
            />
            <div className="space-y-3">
              <button
                onClick={() => setActiveView('onboard')}
                className="w-full flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add New Laboratory</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">View Analytics</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                <Download className="w-5 h-5" />
                <span className="font-medium">Export Reports</span>
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );

  const renderLabsManagement = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Laboratory Management
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Manage and monitor your laboratory facilities
          </p>
        </div>
        <button
          onClick={() => setActiveView('onboard')}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add Laboratory</span>
        </button>
      </div>

      {/* Filters */}
      <Section>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search laboratories..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredLabs.length} of {totalLabs} laboratories
          </div>
        </div>
      </Section>

      {/* Labs Grid */}
      <div className="grid grid-cols-2 gap-8">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
            onClick={() => {
              setSelectedLab(lab);
              setShowLabDetail(true);
            }}
          >
            {/* Lab Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl overflow-hidden">
                  {lab.image ? (
                    <img src={lab.image} alt={lab.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {lab.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{lab.location}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(lab.status)}`}>
                      {lab.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getAvailabilityColor(lab.availability)}`}>
                      {lab.availability}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Lab Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {lab.description}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-6">
              {lab.specialties.slice(0, 4).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
              {lab.specialties.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                  +{lab.specialties.length - 4}
                </span>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{lab.utilization}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Utilization</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{lab.revenue}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{lab.responseTime}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Response</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRequestsManagement = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Project Requests
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Manage incoming research requests and proposals
        </p>
      </div>

      {/* Request Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">New Requests</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{newRequests}</p>
          <p className="text-sm text-gray-500">Awaiting review</p>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">In Review</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {projectRequests.filter(r => r.status === 'reviewing').length}
          </p>
          <p className="text-sm text-gray-500">Being evaluated</p>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Quoted</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {projectRequests.filter(r => r.status === 'quoted').length}
          </p>
          <p className="text-sm text-gray-500">Proposals sent</p>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <DollarSign className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Potential Value</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">$61.5K</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </div>

      {/* Requests List */}
      <Section>
        <SectionHeader 
          title="Incoming Requests" 
          subtitle="Review and respond to research proposals"
        />
        
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {projectRequests.length} pending requests
          </span>
          <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
            <button
              onClick={() => setRequestsViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                requestsViewMode === 'grid'
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
              onClick={() => setRequestsViewMode('list')}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                requestsViewMode === 'list'
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
        
        {requestsViewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-6">
            {projectRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {request.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                        {request.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>From: {request.researcher}</span>
                      <span>•</span>
                      <span>{request.organization}</span>
                      <span>•</span>
                      <span>Submitted: {request.submittedDate}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {request.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {request.requirements.slice(0, 3).map((req, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                        >
                          {req}
                        </span>
                      ))}
                      {request.requirements.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                          +{request.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getRequestStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{request.estimatedValue}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Est. value</div>
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{request.type}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Research Type</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{request.budget}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Budget Range</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{request.timeline}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{request.submittedDate}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Submitted</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-6">
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium">
                    Send Quote
                  </button>
                  <button className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium">
                    Decline
                  </button>
                  <button className="px-4 py-3 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {projectRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {request.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{request.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <span>Requester: {request.researcher}</span>
                      <span>Budget: {request.estimatedValue}</span>
                      <span>Submitted: {request.submittedDate}</span>
                      <span>Timeline: {request.timeline}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{request.estimatedValue}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Est. Value</div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm font-medium">
                        Quote
                      </button>
                      <button className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm font-medium">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Target },
          { id: 'labs', label: 'My Labs', icon: Building2 },
          { id: 'requests', label: 'Requests', icon: MessageSquare },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'onboard', label: 'Add Lab', icon: Plus }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold ${
                activeView === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'labs' && renderLabsManagement()}
      {activeView === 'requests' && renderRequestsManagement()}
      {activeView === 'analytics' && (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600 dark:text-gray-400">Detailed analytics and reporting coming soon.</p>
        </div>
      )}
      {activeView === 'onboard' && <LabOnboarding onComplete={() => setActiveView('labs')} />}
    </div>
  );
};

// Lab Onboarding Component
interface LabOnboardingProps {
  onComplete: () => void;
}

const LabOnboarding: React.FC<LabOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    labName: '',
    description: '',
    labType: '',
    establishedYear: '',
    
    // Location & Contact
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    
    // Specialties & Services
    specialties: [] as string[],
    services: [] as string[],
    equipment: [] as string[],
    
    // Certifications & Compliance
    certifications: [] as string[],
    accreditations: [] as string[],
    qualityStandards: [] as string[],
    
    // Capacity & Operations
    capacity: '',
    operatingHours: '',
    responseTime: '',
    minimumProject: '',
    
    // Pricing & Terms
    hourlyRate: '',
    projectMinimum: '',
    rushSurcharge: '',
    paymentTerms: '',
    
    // Media & Documentation
    labImages: [] as File[],
    certificationDocs: [] as File[],
    equipmentSpecs: [] as File[]
  });

  const totalSteps = 6;

  const labTypes = [
    { id: 'academic', label: 'Academic Research Lab', icon: '🎓', description: 'University or research institution' },
    { id: 'commercial', label: 'Commercial Lab', icon: '🏢', description: 'Private commercial facility' },
    { id: 'government', label: 'Government Lab', icon: '🏛️', description: 'Federal or state facility' },
    { id: 'hospital', label: 'Hospital Lab', icon: '🏥', description: 'Clinical laboratory' },
    { id: 'biotech', label: 'Biotech Company', icon: '🧬', description: 'Biotechnology company lab' },
    { id: 'pharma', label: 'Pharmaceutical', icon: '💊', description: 'Pharmaceutical company lab' }
  ];

  const specialtyOptions = [
    'Genomics & Sequencing',
    'Proteomics & Mass Spectrometry',
    'Cell Culture & Tissue Engineering',
    'Microscopy & Imaging',
    'Biochemical Assays',
    'Histopathology',
    'Molecular Biology',
    'Bioinformatics',
    'Drug Discovery',
    'Clinical Diagnostics',
    'Environmental Testing',
    'Food Safety Testing',
    'Microbiology',
    'Immunology',
    'Toxicology',
    'Quality Control',
    'Research & Development',
    'Custom Synthesis'
  ];

  const certificationOptions = [
    'CLIA (Clinical Laboratory Improvement Amendments)',
    'CAP (College of American Pathologists)',
    'ISO 15189 (Medical Laboratories)',
    'ISO 17025 (Testing and Calibration)',
    'GLP (Good Laboratory Practice)',
    'GMP (Good Manufacturing Practice)',
    'FDA Registration',
    'AAALAC (Animal Care Accreditation)',
    'OSHA Compliance',
    'EPA Certification',
    'State Laboratory License',
    'HIPAA Compliance'
  ];

  const equipmentOptions = [
    // Genomics
    'Illumina NovaSeq 6000',
    'Illumina MiSeq',
    'Oxford Nanopore MinION',
    'PacBio Sequel II',
    'Applied Biosystems 3500',
    'QIAGEN QIAcube',
    
    // Proteomics
    'Thermo Orbitrap Fusion',
    'Waters Synapt G2-Si',
    'Agilent 6550 Q-TOF',
    'AKTA Pure FPLC',
    'Biacore T200',
    'NanoDrop Spectrophotometer',
    
    // Cell Culture
    'Thermo Heracell Incubators',
    'Eppendorf BioBLU Bioreactors',
    'BD FACSAria Cell Sorter',
    'Leica DMi8 Microscope',
    'IncuCyte Live Cell Imager',
    'Laminar Flow Hoods',
    
    // Microscopy
    'Zeiss LSM 880 Confocal',
    'Leica SP8 Confocal',
    'Nikon A1R Confocal',
    'Olympus FV3000',
    'JEOL JEM-1400 TEM',
    'Hitachi SU8010 SEM',
    
    // General Lab Equipment
    'Centrifuges (Various)',
    'PCR Thermal Cyclers',
    'Gel Electrophoresis Systems',
    'Plate Readers',
    'Liquid Handling Robots',
    'Freezers (-80°C, -20°C)',
    'Autoclaves',
    'Fume Hoods',
    'Analytical Balances',
    'pH Meters'
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Lab onboarding data:', formData);
    onComplete();
  };

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-12">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <React.Fragment key={step}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-sm transition-all duration-300 ${
                step === currentStep
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110'
                  : step < currentStep
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              }`}>
                {step < currentStep ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  step
                )}
              </div>
              {step < totalSteps && (
                <div className={`w-16 h-1 rounded-full transition-all duration-300 ${
                  step < currentStep 
                    ? 'bg-green-500' 
                    : step === currentStep 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Basic Information</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Tell us about your laboratory</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Laboratory Name *
          </label>
          <input
            type="text"
            value={formData.labName}
            onChange={(e) => setFormData(prev => ({ ...prev, labName: e.target.value }))}
            placeholder="Enter your laboratory name"
            className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Laboratory Type *
          </label>
          <div className="grid grid-cols-2 gap-4">
            {labTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, labType: type.id }))}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 group ${
                  formData.labType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{type.icon}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{type.label}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Provide a detailed description of your laboratory's capabilities, research focus, and unique strengths..."
            rows={6}
            className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Year Established
          </label>
          <input
            type="number"
            value={formData.establishedYear}
            onChange={(e) => setFormData(prev => ({ ...prev, establishedYear: e.target.value }))}
            placeholder="e.g., 2010"
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Location & Contact</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Where is your laboratory located?</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Street Address *
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            placeholder="123 Research Drive"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Stanford"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            State/Province *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            placeholder="CA"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            ZIP/Postal Code *
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
            placeholder="94305"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+1 (650) 555-0123"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="contact@yourlab.com"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Website (Optional)
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
          placeholder="https://yourlab.com"
          className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Specialties & Services</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">What services does your lab offer?</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Select Your Specialties *
        </label>
        <div className="grid grid-cols-3 gap-3">
          {specialtyOptions.map((specialty) => (
            <button
              key={specialty}
              type="button"
              onClick={() => toggleArrayItem(formData.specialties, specialty, (items) => setFormData(prev => ({ ...prev, specialties: items })))}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                formData.specialties.includes(specialty)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <div className="font-medium text-sm">{specialty}</div>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Selected: {formData.specialties.length} specialties
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Equipment & Capabilities</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">What equipment does your lab have?</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Select Your Equipment
        </label>
        <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-2">
            {equipmentOptions.map((equipment) => (
              <button
                key={equipment}
                type="button"
                onClick={() => toggleArrayItem(formData.equipment, equipment, (items) => setFormData(prev => ({ ...prev, equipment: items })))}
                className={`p-3 rounded-lg border transition-all duration-300 text-left text-sm ${
                  formData.equipment.includes(equipment)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'
                }`}
              >
                {equipment}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Selected: {formData.equipment.length} equipment items
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Lab Capacity (projects/month)
          </label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
            placeholder="e.g., 20"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Typical Response Time
          </label>
          <select
            value={formData.responseTime}
            onChange={(e) => setFormData(prev => ({ ...prev, responseTime: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Select response time</option>
            <option value="< 1 hour">Within 1 hour</option>
            <option value="< 2 hours">Within 2 hours</option>
            <option value="< 4 hours">Within 4 hours</option>
            <option value="< 8 hours">Within 8 hours</option>
            <option value="< 24 hours">Within 24 hours</option>
            <option value="1-2 days">1-2 business days</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Certifications & Compliance</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">What certifications does your lab hold?</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Select Your Certifications
        </label>
        <div className="grid grid-cols-2 gap-3">
          {certificationOptions.map((cert) => (
            <button
              key={cert}
              type="button"
              onClick={() => toggleArrayItem(formData.certifications, cert, (items) => setFormData(prev => ({ ...prev, certifications: items })))}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                formData.certifications.includes(cert)
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <div className="font-medium text-sm">{cert}</div>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Selected: {formData.certifications.length} certifications
        </p>
      </div>

      {/* File Upload for Certifications */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Upload Certification Documents (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">Drop files here or click to upload</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">PDF, JPG, PNG up to 10MB each</p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setFormData(prev => ({ ...prev, certificationDocs: Array.from(e.target.files!) }));
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Review & Submit</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Confirm your laboratory information</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 space-y-8">
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Laboratory Information</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Name:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.labName || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {labTypes.find(t => t.id === formData.labType)?.label || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Location:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Capabilities</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Specialties:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.specialties.length} selected</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Equipment:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.equipment.length} items</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Certifications:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.certifications.length} certifications</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">Description:</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {formData.description || 'No description provided'}
          </p>
        </div>

        {formData.specialties.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Selected Specialties:</h3>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Your laboratory will be reviewed within 24-48 hours</li>
              <li>• Our team will verify certifications and capabilities</li>
              <li>• You'll receive onboarding materials and training</li>
              <li>• Your lab will be added to our global network</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-12">
        {renderStepIndicator()}
        
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 shadow-lg">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 1 ? onComplete : prevStep}
            className="px-8 py-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-semibold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Submit for Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabOwnerDashboard