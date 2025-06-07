
import React from 'react';
import Card from './common/Card';
import Button from './common/Button';

interface ErrorDisplayProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onDismiss }) => {
  return (
    <Card className="border-2 border-red-500 bg-red-50/80">
      <div className="text-center">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 className="text-xl font-semibold text-red-700 mb-2">An Error Occurred</h3>
        <p className="text-red-600 mb-4">{message}</p>
        {onDismiss && (
          <Button onClick={onDismiss} variant="danger" size="small">
            Dismiss
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ErrorDisplay;
