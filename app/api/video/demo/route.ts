import { NextRequest, NextResponse } from 'next/server';
import { jobStorage } from '@/lib/services/jobStorage';
import { v4 as uuidv4 } from 'uuid';
import type { VideoProcessingJob } from '@/lib/types/video';

export async function POST(request: NextRequest) {
  try {
    // Create a demo job for testing
    const jobId = uuidv4();
    const demoJob: VideoProcessingJob = {
      id: jobId,
      projectId: 'demo-project',
      userId: 'demo-user',
      video: {
        id: uuidv4(),
        fileName: 'demo-video.mp4',
        fileSize: 25 * 1024 * 1024, // 25MB
        mimeType: 'video/mp4',
        duration: 180, // 3 minutes
        url: 'https://demo-storage.com/demo-video.mp4',
        uploadedAt: new Date()
      },
      status: 'uploaded',
      progress: 0,
      currentStep: 'Demo video ready for processing',
      createdAt: new Date()
    };

    // Store the demo job
    jobStorage.set(jobId, demoJob);

    return NextResponse.json({
      success: true,
      message: 'Demo job created successfully',
      jobId,
      job: demoJob
    });

  } catch (error) {
    console.error('Error creating demo job:', error);
    return NextResponse.json(
      { error: 'Failed to create demo job' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all jobs for debugging
  const allJobs = jobStorage.getAll();
  
  return NextResponse.json({
    success: true,
    totalJobs: allJobs.length,
    jobs: allJobs
  });
}
