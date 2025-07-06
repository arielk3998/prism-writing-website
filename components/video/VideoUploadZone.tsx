'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, Video, FileType, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { VideoUploadState, VideoProcessingJob } from '@/lib/types/video';

interface VideoUploadZoneProps {
  onUploadComplete?: (job: VideoProcessingJob) => void;
  onUploadProgress?: (progress: number) => void;
  onError?: (error: string) => void;
  maxFileSize?: number; // in MB
  className?: string;
}

const VideoUploadZone: React.FC<VideoUploadZoneProps> = ({
  onUploadComplete,
  onUploadProgress,
  onError,
  maxFileSize = 500,
  className = ''
}) => {
  const [uploadState, setUploadState] = useState<VideoUploadState>({
    file: null,
    progress: 0,
    status: 'idle'
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFormats = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];
  const maxFileSizeBytes = maxFileSize * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    if (!allowedFormats.includes(file.type)) {
      return `Invalid file format. Please upload: ${allowedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`;
    }
    
    if (file.size > maxFileSizeBytes) {
      return `File size too large. Maximum size is ${maxFileSize}MB`;
    }
    
    return null;
  };

  const uploadVideo = async (file: File) => {
    try {
      setUploadState(prev => ({ ...prev, status: 'uploading', progress: 0 }));

      // Create form data
      const formData = new FormData();
      formData.append('video', file);

      // Upload file
      const response = await fetch('/api/video/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const { jobId } = await response.json();
      
      setUploadState(prev => ({ 
        ...prev, 
        status: 'processing', 
        progress: 100,
        jobId 
      }));

      // Create a mock job object for the callback
      const mockJob: VideoProcessingJob = {
        id: jobId,
        projectId: 'temp',
        userId: 'temp',
        video: {
          id: jobId,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          url: `mock-url-${jobId}`,
          uploadedAt: new Date()
        },
        status: 'uploaded',
        progress: 0,
        currentStep: 'Video uploaded successfully',
        createdAt: new Date()
      };

      onUploadComplete?.(mockJob);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadState(prev => ({ ...prev, status: 'error', error: errorMessage }));
      onError?.(errorMessage);
    }
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadState(prev => ({ ...prev, status: 'error', error: validationError }));
      onError?.(validationError);
      return;
    }

    setUploadState({ file, progress: 0, status: 'idle' });
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const startUpload = () => {
    if (uploadState.file) {
      uploadVideo(uploadState.file);
    }
  };

  const reset = () => {
    setUploadState({ file: null, progress: 0, status: 'idle' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (uploadState.status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="animate-processing-spin" size={24} />;
      case 'complete':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'error':
        return <AlertCircle className="text-red-600" size={24} />;
      default:
        return <Video size={24} className="text-safe-muted" />;
    }
  };

  const getStatusMessage = () => {
    switch (uploadState.status) {
      case 'uploading':
        return `Uploading... ${uploadState.progress}%`;
      case 'processing':
        return 'Starting video processing...';
      case 'complete':
        return 'Upload complete! Processing started.';
      case 'error':
        return uploadState.error || 'Upload failed';
      default:
        return uploadState.file 
          ? `Ready to upload: ${uploadState.file.name}`
          : 'Drop a video file here or click to browse';
    }
  };

  return (
    <div className={`space-y-design-4 ${className}`}>
      <Card className="p-6">
        <div
          className={`
            video-upload-zone
            ${dragActive ? 'drag-active' : ''}
            ${uploadState.status === 'error' ? 'drag-error' : ''}
            min-h-[200px] flex flex-col items-center justify-center space-y-design-4
            ${uploadState.status === 'idle' || uploadState.status === 'error' ? 'cursor-pointer' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => {
            if (uploadState.status === 'idle' || uploadState.status === 'error') {
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={allowedFormats.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center space-y-design-3">
            {getStatusIcon()}
            
            <div className="text-center">
              <p className="text-safe font-medium">
                {getStatusMessage()}
              </p>
              
              {uploadState.status === 'idle' && (
                <p className="text-safe-muted text-sm mt-2">
                  Supports MP4, MOV, AVI, WebM (max {maxFileSize}MB)
                </p>
              )}
            </div>

            {(uploadState.status === 'uploading' || uploadState.status === 'processing') && (
              <div className="w-full max-w-xs">
                <div className="progress-bar">
                  <div 
                    className="progress-fill transition-all duration-300"
                    style={{ width: `${uploadState.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {uploadState.file && uploadState.status === 'idle' && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-design-2">
              <FileType size={16} className="text-safe-muted" />
              <span className="text-sm text-safe">
                {uploadState.file.name} ({Math.round(uploadState.file.size / 1024 / 1024)}MB)
              </span>
            </div>
            
            <div className="flex space-x-design-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={reset}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={startUpload}
                className="btn-primary"
              >
                <Upload size={16} className="mr-2" />
                Start Upload
              </Button>
            </div>
          </div>
        )}

        {uploadState.status === 'error' && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={reset}
            >
              Try Again
            </Button>
          </div>
        )}
      </Card>

      <div className="text-xs text-safe-muted">
        <p><strong>Supported formats:</strong> MP4, MOV, AVI, WebM</p>
        <p><strong>Maximum file size:</strong> {maxFileSize}MB</p>
        <p><strong>Processing time:</strong> Approximately 5-10 minutes per hour of video</p>
      </div>
    </div>
  );
};

export default VideoUploadZone;
