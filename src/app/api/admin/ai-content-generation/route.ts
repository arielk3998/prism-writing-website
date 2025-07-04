/**
 * AI Content Generation API
 * RESTful endpoints for automated content generation
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiContentGenerator, ContentGenerationRequest } from '@/lib/aiContentGeneration';
import { prisma } from '@/lib/leads';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action) {
      case 'generate_content':
        return await generateContent(params);
      
      case 'generate_proposal':
        return await generateProposal(params);
      
      case 'generate_follow_up_sequence':
        return await generateFollowUpSequence(params);
      
      case 'generate_industry_content':
        return await generateIndustryContent(params);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: generate_content, generate_proposal, generate_follow_up_sequence, generate_industry_content' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Content Generation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'templates':
        return getContentTemplates();
      
      case 'industry_insights':
        const industry = searchParams.get('industry');
        if (!industry) {
          return NextResponse.json(
            { error: 'Industry parameter required' },
            { status: 400 }
          );
        }
        return getIndustryInsights(industry);
      
      case 'performance_metrics':
        return getContentPerformanceMetrics();
      
      default:
        return NextResponse.json(
          { 
            message: 'AI Content Generation API',
            endpoints: {
              'POST /': 'Generate content with action parameter',
              'GET /?action=templates': 'Get available content templates',
              'GET /?action=industry_insights&industry=<industry>': 'Get industry-specific insights',
              'GET /?action=performance_metrics': 'Get content performance metrics'
            }
          }
        );
    }
  } catch (error) {
    console.error('AI Content Generation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Generate personalized content
 */
