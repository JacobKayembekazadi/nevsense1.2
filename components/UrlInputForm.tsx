
import React, { useState } from 'react';
import { APP_NAME } from '../constants';
import Button from './common/Button';
import { SparklesIcon } from './icons/SparklesIcon'; // Assuming you'll create this

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setInputError('Please enter a website URL.');
      return;
    }
    // Basic URL validation (does not check for valid domain, just format)
    try {
      new URL(url); // This will throw an error if the URL is malformed
      setInputError('');
      onSubmit(url);
    } catch (_) {
      setInputError('Please enter a valid URL (e.g., https://example.com).');
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-8 md:p-12 text-neutral-dark">
      <div className="text-center mb-8">
        <SparklesIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{APP_NAME}</h1>
        <p className="text-neutral-dark text-lg md:text-xl">
          Get a Free Website Navigation & Accessibility Check-up for Your Association.
        </p>
        <p className="text-sm text-neutral-DEFAULT mt-2">
          Instantly discover key insights to improve user experience and AODA compliance.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-neutral-dark mb-1">
            Enter Website URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (inputError) setInputError('');
            }}
            placeholder="https://yourassociation.org"
            className="w-full px-4 py-3 border border-neutral-DEFAULT/50 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition duration-150"
            disabled={isLoading}
          />
          {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
        </div>
        <Button type="submit" disabled={isLoading} fullWidth variant="primary">
          {isLoading ? 'Analyzing...' : 'Analyze My Website'}
        </Button>
      </form>
    </div>
  );
};

export default UrlInputForm;
