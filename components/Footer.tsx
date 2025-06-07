
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary/90 backdrop-blur-md text-center py-6 text-neutral-light/80">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="text-sm">A Lead Magnet Tool Concept</p>
      </div>
    </footer>
  );
};

export default Footer;
