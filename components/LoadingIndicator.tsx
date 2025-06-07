
import React from 'react';

interface LoadingIndicatorProps {
  url?: string;
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ url, text }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-8 md:p-12 text-center text-neutral-dark">
      <div className="flex justify-center items-center mb-6">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p className="text-xl md:text-2xl font-semibold text-primary">
        {text || (url ? `Analyzing ${url}...` : 'Processing...')}
      </p>
      <p className="text-neutral-DEFAULT mt-2">This might take a moment. We're assessing navigation and accessibility.</p>
    </div>
  );
};

export default LoadingIndicator;
