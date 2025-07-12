import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for development
const projects = new Map();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract project data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const sourceLanguage = formData.get('sourceLanguage') as string;
    const targetLanguage = formData.get('targetLanguage') as string;
    const projectType = formData.get('projectType') as string;
    const fileCount = parseInt(formData.get('fileCount') as string || '0');

    // Basic validation
    if (!title || !sourceLanguage || !targetLanguage || !projectType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process uploaded files
    const uploadedFiles = [];
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file${i}`) as File;
      if (file) {
        // In a real implementation, you would save the file to storage
        // For now, we'll just store metadata
        uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        });
      }
    }

    // Create project object
    const projectId = `proj_${Date.now()}`;
    const project = {
      id: projectId,
      title,
      description,
      sourceLanguage,
      targetLanguage,
      projectType,
      files: uploadedFiles,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // TODO: Get user ID from auth
      userId: 'current-user'
    };

    // Store project
    projects.set(projectId, project);

    // Calculate estimated pricing (placeholder logic)
    const wordCount = uploadedFiles.reduce((total, file) => {
      // Rough estimation: 1KB ≈ 150 words
      return total + Math.floor(file.size / 1024 * 150);
    }, 0);

    const baseRate = 0.12; // $0.12 per word
    const estimatedCost = wordCount * baseRate;

    return NextResponse.json({
      success: true,
      message: 'Project created successfully',
      project: {
        ...project,
        estimatedWordCount: wordCount,
        estimatedCost: estimatedCost,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days
      }
    });

  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all projects for a user
export async function GET(request: NextRequest) {
  try {
    // TODO: Get user ID from auth
    const userId = 'current-user';
    
    const userProjects = Array.from(projects.values()).filter(
      (project: any) => project.userId === userId
    );

    return NextResponse.json({
      success: true,
      projects: userProjects
    });

  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
