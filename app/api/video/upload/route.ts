import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { jobStorage } from '@/lib/services/jobStorage';
import type { VideoProcessingJob } from '@/lib/types/video';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('video') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload MP4, MOV, AVI, or WebM files.' },
        { status: 400 }
      );
    }

    // Validate file size (500MB limit)
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 500MB.' },
        { status: 400 }
      );
    }

    // Create job
    const jobId = uuidv4();
    const job: VideoProcessingJob = {
      id: jobId,
      projectId: 'temp', // Will be updated when linked to a project
      userId: 'temp', // Will be updated with actual user ID
      status: 'uploaded',
      progress: 0,
      currentStep: 'Video uploaded successfully',
      video: {
        id: uuidv4(),
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        duration: 0, // Would be extracted from video metadata
        url: `https://mock-storage.com/${jobId}/${file.name}`, // Mock URL for demo
        uploadedAt: new Date()
      },
      createdAt: new Date()
    };

    // Store job
    jobStorage.set(jobId, job);

    return NextResponse.json({
      success: true,
      jobId,
      message: 'Video uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
