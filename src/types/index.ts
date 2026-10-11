/**
 * @file src/types/index.ts
 * Type definitions for EWENBUILDS.xyz
 * Engineering Portfolio, 3D CAD Repository, and Analytics System
 */

export interface BOMItem {
  itemNumber: string;
  partName: string;
  specification: string;
  quantity: number | string;
  sourceOrVendor: string;
  unitCost: string;
  cadFileReference?: string;
  notes?: string;
}

export interface ProjectReport {
  abstract: string;
  methodology: string;
  billOfMaterials: BOMItem[];
  conclusion: string;
  keyMetrics?: {
    label: string;
    value: string;
  }[];
  systemArchitecture?: string;
  testingParameters?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Academic' | 'Personal' | 'Robotics' | 'Embedded' | 'Mechanical';
  timeframe: string;
  shortDescription: string;
  heroImage: string;
  report: ProjectReport;
  zipDownloadUrl: string;
  zipFileSize: string;
  githubUrl?: string;
  status: 'Complete' | 'Active Testing' | 'Open Source' | 'Archived';
  tags: string[];
}

export interface BuildGuideStep {
  stepNumber: number;
  title: string;
  description: string;
  requiredTools: string[];
  inspectionTip?: string;
}

export interface BuildGuideItem {
  id: string;
  title: string;
  version: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedBuildTime: string;
  overview: string;
  
  // 3D Model Configuration
  modelType: 'armature' | 'gearbox' | 'enclosure' | 'bracket';
  modelCadFileName: string;
  modelPartCount: number;
  materials: string[];
  
  // Structured guide content
  steps: BuildGuideStep[];
  billOfMaterials: BOMItem[];
  
  // TWO Required Download Buttons
  buildFilesDownloadUrl: string;       // Button 1: CAD, STL/STEP, or code snippets only
  buildFilesSize: string;
  fullRepoDownloadUrl: string;         // Button 2: Full project repository (.zip)
  fullRepoSize: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  honors: string[];
  coursework: string[];
}

export interface ResumeExperience {
  role: string;
  organization: string;
  period: string;
  location: string;
  responsibilities: string[];
  technologiesUsed: string[];
}

export interface ResumeSkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  technicalSkills: ResumeSkillCategory[];
  certificationsAndHonors: string[];
  pdfDownloadUrl: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  type: 'pageview' | 'download_click' | 'nav_click' | 'cad_interaction' | 'contact_submit';
  target: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsSession {
  sessionId: string;
  visitorId: string;
  startTime: number;
  lastActiveTime: number;
  referrer: string;
  browser: string;
  os: string;
  deviceType: string;
  screenResolution: string;
  estimatedLocation: string;
  pageViews: number;
  downloadsCount: number;
  events: AnalyticsEvent[];
}
