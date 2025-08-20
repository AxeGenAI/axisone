import React from 'react';
import { CheckCircle2, Clock, Users, MessageSquare, ArrowRight } from 'lucide-react';

interface RequestSuccessProps {
  requestId: string;
  onViewDashboard: () => void;
  onCreateAnother: () => void;
}

const RequestSuccess: React.FC<RequestSuccessProps> = ({ 
  requestId, 
  onViewDashboard, 
  onCreateAnother 
}) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3),0_8px_25px_-8px_rgba(0,0,0,0.2)]">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_8px_32px_-8px_rgba(34,197,94,0.3)]">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Request Submitted Successfully!
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Your research request has been sent to our global network of laboratories
        </p>

        {/* Request ID */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">Request ID</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-wider">
            {requestId}
          </p>
        </div>

        {/* Next Steps */}
        <div className="text-left mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">What happens next?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Immediate Review</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our AI-powered matching system will analyze your request and identify the most suitable laboratories within 2 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Lab Notifications</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Qualified laboratories will be automatically notified and can respond with proposals and timelines.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Direct Communication</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You'll receive initial responses within 24 hours and can communicate directly with interested laboratories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onViewDashboard}
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(59,130,246,0.5)] hover:scale-105"
          >
            <span>View Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onCreateAnother}
            className="px-8 py-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-semibold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            Create Another Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestSuccess;