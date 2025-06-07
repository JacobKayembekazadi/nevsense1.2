
import React from 'react';
import { type AnalysisResult, type LeadData } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import ScoreGauge from './ScoreGauge';

interface ReportPreviewProps {
  result: AnalysisResult;
  leadData: LeadData;
  onStartOver: () => void;
}

const DetailSection: React.FC<{ title: string; items: string[]; type: 'positive' | 'issue' }> = ({ title, items, type }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
    <ul className="list-none space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-2">
          {type === 'positive' ? 
            <CheckCircleIcon className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" /> : 
            <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          }
          <span className="text-neutral-dark">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ReportPreview: React.FC<ReportPreviewProps> = ({ result, leadData, onStartOver }) => {
  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Your NavSense AI™ Full Report</h2>
        <p className="text-neutral-dark mb-1">Prepared for: {leadData.name}, {leadData.association}</p>
        <p className="text-sm text-neutral-DEFAULT mb-6">Website Analyzed: {leadData.analyzedUrl}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <ScoreGauge score={result.overallScore} label="Overall Score" />
        <ScoreGauge score={result.navigationClarityScore} label="Navigation Clarity" />
        <ScoreGauge score={result.accessibilityScore} label="Accessibility" />
      </div>

      <div className="mb-6 p-4 bg-primary-lighter/10 rounded-lg">
        <h3 className="text-xl font-semibold text-primary mb-2">Executive Summary</h3>
        <p className="text-neutral-dark">{result.reportSummary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <h3 className="text-xl font-bold text-primary-dark mb-3 border-b-2 border-primary-light pb-1">Navigation Clarity Details</h3>
          <DetailSection title="Key Strengths" items={result.uxPositives} type="positive" />
          <DetailSection title="Opportunities for Improvement" items={result.uxIssues} type="issue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary-dark mb-3 border-b-2 border-primary-light pb-1">Accessibility Compliance Details</h3>
          <DetailSection title="Key Strengths" items={result.a11yPositives} type="positive" />
          <DetailSection title="Opportunities for Improvement" items={result.a11yIssues} type="issue" />
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-DEFAULT/30 text-center">
        <h3 className="text-xl font-semibold text-primary mb-3">Ready to Elevate Your Website?</h3>
        <p className="text-neutral-dark mb-4">
          This report provides a snapshot. A personalized consultation can help you craft a strategy for a truly exceptional user experience and full AODA compliance.
        </p>
        <Button 
            onClick={() => window.open('https://example.com/book-consultation', '_blank')} 
            variant="accent" 
            size="large"
            className="bg-accent text-neutral-dark hover:bg-amber-500"
        >
          Book a Free Consultation
        </Button>
        <Button onClick={onStartOver} variant="secondary" className="mt-3 bg-transparent text-primary hover:bg-primary-lighter/20">
          Analyze Another Website
        </Button>
      </div>
       <p className="text-xs text-neutral-DEFAULT mt-8 text-center">
        Note: This is a simulated report. Actual PDF generation and deeper analysis are part of our premium services.
      </p>
    </Card>
  );
};

export default ReportPreview;
