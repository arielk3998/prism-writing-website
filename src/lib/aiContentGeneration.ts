/**
 * AI Content Generation Service
 * Automated content creation for emails, proposals, and marketing materials
 * Using OpenAI/Claude for intelligent, personalized content generation
 */

// Using ContactInquiry type from our leads module
interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  industry?: string;
  addedToNewsletter: boolean;
  allowFollowUp: boolean;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentGenerationRequest {
  type: 'email_template' | 'proposal' | 'follow_up' | 'blog_post' | 'marketing_copy';
  clientData: {
    name: string;
    company: string;
    industry: string;
    projectType: string;
    budgetRange: string;
    companySize: string;
    urgency: string;
  };
  context: string;
  tone: 'professional' | 'friendly' | 'technical' | 'persuasive' | 'consultative';
  length: 'short' | 'medium' | 'long';
  customRequirements?: string[];
}

export interface GeneratedContent {
  content: string;
  subject?: string;
  callToAction: string;
  personalizationElements: string[];
  recommendedFollowUp?: string;
  estimatedEngagementScore: number;
}

export interface ProposalDraft {
  executiveSummary: string;
  scopeOfWork: string;
  timeline: string;
  deliverables: string[];
  investment: {
    range: string;
    justification: string;
  };
  nextSteps: string[];
  appendices?: string[];
}

