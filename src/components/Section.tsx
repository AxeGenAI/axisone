import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  return (
    <section className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3),0_8px_25px_-8px_rgba(0,0,0,0.2)] hover:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.12),0_12px_35px_-8px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.4),0_12px_35px_-8px_rgba(0,0,0,0.25)] transition-all duration-700 ${className}`}>
      {children}
    </section>
  );
};

export default Section;