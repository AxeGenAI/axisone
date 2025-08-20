import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  User,
  Calendar,
  Tag,
  Send,
  Paperclip,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
  Star,
  ThumbsUp,
  Eye,
  Edit3,
  X,
  FileText,
  Zap,
  Shield,
  Globe,
  Users,
  Target,
  Award,
  TrendingUp,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import MetricCard from './MetricCard';
import Pagination from './Pagination';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'waiting' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'project' | 'account' | 'lab-issues' | 'feature-request';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responses: TicketResponse[];
  attachments?: string[];
  relatedProject?: string;
  satisfaction?: number;
}

interface TicketResponse {
  id: string;
  author: string;
  role: 'user' | 'support' | 'admin';
  content: string;
  timestamp: string;
  isInternal?: boolean;
  attachments?: string[];
}

const Support: React.FC = () => {
  const [activeView, setActiveView] = useState<'tickets' | 'create' | 'knowledge'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [newTicketData, setNewTicketData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    relatedProject: '',
    attachments: [] as File[]
  });
  const [newResponse, setNewResponse] = useState('');

  // Mock support tickets data
  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-2025-001',
      title: 'Unable to upload large dataset files',
      description: 'I\'m trying to upload a 50MB CSV file for my genomics project but it keeps failing at 80% completion. The error message says "Upload timeout" but I have a stable internet connection.',
      status: 'in-progress',
      priority: 'high',
      category: 'technical',
      createdAt: '2 hours ago',
      updatedAt: '30 minutes ago',
      assignedTo: 'Sarah from Support',
      relatedProject: 'Neural Network Analysis',
      responses: [
        {
          id: '1',
          author: 'Dr. Richardson',
          role: 'user',
          content: 'I\'m trying to upload a 50MB CSV file for my genomics project but it keeps failing at 80% completion.',
          timestamp: '2 hours ago'
        },
        {
          id: '2',
          author: 'Sarah from Support',
          role: 'support',
          content: 'Hi Dr. Richardson! I can see the upload timeout issue. This is typically caused by our current 30MB file size limit. Let me help you with a workaround - you can either compress the file or split it into smaller chunks. I\'ll also escalate this to increase the limit for research data files.',
          timestamp: '30 minutes ago'
        }
      ],
      attachments: ['error_screenshot.png']
    },
    {
      id: 'TKT-2025-002',
      title: 'Billing question about project costs',
      description: 'I need clarification on how project costs are calculated when working with multiple laboratories. The invoice shows different rates than what was quoted initially.',
      status: 'waiting',
      priority: 'medium',
      category: 'billing',
      createdAt: '1 day ago',
      updatedAt: '6 hours ago',
      assignedTo: 'Mike from Billing',
      responses: [
        {
          id: '1',
          author: 'Dr. Richardson',
          role: 'user',
          content: 'I need clarification on how project costs are calculated when working with multiple laboratories.',
          timestamp: '1 day ago'
        },
        {
          id: '2',
          author: 'Mike from Billing',
          role: 'support',
          content: 'Thanks for reaching out! I\'m reviewing your recent invoices and will provide a detailed breakdown. Could you please confirm which specific project this relates to?',
          timestamp: '6 hours ago'
        }
      ]
    },
    {
      id: 'TKT-2025-003',
      title: 'Lab partner not responding to messages',
      description: 'The laboratory assigned to my protein analysis project hasn\'t responded to my messages for 3 days. The project deadline is approaching and I need status updates.',
      status: 'open',
      priority: 'urgent',
      category: 'project',
      createdAt: '3 days ago',
      updatedAt: '3 days ago',
      relatedProject: 'Protein Analysis Study',
      responses: [
        {
          id: '1',
          author: 'Dr. Richardson',
          role: 'user',
          content: 'The laboratory assigned to my protein analysis project hasn\'t responded to my messages for 3 days.',
          timestamp: '3 days ago'
        }
      ]
    },
    {
      id: 'TKT-2025-004',
      title: 'Feature request: Bulk project export',
      description: 'It would be helpful to have a feature to export multiple project reports at once rather than downloading them individually.',
      status: 'resolved',
      priority: 'low',
      category: 'feature-request',
      createdAt: '1 week ago',
      updatedAt: '2 days ago',
      assignedTo: 'Product Team',
      satisfaction: 5,
      responses: [
        {
          id: '1',
          author: 'Dr. Richardson',
          role: 'user',
          content: 'It would be helpful to have a feature to export multiple project reports at once.',
          timestamp: '1 week ago'
        },
        {
          id: '2',
          author: 'Product Team',
          role: 'support',
          content: 'Great suggestion! We\'ve added this to our product roadmap for Q2 2025. You\'ll be notified when this feature is available.',
          timestamp: '2 days ago'
        }
      ]
    },
    {
      id: 'TKT-2025-005',
      title: 'Account access issues after password reset',
      description: 'After resetting my password, I can log in but some features seem to be missing from my dashboard. My project list appears empty even though I have active projects.',
      status: 'closed',
      priority: 'high',
      category: 'account',
      createdAt: '2 weeks ago',
      updatedAt: '1 week ago',
      assignedTo: 'Technical Support',
      satisfaction: 4,
      responses: [
        {
          id: '1',
          author: 'Dr. Richardson',
          role: 'user',
          content: 'After resetting my password, I can log in but some features seem to be missing from my dashboard.',
          timestamp: '2 weeks ago'
        },
        {
          id: '2',
          author: 'Technical Support',
          role: 'support',
          content: 'This was caused by a session cache issue. I\'ve cleared your account cache and restored access to all your projects. Please try logging in again.',
          timestamp: '1 week ago'
        },
        {
          id: '3',
          author: 'Dr. Richardson',
          role: 'user',
          content: 'Perfect! Everything is working correctly now. Thank you for the quick resolution.',
          timestamp: '1 week ago'
        }
      ]
    }
  ];

  // Filter tickets
  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getStatusConfig = (status: string) => {
    const configs = {
      open: { label: 'Open', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: MessageSquare },
      'in-progress': { label: 'In Progress', color: 'text-orange-700 bg-orange-50 border-orange-200', icon: Clock },
      waiting: { label: 'Waiting', color: 'text-yellow-700 bg-yellow-50 border-yellow-200', icon: Clock },
      resolved: { label: 'Resolved', color: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle2 },
      closed: { label: 'Closed', color: 'text-gray-700 bg-gray-50 border-gray-200', icon: CheckCircle2 }
    };
    return configs[status as keyof typeof configs];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-gray-700 bg-gray-50 border-gray-200',
      medium: 'text-blue-700 bg-blue-50 border-blue-200',
      high: 'text-orange-700 bg-orange-50 border-orange-200',
      urgent: 'text-red-700 bg-red-50 border-red-200'
    };
    return colors[priority as keyof typeof colors];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      technical: Zap,
      billing: Target,
      project: Users,
      account: User,
      'lab-issues': Globe,
      'feature-request': Star
    };
    return icons[category as keyof typeof icons] || HelpCircle;
  };

  // Calculate metrics
  const totalTickets = supportTickets.length;
  const openTickets = supportTickets.filter(t => ['open', 'in-progress', 'waiting'].includes(t.status)).length;
  const resolvedTickets = supportTickets.filter(t => t.status === 'resolved').length;
  const avgResponseTime = '< 2 hours';

  const metrics = [
    {
      title: 'Total Tickets',
      value: totalTickets,
      icon: HelpCircle,
      color: 'blue' as const,
      trend: { value: '+3', isPositive: false },
      subtitle: 'All time'
    },
    {
      title: 'Open Tickets',
      value: openTickets,
      icon: Clock,
      color: 'orange' as const,
      trend: { value: '-2', isPositive: true },
      subtitle: 'Need attention'
    },
    {
      title: 'Resolved',
      value: resolvedTickets,
      icon: CheckCircle2,
      color: 'green' as const,
      trend: { value: '+5', isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Avg Response',
      value: avgResponseTime,
      icon: TrendingUp,
      color: 'purple' as const,
      trend: { value: '-15%', isPositive: true },
      subtitle: 'Response time'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: totalTickets },
    { id: 'technical', label: 'Technical Issues', count: 2 },
    { id: 'billing', label: 'Billing & Payments', count: 1 },
    { id: 'project', label: 'Project Support', count: 1 },
    { id: 'account', label: 'Account Issues', count: 1 },
    { id: 'lab-issues', label: 'Lab Communication', count: 0 },
    { id: 'feature-request', label: 'Feature Requests', count: 1 }
  ];

  const priorityOptions = [
    { id: 'all', label: 'All Priorities' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { id: 'all', label: 'All Status' },
    { id: 'open', label: 'Open' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'waiting', label: 'Waiting' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'closed', label: 'Closed' }
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your backend
    console.log('Creating ticket:', newTicketData);
    
    // Reset form and go back to tickets view
    setNewTicketData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      relatedProject: '',
      attachments: []
    });
    setActiveView('tickets');
  };

  const handleTicketClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowTicketDetail(true);
  };

  const handleSendResponse = () => {
    if (!newResponse.trim() || !selectedTicket) return;
    
    // Add response to ticket (in real app, this would be an API call)
    const response: TicketResponse = {
      id: Date.now().toString(),
      author: 'Dr. Richardson',
      role: 'user',
      content: newResponse,
      timestamp: 'Just now'
    };
    
    setSelectedTicket({
      ...selectedTicket,
      responses: [...selectedTicket.responses, response],
      updatedAt: 'Just now'
    });
    
    setNewResponse('');
  };

  const renderTicketsList = () => (
    <div className="space-y-8">
      {/* Metrics */}
      <Section>
        <SectionHeader 
          title="Support Overview" 
          subtitle="Your support ticket metrics and status"
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
                placeholder="Search tickets..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {statusOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {priorityOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {categories.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setActiveView('create')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>New Ticket</span>
          </button>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const statusConfig = getStatusConfig(ticket.status);
            const StatusIcon = statusConfig.icon;
            const CategoryIcon = getCategoryIcon(ticket.category);
            
            return (
              <div
                key={ticket.id}
                onClick={() => handleTicketClick(ticket)}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {ticket.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                        {ticket.id}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
                      {ticket.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Created: {ticket.createdAt}</span>
                      <span>Updated: {ticket.updatedAt}</span>
                      {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo}</span>}
                      {ticket.relatedProject && <span>Project: {ticket.relatedProject}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {statusConfig.label}
                    </span>
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{ticket.responses.length} responses</span>
                    </div>
                    {ticket.attachments && (
                      <div className="flex items-center space-x-1">
                        <Paperclip className="w-4 h-4" />
                        <span>{ticket.attachments.length} files</span>
                      </div>
                    )}
                  </div>
                  
                  {ticket.satisfaction && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{ticket.satisfaction}/5</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Tickets Found</h3>
            <p className="text-gray-600 dark:text-gray-400">No support tickets match your current filters.</p>
          </div>
        )}
      </Section>
    </div>
  );

  const renderCreateTicket = () => (
    <div className="max-w-3xl mx-auto">
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Create Support Ticket</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Get help from our support team</p>
        </div>

        <form onSubmit={handleCreateTicket} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Category *
              </label>
              <select
                value={newTicketData.category}
                onChange={(e) => setNewTicketData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select category</option>
                <option value="technical">Technical Issues</option>
                <option value="billing">Billing & Payments</option>
                <option value="project">Project Support</option>
                <option value="account">Account Issues</option>
                <option value="lab-issues">Lab Communication</option>
                <option value="feature-request">Feature Request</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Priority *
              </label>
              <select
                value={newTicketData.priority}
                onChange={(e) => setNewTicketData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="low">Low - General inquiry</option>
                <option value="medium">Medium - Standard issue</option>
                <option value="high">High - Blocking work</option>
                <option value="urgent">Urgent - Critical issue</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Subject *
            </label>
            <input
              type="text"
              value={newTicketData.title}
              onChange={(e) => setNewTicketData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Description *
            </label>
            <textarea
              value={newTicketData.description}
              onChange={(e) => setNewTicketData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Related Project (Optional)
            </label>
            <select
              value={newTicketData.relatedProject}
              onChange={(e) => setNewTicketData(prev => ({ ...prev, relatedProject: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Select project (if applicable)</option>
              <option value="neural-network">Neural Network Analysis</option>
              <option value="microbiome">Microbiome Research</option>
              <option value="drug-discovery">AI-Driven Drug Discovery</option>
              <option value="quantum-computing">Quantum Computing Simulation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Drop files here or click to browse
              </p>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setNewTicketData(prev => ({
                      ...prev,
                      attachments: [...prev.attachments, ...Array.from(e.target.files!)]
                    }));
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Choose Files
              </label>
            </div>
            
            {newTicketData.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {newTicketData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewTicketData(prev => ({
                        ...prev,
                        attachments: prev.attachments.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={() => setActiveView('tickets')}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </div>
        </form>
      </Section>
    </div>
  );

  const renderKnowledgeBase = () => (
    <div className="space-y-8">
      <Section>
        <SectionHeader 
          title="Knowledge Base" 
          subtitle="Find answers to common questions"
        />
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Getting Started', icon: Zap, articles: 12, color: 'blue' },
            { title: 'Project Management', icon: Target, articles: 18, color: 'green' },
            { title: 'Lab Collaboration', icon: Users, articles: 15, color: 'purple' },
            { title: 'Billing & Payments', icon: Target, articles: 8, color: 'orange' },
            { title: 'Technical Issues', icon: Settings, articles: 22, color: 'red' },
            { title: 'Account Settings', icon: User, articles: 10, color: 'indigo' }
          ].map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className={`w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{category.articles} articles</p>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Need Personal Assistance?</h3>
              <p className="text-blue-800 dark:text-blue-400 mb-4">
                Can't find what you're looking for? Our support team is available 24/7 to help.
              </p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Live Chat</span>
                </button>
                <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );

  // Ticket Detail Modal
  const TicketDetailModal = () => {
    if (!showTicketDetail || !selectedTicket) return null;

    const statusConfig = getStatusConfig(selectedTicket.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedTicket.title}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                {selectedTicket.id}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                <StatusIcon className="w-3 h-3 inline mr-1" />
                {statusConfig.label}
              </span>
            </div>
            <button
              onClick={() => setShowTicketDetail(false)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex h-[600px]">
            {/* Conversation */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {selectedTicket.responses.map((response) => (
                  <div key={response.id} className={`flex items-start space-x-4 ${
                    response.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                      response.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                        : 'bg-gradient-to-br from-green-500 to-green-600'
                    }`}>
                      {response.role === 'user' ? 'DR' : 'ST'}
                    </div>
                    <div className={`flex-1 ${response.role === 'user' ? 'text-right' : ''}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{response.author}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{response.timestamp}</span>
                      </div>
                      <div className={`inline-block p-4 rounded-2xl max-w-md ${
                        response.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm leading-relaxed">{response.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              {['open', 'in-progress', 'waiting'].includes(selectedTicket.status) && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-end space-x-4">
                    <div className="flex-1">
                      <textarea
                        value={newResponse}
                        onChange={(e) => setNewResponse(e.target.value)}
                        placeholder="Type your response..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSendResponse}
                      disabled={!newResponse.trim()}
                      className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Ticket Details Sidebar */}
            <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Ticket Details</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Priority</span>
                  <div className={`mt-1 px-3 py-1 rounded-full text-xs font-bold border inline-block ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority.toUpperCase()}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                  <p className="font-medium text-gray-900 dark:text-white capitalize mt-1">
                    {selectedTicket.category.replace('-', ' ')}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Created</span>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">{selectedTicket.createdAt}</p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated</span>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">{selectedTicket.updatedAt}</p>
                </div>
                
                {selectedTicket.assignedTo && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Assigned To</span>
                    <p className="font-medium text-gray-900 dark:text-white mt-1">{selectedTicket.assignedTo}</p>
                  </div>
                )}
                
                {selectedTicket.relatedProject && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Related Project</span>
                    <p className="font-medium text-blue-600 dark:text-blue-400 mt-1">{selectedTicket.relatedProject}</p>
                  </div>
                )}
              </div>

              {selectedTicket.status === 'resolved' && !selectedTicket.satisfaction && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Rate this support</h4>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className="p-1 text-yellow-400 hover:text-yellow-500 transition-colors"
                      >
                        <Star className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'tickets', label: 'My Tickets', icon: MessageSquare },
    { id: 'create', label: 'New Ticket', icon: Plus },
    { id: 'knowledge', label: 'Knowledge Base', icon: FileText }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Support Center
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Get help with your research platform experience
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold ${
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
      {activeView === 'tickets' && renderTicketsList()}
      {activeView === 'create' && renderCreateTicket()}
      {activeView === 'knowledge' && renderKnowledgeBase()}

      {/* Ticket Detail Modal */}
      <TicketDetailModal />
    </div>
  );
};

export default Support;