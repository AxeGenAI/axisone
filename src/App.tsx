import React, { useState } from 'react';
import { 
  Globe,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Building2,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Settings as SettingsIcon
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Section from './components/Section';
import SectionHeader from './components/SectionHeader';
import MetricCard from './components/MetricCard';
import ProjectCard from './components/ProjectCard';
import RequestCard from './components/RequestCard';
import LabCard from './components/LabCard';
import ActivityFeed from './components/ActivityFeed';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';
import ProjectFilters from './components/ProjectFilters';
import ProjectListView from './components/ProjectListView';
import ProjectStats from './components/ProjectStats';
import RequestForm from './components/RequestForm';
import RequestSuccess from './components/RequestSuccess';
import LabFilters from './components/LabFilters';
import LabListView from './components/LabListView';
import LabStats from './components/LabStats';
import InviteModal from './components/InviteModal';
import CollaborationView from './components/CollaborationView';
import CollaboratorDashboard from './components/CollaboratorDashboard';
import CollaboratorMyProjects from './components/CollaboratorMyProjects';
import CollaboratorProfile from './components/CollaboratorProfile';
import CollaboratorHelp from './components/CollaboratorHelp';
import HomePage from './components/HomePage';
import LabOwnerDashboard from './components/LabOwnerDashboard';
import MyTeam from './components/MyTeam';
import Help from './components/Help';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Support from './components/Support';

function App() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [requestsPage, setRequestsPage] = useState(1);
  const [labsPage, setLabsPage] = useState(1);
  const [activeProjectsPage, setActiveProjectsPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);
  
  
  // My Projects page state
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('all');
  const [projectSortBy, setProjectSortBy] = useState('recent');
  const [projectViewMode, setProjectViewMode] = useState<'grid' | 'list'>('grid');
  const requestsPerPage = 6;
  
  // Nearby Labs page state
  const [labSearchTerm, setLabSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [labSortBy, setLabSortBy] = useState('distance');
  const [labViewMode, setLabViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  
  // Dashboard view modes
  const [activeProjectsViewMode, setActiveProjectsViewMode] = useState<'grid' | 'list'>('grid');
  const [recentRequestsViewMode, setRecentRequestsViewMode] = useState<'grid' | 'list'>('grid');
  const [nearbyLabsViewMode, setNearbyLabsViewMode] = useState<'grid' | 'list'>('grid');
  const [activityViewMode, setActivityViewMode] = useState<'feed' | 'compact'>('feed');
  
  // New Request page state
  const [showRequestForm, setShowRequestForm] = useState(true);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  
  // Collaboration state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCollaborationView, setShowCollaborationView] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [userType, setUserType] = useState<'researcher' | 'collaborator' | 'lab-owner'>('researcher');
  const [showHomePage, setShowHomePage] = useState(true);
  
  // Initialize user type from localStorage
  React.useEffect(() => {
    const savedUserType = localStorage.getItem('userType') as 'researcher' | 'collaborator';
    if (savedUserType) {
      setUserType(savedUserType);
    }
  }, []);
  
  // Handle sidebar navigation
  const handleItemClick = (item: string) => {
    if (item === 'switch-researcher') {
      setUserType('researcher');
      localStorage.setItem('userType', 'researcher');
      setActiveItem('dashboard');
    } else if (item === 'switch-collaborator') {
      setUserType('collaborator');
      localStorage.setItem('userType', 'collaborator');
      setActiveItem('dashboard');
    } else if (item === 'switch-lab-owner') {
      setUserType('lab-owner');
      localStorage.setItem('userType', 'lab-owner');
      setActiveItem('dashboard');
    } else {
      setActiveItem(item);
    }
  };
  
  // Handle role selection from homepage
  const handleRoleSelect = (role: 'researcher' | 'collaborator') => {
    setUserType(role);
    localStorage.setItem('userType', role);
    setShowHomePage(false);
  };
  
  const labsPerPage = 4;
  const activeProjectsPerPage = 6;

  // Synthetic data for metrics
  const metrics = [
    {
      title: 'Total Requests',
      value: 247,
      icon: Globe,
      color: 'blue' as const,
      trend: { value: '+12%', isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Active Projects',
      value: 18,
      icon: TrendingUp,
      color: 'orange' as const,
      trend: { value: '+8%', isPositive: true },
      subtitle: 'In progress'
    },
    {
      title: 'Lab Partners',
      value: 127,
      icon: Users,
      color: 'green' as const,
      trend: { value: '+25%', isPositive: true },
      subtitle: 'Global network'
    },
    {
      title: 'Success Rate',
      value: '94%',
      icon: CheckCircle,
      color: 'purple' as const,
      trend: { value: '+2%', isPositive: true },
      subtitle: 'Project completion'
    }
  ];

  // Synthetic data for active projects
  const activeProjects = [
    {
      id: '1',
      title: 'Neural Network Analysis',
      description: 'Deep learning models for protein structure prediction and drug discovery applications',
      status: 'active' as const,
      progress: 78,
      collaborators: 12,
      budget: '$125,000',
      deadline: 'Mar 2025',
      lastUpdated: '2 days ago',
      priority: 'high' as const,
      category: 'AI/ML'
    },
    {
      id: '2',
      title: 'Microbiome Research',
      description: 'Investigating how gut microbiome composition affects drug metabolism and efficacy',
      status: 'active' as const,
      progress: 62,
      collaborators: 9,
      budget: '$89,000',
      deadline: 'Aug 2025',
      lastUpdated: '1 day ago',
      priority: 'medium' as const,
      category: 'Biology'
    },
    {
      id: '3',
      title: 'AI-Driven Drug Discovery Platform',
      description: 'Machine learning models for predicting molecular properties and drug-target interactions',
      status: 'pending' as const,
      progress: 15,
      collaborators: 15,
      budget: '$200,000',
      deadline: 'Dec 2025',
      lastUpdated: '3 days ago',
      priority: 'high' as const,
      category: 'Pharmaceutical'
    },
    {
      id: '4',
      title: 'Quantum Computing for Molecular Simulation',
      description: 'Leveraging quantum algorithms for complex molecular dynamics simulations',
      status: 'active' as const,
      progress: 45,
      collaborators: 8,
      budget: '$180,000',
      deadline: 'Jun 2025',
      lastUpdated: '5 hours ago',
      priority: 'high' as const,
      category: 'Quantum Computing'
    },
    {
      id: '5',
      title: 'CRISPR Gene Editing Optimization',
      description: 'Developing more precise and efficient CRISPR-Cas9 systems for therapeutic applications',
      status: 'completed' as const,
      progress: 100,
      collaborators: 14,
      budget: '$95,000',
      deadline: 'Jan 2025',
      lastUpdated: '1 week ago',
      priority: 'medium' as const,
      category: 'Genetics'
    },
    {
      id: '6',
      title: 'Biomarker Discovery Platform',
      description: 'Multi-omics approach to identify novel biomarkers for early disease detection',
      status: 'active' as const,
      progress: 67,
      collaborators: 11,
      budget: '$145,000',
      deadline: 'Sep 2025',
      lastUpdated: '12 hours ago',
      priority: 'medium' as const,
      category: 'Diagnostics'
    },
    {
      id: '7',
      title: 'Synthetic Biology Chassis Development',
      description: 'Engineering standardized biological chassis for scalable biotechnology applications',
      status: 'pending' as const,
      progress: 25,
      collaborators: 7,
      budget: '$110,000',
      deadline: 'Nov 2025',
      lastUpdated: '4 days ago',
      priority: 'low' as const,
      category: 'Synthetic Biology'
    },
    {
      id: '8',
      title: 'Personalized Medicine Algorithm',
      description: 'AI-powered system for personalized treatment recommendations based on genetic profiles',
      status: 'active' as const,
      progress: 83,
      collaborators: 16,
      budget: '$220,000',
      deadline: 'Apr 2025',
      lastUpdated: '8 hours ago',
      priority: 'high' as const,
      category: 'Personalized Medicine'
    },
    {
      id: '9',
      title: 'Nanotechnology Drug Delivery',
      description: 'Developing targeted nanoparticle systems for precise drug delivery to cancer cells',
      status: 'completed' as const,
      progress: 100,
      collaborators: 10,
      budget: '$165,000',
      deadline: 'Dec 2024',
      lastUpdated: '2 weeks ago',
      priority: 'high' as const,
      category: 'Nanotechnology'
    },
    {
      id: '10',
      title: 'Stem Cell Therapy Optimization',
      description: 'Enhancing stem cell differentiation protocols for regenerative medicine applications',
      status: 'pending' as const,
      progress: 35,
      collaborators: 12,
      budget: '$135,000',
      deadline: 'Oct 2025',
      lastUpdated: '6 days ago',
      priority: 'medium' as const,
      category: 'Regenerative Medicine'
    },
    {
      id: '11',
      title: 'Immunotherapy Enhancement Platform',
      description: 'Novel approaches to boost immune system response against cancer and autoimmune diseases',
      status: 'active' as const,
      progress: 56,
      collaborators: 13,
      budget: '$190,000',
      deadline: 'Jul 2025',
      lastUpdated: '1 day ago',
      priority: 'high' as const,
      category: 'Immunology'
    },
    {
      id: '12',
      title: 'Digital Pathology AI System',
      description: 'Machine learning models for automated histopathological analysis and diagnosis',
      status: 'completed' as const,
      progress: 100,
      collaborators: 9,
      budget: '$120,000',
      deadline: 'Nov 2024',
      lastUpdated: '3 weeks ago',
      priority: 'medium' as const,
      category: 'Digital Health'
    }
  ];

  // Synthetic data for recent requests
  const recentRequests = [
    {
      title: 'Genomic Sequencing',
      status: 'completed' as const,
      submittedDate: 'January 15, 2025',
      description: 'Whole genome sequencing for rare disease identification',
      labName: 'Mayo Clinic Pathology',
      estimatedCompletion: 'Completed',
      priority: 'high' as const
    },
    {
      title: 'Protein Crystallography',
      status: 'pending' as const,
      submittedDate: 'January 12, 2025',
      description: 'X-ray crystallography for enzyme structure determination',
      labName: 'Stanford Genomics Institute',
      estimatedCompletion: '3-5 days',
      priority: 'high' as const
    },
    {
      title: 'Cell Culture Analysis',
      status: 'pending' as const,
      submittedDate: 'January 10, 2025',
      description: 'Comprehensive transcriptomic analysis of neural progenitor cells',
      labName: 'UCSF Precision Medicine Lab',
      estimatedCompletion: '7-10 days',
      priority: 'medium' as const
    },
    {
      title: 'Mass Spectrometry',
      status: 'pending' as const,
      submittedDate: 'January 8, 2025',
      description: 'Proteomics analysis using high-resolution mass spectrometry',
      labName: 'MIT Proteomics Core',
      estimatedCompletion: '4-6 days',
      priority: 'high' as const
    },
    {
      title: 'Confocal Microscopy',
      status: 'completed' as const,
      submittedDate: 'January 5, 2025',
      description: 'High-resolution confocal microscopy for protein localization studies',
      labName: 'Harvard Imaging Core',
      estimatedCompletion: '2-3 days',
      priority: 'medium' as const
    },
    {
      title: 'Flow Cytometry',
      status: 'pending' as const,
      submittedDate: 'January 4, 2025',
      description: 'Multi-parameter cell sorting and phenotypic characterization',
      labName: 'Yale Flow Cytometry',
      estimatedCompletion: '3-4 days',
      priority: 'low' as const
    },
    {
      title: 'Biochemical Assays',
      status: 'pending' as const,
      submittedDate: 'January 2, 2025',
      description: 'Enzyme kinetics and inhibition studies for drug development',
      labName: 'Johns Hopkins Biochem',
      estimatedCompletion: '5-7 days',
      priority: 'high' as const
    },
    {
      title: 'Metabolomics Profiling',
      status: 'completed' as const,
      submittedDate: 'January 13, 2025',
      description: 'Comprehensive metabolite analysis using LC-MS/MS technology',
      labName: 'UC Berkeley Metabolomics',
      estimatedCompletion: '5-7 days',
      priority: 'medium' as const
    },
    {
      title: 'Histopathology Analysis',
      status: 'completed' as const,
      submittedDate: 'January 3, 2025',
      description: 'Digital pathology assessment of tissue samples with AI-assisted diagnosis',
      labName: 'Cleveland Clinic Pathology',
      estimatedCompletion: '4-5 days',
      priority: 'high' as const
    }
  ];

  // Synthetic data for nearby labs
  const nearbyLabs = [
    {
      name: 'Mayo Clinic Pathology',
      location: 'Rochester, MN',
      rating: 4.9,
      specialties: ['Genomics', 'Pathology', 'Molecular Diagnostics'],
      distance: '2.3 km',
      responseTime: '< 2 hours',
      activeProjects: 156,
      verified: true,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Stanford Genomics Institute',
      location: 'Stanford, CA',
      rating: 4.8,
      specialties: ['Genomics', 'Bioinformatics', 'Precision Medicine'],
      distance: '3,200 km',
      responseTime: '< 1 hour',
      activeProjects: 89,
      verified: true,
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'MIT Proteomics Core',
      location: 'Cambridge, MA',
      rating: 4.9,
      specialties: ['Mass Spectrometry', 'Proteomics', 'Structural Biology'],
      distance: '4,850 km',
      responseTime: '< 3 hours',
      activeProjects: 42,
      verified: true,
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Harvard Imaging Core',
      location: 'Boston, MA',
      rating: 4.8,
      specialties: ['Microscopy', 'Imaging', 'Cell Biology'],
      distance: '4,860 km',
      responseTime: '< 4 hours',
      activeProjects: 28,
      verified: true,
      image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  // Collaboration handlers
  const handleInviteClick = (projectId: string) => {
    const project = activeProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setShowInviteModal(true);
    }
  };

  const handleCollaborateClick = (projectId: string) => {
    const project = activeProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setShowCollaborationView(true);
    }
  };
  
  const handleOpenProject = (project: any) => {
    setSelectedProject(project);
    setShowCollaborationView(true);
  };

  const handleInviteSent = (invites: any[]) => {
    console.log('Invites sent:', invites);
    // Here you would typically send the invites to your backend
    setShowInviteModal(false);
    setSelectedProject(null);
  };

  const renderDashboard = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div>
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Welcome back, Dr. Richardson
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Your research ecosystem at a glance
          </p>
        </div>

        {/* Metrics Section */}
        <Section>
          <SectionHeader 
            title="Overview" 
            subtitle="Key metrics and performance indicators"
          />
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </Section>
      </div>

      {/* Active Projects and Recent Activity - Side by Side */}
      <div className="grid grid-cols-2 gap-8">
        <Section>
          <SectionHeader 
            title="Active Projects" 
            subtitle="Currently running research initiatives"
            actionText="View All"
            onAction={() => setActiveItem('projects')}
          />
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {activeProjects.slice((activeProjectsPage - 1) * activeProjectsPerPage, activeProjectsPage * activeProjectsPerPage).length} of {activeProjects.length} projects
            </span>
            <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
              <button
                onClick={() => setActiveProjectsViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  activeProjectsViewMode === 'grid'
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
                onClick={() => setActiveProjectsViewMode('list')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  activeProjectsViewMode === 'list'
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
          
          {activeProjectsViewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-6">
            {activeProjects
              .slice((activeProjectsPage - 1) * activeProjectsPerPage, activeProjectsPage * activeProjectsPerPage)
              .map((project, index) => (
              <ProjectCard 
                key={index} 
                {...project} 
                onInviteClick={() => handleInviteClick(project.id)}
                onCollaborateClick={() => handleCollaborateClick(project.id)}
              />
            ))}
          </div>
          ) : (
            <div className="space-y-4">
              {activeProjects
                .slice((activeProjectsPage - 1) * activeProjectsPerPage, activeProjectsPage * activeProjectsPerPage)
                .map((project) => (
                <div
                  key={project.id}
                  className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                          project.priority === 'high' ? 'text-red-700 bg-red-50 border-red-200' :
                          project.priority === 'medium' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' :
                          'text-gray-700 bg-gray-50 border-gray-200'
                        }`}>
                          {project.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <span>Budget: {project.budget}</span>
                        <span>Team: {project.collaborators} members</span>
                        <span>Due: {project.deadline}</span>
                        <span>Updated: {project.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{project.progress}%</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCollaborateClick(project.id);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm font-medium"
                        >
                          Open
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInviteClick(project.id);
                          }}
                          className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 text-sm font-medium"
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Pagination
            currentPage={activeProjectsPage}
            totalPages={Math.ceil(activeProjects.length / activeProjectsPerPage)}
            onPageChange={setActiveProjectsPage}
          />
        </Section>

        <Section>
          <SectionHeader 
            title="Recent Activity" 
            subtitle="Latest updates and notifications"
          />
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Latest updates and notifications
            </span>
            <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
              <button
                onClick={() => setActivityViewMode('feed')}
                className={`px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  activityViewMode === 'feed'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.4)]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60'
                }`}
              >
                Feed
              </button>
              <button
                onClick={() => setActivityViewMode('compact')}
                className={`px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  activityViewMode === 'compact'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.4)]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60'
                }`}
              >
                Compact
              </button>
            </div>
          </div>
          
          <ActivityFeed viewMode={activityViewMode} />
        </Section>
      </div>

      {/* Recent Requests and Nearby Labs - Side by Side with Pagination */}
      <div className="grid grid-cols-2 gap-8">
        <Section>
          <SectionHeader 
            title="Recent Requests" 
            subtitle="Your latest research submissions"
            actionText="View All"
            onAction={() => setActiveItem('new-request')}
          />
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {recentRequests.slice((requestsPage - 1) * requestsPerPage, requestsPage * requestsPerPage).length} of {recentRequests.length} requests
            </span>
            <div className="flex items-center bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/40 dark:border-gray-700/40">
              <button
                onClick={() => setRecentRequestsViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  recentRequestsViewMode === 'grid'
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
                onClick={() => setRecentRequestsViewMode('list')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  recentRequestsViewMode === 'list'
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
          
          {recentRequestsViewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-6">
            {recentRequests
              .slice((requestsPage - 1) * requestsPerPage, requestsPage * requestsPerPage)
              .map((request, index) => (
                <RequestCard key={index} {...request} />
              ))}
          </div>
          ) : (
            <div className="space-y-4">
              {recentRequests
                .slice((requestsPage - 1) * requestsPerPage, requestsPage * requestsPerPage)
                .map((request, index) => (
                <div
                  key={index}
                  className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/25 dark:border-gray-700/25 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {request.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          request.status === 'completed' ? 'text-green-700 bg-green-50 border-green-200' :
                          request.status === 'pending' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                          'text-blue-700 bg-blue-50 border-blue-200'
                        }`}>
                          {request.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                          request.priority === 'high' ? 'text-red-700 bg-red-50 border-red-200' :
                          request.priority === 'medium' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' :
                          'text-gray-700 bg-gray-50 border-gray-200'
                        }`}>
                          {request.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{request.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <span>Lab: {request.labName}</span>
                        <span>Submitted: {request.submittedDate}</span>
                        <span>Completion: {request.estimatedCompletion}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Pagination
            currentPage={requestsPage}
            totalPages={Math.ceil(recentRequests.length / requestsPerPage)}
            onPageChange={setRequestsPage}
          />
        </Section>

        <Section>
          <SectionHeader 
            title="Nearby Labs" 
            subtitle="Discover laboratories in your network"
            actionText="Explore All"
            onAction={() => setActiveItem('nearby-labs')}
          />
          <div className="grid grid-cols-3 gap-4">
            {nearbyLabs
              .slice((labsPage - 1) * labsPerPage, labsPage * labsPerPage)
              .map((lab, index) => (
                <LabCard key={index} {...lab} />
              ))}
          </div>
          <Pagination
            currentPage={labsPage}
            totalPages={Math.ceil(nearbyLabs.length / labsPerPage)}
            onPageChange={setLabsPage}
          />
        </Section>
        </div>
    </div>
  );

  const renderMyProjects = () => {
    // Filter and sort projects
    let filteredProjects = activeProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
                           project.category.toLowerCase().includes(projectSearchTerm.toLowerCase());
      
      const matchesStatus = projectStatusFilter === 'all' || project.status === projectStatusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort projects
    filteredProjects.sort((a, b) => {
      switch (projectSortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'budget':
          return parseInt(b.budget.replace(/[$,]/g, '')) - parseInt(a.budget.replace(/[$,]/g, ''));
        case 'collaborators':
          return b.collaborators - a.collaborators;
        case 'recent':
        default:
          return 0; // Keep original order for recent
      }
    });

    // Pagination
    const projectsPerPage = 6;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const paginatedProjects = filteredProjects.slice(
      (projectsPage - 1) * projectsPerPage,
      projectsPage * projectsPerPage
    );

    // Calculate stats
    const totalProjects = activeProjects.length;
    const activeCount = activeProjects.filter(p => p.status === 'active').length;
    const completedCount = activeProjects.filter(p => p.status === 'completed').length;
    const pendingCount = activeProjects.filter(p => p.status === 'pending').length;
    const totalBudget = activeProjects.reduce((sum, p) => sum + parseInt(p.budget.replace(/[$,]/g, '')), 0);
    const totalCollaborators = activeProjects.reduce((sum, p) => sum + p.collaborators, 0);
    const avgProgress = Math.round(activeProjects.reduce((sum, p) => sum + p.progress, 0) / activeProjects.length);

    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            My Projects
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            Manage and track your research initiatives across the global network
          </p>
        </div>

        {/* Project Stats */}
        <ProjectStats
          totalProjects={totalProjects}
          activeProjects={activeCount}
          completedProjects={completedCount}
          pendingProjects={pendingCount}
          totalBudget={`$${(totalBudget / 1000).toFixed(0)}K`}
          totalCollaborators={totalCollaborators}
          avgProgress={avgProgress}
          upcomingDeadlines={3}
        />

        {/* Filters */}
        <ProjectFilters
          searchTerm={projectSearchTerm}
          onSearchChange={setProjectSearchTerm}
          statusFilter={projectStatusFilter}
          onStatusFilterChange={setProjectStatusFilter}
          sortBy={projectSortBy}
          onSortChange={setProjectSortBy}
          viewMode={projectViewMode}
          onViewModeChange={setProjectViewMode}
        />

        {/* Projects Display */}
        <Section>
          <SectionHeader 
            title={`${filteredProjects.length} Projects`}
            subtitle={`Showing ${paginatedProjects.length} of ${filteredProjects.length} projects`}
          />
          
          {paginatedProjects.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No Projects Found"
              description="No projects match your current filters. Try adjusting your search criteria."
              actionText="Clear Filters"
              onAction={() => {
                setProjectSearchTerm('');
                setProjectStatusFilter('all');
                setProjectSortBy('recent');
              }}
            />
          ) : (
            <>
              {projectViewMode === 'grid' ? (
                <div className="grid grid-cols-3 gap-8">
                  {paginatedProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      {...project} 
                      onInviteClick={() => handleInviteClick(project.id)}
                      onCollaborateClick={() => handleCollaborateClick(project.id)}
                    />
                  ))}
                </div>
              ) : (
                <ProjectListView 
                  projects={paginatedProjects.map(project => ({
                    ...project,
                    onInviteClick: handleInviteClick,
                    onCollaborateClick: handleCollaborateClick
                  }))} 
                />
              )}
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={projectsPage}
                  totalPages={totalPages}
                  onPageChange={setProjectsPage}
                />
              )}
            </>
          )}
        </Section>
      </div>
    );
  };

  const renderNewRequest = () => {
    if (submittedRequestId) {
      return (
        <RequestSuccess
          requestId={submittedRequestId}
          onViewDashboard={() => {
            setActiveItem('dashboard');
            setSubmittedRequestId(null);
            setShowRequestForm(true);
          }}
          onCreateAnother={() => {
            setSubmittedRequestId(null);
            setShowRequestForm(true);
          }}
        />
      );
    }

    if (showRequestForm) {
      return (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              New Research Request
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              Connect with world-class laboratories for your research needs
            </p>
          </div>
          
          <RequestForm
            onSubmit={(data) => {
              console.log('Request submitted:', data);
              // Generate a mock request ID
              const requestId = `REQ-${Date.now().toString().slice(-6)}`;
              setSubmittedRequestId(requestId);
              setShowRequestForm(false);
            }}
            onCancel={() => {
              setActiveItem('dashboard');
              setShowRequestForm(true);
              setSubmittedRequestId(null);
            }}
          />
        </div>
      );
    }

    return null;
  };

  const renderNearbyLabs = () => {
    // Filter labs based on search and filters
    let filteredLabs = nearbyLabs.filter(lab => {
      const matchesSearch = lab.name.toLowerCase().includes(labSearchTerm.toLowerCase()) ||
                           lab.location.toLowerCase().includes(labSearchTerm.toLowerCase()) ||
                           lab.specialties.some(s => s.toLowerCase().includes(labSearchTerm.toLowerCase()));
      
      const matchesLocation = locationFilter === 'all' || 
                             (locationFilter === 'local' && parseFloat(lab.distance) <= 50) ||
                             (locationFilter === 'regional' && parseFloat(lab.distance) <= 500) ||
                             (locationFilter === 'national' && parseFloat(lab.distance) <= 5000) ||
                             (locationFilter === 'international' && parseFloat(lab.distance) > 5000);
      
      const matchesSpecialty = specialtyFilter === 'all' || 
                              lab.specialties.some(s => s.toLowerCase().includes(specialtyFilter.toLowerCase()));
      
      const matchesRating = ratingFilter === 0 || lab.rating >= ratingFilter;
      
      const matchesVerified = !verifiedOnly || lab.verified;
      
      return matchesSearch && matchesLocation && matchesSpecialty && matchesRating && matchesVerified;
    });

    // Sort labs
    filteredLabs.sort((a, b) => {
      switch (labSortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'response-time':
          return a.responseTime.localeCompare(b.responseTime);
        case 'active-projects':
          return b.activeProjects - a.activeProjects;
        case 'recent':
          return 0; // Keep original order for recent
        case 'distance':
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });

    // Calculate stats
    const totalLabs = nearbyLabs.length;
    const averageResponseTime = '< 3 hours';
    const activeProjects = nearbyLabs.reduce((sum, l) => sum + l.activeProjects, 0);

    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Nearby Laboratories
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            Discover and connect with world-class research facilities in our global network
          </p>
        </div>

        {/* Lab Stats */}
        <LabStats
          totalLabs={totalLabs}
          averageResponseTime={averageResponseTime}
          activeProjects={activeProjects}
        />

        {/* Filters */}
        <LabFilters
          searchTerm={labSearchTerm}
          onSearchChange={setLabSearchTerm}
          locationFilter={locationFilter}
          onLocationFilterChange={setLocationFilter}
          specialtyFilter={specialtyFilter}
          onSpecialtyFilterChange={setSpecialtyFilter}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          sortBy={labSortBy}
          onSortChange={setLabSortBy}
          viewMode={labViewMode}
          onViewModeChange={setLabViewMode}
          verifiedOnly={verifiedOnly}
          onVerifiedOnlyChange={setVerifiedOnly}
        />

        {/* Labs Display */}
        <Section>
          <SectionHeader 
            title={`${filteredLabs.length} Laboratories`}
            subtitle={`Showing laboratories matching your criteria`}
          />
          
          {filteredLabs.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No Laboratories Found"
              description="No laboratories match your current filters. Try adjusting your search criteria."
              actionText="Clear Filters"
              onAction={() => {
                setLabSearchTerm('');
                setLocationFilter('all');
                setSpecialtyFilter('all');
                setRatingFilter(0);
                setVerifiedOnly(false);
              }}
            />
          ) : (
            <>
              {labViewMode === 'grid' ? (
                <div className="grid grid-cols-4 gap-6">
                  {filteredLabs.map((lab, index) => (
                    <LabCard key={index} {...lab} />
                  ))}
                </div>
              ) : labViewMode === 'list' ? (
                <LabListView labs={filteredLabs} />
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-12 text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Map View Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-400">Interactive map visualization is under development.</p>
                </div>
              )}
            </>
          )}
        </Section>
      </div>
    );
  };

  const renderContent = () => {
    // Show lab owner dashboard for lab owner user type
    if (userType === 'lab-owner') {
      return <LabOwnerDashboard />;
    }
    
    // Show collaborator dashboard for collaborator user type
    if (userType === 'collaborator') {
      switch (activeItem) {
        case 'dashboard':
          return <CollaboratorDashboard />;
        case 'projects':
          return <CollaboratorMyProjects onOpenProject={handleOpenProject} />;
        case 'profile':
          return <CollaboratorProfile />;
        case 'help':
          return <CollaboratorHelp />;
        default:
          return <CollaboratorDashboard />;
      }
    }
    
    switch (activeItem) {
      case 'dashboard':
        return renderDashboard();
      case 'projects':
        return renderMyProjects();
      case 'new-request':
        return renderNewRequest();
      case 'nearby-labs':
        return renderNearbyLabs();
      case 'team':
        return <MyTeam />;
      case 'help':
        return <Help />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <EmptyState
              icon={Building2}
              title="Coming Soon"
              description="This section is under development."
              actionText="Back to Dashboard"
              onAction={() => setActiveItem('dashboard')}
            />
          </div>
        );
    }
  };

  // Show homepage if not dismissed
  if (showHomePage) {
    return <HomePage onRoleSelect={handleRoleSelect} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-800/30">
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onProfileClick={() => {
            setActiveItem('profile');
            console.log('Profile clicked, activeItem set to:', 'profile');
          }}
          onSettingsClick={() => setActiveItem('settings')}
          onLogoutClick={() => {
            setShowHomePage(true);
            setActiveItem('dashboard');
            localStorage.removeItem('userType');
          }}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-16 max-w-[1800px] mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* Modals */}
      {showInviteModal && selectedProject && (
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => {
            setShowInviteModal(false);
            setSelectedProject(null);
          }}
          projectTitle={selectedProject.title}
          projectId={selectedProject.id}
          currentCollaborators={selectedProject.collaborators}
          onInviteSent={handleInviteSent}
        />
      )}
      
      {showCollaborationView && selectedProject && (
        <CollaborationView
          projectId={selectedProject.id}
          projectTitle={selectedProject.title}
          userRole="admin"
          onClose={() => {
            setShowCollaborationView(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}

export default App;