
export enum PageStage {
  INPUT_URL = 'INPUT_URL',
  ANALYZING = 'ANALYZING',
  SUMMARY_RESULTS = 'SUMMARY_RESULTS',
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  DETAILED_REPORT = 'DETAILED_REPORT',
}

export interface AnalysisResult {
  overallScore: number;
  navigationClarityScore: number;
  accessibilityScore: number;
  uxIssues: string[];
  uxPositives: string[];
  a11yIssues: string[];
  a11yPositives: string[];
  reportSummary: string;
}

export interface FormData {
  name: string;
  association: string;
  email: string;
}

export interface LeadData extends FormData {
  analyzedUrl: string;
  timestamp: string;
}