async function generateContent(params: ContentGenerationRequest): Promise<NextResponse> {
  try {
    const content = await aiContentGenerator.generatePersonalizedContent(params);
    
    // Log content generation for analytics
    await logContentGeneration('content', params.type, content.estimatedEngagementScore);
    
    return NextResponse.json({
      success: true,
      content,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

/**
 * Generate proposal draft
 */
async function generateProposal(params: { leadId: string }): Promise<NextResponse> {
  try {
    const lead = await prisma.contactInquiry.findUnique({
      where: { id: params.leadId }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const proposal = await aiContentGenerator.generateProposalDraft(lead);
    
    // Log proposal generation
    await logContentGeneration('proposal', 'proposal_draft', 85);
    
    return NextResponse.json({
      success: true,
      proposal,
      leadInfo: {
        id: lead.id,
        name: lead.name,
        company: lead.company
      },
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    );
  }
}

/**
 * Generate follow-up email sequence
 */
async function generateFollowUpSequence(params: { 
  leadId: string; 
  engagementLevel: 'high' | 'medium' | 'low';
  previousInteractions: number;
}): Promise<NextResponse> {
  try {
    const lead = await prisma.contactInquiry.findUnique({
      where: { id: params.leadId }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const sequence = await aiContentGenerator.generateFollowUpSequence(
      lead,
      params.engagementLevel,
      params.previousInteractions
    );
    
    // Log sequence generation
    await logContentGeneration('follow_up_sequence', `${params.engagementLevel}_engagement`, 80);
    
    return NextResponse.json({
      success: true,
      sequence,
      leadInfo: {
        id: lead.id,
        name: lead.name,
        company: lead.company
      },
      sequenceType: params.engagementLevel,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating follow-up sequence:', error);
    return NextResponse.json(
      { error: 'Failed to generate follow-up sequence' },
      { status: 500 }
    );
  }
}

/**
 * Generate industry-specific content
 */
async function generateIndustryContent(params: {
  industry: string;
  contentType: 'case_study' | 'expertise_showcase' | 'industry_insights';
  targetAudience: string;
}): Promise<NextResponse> {
  try {
    const content = await aiContentGenerator.generateIndustrySpecificContent(
      params.industry,
      params.contentType,
      params.targetAudience
    );
    
    // Log industry content generation
    await logContentGeneration('industry_content', params.contentType, content.estimatedEngagementScore);
    
    return NextResponse.json({
      success: true,
      content,
      industry: params.industry,
      contentType: params.contentType,
      targetAudience: params.targetAudience,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating industry content:', error);
    return NextResponse.json(
      { error: 'Failed to generate industry content' },
      { status: 500 }
    );
  }
}

/**
 * Get available content templates
 */
async function getContentTemplates(): Promise<NextResponse> {
  const templates = {
    email_templates: [
      {
        id: 'welcome',
        name: 'Welcome Email',
        description: 'Initial welcome message for new leads',
        tone: 'friendly',
        length: 'medium'
      },
      {
        id: 'follow_up_24h',
        name: '24-Hour Follow-up',
        description: 'Follow-up email sent 24 hours after initial contact',
        tone: 'professional',
        length: 'short'
      },
      {
        id: 'proposal_ready',
        name: 'Proposal Ready',
        description: 'Notification that proposal is ready for review',
        tone: 'consultative',
        length: 'medium'
      },
      {
        id: 'weekly_nurture',
        name: 'Weekly Nurture',
        description: 'Weekly educational content for lead nurturing',
        tone: 'professional',
        length: 'long'
      }
    ],
    proposal_templates: [
      {
        id: 'technical_documentation',
        name: 'Technical Documentation Project',
        description: 'Template for technical writing projects',
        sections: ['executive_summary', 'scope_of_work', 'timeline', 'investment']
      },
      {
        id: 'content_strategy',
        name: 'Content Strategy Project',
        description: 'Template for content strategy consulting',
        sections: ['analysis', 'recommendations', 'implementation', 'measurement']
      }
    ],
    industry_content: [
      {
        id: 'healthcare',
        name: 'Healthcare Industry',
        specializations: ['Regulatory compliance', 'Clinical documentation', 'Medical device manuals']
      },
      {
        id: 'technology',
        name: 'Technology Sector',
        specializations: ['API documentation', 'User guides', 'Developer documentation']
      },
      {
        id: 'manufacturing',
        name: 'Manufacturing Industry',
        specializations: ['Safety procedures', 'Quality manuals', 'Training materials']
      }
    ]
  };

  return NextResponse.json({
    success: true,
    templates,
    lastUpdated: new Date().toISOString()
  });
}

/**
 * Get industry-specific insights
 */
async function getIndustryInsights(industry: string): Promise<NextResponse> {
  const insights = {
    industry,
    trends: [
      `Growing demand for ${industry}-specific technical documentation`,
      `Increased focus on compliance and regulatory requirements`,
      `Need for multilingual documentation support`
    ],
    challenges: [
      `Complex regulatory environment in ${industry}`,
      `Rapid technological changes requiring documentation updates`,
      `Need for specialized expertise and terminology`
    ],
    opportunities: [
      `Digital transformation initiatives requiring new documentation`,
      `Training and onboarding documentation needs`,
      `Process optimization and standardization projects`
    ],
    contentRecommendations: [
      {
        type: 'case_study',
        title: `${industry} Success Story`,
        description: `Showcase successful project in ${industry} sector`
      },
      {
        type: 'expertise_showcase',
        title: `${industry} Expertise`,
        description: `Demonstrate deep understanding of ${industry} requirements`
      },
      {
        type: 'industry_insights',
        title: `${industry} Trends Report`,
        description: `Analysis of current trends and future outlook in ${industry}`
      }
    ]
  };

  return NextResponse.json({
    success: true,
    insights,
    generatedAt: new Date().toISOString()
  });
}

/**
 * Get content performance metrics
 */
async function getContentPerformanceMetrics(): Promise<NextResponse> {
  try {
    // In a real implementation, this would query actual performance data
    const metrics = {
      totalContentGenerated: 156,
      averageEngagementScore: 82,
      contentTypes: {
        email_templates: 89,
        proposals: 34,
        follow_up_sequences: 23,
        industry_content: 10
      },
      performanceByType: {
        email_templates: {
          averageEngagementScore: 78,
          openRate: 65,
          clickRate: 12
        },
        proposals: {
          averageEngagementScore: 92,
          viewRate: 89,
          acceptanceRate: 45
        },
        follow_up_sequences: {
          averageEngagementScore: 75,
          responseRate: 28,
          conversionRate: 18
        }
      },
      topPerformingIndustries: [
        { industry: 'Healthcare', engagementScore: 89 },
        { industry: 'Technology', engagementScore: 85 },
        { industry: 'Manufacturing', engagementScore: 79 }
      ],
      recentOptimizations: [
        'Improved personalization algorithms',
        'Enhanced industry-specific terminology',
        'Better call-to-action optimization'
      ]
    };

    return NextResponse.json({
      success: true,
      metrics,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting performance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve performance metrics' },
      { status: 500 }
    );
  }
}

/**
 * Log content generation for analytics
 */
async function logContentGeneration(
  category: string,
  type: string,
  engagementScore: number
): Promise<void> {
  try {
    // In a real implementation, this would log to analytics system
    console.log(`Content generated: ${category}/${type}, engagement score: ${engagementScore}`);
    
    // Example: Save to database for analytics
    // await prisma.contentGenerationLog.create({
    //   data: {
    //     category,
    //     type,
    //     engagementScore,
    //     generatedAt: new Date()
    //   }
    // });
  } catch (error) {
    console.error('Error logging content generation:', error);
    // Don't throw error - logging failure shouldn't break content generation
  }
}
