import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Star,
  MessageSquare,
  FileText,
  Eye,
  ArrowRight,
  Target,
  Award,
  Activity,
  DollarSign,
  MapPin,
  Building2,
  Beaker,
  Microscope,
  Plus,
  Edit3,
  MoreHorizontal,
  Zap,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  Download,
  Upload,
  Share2,
  Settings,
  Archive,
  Trash2
} from 'lucide-react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import MetricCard from './MetricCard';
import Pagination from './Pagination';

interface LabProject {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientOrganization: string;
  status: 'active' | 'pending' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  startDate: string;
  dueDate: string;
  budget: string;
  teamSize: number;
  category: string;
  methodology: string[];
  equipment: string[];
  lastUpdated: string;
  clientContact: {
    email: string;
    phone?: string;
  };
  deliverables: string[];
  milestones: {
    name: string;
    completed: boolean;
    dueDate: string;
  }[];
  revenue: string;
  profitMargin: number;
  riskLevel: 'low' | 'medium' | 'high';
  clientRating?: number;
  repeatClient: boolean;
}

const LabOwnerMyProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<LabProject | null>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  // Mock projects data
  const labProjects: LabProject[] = [
    {
      id: 'LAB-2025-001',
      title: 'Neural Network Protein Analysis',
      description: 'Advanced protein structure prediction using deep learning models for drug discovery applications',
      clientName: 'Dr. Richardson',
      clientOrganization: 'Stanford Research Institute',
      status: 'active',
      priority: 'high',
      progress: 78,
      startDate: 'Jan 10, 2025',
      dueDate: 'Mar 15, 2025',
      budget: '$125,000',
      teamSize: 8,
      category: 'AI/ML',
      methodology: ['Deep Learning', 'Protein Crystallography', 'Computational Biology'],
      equipment: ['GPU Cluster', 'X-ray Crystallography', 'Mass Spectrometer'],
      lastUpdated: '2 hours ago',
      clientContact: {
        email: 'richardson@stanford.edu',
        phone: '+1 (650) 555-0123'
      },
      deliverables: ['Protein Structure Models', 'Binding Affinity Analysis', 'Research Report'],
      milestones: [
        { name: 'Data Collection', completed: true, dueDate: 'Jan 25, 2025' },
        { name: 'Model Training', completed: true, dueDate: 'Feb 10, 2025' },
        { name: 'Analysis Phase', completed: false, dueDate: 'Feb 28, 2025' },
        { name: 'Final Report', completed: false, dueDate: 'Mar 15, 2025' }
      ],
      revenue: '$125,000',
      profitMargin: 35,
      riskLevel: 'low',
      clientRating: 4.9,
      repeatClient: true
    },
    {
      id: 'LAB-2025-002',
      title: 'Microbiome Sequencing Study',
      description: 'Comprehensive gut microbiome analysis for pharmaceutical research applications',
      clientName: 'Dr. Sarah Chen',
      clientOrganization: 'Biotech Innovations Inc.',
      status: 'active',
      priority: 'medium',
      progress: 62,
      startDate: 'Dec 15, 2024',
      dueDate: 'Aug 20, 2025',
      budget: '$89,000',
      teamSize: 6,
      category: 'Genomics',
      methodology: ['16S rRNA Sequencing', 'Metagenomics', 'Bioinformatics'],
      equipment: ['Illumina NovaSeq', 'Bioinformatics Workstation'],
      lastUpdated: '1 day ago',
      clientContact: {
        email: 'sarah.chen@biotech.com',
        phone: '+1 (555) 234-5678'
      },
      deliverables: ['Sequencing Data', 'Taxonomic Analysis', 'Functional Annotation'],
      milestones: [
        { name: 'Sample Processing', completed: true, dueDate: 'Jan 5, 2025' },
        { name: 'Sequencing', completed: true, dueDate: 'Jan 20, 2025' },
        { name: 'Data Analysis', completed: false, dueDate: 'Mar 1, 2025' },
        { name: 'Report Delivery', completed: false, dueDate: 'Aug 20, 2025' }
      ],
      revenue: '$89,000',
      profitMargin: 42,
      riskLevel: 'low',
      clientRating: 4.7,
      repeatClient: false
    },
    {
      id: 'LAB-2025-003',
      title: 'Drug Discovery Platform Development',
      description: 'Machine learning models for predicting molecular properties and drug-target interactions',
      clientName: 'Dr. Michael Rodriguez',
      clientOrganization: 'PharmaTech Solutions',
      status: 'pending',
      priority: 'high',
      progress: 15,
      startDate: 'Jan 20, 2025',
      dueDate: 'Dec 10, 2025',
      budget: '$200,000',
      teamSize: 12,
      category: 'Pharmaceutical',
      methodology: ['Machine Learning', 'Molecular Modeling', 'High-Throughput Screening'],
      equipment: ['HTS Platform', 'Computational Cluster', 'Chemical Library'],
      lastUpdated: '3 days ago',
      clientContact: {
        email: 'michael.rodriguez@pharmatech.com'
      },
      deliverables: ['ML Models', 'Screening Results', 'Validation Studies'],
      milestones: [
        { name: 'Project Kickoff', completed: true, dueDate: 'Jan 25, 2025' },
        { name: 'Data Preparation', completed: false, dueDate: 'Feb 15, 2025' },
        { name: 'Model Development', completed: false, dueDate: 'Jun 1, 2025' },
        { name: 'Validation & Delivery', completed: false, dueDate: 'Dec 10, 2025' }
      ],
      revenue: '$200,000',
      profitMargin: 28,
      riskLevel: 'medium',
      repeatClient: true
    },
    {
      id: 'LAB-2025-004',
      title: 'Quantum Molecular Simulation',
      description: 'Leveraging quantum computing algorithms for complex molecular dynamics simulations',
      clientName: 'Dr. James Wilson',
      clientOrganization: 'Quantum Research Labs',
      status: 'active',
      priority: 'high',
      progress: 45,
      startDate: 'Nov 1, 2024',
      dueDate: 'Jun 30, 2025',
      budget: '$180,000',
      teamSize: 10,
      category: 'Quantum Computing',
      methodology: ['Quantum Algorithms', 'Molecular Dynamics', 'Simulation'],
      equipment: ['Quantum Computer Access', 'HPC Cluster'],
      lastUpdated: '5 hours ago',
      clientContact: {
        email: 'james.wilson@quantumresearch.com',
        phone: '+1 (555) 345-6789'
      },
      deliverables: ['Simulation Results', 'Algorithm Documentation', 'Performance Analysis'],
      milestones: [
        { name: 'Algorithm Design', completed: true, dueDate: 'Dec 1, 2024' },
        { name: 'Implementation', completed: true, dueDate: 'Jan 15, 2025' },
        { name: 'Testing & Optimization', completed: false, dueDate: 'Apr 1, 2025' },
        { name: 'Final Delivery', completed: false, dueDate: 'Jun 30, 2025' }
      ],
      revenue: '$180,000',
      profitMargin: 31,
      riskLevel: 'high',
      clientRating: 4.8,
      repeatClient: false
    },
    {
      id: 'LAB-2025-005',
      title: 'CRISPR Gene Editing Optimization',
      description: 'Developing more precise and efficient CRISPR-Cas9 systems for therapeutic applications',
      clientName: 'Dr. Emily Watson',
      clientOrganization: 'Gene Therapy Institute',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      startDate: 'Aug 1, 2024',
      dueDate: 'Jan 15, 2025',
      budget: '$95,000',
      teamSize: 7,
      category: 'Genetics',
      methodology: ['CRISPR-Cas9', 'Gene Editing', 'Cell Culture'],
      equipment: ['Cell Culture Facility', 'Flow Cytometer', 'Sequencing Platform'],
      lastUpdated: '1 week ago',
      clientContact: {
        email: 'emily.watson@genetherapy.org',
        phone: '+1 (555) 456-7890'
      },
      deliverables: ['Optimized Protocols', 'Efficiency Reports', 'Safety Analysis'],
      milestones: [
        { name: 'Protocol Development', completed: true, dueDate: 'Sep 15, 2024' },
        { name: 'Testing Phase', completed: true, dueDate: 'Nov 1, 2024' },
        { name: 'Optimization', completed: true, dueDate: 'Dec 15, 2024' },
        { name: 'Final Report', completed: true, dueDate: 'Jan 15, 2025' }
      ],
      revenue: '$95,000',
      profitMargin: 38,
      riskLevel: 'low',
      clientRating: 4.9,
      repeatClient: true
    },
    {
      id: 'LAB-2025-006',
      title: 'Biomarker Discovery Platform',
      description: 'Multi-omics approach to identify novel biomarkers for early disease detection',
      clientName: 'Dr. Lisa Park',
      clientOrganization: 'Diagnostic Solutions Corp',
      status: 'active',
      priority: 'medium',
      progress: 67,
      startDate: 'Oct 1, 2024',
      dueDate: 'Sep 15, 2025',
      budget: '$145,000',
      teamSize: 9,
      category: 'Diagnostics',
      methodology: ['Proteomics', 'Metabolomics', 'Bioinformatics'],
      equipment: ['Mass Spectrometer', 'NMR Spectrometer', 'Data Analysis Cluster'],
      lastUpdated: '12 hours ago',
      clientContact: {
        email: 'lisa.park@diagnostics.com'
      },
      deliverables: ['Biomarker Panel', 'Validation Studies', 'Clinical Protocol'],
      milestones: [
        { name: 'Sample Collection', completed: true, dueDate: 'Nov 1, 2024' },
        { name: 'Multi-omics Analysis', completed: true, dueDate: 'Jan 15, 2025' },
        { name: 'Biomarker Validation', completed: false, dueDate: 'May 1, 2025' },
        { name: 'Clinical Protocol', completed: false, dueDate: 'Sep 15, 2025' }
      ],
      revenue: '$145,000',
      profitMargin: 33,
      riskLevel: 'medium',
      clientRating: 4.6,
      repeatClient: true
    }
  ];

  // Filter and sort projects
  let filteredProjects = labProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientOrganization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || project.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Sort projects
  filteredProjects.sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return b.progress - a.progress;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'due-date':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'budget':
        return parseInt(b.budget.replace(/[$,]/g, '')) - parseInt(a.budget.replace(/[$,]/g, ''));
      case 'client':
        return a.clientName.localeCompare(b.clientName);
      case 'recent':
      default:
        return 0;
    }
  });

  // Pagination
  const projectsPerPage = 6;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // Calculate stats
  const totalProjects = labProjects.length;
  const activeProjects = labProjects.filter(p => p.status === 'active').length;
  const completedProjects = labProjects.filter(p => p.status === 'completed').length;
  const pendingProjects = labProjects.filter(p => p.status === 'pending').length;
  const totalRevenue = labProjects.reduce((sum, p) => sum + parseInt(p.revenue.replace(/[$,]/g, '')), 0);
  const avgProgress = Math.round(labProjects.filter(p => p.status === 'active').reduce((sum, p) => sum + p.progress, 0) / activeProjects);
  const repeatClientRate = Math.round((labProjects.filter(p => p.repeatClient).length / totalProjects) * 100);

  const metrics = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: Target,
      color: 'blue' as const,
      trend: { value: '+3', isPositive: true },
      subtitle: 'All time'
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: Activity,
      color: 'green' as const,
      trend: { value: `${Math.round((activeProjects/totalProjects)*100)}%`, isPositive: true },
      subtitle: 'Currently running'
    },
    {
      title: 'Total Revenue',
      value: `$${(totalRevenue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'purple' as const,
      trend: { value: '+18%', isPositive: true },
      subtitle: 'This year'
    },
    {
      title: 'Avg Progress',
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: 'orange' as const,
      trend: { value: '+5%', isPositive: true },
      subtitle: 'Active projects'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: totalProjects },
    { value: 'active', label: 'Active', count: activeProjects },
    { value: 'pending', label: 'Pending', count: pendingProjects },
    { value: 'completed', label: 'Completed', count: completedProjects },
    { value: 'on-hold', label: 'On Hold', count: 1 },
    { value: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'ai/ml', label: 'AI/ML' },
    { value: 'genomics', label: 'Genomics' },
    { value: 'pharmaceutical', label: 'Pharmaceutical' },
    { value: 'quantum computing', label: 'Quantum Computing' },
    { value: 'genetics', label: 'Genetics' },
    { value: 'diagnostics', label: 'Diagnostics' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'progress', label: 'Progress' },
    { value: 'priority', label: 'Priority' },
    { value: 'due-date', label: 'Due Date' },
    { value: 'budget', label: 'Budget' },
    { value: 'client', label: 'Client Name' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-50 border-green-200';
      case 'pending': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'completed': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'on-hold': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'cancelled': return 'text-red-700 bg-red-50 border-red-200';
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleProjectClick = (project: LabProject) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const renderProjectCard = (project: LabProject) => (
    <div
      key={project.id}
      onClick={() => handleProjectClick(project)}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
              {project.id}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
            <span>Client: {project.clientName}</span>
            <span>Due: {project.dueDate}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-700"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{project.teamSize}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span>{project.budget}</span>
          </div>
        </div>
        <span>Updated: {project.lastUpdated}</span>
      </div>
    </div>
  );

  const renderProjectList = (project: LabProject) => (
    <div
      key={project.id}
      onClick={() => handleProjectClick(project)}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
              {project.id}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span>Client: {project.clientName} ({project.clientOrganization})</span>
            <span>Team: {project.teamSize} members</span>
            <span>Category: {project.category}</span>
            <span>Due: {project.dueDate}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{project.progress}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-700"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wide">REVENUE</span>
          </div>
          <p className="font-bold text-gray-900 dark:text-white text-sm">{project.revenue}</p>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wide">MARGIN</span>
          </div>
          <p className="font-bold text-gray-900 dark:text-white text-sm">{project.profitMargin}%</p>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wide">TEAM</span>
          </div>
          <p className="font-bold text-gray-900 dark:text-white text-sm">{project.teamSize} members</p>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wide">RISK</span>
          </div>
          <p className={`font-bold text-sm px-2 py-1 rounded-lg ${getRiskColor(project.riskLevel)}`}>
            {project.riskLevel}
          </p>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-gray-600/20">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wide">UPDATED</span>
          </div>
          <p className="font-bold text-gray-900 dark:text-white text-sm">{project.lastUpdated}</p>
        </div>
      </div>
    </div>
  );

  // Project Detail Modal
  const ProjectDetailModal = () => {
    if (!showProjectDetail || !selectedProject) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                  {selectedProject.id}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {selectedProject.clientName} • {selectedProject.clientOrganization}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setShowProjectDetail(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Project Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Methodology</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.methodology.map((method, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-medium">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Equipment Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.equipment.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-xl text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Project Milestones</h3>
                  <div className="space-y-3">
                    {selectedProject.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                        }`}>
                          {milestone.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{milestone.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Due: {milestone.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Project Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedProject.priority)}`}>
                        {selectedProject.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Budget:</span>
                      <span className="ml-2 font-bold text-gray-900 dark:text-white">{selectedProject.budget}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Revenue:</span>
                      <span className="ml-2 font-bold text-green-600 dark:text-green-400">{selectedProject.revenue}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Profit Margin:</span>
                      <span className="ml-2 font-bold text-gray-900 dark:text-white">{selectedProject.profitMargin}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Risk Level:</span>
                      <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-bold ${getRiskColor(selectedProject.riskLevel)}`}>
                        {selectedProject.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Client Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white font-medium">{selectedProject.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{selectedProject.clientOrganization}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{selectedProject.clientContact.email}</span>
                    </div>
                    {selectedProject.clientContact.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{selectedProject.clientContact.phone}</span>
                      </div>
                    )}
                    {selectedProject.clientRating && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-900 dark:text-white font-medium">{selectedProject.clientRating}/5.0</span>
                      </div>
                    )}
                    {selectedProject.repeatClient && (
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400 font-medium">Repeat Client</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Deliverables</h3>
                  <div className="space-y-2">
                    {selectedProject.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          My Projects
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Manage and track all laboratory projects and client collaborations
        </p>
      </div>

      {/* Project Metrics */}
      <Section>
        <SectionHeader 
          title="Project Overview" 
          subtitle="Key metrics and performance indicators"
        />
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </Section>

      {/* Filters */}
      <Section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>Sort by {option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredProjects.length} of {totalProjects} projects
            </span>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
              <button
                onClick={() => setViewMode('grid')}
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
                onClick={() => setViewMode('list')}
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
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>
      </Section>

      {/* Projects Display */}
      <Section>
        <SectionHeader 
          title={`${filteredProjects.length} Projects`}
          subtitle={`Showing ${paginatedProjects.length} of ${filteredProjects.length} projects`}
        />
        
        {paginatedProjects.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Projects Found</h3>
            <p className="text-gray-600 dark:text-gray-400">No projects match your current filters.</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-6">
                {paginatedProjects.map(renderProjectCard)}
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedProjects.map(renderProjectList)}
              </div>
            )}
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </Section>

      {/* Project Detail Modal */}
      <ProjectDetailModal />
    </div>
  );
};

export default LabOwnerMyProjects;