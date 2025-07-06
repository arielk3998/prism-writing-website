import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET!;
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_TYPES = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileSize, mimeType } = await request.json();

    // Validate file type
    if (!ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only video files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 500MB.' },
        { status: 400 }
      );
    }

    // Generate unique identifiers
    const jobId = uuidv4();
    const videoId = uuidv4();
    const fileExtension = fileName.split('.').pop();
    const s3Key = `videos/${jobId}/${videoId}.${fileExtension}`;

    // Create S3 upload command
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      ContentType: mimeType,
      ContentLength: fileSize,
      Metadata: {
        'original-filename': fileName,
        'job-id': jobId,
        'video-id': videoId,
      },
    });

    // Generate presigned URL (valid for 1 hour)
    const uploadUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 3600 
    });

    // Create video processing job record
    const videoProcessingJob = {
      id: jobId,
      projectId: 'temp', // Will be updated when linked to a project
      userId: 'temp', // Will be updated with actual user ID
      video: {
        id: videoId,
        fileName,
        fileSize,
        mimeType,
        url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`,
        uploadedAt: new Date(),
      },
      status: 'pending' as const,
      progress: 0,
      currentStep: 'Waiting for upload...',
      createdAt: new Date(),
    };

    // TODO: Save job to database
    // For now, we'll return the job data
    console.log('Created video processing job:', videoProcessingJob);

    return NextResponse.json({
      success: true,
      uploadUrl,
      jobId,
      videoId,
    });

  } catch (error) {
    console.error('Error creating upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to create upload URL' },
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
