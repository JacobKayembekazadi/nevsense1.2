
import React from 'react';
import { APP_NAME } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-primary/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-8 h-8 text-accent" />
          <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
