/**
 * Video Processing Types for Prism Writing Enterprise
 * Video-to-Documentation System
 */

export interface VideoFile {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  duration?: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
}

export interface TranscriptionSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
  speaker?: string;
  language?: string;
}

export interface SpeakerInfo {
  id: string;
  name?: string;
  segments: string[]; // Array of segment IDs
}

export interface TranscriptionResult {
  id: string;
  videoId: string;
  segments: TranscriptionSegment[];
  speakers: SpeakerInfo[];
  language: string;
  confidence: number;
  duration: number;
  createdAt: Date;
}

export interface ExtractedFrame {
  id: string;
  videoId: string;
  timestamp: number;
  url: string;
  thumbnailUrl: string;
  description?: string;
  ocr?: string;
  tags?: string[];
  importance: number; // 1-10 scale
}

export interface ContentAnalysis {
  id: string;
  videoId: string;
  transcriptId: string;
  
  // Content Structure
  documentType: DocumentType;
  topics: string[];
  keyPoints: string[];
  summary: string;
  outline: DocumentSection[];
  
  // Quality Metrics
  contentQuality: number; // 1-10 scale
  completeness: number; // 1-10 scale
  clarity: number; // 1-10 scale
  
  // Metadata
  estimatedReadTime: number; // minutes
  complexity: 'basic' | 'intermediate' | 'advanced';
  targetAudience: string[];
  
  createdAt: Date;
}

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  startTime?: number;
  endTime?: number;
  frameIds?: string[];
  subsections?: DocumentSection[];
  order: number;
}

export type DocumentType = 
  | 'technical-documentation'
  | 'training-material'
  | 'sop'
  | 'user-guide'
  | 'meeting-notes'
  | 'product-specification'
  | 'tutorial'
  | 'presentation'
  | 'other';

export type ProcessingStatus = 
  | 'pending'
  | 'uploading'
  | 'uploaded'
  | 'transcribing'
  | 'analyzing'
  | 'extracting-frames'
  | 'generating-document'
  | 'complete'
  | 'error';

export interface VideoProcessingJob {
  id: string;
  projectId: string;
  userId: string;
  
  // Video Information
  video: VideoFile;
  
  // Processing Status
  status: ProcessingStatus;
  progress: number; // 0-100
  currentStep: string;
  error?: string;
  
  // Processing Results
  transcription?: TranscriptionResult;
  frames?: ExtractedFrame[];
  analysis?: ContentAnalysis;
  generatedDocument?: GeneratedDocument;
  
  // Configuration
  templatePreference?: DocumentType;
  customInstructions?: string;
  
  // Timestamps
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: DocumentType;
  description: string;
  sections: TemplateSection[];
  styling: TemplateStyle;
  exportFormats: ExportFormat[];
}

export interface TemplateSection {
  id: string;
  name: string;
  type: 'header' | 'content' | 'image' | 'list' | 'table' | 'code';
  required: boolean;
  placeholder?: string;
  order: number;
}

export interface TemplateStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
}

export type ExportFormat = 'html' | 'pdf' | 'docx' | 'markdown';

export interface GeneratedDocument {
  id: string;
  jobId: string;
  templateId: string;
  
  // Content
  title: string;
  content: DocumentSection[];
  metadata: DocumentMetadata;
  
  // Export versions
  exports: {
    [key in ExportFormat]?: {
      url: string;
      size: number;
      createdAt: Date;
    };
  };
  
  // Review status
  reviewStatus: 'draft' | 'under-review' | 'approved' | 'rejected';
  clientFeedback?: string;
  revisionHistory: DocumentRevision[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentMetadata {
  author: string;
  wordCount: number;
  pageCount: number;
  tags: string[];
  category: string;
  version: string;
}

export interface DocumentRevision {
  id: string;
  version: string;
  changes: string;
  author: string;
  createdAt: Date;
}

export interface VideoUploadConfig {
  maxFileSize: number; // in bytes
  allowedFormats: string[];
  compressionSettings: {
    maxResolution: '1080p' | '720p' | '480p';
    targetBitrate: number;
  };
  thumbnailSettings: {
    width: number;
    height: number;
    quality: number;
  };
}

// API Response Types
export interface VideoUploadResponse {
  success: boolean;
  jobId?: string;
  uploadUrl?: string;
  error?: string;
}

export interface ProcessingStatusResponse {
  success: boolean;
  job?: VideoProcessingJob;
  error?: string;
}

export interface DocumentGenerationResponse {
  success: boolean;
  document?: GeneratedDocument;
  error?: string;
}

// Client-side state types
export interface VideoUploadState {
  file: File | null;
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
  jobId?: string;
}

export interface ProcessingProgress {
  step: string;
  progress: number;
  message: string;
  estimatedTimeRemaining?: number;
}
