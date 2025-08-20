import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  Book, 
  MessageSquare, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Users,
  FileText,
  Settings,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  PlayCircle,
  Download
} from 'lucide-react';

const CollaboratorHelp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'projects', label: 'Project Collaboration', icon: Users },
    { id: 'tasks', label: 'Task Management', icon: CheckCircle2 },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'files', label: 'File Sharing', icon: FileText },
    { id: 'account', label: 'Account Settings', icon: Settings },
    { id: 'security', label: 'Security & Privacy', icon: Shield }
  ];

  const faqs = {
    'getting-started': [
      {
        id: '1',
        question: 'How do I join a research project?',
        answer: 'You can join a research project by accepting an invitation from a project owner. Invitations are sent via email and will appear in your dashboard notifications. Click "Accept" to join the project team.'
      },
      {
        id: '2',
        question: 'What are the different collaboration roles?',
        answer: 'There are three main roles: Viewer (can view project details), Collaborator (can contribute and edit content), and Admin (full project management access). Your role determines what actions you can perform within a project.'
      },
      {
        id: '3',
        question: 'How do I navigate the collaborator dashboard?',
        answer: 'The dashboard shows your active projects, pending tasks, and recent activity. Use the sidebar to navigate between sections, and click "Open Project" to access detailed project workspaces.'
      }
    ],
    'projects': [
      {
        id: '4',
        question: 'How do I track project progress?',
        answer: 'Project progress is displayed as a percentage on each project card. You can view detailed progress in the project workspace Overview tab, which shows milestones, completed tasks, and upcoming deadlines.'
      },
      {
        id: '5',
        question: 'Can I leave a project?',
        answer: 'Yes, you can leave a project by going to the project workspace, clicking on the Team tab, and selecting "Leave Project" from your profile options. Note that this action cannot be undone.'
      },
      {
        id: '6',
        question: 'How do I invite others to a project?',
        answer: 'Only project Admins can invite new members. If you have Admin privileges, use the "Invite Members" button in the Team tab to send invitations via email or shareable links.'
      }
    ],
    'tasks': [
      {
        id: '7',
        question: 'How do I complete assigned tasks?',
        answer: 'Click on any task from your dashboard or the project Tasks tab. Add progress updates, attach files if needed, and click "Mark Complete" when finished. The task owner will be notified of completion.'
      },
      {
        id: '8',
        question: 'What happens if I miss a task deadline?',
        answer: 'Overdue tasks are highlighted in red and generate notifications to both you and the task assigner. While there are no automatic penalties, timely completion helps maintain project momentum.'
      },
      {
        id: '9',
        question: 'Can I delegate tasks to others?',
        answer: 'Task delegation depends on your project role. Collaborators and Admins can typically reassign tasks, while Viewers cannot. Check with your project admin about delegation policies.'
      }
    ],
    'communication': [
      {
        id: '10',
        question: 'How do I participate in project discussions?',
        answer: 'Go to the Discussions tab in any project workspace. You can start new discussion threads, reply to existing ones, and attach files to your messages. Use @mentions to notify specific team members.'
      },
      {
        id: '11',
        question: 'Are my messages private?',
        answer: 'Messages in project discussions are visible to all project team members. For private communication, use direct messages or external communication channels.'
      },
      {
        id: '12',
        question: 'How do I get notified of new messages?',
        answer: 'Notifications appear as badges on your dashboard and can be sent via email. Configure your notification preferences in Profile > Settings to customize how you receive updates.'
      }
    ],
    'files': [
      {
        id: '13',
        question: 'What file types can I upload?',
        answer: 'You can upload most common file types including documents (PDF, DOC, DOCX), spreadsheets (XLS, XLSX), presentations (PPT, PPTX), images (JPG, PNG), and data files (CSV, JSON). File size limit is 100MB per file.'
      },
      {
        id: '14',
        question: 'How do I organize project files?',
        answer: 'Files are automatically organized by upload date and contributor. Use descriptive filenames and add comments when uploading to help team members understand file contents and purpose.'
      },
      {
        id: '15',
        question: 'Can I edit files directly in the platform?',
        answer: 'The platform supports viewing most file types, but editing requires downloading the file, making changes locally, and re-uploading. Version control helps track file changes over time.'
      }
    ],
    'account': [
      {
        id: '16',
        question: 'How do I update my profile information?',
        answer: 'Go to Profile in the sidebar, click "Edit Profile", make your changes, and click "Save". Keep your profile updated to help team members understand your expertise and contact information.'
      },
      {
        id: '17',
        question: 'How do I change my notification settings?',
        answer: 'Navigate to Profile > Settings tab. You can customize email notifications, project updates, and other preferences. Changes take effect immediately.'
      },
      {
        id: '18',
        question: 'Can I delete my account?',
        answer: 'Account deletion must be requested through support. Before deletion, ensure you\'ve completed all assigned tasks and transferred any important project responsibilities to other team members.'
      }
    ],
    'security': [
      {
        id: '19',
        question: 'How is my data protected?',
        answer: 'All data is encrypted in transit and at rest. We follow industry-standard security practices and comply with relevant data protection regulations. Regular security audits ensure platform integrity.'
      },
      {
        id: '20',
        question: 'Should I enable two-factor authentication?',
        answer: 'Yes, we strongly recommend enabling 2FA for additional account security. Go to Profile > Settings > Privacy Settings to enable two-factor authentication using your preferred method.'
      },
      {
        id: '21',
        question: 'Who can see my profile information?',
        answer: 'Profile visibility can be controlled in Privacy Settings. You can choose to share your profile with team members only, your entire organization, or make it publicly visible to all platform users.'
      }
    ]
  };

  const quickActions = [
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: PlayCircle,
      color: 'text-blue-600',
      action: 'Watch Now'
    },
    {
      title: 'User Guide',
      description: 'Download comprehensive manual',
      icon: Download,
      color: 'text-green-600',
      action: 'Download PDF'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: Mail,
      color: 'text-purple-600',
      action: 'Send Message'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: Users,
      color: 'text-orange-600',
      action: 'Visit Forum'
    }
  ];

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs]?.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Help Center
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Find answers and get support for your collaboration needs
        </p>
      </div>

      {/* Search */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for help articles, guides, and FAQs..."
            className="w-full pl-12 pr-6 py-4 border border-gray-200/60 dark:border-gray-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 ${action.color} bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {action.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{action.description}</p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                <span>{action.action}</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 shadow-lg h-fit">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                    activeCategory === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="col-span-3 space-y-6">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {categories.find(c => c.id === activeCategory)?.label} FAQs
              </h2>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Results Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms.' : 'No FAQs available for this category.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still Need Help?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Can't find what you're looking for? Our support team is here to help you succeed.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    <Mail className="w-4 h-4" />
                    <span>Contact Support</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorHelp;