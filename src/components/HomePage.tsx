import React, { useState, useEffect } from 'react';
import { 
  Microscope, 
  Users, 
  ArrowRight, 
  Globe, 
  TrendingUp, 
  Award, 
  CheckCircle2,
  Star,
  Building2,
  Zap,
  Shield,
  Clock,
  Target,
  PlayCircle,
  ChevronRight,
  Bot,
  Send,
  Sparkles,
  MessageCircle,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface HomePageProps {
  onRoleSelect: (role: 'researcher' | 'collaborator') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRoleSelect }) => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: string, content: string, sender: 'user' | 'assistant', timestamp: string}>>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  // Prominent AI Widget conversation state
  const [conversationStep, setConversationStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showLabResults, setShowLabResults] = useState(false);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTestimonialSet, setCurrentTestimonialSet] = useState(0);

  const aiHints = [
    "Find labs for protein crystallography",
    "Connect with genomics experts",
    "Discover mass spectrometry facilities",
    "Locate cell culture laboratories",
    "Search for bioinformatics partners"
  ];

  const quickSuggestions = [
    "How do I create my first project?",
    "Connect me with support team",
    "Report a technical issue",
    "Schedule a demo call"
  ];

  // Conversation flow data
  const conversationFlow = [
    {
      step: 0,
      question: "What type of research analysis do you need?",
      options: [
        "Protein Structure Analysis",
        "DNA/RNA Sequencing", 
        "Cell Culture Studies",
        "Mass Spectrometry"
      ]
    },
    {
      step: 1,
      question: "What's your sample type and quantity?",
      options: [
        "Purified protein samples (1-5mg)",
        "Cell lysate samples (10-50ml)",
        "Tissue samples (fresh/frozen)",
        "Blood/serum samples (5-10ml)"
      ]
    },
    {
      step: 2,
      question: "What's your timeline and budget range?",
      options: [
        "Rush (1-3 days) - Premium pricing",
        "Standard (1-2 weeks) - $5K-15K",
        "Extended (3-4 weeks) - $2K-8K",
        "Flexible timeline - Best rates"
      ]
    },
    {
      step: 3,
      question: "Any specific requirements or preferences?",
      options: [
        "University lab preferred",
        "Industry lab with GLP compliance",
        "Local lab (within 100 miles)",
        "International lab acceptable"
      ]
    }
  ];

  const labResults = [
    {
      id: 'stanford',
      name: 'Stanford Structural Biology Lab',
      location: 'Stanford, CA',
      rating: 4.9,
      responseTime: '< 2 hours',
      price: '$8,500',
      timeline: '10-14 days',
      specialty: 'Protein Crystallography',
      certification: 'University Research',
      match: 95,
      features: ['High-resolution X-ray', 'Cryo-EM available', 'Expert analysis']
    },
    {
      id: 'mit',
      name: 'MIT Protein Analysis Core',
      location: 'Cambridge, MA', 
      rating: 4.8,
      responseTime: '< 4 hours',
      price: '$12,000',
      timeline: '7-10 days',
      specialty: 'Advanced Proteomics',
      certification: 'Research Institution',
      match: 88,
      features: ['Mass spectrometry', 'NMR analysis', 'Fast turnaround']
    }
  ];

  const handleOptionSelect = (option: string) => {
    setIsProcessing(true);
    setSelectedOptions([...selectedOptions, option]);
    
    setTimeout(() => {
      setIsProcessing(false);
      if (conversationStep < 3) {
        setConversationStep(conversationStep + 1);
      } else {
        // Show lab results after final question
        setShowLabResults(true);
      }
    }, 1500);
  };

  const handleLabSelect = (labId: string) => {
    setSelectedLab(labId);
  };

  const resetConversation = () => {
    setConversationStep(0);
    setSelectedOptions([]);
    setShowLabResults(false);
    setSelectedLab(null);
    setIsProcessing(false);
  };

  // Rotate AI hints every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % aiHints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialSet((prev) => (prev + 1) % Math.ceil(allTestimonials.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: aiMessage.trim(),
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setAiMessage('');
    setIsAiTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm here to help you navigate AxisOne! I can guide you through creating projects, finding labs, or connect you with our support team.",
        "I can help you with any technical issues or questions about using the platform. Would you like me to connect you with our admin team?",
        "Our support team is available 24/7 to help with any questions. I can also provide quick answers about platform features.",
        "I'd be happy to help you get started! I can explain how to create projects, invite team members, or schedule a personalized demo.",
        "Having trouble with something? I can provide immediate help or escalate to our technical support team for complex issues.",
        "I'm your personal guide to AxisOne. Whether you need help with features or want to speak with an admin, I'm here to assist!"
      ];
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      setIsAiTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  // Get current set of 3 testimonials
  const getCurrentTestimonials = () => {
    const startIndex = currentTestimonialSet * 3;
    return allTestimonials.slice(startIndex, startIndex + 3);
  };

  const features = [
    {
      icon: Globe,
      title: 'Global Laboratory Network',
      description: 'Connect with 500+ certified laboratories worldwide'
    },
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Smart algorithms match your research needs instantly'
    },
    {
      icon: Shield,
      title: 'Secure Collaboration',
      description: 'Enterprise-grade security for your research data'
    }
  ];

  const stats = [
    { value: '500+', label: 'Partner Labs', icon: Building2 },
    { value: '10K+', label: 'Researchers', icon: Users },
    { value: '25K+', label: 'Projects', icon: Target },
    { value: '98%', label: 'Success Rate', icon: Award }
  ];

  const allTestimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Principal Researcher, Stanford',
      avatar: 'SC',
      quote: 'AxisOne transformed how we collaborate. What used to take weeks now happens in days.',
      rating: 5
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Lab Director, MIT',
      avatar: 'MR',
      quote: 'The platform\'s AI matching saved us months of searching for the right expertise.',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Research Scientist, Harvard',
      avatar: 'EW',
      quote: 'Seamless integration with our existing workflows. Highly recommended.',
      rating: 5
    },
    {
      name: 'Dr. James Wilson',
      role: 'Lab Director, Harvard',
      avatar: 'JW',
      quote: 'AxisOne revolutionized our research collaboration. The AI matching is incredibly accurate.',
      rating: 5
    },
    {
      name: 'Dr. Lisa Park',
      role: 'Research Scientist, MIT',
      avatar: 'LP',
      quote: 'Outstanding platform for connecting with global research partners. Game-changing technology.',
      rating: 5
    },
    {
      name: 'Dr. Robert Kim',
      role: 'Principal Investigator, UCSF',
      avatar: 'RK',
      quote: 'The quality of laboratory matches exceeded our expectations. Truly impressive results.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-800/30 transition-colors duration-300 relative">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-gray-100/50 dark:border-gray-800/50 px-8 py-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
              <Microscope className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AxisOne</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Research Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors">
              About
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors">
              Contact
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-20 relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ playbackRate: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover z-[-2]"
          src="/network.mp4"
        >
          <source src="/network.mp4" type="video/mp4" />
        </video>
        
        <script>
          {`
            document.addEventListener('DOMContentLoaded', function() {
              const video = document.querySelector('video');
              if (video) {
                video.playbackRate = 0.5;
              }
            });
          `}
        </script>
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black opacity-20 z-[-1]"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                  Connect Research with
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                    World-Class Labs
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  Discover laboratories, collaborate with experts, and accelerate breakthroughs.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onRoleSelect('researcher')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                </button>
                
                <button
                  onClick={() => onRoleSelect('collaborator')}
                  className="px-8 py-4 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 font-semibold hover:scale-105"
                >
                  Join Network
                </button>
              </div>
            </div>

            {/* Right Column - AI Digital Assistant */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                  Lab Concierge
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                  Find the perfect lab for your research
                </p>
              </div>

              {/* AI Demo Interface */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl h-[60px] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">AI Digital Assistant</h4>
                    <p className="text-blue-100 text-sm">Get instant help with your research</p>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Chat Content */}
                <div className="p-6 space-y-4">
                  {/* Chat Messages */}
                  {chatMessages.length > 0 && (
                    <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                      {chatMessages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {/* AI Typing Indicator */}
                      {isAiTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!showLabResults ? (
                    /* Conversation Interface */
                    <div className="space-y-4">
                      {/* Progress Indicator */}
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        {[0, 1, 2, 3].map((step) => (
                          <div
                            key={step}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              step <= conversationStep
                                ? 'bg-blue-600 dark:bg-blue-400'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Current Question */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                              {conversationFlow[conversationStep]?.question}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Processing State */}
                      {isProcessing ? (
                        <div className="text-center py-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Bot className="w-5 h-5 text-white animate-pulse" />
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">Processing...</p>
                          <div className="flex justify-center space-x-1 mt-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      ) : (
                        /* Answer Options */
                        <div className="grid grid-cols-2 gap-2">
                          {conversationFlow[conversationStep]?.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionSelect(option)}
                              className="p-3 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                            >
                              <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 text-xs">
                                {option}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Selected Options Summary */}
                      {selectedOptions.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 text-xs">Selected:</h4>
                          <div className="space-y-1">
                            {selectedOptions.map((option, index) => (
                              <p key={index} className="text-blue-800 dark:text-blue-400 text-xs">
                                • {option}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Lab Results Interface */
                    <div className="space-y-4">
                      {/* Results Header */}
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Matches Found</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Top laboratories for your needs</p>
                      </div>

                      {/* Lab Results */}
                      <div className="space-y-3">
                        {labResults.slice(0, 2).map((lab, index) => (
                          <div
                            key={lab.id}
                            className={`p-4 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
                              selectedLab === lab.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                            onClick={() => handleLabSelect(lab.id)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{lab.name}</h4>
                                  {index === 0 && (
                                    <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                                      BEST MATCH
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{lab.location} • {lab.specialty}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {lab.features.slice(0, 2).map((feature, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                      {feature}
                                    </span>
                                  ))}
                                  {lab.features.length > 2 && (
                                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                      +{lab.features.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{lab.match}%</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Match</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white text-xs">{lab.rating}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white text-xs">{lab.responseTime}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Response</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white text-xs">{lab.price}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Estimate</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white text-xs">{lab.timeline}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Timeline</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-3">
                        <button
                          onClick={resetConversation}
                          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors text-sm"
                        >
                          ← Reset
                        </button>
                        {selectedLab && (
                          <button
                            onClick={() => onRoleSelect('researcher')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 text-sm"
                          >
                            Contact Lab
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Input Area */}
                  {!showLabResults && !isProcessing && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <form onSubmit={handleAiSubmit} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={aiMessage}
                          onChange={(e) => setAiMessage(e.target.value)}
                          placeholder="Ask about your research needs..."
                          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium shadow-inner text-sm"
                          disabled={isAiTyping}
                        />
                        <button 
                          type="submit"
                          disabled={!aiMessage.trim() || isAiTyping}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-sm">Ask</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Platform Metrics - Spanning Full Width */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-gray-100/50 dark:border-gray-800/50">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">500+</div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Global Labs</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Certified worldwide</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">AI</div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Instant connections</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">100%</div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Secure</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Enterprise-grade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section className="px-8 py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Choose Your Path</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              Select your role to get started
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-12">
            {/* Researcher Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer"
                 onClick={() => onRoleSelect('researcher')}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 mx-auto">
                  <Microscope className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Researcher
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
                  Submit research requests and find lab partners
                </p>
                <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg">
                  Get Started
                </button>
              </div>
            </div>

            {/* Lab Owner Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 mx-auto">
                  <Building2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  Lab Owner
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
                  Connect your lab with global researchers
                </p>
                <button 
                  onClick={() => onRoleSelect('lab-owner')}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold text-lg">
                  Register Lab
                </button>
              </div>
            </div>

            {/* Compliance Officer Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 mx-auto">
                  <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Compliance Officer
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
                  Ensure compliance and quality standards
                </p>
                <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold text-lg">
                  Access Tools
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose AxisOne?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Built for researchers, by researchers. Our platform combines cutting-edge technology with deep scientific understanding.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-8 py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Leading Researchers</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of researchers who are accelerating discovery with AxisOne
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {getCurrentTestimonials().map((testimonial, index) => (
              <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.name}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(allTestimonials.length / 3) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonialSet(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentTestimonialSet
                    ? 'bg-blue-600 dark:bg-blue-400 w-6'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="px-8 py-12 text-center">
        <button
          onClick={() => onRoleSelect('researcher')}
          className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
        >
          Start Your Research Journey
        </button>
      </div>

      {/* Footer */}
      <footer className="px-8 py-12 bg-gray-900 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AxisOne</h3>
                <p className="text-gray-400 text-sm">Research Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8 text-gray-400">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Support</button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AxisOne Research Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Digital Assistant Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        {!aiAssistantOpen ? (
          <button
            onClick={() => setAiAssistantOpen(true)}
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110"
          >
            <Bot className="w-6 h-6" />
            
            {/* Animated Hint Bubble */}
            <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 min-w-[280px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Lab Concierge</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try asking:</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                "{aiHints[currentHint]}"
              </p>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-900 border-r border-b border-gray-200 dark:border-gray-700"></div>
            </div>
            
            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
          </button>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 w-96 max-h-[500px] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Lab Concierge</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Find the perfect lab for your research</p>
                </div>
              </div>
              <button
                onClick={() => setAiAssistantOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-4">
              {/* Welcome Message */}
              {chatMessages.length === 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium mb-2">
                        👋 Hi! I'm your Lab Concierge.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        I can help you find laboratories, connect with researchers, and match your project needs with the right facilities. Try asking me about your research requirements!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Chat Messages */}
              {chatMessages.length > 0 && (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* AI Typing Indicator */}
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Quick Suggestions (only show when no messages) */}
              {chatMessages.length === 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">Quick suggestions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setAiMessage(suggestion)}
                        className="p-2 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                      >
                        <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-xs">
                          {suggestion}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <form onSubmit={handleAiSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  placeholder="Ask about labs, research, or collaborations..."
                  className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium text-sm"
                  disabled={isAiTyping}
                />
                <button 
                  type="submit"
                  disabled={!aiMessage.trim() || isAiTyping}
                  className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;