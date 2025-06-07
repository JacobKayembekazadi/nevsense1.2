
import React from 'react';
import { type AnalysisResult } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import ScoreGauge from './ScoreGauge';

interface ResultsSummaryProps {
  result: AnalysisResult;
  onGetFullReport: () => void;
  onStartOver: () => void;
}

const IssuePositiveItem: React.FC<{ text: string; type: 'issue' | 'positive' }> = ({ text, type }) => (
  <li className="flex items-start space-x-2 py-2">
    {type === 'positive' ? 
      <CheckCircleIcon className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" /> : 
      <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
    }
    <span className="text-neutral-dark">{text}</span>
  </li>
);

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ result, onGetFullReport, onStartOver }) => {
  return (
    <Card>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Analysis Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <ScoreGauge score={result.overallScore} label="Overall Score" />
        <ScoreGauge score={result.navigationClarityScore} label="Navigation Clarity" />
        <ScoreGauge score={result.accessibilityScore} label="Accessibility" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-3">Navigation Clarity Insights</h3>
          <h4 className="text-md font-medium text-neutral-dark mb-1">Key Positives:</h4>
          <ul className="list-none mb-4">
            {result.uxPositives.slice(0,3).map((item, index) => <IssuePositiveItem key={`ux-pos-${index}`} text={item} type="positive" />)}
          </ul>
          <h4 className="text-md font-medium text-neutral-dark mb-1">Areas for Improvement:</h4>
          <ul className="list-none">
            {result.uxIssues.slice(0,3).map((item, index) => <IssuePositiveItem key={`ux-iss-${index}`} text={item} type="issue" />)}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-primary mb-3">Accessibility Insights</h3>
          <h4 className="text-md font-medium text-neutral-dark mb-1">Key Positives:</h4>
          <ul className="list-none mb-4">
            {result.a11yPositives.slice(0,3).map((item, index) => <IssuePositiveItem key={`a11y-pos-${index}`} text={item} type="positive" />)}
          </ul>
          <h4 className="text-md font-medium text-neutral-dark mb-1">Areas for Improvement:</h4>
          <ul className="list-none">
            {result.a11yIssues.slice(0,3).map((item, index) => <IssuePositiveItem key={`a11y-iss-${index}`} text={item} type="issue" />)}
          </ul>
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <Button onClick={onGetFullReport} variant="primary" size="large">
          Get Full Report & Recommendations
        </Button>
        <Button onClick={onStartOver} variant="secondary" className="bg-transparent text-primary hover:bg-primary-lighter/20">
          Analyze Another Website
        </Button>
        <p className="text-sm text-neutral-DEFAULT mt-4">
          The full report includes detailed findings, actionable advice, and specific examples.
        </p>
      </div>
    </Card>
  );
};

export default ResultsSummary;
