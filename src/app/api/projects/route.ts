/**
 * Project Management API
 * 
 * Advanced project management endpoints for enterprise features
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  createProjectFromTemplate, 
  getProjectDashboard, 
  createCollaborativeDocument,
  addDocumentCollaborator,
  saveDocumentRevision,
  addDocumentComment,
  PROJECT_TEMPLATES 
} from '@/lib/projects';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    switch (action) {
      case 'dashboard':
        const dashboard = await getProjectDashboard(userId);
        return NextResponse.json(dashboard);

      case 'templates':
        return NextResponse.json({ 
          success: true, 
          data: PROJECT_TEMPLATES 
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Project API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create-from-template':
        const { templateId, customData } = body;
        if (!templateId || !customData) {
          return NextResponse.json({ error: 'Template ID and custom data required' }, { status: 400 });
        }
        
        const project = await createProjectFromTemplate(templateId, customData);
        return NextResponse.json(project);

      case 'create-document':
        const { projectId, title, initialContent, ownerId } = body;
        if (!projectId || !title || !ownerId) {
          return NextResponse.json({ error: 'Project ID, title, and owner ID required' }, { status: 400 });
        }
        
        const document = await createCollaborativeDocument(projectId, title, initialContent, ownerId);
        return NextResponse.json(document);

      case 'add-collaborator':
        const { documentId, userId, role } = body;
        if (!documentId || !userId) {
          return NextResponse.json({ error: 'Document ID and user ID required' }, { status: 400 });
        }
        
        const collaborator = await addDocumentCollaborator(documentId, userId, role);
        return NextResponse.json(collaborator);

      case 'save-revision':
        const { documentId: docId, content, authorId, changes } = body;
        if (!docId || !content || !authorId) {
          return NextResponse.json({ error: 'Document ID, content, and author ID required' }, { status: 400 });
        }
        
        const revision = await saveDocumentRevision(docId, content, authorId, changes);
        return NextResponse.json(revision);

      case 'add-comment':
        const { documentId: commentDocId, userId: commentUserId, content: commentContent, position } = body;
        if (!commentDocId || !commentUserId || !commentContent) {
          return NextResponse.json({ error: 'Document ID, user ID, and content required' }, { status: 400 });
        }
        
        const comment = await addDocumentComment(commentDocId, commentUserId, commentContent, position);
        return NextResponse.json(comment);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Project API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'update-project-status':
        // TODO: Implement project status update
        return NextResponse.json({ success: true });

      case 'update-milestone':
        // TODO: Implement milestone update
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Project API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
