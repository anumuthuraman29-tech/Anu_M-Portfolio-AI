export type AvatarPose =
  | 'idle'
  | 'waving'
  | 'presenting'
  | 'thinking'
  | 'excited'
  | 'celebrating';

export type CertificateCategory =
  | 'Data Science'
  | 'Generative AI'
  | 'AI & Engineering'
  | 'Data Analytics';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  category: CertificateCategory;
  fileUrl: string;
  previewUrl: string;
  fileType: 'pdf' | 'image';
  fileName: string;
  isUploadedCustom?: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  featuredLabel?: string;
  shortDescription: string;
  technologies: string[];
  visualType: 'airbnb' | 'fraud' | 'car' | 'covid';
  overview: string;
  problemStatement: string;
  dataset: string;
  dataPreprocessing: string[];
  methodology: string[];
  algorithms: string[];
  evaluationMetrics: string[];
  verifiedResults: string;
  githubUrl: string;
  githubNote: string;
  whatILearned: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ProcessStage {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export interface ResumeDocument {
  id: 'ai-ml' | 'applied-science' | 'genai-analytics' | 'cover-letter';
  title: string;
  subtitle: string;
  downloadName: string;
  fileUrl: string;
  previewUrl: string;
  badge: string;
}

export interface LeadershipItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  skillsDemonstrated: string[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface TwinPrompt {
  id: string;
  question: string;
  pose: AvatarPose;
  response: string;
  fact?: string;
  actionLabel: string;
  actionType: 'scroll' | 'recruiter' | 'resume' | 'certificates';
  targetId?: string;
}