export class AIContentGenerator {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  /**
   * Generate personalized content based on lead data and requirements
   */
  async generatePersonalizedContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    try {
      const prompt = this.buildContentPrompt(request);
      const response = await this.callAIAPI(prompt);
      
      return this.parseContentResponse(response, request);
    } catch (error) {
      console.error('Error generating content:', error);
      return this.generateFallbackContent(request);
    }
  }

  /**
   * Generate a comprehensive proposal draft based on lead information
   */
  async generateProposalDraft(leadData: ContactInquiry): Promise<ProposalDraft> {
    try {
      const prompt = this.buildProposalPrompt(leadData);
      const response = await this.callAIAPI(prompt);
      
      return this.parseProposalResponse(response, leadData);
    } catch (error) {
      console.error('Error generating proposal:', error);
      return this.generateFallbackProposal(leadData);
    }
  }

  /**
   * Generate follow-up email sequence based on lead engagement level
   */
  async generateFollowUpSequence(
    leadData: ContactInquiry, 
    engagementLevel: 'high' | 'medium' | 'low',
    previousInteractions: number
  ): Promise<GeneratedContent[]> {
    try {
      const sequence: GeneratedContent[] = [];
      const sequenceTypes = this.getSequenceTypes(engagementLevel, previousInteractions);

      for (const sequenceType of sequenceTypes) {
        const request: ContentGenerationRequest = {
          type: 'follow_up',
          clientData: this.extractClientData(leadData),
          context: `Follow-up #${sequence.length + 1}, engagement: ${engagementLevel}, type: ${sequenceType}`,
          tone: this.selectToneForSequence(sequenceType, engagementLevel),
          length: 'medium'
        };

        const content = await this.generatePersonalizedContent(request);
        sequence.push(content);
      }

      return sequence;
    } catch (error) {
      console.error('Error generating follow-up sequence:', error);
      return [this.generateFallbackContent({
        type: 'follow_up',
        clientData: this.extractClientData(leadData),
        context: 'Follow-up email',
        tone: 'professional',
        length: 'medium'
      })];
    }
  }

  /**
   * Generate industry-specific content based on client's business sector
   */
  async generateIndustrySpecificContent(
    industry: string,
    contentType: 'case_study' | 'expertise_showcase' | 'industry_insights',
    targetAudience: string
  ): Promise<GeneratedContent> {
    try {
      const prompt = this.buildIndustryPrompt(industry, contentType, targetAudience);
      const response = await this.callAIAPI(prompt);
      
      return this.parseContentResponse(response, {
        type: 'marketing_copy',
        clientData: {
          name: '',
          company: '',
          industry,
          projectType: contentType,
          budgetRange: '',
          companySize: '',
          urgency: ''
        },
        context: `Industry: ${industry}, Type: ${contentType}`,
        tone: 'professional',
        length: 'long'
      });
    } catch (error) {
      console.error('Error generating industry content:', error);
      return this.generateFallbackContent({
        type: 'marketing_copy',
        clientData: {
          name: '',
          company: '',
          industry,
          projectType: contentType,
          budgetRange: '',
          companySize: '',
          urgency: ''
        },
        context: `Industry-specific content for ${industry}`,
        tone: 'professional',
        length: 'long'
      });
    }
  }

  /**
   * Build AI prompt for content generation
   */
  private buildContentPrompt(request: ContentGenerationRequest): string {
    const { type, clientData, context, tone, length } = request;

    return `
Generate ${length} ${type} content with a ${tone} tone for:

Client Information:
- Name: ${clientData.name}
- Company: ${clientData.company}
- Industry: ${clientData.industry}
- Project Type: ${clientData.projectType}
- Budget Range: ${clientData.budgetRange}
- Company Size: ${clientData.companySize}
- Urgency: ${clientData.urgency}

Context: ${context}

Requirements:
- Personalize based on client's industry and project needs
- Include specific benefits relevant to their business
- Use industry-appropriate terminology
- Include a clear call-to-action
- Reference Prism Writing Cooperative's expertise in technical writing
- Make it engaging and professional

Please format the response as JSON with:
{
  "subject": "Email subject line (if applicable)",
  "content": "Main content body",
  "callToAction": "Specific call-to-action",
  "personalizationElements": ["element1", "element2"],
  "recommendedFollowUp": "Suggested next step",
  "estimatedEngagementScore": 0-100
}
`;
  }

  /**
   * Build AI prompt for proposal generation
   */
  private buildProposalPrompt(leadData: ContactInquiry): string {
    return `
Generate a comprehensive proposal draft for:

Lead Information:
- Name: ${leadData.name}
- Company: ${leadData.company}
- Email: ${leadData.email}
- Phone: ${leadData.phone || 'Not provided'}
- Project Type: ${leadData.projectType || 'General technical writing'}
- Budget: ${leadData.budget || 'To be discussed'}
- Timeline: ${leadData.timeline || 'Flexible'}
- Message: ${leadData.message}

Generate a professional proposal including:
1. Executive Summary
2. Scope of Work
3. Timeline and Milestones
4. Deliverables
5. Investment (pricing structure)
6. Next Steps

Format as JSON with these sections. Make it specific to their industry and needs.
Base pricing on Prism Writing Cooperative's technical writing services.
`;
  }

  /**
   * Build industry-specific content prompt
   */
  private buildIndustryPrompt(industry: string, contentType: string, targetAudience: string): string {
    return `
Generate ${contentType} content for the ${industry} industry targeting ${targetAudience}.

Content should:
- Demonstrate deep understanding of ${industry} challenges
- Showcase relevant technical writing expertise
- Include industry-specific examples and terminology
- Position Prism Writing Cooperative as the ideal partner
- Include relevant case studies or success metrics
- Address common pain points in ${industry}

Make it compelling and authoritative while maintaining professional tone.
`;
  }

  /**
   * Call AI API (OpenAI/Claude)
   */
  private async callAIAPI(prompt: string): Promise<string> {
    // In development, return simulated AI response
    if (process.env.NODE_ENV === 'development' || !this.apiKey) {
      return this.generateSimulatedResponse(prompt);
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert technical writing consultant and marketing specialist for Prism Writing Cooperative. Generate high-quality, personalized content that converts leads into clients.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI API call failed:', error);
      return this.generateSimulatedResponse(prompt);
    }
  }

  /**
   * Generate simulated AI response for development/testing
   */
  private generateSimulatedResponse(prompt: string): string {
    const isProposal = prompt.includes('proposal');
    const isFollowUp = prompt.includes('follow-up') || prompt.includes('Follow-up');
    
    if (isProposal) {
      return JSON.stringify({
        executiveSummary: "Prism Writing Cooperative proposes comprehensive technical writing services tailored to your industry needs.",
        scopeOfWork: "Complete documentation audit, content creation, and process optimization.",
        timeline: "6-8 weeks for full implementation",
        deliverables: ["Technical documentation", "Process manuals", "Training materials"],
        investment: {
          range: "$5,000 - $15,000",
          justification: "Based on project scope and complexity"
        },
        nextSteps: ["Schedule discovery call", "Review requirements", "Finalize scope"]
      });
    }

    return JSON.stringify({
      subject: isFollowUp ? "Following up on your technical writing needs" : "Technical Writing Solutions for Your Business",
      content: "Thank you for your interest in our technical writing services. Based on your industry and requirements, we can provide customized solutions that will streamline your documentation processes and improve communication efficiency.",
      callToAction: "Schedule a 15-minute consultation to discuss your specific needs",
      personalizationElements: ["Industry-specific expertise", "Custom solutions", "Proven results"],
      recommendedFollowUp: "Send calendar link for scheduling",
      estimatedEngagementScore: 85
    });
  }

  /**
   * Parse content response from AI
   */
  private parseContentResponse(response: string, _request: ContentGenerationRequest): GeneratedContent {
    try {
      const parsed = JSON.parse(response);
      return {
        content: parsed.content || parsed.message || response,
        subject: parsed.subject,
        callToAction: parsed.callToAction || "Contact us to learn more",
        personalizationElements: parsed.personalizationElements || [],
        recommendedFollowUp: parsed.recommendedFollowUp,
        estimatedEngagementScore: parsed.estimatedEngagementScore || 75
      };
    } catch (_error) {
      return {
        content: response,
        callToAction: "Contact us to learn more",
        personalizationElements: ["Personalized content"],
        estimatedEngagementScore: 70
      };
    }
  }

  /**
   * Parse proposal response from AI
   */
  private parseProposalResponse(response: string, leadData: ContactInquiry): ProposalDraft {
    try {
      const parsed = JSON.parse(response);
      return {
        executiveSummary: parsed.executiveSummary || "Executive summary of proposed services",
        scopeOfWork: parsed.scopeOfWork || "Detailed scope of work",
        timeline: parsed.timeline || "Project timeline to be determined",
        deliverables: parsed.deliverables || ["Technical documentation", "Process improvement"],
        investment: parsed.investment || {
          range: "$5,000 - $15,000",
          justification: "Based on project complexity and scope"
        },
        nextSteps: parsed.nextSteps || ["Schedule discovery call", "Review requirements"]
      };
    } catch (_error) {
      return this.generateFallbackProposal(leadData);
    }
  }

  /**
   * Generate fallback content when AI is unavailable
   */
  private generateFallbackContent(request: ContentGenerationRequest): GeneratedContent {
    const { clientData } = request;
    
    let content = `Dear ${clientData.name},\n\nThank you for your interest in Prism Writing Cooperative's services.`;
    
    if (clientData.industry) {
      content += ` We understand the unique challenges in the ${clientData.industry} industry and specialize in creating documentation that meets your specific needs.`;
    }

    content += `\n\nOur team of expert technical writers can help you:\n- Streamline your documentation processes\n- Improve communication efficiency\n- Ensure compliance and quality standards\n\nWe'd love to discuss how we can support your ${clientData.projectType || 'business'} goals.`;

    return {
      content,
      subject: `Technical Writing Solutions for ${clientData.company || 'Your Business'}`,
      callToAction: "Schedule a free consultation to discuss your needs",
      personalizationElements: [clientData.industry, clientData.projectType].filter(Boolean),
      recommendedFollowUp: "Send calendar scheduling link",
      estimatedEngagementScore: 75
    };
  }

  /**
   * Generate fallback proposal
   */
  private generateFallbackProposal(leadData: ContactInquiry): ProposalDraft {
    return {
      executiveSummary: `Prism Writing Cooperative proposes comprehensive technical writing services for ${leadData.company}. Our team will work closely with you to understand your documentation needs and deliver high-quality, professional content.`,
      scopeOfWork: "Complete assessment of current documentation, creation of new materials, and optimization of existing content to meet industry standards and business objectives.",
      timeline: "4-8 weeks depending on project scope and complexity",
      deliverables: [
        "Documentation audit and assessment",
        "New technical documentation",
        "Style guide and templates",
        "Training and support"
      ],
      investment: {
        range: "$3,000 - $12,000",
        justification: "Investment based on project scope, complexity, and timeline requirements"
      },
      nextSteps: [
        "Schedule discovery call to review requirements",
        "Provide detailed project scope and timeline",
        "Present final proposal and pricing",
        "Execute service agreement and begin work"
      ]
    };
  }

  /**
   * Extract client data from ContactInquiry
   */
  private extractClientData(leadData: ContactInquiry): ContentGenerationRequest['clientData'] {
    return {
      name: leadData.name,
      company: leadData.company || '',
      industry: leadData.industry || 'Technology',
      projectType: leadData.projectType || 'Technical Documentation',
      budgetRange: leadData.budget || 'To be discussed',
      companySize: this.estimateCompanySize(leadData.company || ''),
      urgency: leadData.timeline || 'Standard'
    };
  }

  /**
   * Estimate company size based on company name/domain
   */
  private estimateCompanySize(company: string): string {
    // Simple heuristic - in production, this would use actual data
    const largeCorporateIndicators = ['corp', 'corporation', 'inc', 'llc', 'ltd'];
    const hasIndicator = largeCorporateIndicators.some(indicator => 
      company.toLowerCase().includes(indicator)
    );
    
    return hasIndicator ? 'Medium to Large' : 'Small to Medium';
  }

  /**
   * Get follow-up sequence types based on engagement
   */
  private getSequenceTypes(engagementLevel: string, _previousInteractions: number): string[] {
    if (engagementLevel === 'high') {
      return ['value_proposition', 'case_study', 'proposal_offer'];
    } else if (engagementLevel === 'medium') {
      return ['educational_content', 'social_proof', 'gentle_nudge'];
    } else {
      return ['reengagement', 'last_chance', 'value_reminder'];
    }
  }

  /**
   * Select appropriate tone for follow-up sequence
   */
  private selectToneForSequence(sequenceType: string, engagementLevel: string): ContentGenerationRequest['tone'] {
    if (sequenceType === 'proposal_offer' || engagementLevel === 'high') {
      return 'consultative';
    } else if (sequenceType === 'educational_content') {
      return 'professional';
    } else if (sequenceType === 'gentle_nudge' || sequenceType === 'reengagement') {
      return 'friendly';
    } else {
      return 'professional';
    }
  }
}

// Export singleton instance
export const aiContentGenerator = new AIContentGenerator();
