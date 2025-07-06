'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoUploadZone from '@/components/video/VideoUploadZone';
import ProcessingProgress from '@/components/video/ProcessingProgress';
import { Video, FileText, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import type { VideoProcessingJob } from '@/lib/types/video';

const VideoDocumentationPage: React.FC = () => {
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [completedJob, setCompletedJob] = useState<VideoProcessingJob | null>(null);
  const [step, setStep] = useState<'upload' | 'processing' | 'complete'>('upload');

  const handleUploadComplete = (job: VideoProcessingJob) => {
    console.log('Upload completed:', job);
    setCurrentJobId(job.id);
    setStep('processing');
    
    // Auto-start processing
    fetch('/api/video/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: job.id })
    }).then(response => {
      if (!response.ok) {
        console.error('Failed to start processing');
      }
    }).catch(error => {
      console.error('Error starting processing:', error);
    });
  };

  const handleProcessingComplete = (job: VideoProcessingJob) => {
    setCompletedJob(job);
    setStep('complete');
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    // Handle error (show toast, etc.)
  };

  const resetFlow = () => {
    setCurrentJobId(null);
    setCompletedJob(null);
    setStep('upload');
  };

  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Video Upload',
      description: 'Support for MP4, MOV, AVI, WebM formats up to 500MB'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'AI Transcription',
      description: 'Automatic speech-to-text with speaker identification'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Content Analysis',
      description: 'Intelligent extraction of key points and structure'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Document Generation',
      description: 'Professional documentation with your brand styling'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-on-primary">
              Video to Documentation
            </h1>
            <p className="text-xl text-on-primary/90 mb-8">
              Transform your videos into professional documentation with AI-powered transcription, 
              content analysis, and intelligent document generation.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className={`flex items-center space-x-2 ${step === 'upload' ? 'text-white' : 'text-white/60'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'upload' ? 'bg-white text-primary' : 'bg-white/20'
                }`}>
                  1
                </div>
                <span>Upload</span>
              </div>
              
              <ArrowRight className="text-white/60" size={20} />
              
              <div className={`flex items-center space-x-2 ${step === 'processing' ? 'text-white' : 'text-white/60'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'processing' ? 'bg-white text-primary' : 'bg-white/20'
                }`}>
                  2
                </div>
                <span>Process</span>
              </div>
              
              <ArrowRight className="text-white/60" size={20} />
              
              <div className={`flex items-center space-x-2 ${step === 'complete' ? 'text-white' : 'text-white/60'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'complete' ? 'bg-white text-primary' : 'bg-white/20'
                }`}>
                  3
                </div>
                <span>Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Upload Step */}
          {step === 'upload' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-safe mb-4">
                  Upload Your Video
                </h2>
                <p className="text-safe-muted">
                  Select a video file to begin the documentation generation process
                </p>
              </div>

              <VideoUploadZone
                onUploadComplete={handleUploadComplete}
                onError={handleUploadError}
                maxFileSize={500}
              />
            </div>
          )}

          {/* Processing Step */}
          {step === 'processing' && currentJobId && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-safe mb-4">
                  Processing Your Video
                </h2>
                <p className="text-safe-muted">
                  Our AI is analyzing your video and generating documentation
                </p>
              </div>

              <ProcessingProgress
                jobId={currentJobId}
                onComplete={handleProcessingComplete}
                onError={handleUploadError}
              />
            </div>
          )}

          {/* Complete Step */}
          {step === 'complete' && completedJob && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-safe mb-4">
                  Documentation Generated Successfully!
                </h2>
                <p className="text-safe-muted">
                  Your video has been processed and professional documentation has been created
                </p>
              </div>

              <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-safe mb-4">Document Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-safe-muted">Title:</span>
                        <span className="text-safe">{completedJob.generatedDocument?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-safe-muted">Type:</span>
                        <span className="text-safe capitalize">
                          {completedJob.analysis?.documentType.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-safe-muted">Word Count:</span>
                        <span className="text-safe">{completedJob.generatedDocument?.metadata.wordCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-safe-muted">Quality Score:</span>
                        <span className="text-safe">{completedJob.analysis?.contentQuality}/10</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-safe mb-4">Processing Results</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-safe-muted">
                          {completedJob.transcription?.segments.length} transcript segments
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-safe-muted">
                          {completedJob.frames?.length} key frames extracted
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-safe-muted">
                          {completedJob.analysis?.topics.length} topics identified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="btn-primary">
                    <FileText size={16} className="mr-2" />
                    View Document
                  </Button>
                  <Button variant="secondary">
                    Download PDF
                  </Button>
                  <Button variant="secondary">
                    Download Word
                  </Button>
                  <Button variant="secondary" onClick={resetFlow}>
                    Process Another Video
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      {step === 'upload' && (
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-safe mb-4">
                  How It Works
                </h2>
                <p className="text-safe-muted text-lg">
                  Our AI-powered system transforms your videos into professional documentation
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-safe mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-safe-muted text-sm">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDocumentationPage;
