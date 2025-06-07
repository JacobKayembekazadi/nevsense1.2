
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl p-6 md:p-10 text-neutral-dark ${className}`}>
      {children}
    </div>
  );
};

export default Card;
