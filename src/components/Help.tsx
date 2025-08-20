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
  PlayCircle,
  Download,
  Globe,
  Target
} from 'lucide-react';
import Section from './Section';
import SectionHeader from './SectionHeader';

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'projects', label: 'Project Management', icon: Target },
    { id: 'requests', label: 'Research Requests', icon: FileText },
    { id: 'labs', label: 'Laboratory Network', icon: Globe },
    { id: 'team', label: 'Team Collaboration', icon: Users },
    { id: 'account', label: 'Account Settings', icon: Settings },
    { id: 'security', label: 'Security & Privacy', icon: Shield }
  ];

  const faqs = {
    'getting-started': [
      {
        id: '1',
        question: 'How do I get started with AxisOne?',
        answer: 'Welcome to AxisOne! Start by exploring the dashboard to see your research overview. You can create your first research request by clicking "New Request" in the sidebar, or browse nearby laboratories to find potential partners.'
      },
      {
        id: '2',
        question: 'What types of research can I submit?',
        answer: 'AxisOne supports a wide range of research types including genomics, proteomics, cell culture, microscopy, mass spectrometry, biochemical assays, and histopathology. Our platform connects you with specialized laboratories worldwide.'
      },
      {
        id: '3',
        question: 'How do I navigate the researcher dashboard?',
        answer: 'The dashboard provides an overview of your research activities. Use the sidebar to navigate between sections: Dashboard (overview), My Projects (active research), New Request (submit research), Nearby Labs (find partners), and My Team (collaborate).'
      }
    ],
    'projects': [
      {
        id: '4',
        question: 'How do I create a new research project?',
        answer: 'Click "New Request" in the sidebar to start the project creation wizard. You\'ll specify your research type, requirements, timeline, and budget. Our AI matching system will then connect you with suitable laboratories.'
      },
      {
        id: '5',
        question: 'How do I track project progress?',
        answer: 'Project progress is displayed on each project card and in detailed project views. You can see completion percentages, milestones, team activity, and upcoming deadlines. Real-time updates keep you informed of all changes.'
      },
      {
        id: '6',
        question: 'Can I collaborate with multiple laboratories?',
        answer: 'Yes! AxisOne supports multi-laboratory collaborations. You can invite multiple labs to join your project, assign different tasks, and coordinate complex research initiatives across institutions.'
      }
    ],
    'requests': [
      {
        id: '7',
        question: 'How long does it take to get responses to requests?',
        answer: 'Most laboratories respond within 24-48 hours. Response times vary based on request complexity and laboratory availability. You\'ll receive notifications as soon as laboratories express interest in your project.'
      },
      {
        id: '8',
        question: 'What information should I include in my request?',
        answer: 'Provide detailed project descriptions, specific requirements, expected deliverables, timeline, and budget range. The more information you provide, the better laboratories can assess fit and provide accurate proposals.'
      },
      {
        id: '9',
        question: 'Can I modify a request after submission?',
        answer: 'Yes, you can edit request details before laboratories respond. Once a laboratory accepts your request, major changes require mutual agreement. Minor clarifications can be made through project communication channels.'
      }
    ],
    'labs': [
      {
        id: '10',
        question: 'How are laboratories verified on the platform?',
        answer: 'All laboratories undergo a comprehensive verification process including credential checks, facility inspections, and quality assessments. Verified labs display a verification badge and meet our strict quality standards.'
      },
      {
        id: '11',
        question: 'How do I choose the right laboratory?',
        answer: 'Consider factors like specialization, location, response time, ratings, and active projects. Review laboratory profiles, past work examples, and client testimonials. Our matching algorithm also provides compatibility scores.'
      },
      {
        id: '12',
        question: 'Can I work with international laboratories?',
        answer: 'Absolutely! AxisOne connects researchers globally. Consider time zones, shipping requirements, and regulatory compliance when working internationally. Many labs offer remote collaboration tools and digital deliverables.'
      }
    ],
    'team': [
      {
        id: '13',
        question: 'How do I invite team members to projects?',
        answer: 'Use the "Invite Members" button in any project. You can send email invitations or share project links. Set appropriate permissions (Viewer, Collaborator, or Admin) based on each member\'s role in the research.'
      },
      {
        id: '14',
        question: 'What are the different team roles?',
        answer: 'Viewer: Can view project details and progress. Collaborator: Can contribute content, upload files, and participate in discussions. Admin: Full project management including team management and settings.'
      },
      {
        id: '15',
        question: 'How do I manage team communications?',
        answer: 'Each project includes discussion threads, file sharing, and real-time notifications. Use @mentions to notify specific team members. Important announcements can be pinned for visibility.'
      }
    ],
    'account': [
      {
        id: '16',
        question: 'How do I update my profile information?',
        answer: 'Go to Profile in the sidebar, click "Edit Profile", make your changes, and save. Keep your profile updated with current research interests, expertise, and contact information for better collaboration opportunities.'
      },
      {
        id: '17',
        question: 'How do I manage notification preferences?',
        answer: 'Navigate to Settings to customize email notifications, project updates, and team communications. You can set different notification levels for different types of activities.'
      },
      {
        id: '18',
        question: 'Can I export my research data?',
        answer: 'Yes, you can export project data, research results, and collaboration history. Go to Settings > Data Export to download your information in various formats including PDF and CSV.'
      }
    ],
    'security': [
      {
        id: '19',
        question: 'How is my research data protected?',
        answer: 'AxisOne uses enterprise-grade encryption, secure data centers, and strict access controls. All data is encrypted in transit and at rest. We comply with international data protection regulations including GDPR and HIPAA.'
      },
      {
        id: '20',
        question: 'Who can access my research projects?',
        answer: 'Only invited team members and authorized laboratory partners can access your projects. You control all permissions and can revoke access at any time. All access is logged and auditable.'
      },
      {
        id: '21',
        question: 'Should I enable two-factor authentication?',
        answer: 'Yes, we strongly recommend enabling 2FA for additional account security. Go to Settings > Security to set up two-factor authentication using your preferred method (SMS, authenticator app, or hardware key).'
      }
    ]
  };

  const quickActions = [
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: PlayCircle,
      color: 'text-blue-600',
      action: 'Watch Now'
    },
    {
      title: 'User Guide',
      description: 'Comprehensive documentation',
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
      description: 'Connect with researchers',
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
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Help Center
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Find answers and get support for your research needs
        </p>
      </div>

      {/* Search */}
      <Section>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for help articles, guides, and FAQs..."
            className="w-full pl-12 pr-6 py-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium text-lg"
          />
        </div>
      </Section>

      {/* Quick Actions */}
      <Section>
        <SectionHeader 
          title="Quick Actions" 
          subtitle="Get help fast with these resources"
        />
        <div className="grid grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 ${action.color} bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
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
      </Section>

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <Section className="h-fit">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                    activeCategory === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* FAQ Content */}
        <div className="col-span-3 space-y-6">
          <Section>
            <div className="flex items-center space-x-3 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {categories.find(c => c.id === activeCategory)?.label} FAQs
              </h2>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Results Found</h3>
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
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
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
          </Section>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Still Need Help?</h3>
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

export default Help;