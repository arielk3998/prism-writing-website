/**
 * CRM API Endpoints
 * 
 * Customer Relationship Management endpoints for enterprise features
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  createContact, 
  getCRMDashboard, 
  createOpportunity,
  logActivity,
  updateContactStatus,
  updateOpportunityStage,
  searchContacts
} from '@/lib/crm';

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
        const dashboard = await getCRMDashboard(userId);
        return NextResponse.json(dashboard);

      case 'search':
        const query = searchParams.get('query') || '';
        const filters = {
          type: searchParams.get('type') || undefined,
          status: searchParams.get('status') || undefined,
          source: searchParams.get('source') || undefined,
          tags: searchParams.get('tags')?.split(',') || undefined
        };
        
        const searchResults = await searchContacts(query, filters);
        return NextResponse.json(searchResults);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ CRM API Error:', error);
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
      case 'create-contact':
        const { contactData } = body;
        if (!contactData) {
          return NextResponse.json({ error: 'Contact data required' }, { status: 400 });
        }
        
        const contact = await createContact(contactData);
        return NextResponse.json(contact);

      case 'create-opportunity':
        const { opportunityData } = body;
        if (!opportunityData) {
          return NextResponse.json({ error: 'Opportunity data required' }, { status: 400 });
        }
        
        const opportunity = await createOpportunity(opportunityData);
        return NextResponse.json(opportunity);

      case 'log-activity':
        const { activityData } = body;
        if (!activityData) {
          return NextResponse.json({ error: 'Activity data required' }, { status: 400 });
        }
        
        const activity = await logActivity(activityData);
        return NextResponse.json(activity);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ CRM API Error:', error);
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
      case 'update-contact-status':
        const { contactId, newStatus } = body;
        if (!contactId || !newStatus) {
          return NextResponse.json({ error: 'Contact ID and new status required' }, { status: 400 });
        }
        
        const updatedContact = await updateContactStatus(contactId, newStatus);
        return NextResponse.json(updatedContact);

      case 'update-opportunity-stage':
        const { opportunityId, newStage } = body;
        if (!opportunityId || !newStage) {
          return NextResponse.json({ error: 'Opportunity ID and new stage required' }, { status: 400 });
        }
        
        const updatedOpportunity = await updateOpportunityStage(opportunityId, newStage);
        return NextResponse.json(updatedOpportunity);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ CRM API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
