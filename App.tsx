
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PageStage, type AnalysisResult, type LeadData, type FormData } from './types';
import { GEMINI_MODEL_NAME } from './constants';
import UrlInputForm from './components/UrlInputForm';
import LoadingIndicator from './components/LoadingIndicator';
import ResultsSummary from './components/ResultsSummary';
import LeadCaptureForm from './components/LeadCaptureForm';
import ReportPreview from './components/ReportPreview';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorDisplay from './components/ErrorDisplay';

// Ensure API_KEY is available. In a real build, this would be set in the environment.
// For this environment, we expect it to be globally available or set via a .env file.
// If process.env.API_KEY is not set, the app will show an error.
const API_KEY = process.env.API_KEY;


const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<PageStage>(PageStage.INPUT_URL);
  const [url, setUrl] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

  const handleAnalyze = useCallback(async (targetUrl: string) => {
    if (!ai) {
      setError("API Key not configured. Please ensure the API_KEY environment variable is set.");
      setIsLoading(false);
      setCurrentStage(PageStage.INPUT_URL);
      return;
    }

    setUrl(targetUrl);
    setIsLoading(true);
    setError(null);
    setCurrentStage(PageStage.ANALYZING);
    setAnalysisResult(null);

    const prompt = `
      You are NavSense AI™, an advanced website analysis engine specializing in navigation clarity (UX) and accessibility (AODA/WCAG compliance) for national association websites.

      For the given website URL: "${targetUrl}"

      Please generate a simulated analysis report in JSON format. The report should include:
      1.  An "overallScore" (integer between 60 and 95).
      2.  A "navigationClarityScore" (integer between 60 and 95).
      3.  An "accessibilityScore" (integer between 60 and 95).
      4.  An array named "uxIssues" containing 3 distinct, concise descriptions of potential UX problems related to website navigation. Examples: "Navigation labels could be more specific.", "Information architecture appears slightly deep in some sections.", "Mobile navigation tap targets are a bit small."
      5.  An array named "uxPositives" containing 3 distinct, concise descriptions of positive UX aspects related to website navigation. Examples: "Main navigation is consistently placed.", "Clear visual hierarchy in the primary menu.", "Search functionality is easily accessible."
      6.  An array named "a11yIssues" containing 3 distinct, concise descriptions of potential accessibility problems related to website navigation, focusing on AODA/WCAG. Examples: "Some menu item contrasts are borderline.", "Missing ARIA roles on a secondary navigation menu.", "Link text 'Read More' in navigation could be more descriptive."
      7.  An array named "a11yPositives" containing 3 distinct, concise descriptions of positive accessibility aspects related to website navigation. Examples: "Keyboard navigation through the main menu is functional.", "Focus indicators are clearly visible.", "Semantic HTML (e.g., <nav>) is used for navigation regions."
      8.  A "reportSummary" (a string paragraph of 2-3 sentences) summarizing the key findings and hinting at the value of a full detailed report. This summary should be professional and encouraging.

      Ensure the output is ONLY a valid JSON object. Do not include any explanatory text, markdown, or code block fences before or after the JSON.
      The scores should be realistic, reflecting a typical website that might have some good points but also areas for improvement.
      Do not use placeholder text like "Issue 1". Provide concrete, believable examples.
      `;

    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7, // Add some variability for more diverse "mock" results
        },
      });
      
      let jsonStr = response.text.trim();
      // Remove potential markdown fences if Gemini still adds them despite instructions
      const fenceRegex = /^\s*```(?:json)?\s*\n?(.*?)\n?\s*```\s*$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[1]) {
        jsonStr = match[1].trim();
      }

      const result = JSON.parse(jsonStr) as AnalysisResult;
      setAnalysisResult(result);
      setCurrentStage(PageStage.SUMMARY_RESULTS);
    } catch (e: any) {
      console.error("Error during analysis:", e);
      setError(`Failed to analyze website. ${e.message || 'Please try again.'}`);
      setCurrentStage(PageStage.INPUT_URL);
    } finally {
      setIsLoading(false);
    }
  }, [ai]);

  const handleShowLeadForm = () => {
    setCurrentStage(PageStage.LEAD_CAPTURE);
  };

  const handleLeadSubmit = (data: FormData) => {
    setLeadData({
      name: data.name,
      association: data.association,
      email: data.email,
      analyzedUrl: url,
      timestamp: new Date().toISOString(),
    });
    // In a real app, this data would be sent to a backend.
    console.log("Lead captured:", { ...data, analyzedUrl: url });
    setCurrentStage(PageStage.DETAILED_REPORT);
  };

  const handleStartOver = () => {
    setCurrentStage(PageStage.INPUT_URL);
    setUrl('');
    setAnalysisResult(null);
    setLeadData(null);
    setError(null);
    setIsLoading(false);
  };
  
  const renderContent = () => {
    if (!API_KEY && currentStage !== PageStage.ANALYZING) { // Show API key error unless already loading
        return <ErrorDisplay message="API Key not configured. Please set the API_KEY environment variable to use NavSense AI™." onDismiss={() => setError(null)} />;
    }
    if (error && currentStage !== PageStage.ANALYZING) { // Don't show general error if loading (isLoading has its own indicator)
        return <ErrorDisplay message={error} onDismiss={() => setError(null)} />;
    }

    switch (currentStage) {
      case PageStage.INPUT_URL:
        return <UrlInputForm onSubmit={handleAnalyze} isLoading={isLoading} />;
      case PageStage.ANALYZING:
        return <LoadingIndicator url={url} />;
      case PageStage.SUMMARY_RESULTS:
        return analysisResult ? (
          <ResultsSummary result={analysisResult} onGetFullReport={handleShowLeadForm} onStartOver={handleStartOver} />
        ) : (
          <LoadingIndicator text="Preparing results..." /> // Fallback if result is somehow null
        );
      case PageStage.LEAD_CAPTURE:
        return <LeadCaptureForm onSubmit={handleLeadSubmit} onBack={() => setCurrentStage(PageStage.SUMMARY_RESULTS)} />;
      case PageStage.DETAILED_REPORT:
        return analysisResult && leadData ? (
          <ReportPreview result={analysisResult} leadData={leadData} onStartOver={handleStartOver} />
        ) : (
          <LoadingIndicator text="Generating report..." /> // Fallback
        );
      default:
        return <UrlInputForm onSubmit={handleAnalyze} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-light via-primary to-blue-700 text-neutral-light">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
