import React, { useState } from 'react';
import { type FormData } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import jsPDF from 'jspdf';

interface LeadCaptureFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', association: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormData]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.association.trim()) newErrors.association = 'Association name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Helper to generate PDF from formData and report (if available)
  const handleDownloadPDF = () => {
    // Get the report data from localStorage or window (since LeadCaptureForm doesn't have direct access)
    let reportData = null;
    try {
      reportData = window.__NAVSENSE_REPORT__;
    } catch {}
    if (!reportData) {
      alert('Report data not found. Please try again.');
      return;
    }
    const { analysisResult, leadData } = reportData;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('NavSense AI™ Full Report', 10, 15);
    doc.setFontSize(12);
    doc.text(`Prepared for: ${leadData.name}, ${leadData.association}`, 10, 25);
    doc.text(`Email: ${leadData.email}`, 10, 32);
    doc.text(`Website Analyzed: ${leadData.analyzedUrl}`, 10, 39);
    doc.text(`Date: ${(new Date(leadData.timestamp)).toLocaleString()}`, 10, 46);
    doc.setFontSize(14);
    doc.text('Executive Summary:', 10, 56);
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(analysisResult.reportSummary, 180), 10, 63);
    let y = 80;
    doc.setFontSize(14);
    doc.text('Scores:', 10, y);
    doc.setFontSize(12);
    y += 7;
    doc.text(`Overall Score: ${analysisResult.overallScore}`, 10, y);
    y += 7;
    doc.text(`Navigation Clarity: ${analysisResult.navigationClarityScore}`, 10, y);
    y += 7;
    doc.text(`Accessibility: ${analysisResult.accessibilityScore}`, 10, y);
    y += 10;
    doc.setFontSize(14);
    doc.text('Navigation Clarity:', 10, y);
    y += 7;
    doc.setFontSize(12);
    doc.text('Key Strengths:', 10, y);
    y += 6;
    analysisResult.uxPositives.forEach((item) => {
      doc.text(`- ${item}`, 12, y);
      y += 6;
    });
    doc.text('Opportunities for Improvement:', 10, y);
    y += 6;
    analysisResult.uxIssues.forEach((item) => {
      doc.text(`- ${item}`, 12, y);
      y += 6;
    });
    y += 2;
    doc.setFontSize(14);
    doc.text('Accessibility Compliance:', 10, y);
    y += 7;
    doc.setFontSize(12);
    doc.text('Key Strengths:', 10, y);
    y += 6;
    analysisResult.a11yPositives.forEach((item) => {
      doc.text(`- ${item}`, 12, y);
      y += 6;
    });
    doc.text('Opportunities for Improvement:', 10, y);
    y += 6;
    analysisResult.a11yIssues.forEach((item) => {
      doc.text(`- ${item}`, 12, y);
      y += 6;
    });
    doc.save('NavSenseAI_Full_Report.pdf');
  };

  return (
    <Card>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">Unlock Your Full Report</h2>
      <p className="text-neutral-dark text-center mb-6">
        Provide your details to receive the comprehensive NavSense AI™ report with detailed findings and actionable recommendations.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-dark">Full Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.name ? 'border-red-500' : 'border-neutral-DEFAULT/50'}`} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="association" className="block text-sm font-medium text-neutral-dark">Association Name</label>
          <input type="text" name="association" id="association" value={formData.association} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.association ? 'border-red-500' : 'border-neutral-DEFAULT/50'}`} />
          {errors.association && <p className="text-red-500 text-xs mt-1">{errors.association}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-dark">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.email ? 'border-red-500' : 'border-neutral-DEFAULT/50'}`} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="pt-2 space-y-3">
          <Button type="submit" variant="primary" fullWidth>Download Full Report</Button>
          <Button type="button" onClick={handleDownloadPDF} variant="accent" fullWidth>
            Download PDF
          </Button>
          <Button type="button" onClick={onBack} variant="secondary" fullWidth className="bg-transparent text-primary hover:bg-primary-lighter/20">
            Back to Summary
          </Button>
        </div>
      </form>
      <p className="text-xs text-neutral-DEFAULT mt-6 text-center">
        We respect your privacy. Your information will only be used to provide the report and occasional updates about our services.
      </p>
    </Card>
  );
};

export default LeadCaptureForm;
