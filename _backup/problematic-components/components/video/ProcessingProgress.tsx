'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Play,
  Download,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { VideoProcessingJob, ProcessingStatus } from '@/lib/types/video';

interface ProcessingProgressProps {
  jobId: string;
  onComplete?: (job: VideoProcessingJob) => void;
  onError?: (error: string) => void;
  refreshInterval?: number; // in milliseconds
  className?: string;
}

const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  jobId,
  onComplete,
  onError,
  refreshInterval = 5000,
  className = ''
}) => {
  const [job, setJob] = useState<VideoProcessingJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobStatus = async () => {
    try {
      const response = await fetch(`/api/video/status/${jobId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job status');
      }
      
      const data = await response.json();
      setJob(data.job);
      setError(null);
      
      if (data.job.status === 'complete') {
        onComplete?.(data.job);
      } else if (data.job.status === 'error') {
        onError?.(data.job.error || 'Processing failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch status';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobStatus();
    
    // Set up polling for active jobs
    const interval = setInterval(() => {
      if (job && !['complete', 'error'].includes(job.status)) {
        fetchJobStatus();
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [jobId, refreshInterval, job?.status]);

  const getStatusColor = (status: ProcessingStatus): string => {
    switch (status) {
      case 'pending':
      case 'uploading':
        return 'processing-pending';
      case 'uploaded':
      case 'transcribing':
      case 'analyzing':
      case 'extracting-frames':
      case 'generating-document':
        return 'processing-active';
      case 'complete':
        return 'processing-complete';
      case 'error':
        return 'processing-error';
      default:
        return 'processing-pending';
    }
  };

  const getStatusIcon = (status: ProcessingStatus) => {
    switch (status) {
      case 'complete':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Loader2 size={20} className="animate-processing-spin" />;
    }
  };

  const getStepIcon = (step: string) => {
    if (step.includes('transcript')) return <FileText size={16} />;
    if (step.includes('frame')) return <Image size={16} />;
    if (step.includes('document')) return <FileText size={16} />;
    return <Play size={16} />;
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressSteps = () => {
    if (!job) return [];
    
    const steps = [
      { key: 'uploaded', label: 'Video Uploaded', completed: true },
      { key: 'transcribing', label: 'Transcribing Audio', completed: false },
      { key: 'analyzing', label: 'Analyzing Content', completed: false },
      { key: 'extracting-frames', label: 'Extracting Key Frames', completed: false },
      { key: 'generating-document', label: 'Generating Document', completed: false },
      { key: 'complete', label: 'Processing Complete', completed: false }
    ];

    const statusOrder = ['uploaded', 'transcribing', 'analyzing', 'extracting-frames', 'generating-document', 'complete'];
    const currentIndex = statusOrder.indexOf(job.status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
      icon: getStepIcon(step.label)
    }));
  };

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center space-x-design-3">
          <Loader2 size={20} className="animate-processing-spin text-safe-muted" />
          <span className="text-safe">Loading processing status...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center space-x-design-3 text-red-600">
          <AlertCircle size={20} />
          <span>Error: {error}</span>
        </div>
      </Card>
    );
  }

  if (!job) {
    return null;
  }

  const progressSteps = getProgressSteps();

  return (
    <div className={`space-y-design-4 ${className}`}>
      {/* Status Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-design-3">
            {getStatusIcon(job.status)}
            <div>
              <h3 className="font-semibold text-safe">
                {job.video.fileName}
              </h3>
              <p className={`text-sm processing-indicator ${getStatusColor(job.status)}`}>
                {job.currentStep || job.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            </div>
          </div>
          
          <div className="text-right text-safe-muted text-sm">
            <p>Duration: {job.video.duration ? formatDuration(job.video.duration) : 'Unknown'}</p>
            <p>Size: {Math.round(job.video.fileSize / 1024 / 1024)}MB</p>
          </div>
        </div>

        {/* Progress Bar */}
        {job.status !== 'complete' && job.status !== 'error' && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-safe-muted mb-2">
              <span>Progress</span>
              <span>{job.progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${job.progress}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      {/* Processing Steps */}
      <Card className="p-6">
        <h4 className="font-semibold text-safe mb-4">Processing Steps</h4>
        <div className="space-y-design-3">
          {progressSteps.map((step, index) => (
            <div 
              key={step.key}
              className={`flex items-center space-x-design-3 p-3 rounded-lg transition-all ${
                step.completed 
                  ? 'bg-green-50 dark:bg-green-900/20' 
                  : step.active 
                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                    : 'bg-gray-50 dark:bg-gray-800/50'
              }`}
            >
              <div className={`flex-shrink-0 ${
                step.completed 
                  ? 'text-green-600' 
                  : step.active 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
              }`}>
                {step.completed ? (
                  <CheckCircle size={16} />
                ) : step.active ? (
                  <Loader2 size={16} className="animate-processing-spin" />
                ) : (
                  step.icon
                )}
              </div>
              <span className={`${
                step.completed || step.active 
                  ? 'text-safe font-medium' 
                  : 'text-safe-muted'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Results Section */}
      {(job.transcription || job.frames || job.analysis || job.generatedDocument) && (
        <Card className="p-6">
          <h4 className="font-semibold text-safe mb-4">Processing Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Transcription */}
            {job.transcription && (
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-design-2 mb-2">
                  <FileText size={16} className="text-safe-accent" />
                  <span className="font-medium text-safe">Transcription</span>
                </div>
                <p className="text-sm text-safe-muted mb-3">
                  {job.transcription.segments.length} segments, {job.transcription.confidence}% confidence
                </p>
                <Button size="sm" variant="secondary">
                  <Eye size={14} className="mr-1" />
                  View Transcript
                </Button>
              </div>
            )}

            {/* Extracted Frames */}
            {job.frames && job.frames.length > 0 && (
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-design-2 mb-2">
                  <Image size={16} className="text-safe-accent" />
                  <span className="font-medium text-safe">Key Frames</span>
                </div>
                <p className="text-sm text-safe-muted mb-3">
                  {job.frames.length} frames extracted
                </p>
                <Button size="sm" variant="secondary">
                  <Eye size={14} className="mr-1" />
                  View Frames
                </Button>
              </div>
            )}

            {/* Content Analysis */}
            {job.analysis && (
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-design-2 mb-2">
                  <FileText size={16} className="text-safe-accent" />
                  <span className="font-medium text-safe">Analysis</span>
                </div>
                <p className="text-sm text-safe-muted mb-3">
                  {job.analysis.documentType.replace('-', ' ')} • Quality: {job.analysis.contentQuality}/10
                </p>
                <Button size="sm" variant="secondary">
                  <Eye size={14} className="mr-1" />
                  View Analysis
                </Button>
              </div>
            )}

            {/* Generated Document */}
            {job.generatedDocument && (
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-design-2 mb-2">
                  <FileText size={16} className="text-safe-accent" />
                  <span className="font-medium text-safe">Document</span>
                </div>
                <p className="text-sm text-safe-muted mb-3">
                  {job.generatedDocument.title}
                </p>
                <div className="flex space-x-design-2">
                  <Button size="sm" variant="secondary">
                    <Eye size={14} className="mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" className="btn-primary">
                    <Download size={14} className="mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Error Details */}
      {job.status === 'error' && job.error && (
        <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-start space-x-design-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Processing Error
              </h4>
              <p className="text-red-700 dark:text-red-300 text-sm">
                {job.error}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProcessingProgress;
