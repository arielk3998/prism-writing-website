/**
 * Lead Management API Route
 * Handles CRUD operations for contact inquiries/leads
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getLeads, updateLead, deleteLead, LeadFilters, LeadUpdate } from '@/lib/leads';

// Validation schema for lead updates
const leadUpdateSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED_LOST', 'FOLLOW_UP_SCHEDULED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedTo: z.string().cuid().optional().nullable(),
  notes: z.string().optional().nullable(),
  nextFollowUpAt: z.string().datetime().optional().nullable(),
  lastContactedAt: z.string().datetime().optional().nullable(),
});

const leadFiltersSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED_LOST', 'FOLLOW_UP_SCHEDULED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedTo: z.string().cuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(25),
});

// GET - Fetch leads with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: LeadFilters = {
      status: searchParams.get('status') || undefined,
      priority: searchParams.get('priority') || undefined,
      assignedTo: searchParams.get('assignedTo') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '25'),
    };

    const validationResult = leadFiltersSchema.safeParse(filters);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid filters', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const result = await getLeads(validationResult.data);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Lead management GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// PUT - Update lead
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validationResult = leadUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid lead data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { id, ...updateData } = validationResult.data;

    // Convert datetime strings to Date objects
    const leadUpdate: LeadUpdate = { 
      id, 
      ...updateData,
      nextFollowUpAt: updateData.nextFollowUpAt ? new Date(updateData.nextFollowUpAt) : null,
      lastContactedAt: updateData.lastContactedAt ? new Date(updateData.lastContactedAt) : null,
    };

    const updatedLead = await updateLead(leadUpdate);
    return NextResponse.json(updatedLead);

  } catch (error) {
    console.error('Lead management PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE - Delete lead
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('id');

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    await deleteLead(leadId);
    return NextResponse.json({ message: 'Lead deleted successfully' });

  } catch (error) {
    console.error('Lead management DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
