/**
 * Lead Scoring API
 * Handles automated lead scoring and prioritization
 */

import { NextRequest, NextResponse } from 'next/server';
import { LeadScoringService } from '@/lib/leadScoring';

const scoringService = new LeadScoringService();

export async function POST(request: NextRequest) {
  try {
    const { action, leadId } = await request.json();

    switch (action) {
      case 'score-lead':
        if (!leadId) {
          return NextResponse.json(
            { error: 'Lead ID is required' },
            { status: 400 }
          );
        }

        // This would need to be implemented once we have proper Prisma client access
        // const score = await scoringService.scoreLead(leadId);
        
        return NextResponse.json({ 
          success: true, 
          message: 'Lead scoring will be implemented once database models are properly connected'
        });

      case 'score-all':
        // This would score all leads
        return NextResponse.json({ 
          success: true, 
          message: 'Batch lead scoring will be implemented once database models are properly connected'
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Lead scoring error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ 
      status: 'Lead scoring service is available',
      criteria: {
        contactInfo: 'Phone, company, business email (max 20 points)',
        projectValue: 'Budget range, project type, timeline (max 30 points)',
        urgency: 'Response time, urgent keywords (max 25 points)',
        engagement: 'Newsletter opt-in, follow-up permission, message length (max 15 points)',
        companySize: 'Domain analysis, employee count estimation (max 10 points)'
      },
      grades: ['A (90-100)', 'B (75-89)', 'C (60-74)', 'D (0-59)'],
      priorities: ['URGENT (95+)', 'HIGH (80-94)', 'MEDIUM (60-79)', 'LOW (0-59)']
    });
  } catch (error) {
    console.error('Lead scoring GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
