/**
 * Lead Scoring Algorithm System
 * Automatically scores leads based on various criteria to prioritize follow-up efforts
 */

import { prisma } from '@/lib/leads';

export interface LeadScore {
  leadId: string;
  totalScore: number;
  breakdown: {
    contactInfo: number;
    projectValue: number;
    urgency: number;
    engagement: number;
    companySize: number;
  };
  grade: 'A' | 'B' | 'C' | 'D';
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  recommendations: string[];
}

export interface ScoringCriteria {
  // Contact Information (max 20 points)
  hasPhone: boolean;           // +5 points
  hasCompany: boolean;         // +10 points
  emailDomain: string;         // Business email +5 points
  
  // Project Value (max 30 points)
  budgetRange: string;         // Higher budget = more points
  projectType: string;         // Complex projects = more points
  timeline: string;            // Urgent timeline = more points
  
  // Urgency Indicators (max 25 points)
  timeToRespond: number;       // Hours since inquiry
  keywords: string[];          // Urgent keywords in message
  
  // Engagement (max 15 points)
  newsletterOptIn: boolean;    // +5 points
  allowFollowUp: boolean;      // +5 points
  messageLength: number;       // Detailed message +5 points
  
  // Company Size Indicators (max 10 points)
  companyDomain: string;       // Enterprise domains
  estimatedEmployees: number;  // Based on company name/domain
}

export class LeadScoringService {
  
  // Main scoring function
  async scoreAllLeads(): Promise<LeadScore[]> {
    try {
      const leads = await prisma.contactInquiry.findMany({
        where: {
          status: {
            in: ['NEW', 'CONTACTED', 'QUALIFIED']
          }
        }
      });

      const scores: LeadScore[] = [];
      
      for (const lead of leads) {
        const score = await this.scoreLead(lead);
        scores.push(score);
      }

      // Sort by score descending
      return scores.sort((a, b) => b.totalScore - a.totalScore);
    } catch (error) {
      console.error('Error scoring leads:', error);
      return [];
    }
  }

  // Score individual lead
  async scoreLead(lead: any): Promise<LeadScore> {
    const criteria = this.extractScoringCriteria(lead);
    const breakdown = this.calculateScoreBreakdown(criteria);
    const totalScore = Object.values(breakdown).reduce((sum, score) => sum + score, 0);
    
    const score: LeadScore = {
      leadId: lead.id,
      totalScore,
      breakdown,
      grade: this.calculateGrade(totalScore),
      priority: this.calculatePriority(totalScore, criteria),
      recommendations: this.generateRecommendations(totalScore, criteria, lead)
    };

    // Update lead priority in database if significantly different
    if (lead.priority !== score.priority) {
      await this.updateLeadPriority(lead.id, score.priority);
    }

    return score;
  }

  // Extract scoring criteria from lead data
  private extractScoringCriteria(lead: any): ScoringCriteria {
    const message = (lead.message || '').toLowerCase();
    const email = lead.email || '';
    const company = lead.company || '';
    
    return {
      hasPhone: !!lead.phone,
      hasCompany: !!lead.company,
      emailDomain: email.split('@')[1] || '',
      budgetRange: lead.budget || '',
      projectType: lead.projectType || '',
      timeline: lead.timeline || '',
      timeToRespond: this.calculateTimeToRespond(lead.createdAt),
      keywords: this.extractUrgencyKeywords(message),
      newsletterOptIn: lead.addedToNewsletter || false,
      allowFollowUp: lead.allowFollowUp || false,
      messageLength: (lead.message || '').length,
      companyDomain: this.extractCompanyDomain(company, email),
      estimatedEmployees: this.estimateCompanySize(company)
    };
  }

  // Calculate detailed score breakdown
  private calculateScoreBreakdown(criteria: ScoringCriteria): LeadScore['breakdown'] {
    return {
      contactInfo: this.scoreContactInfo(criteria),
      projectValue: this.scoreProjectValue(criteria),
      urgency: this.scoreUrgency(criteria),
      engagement: this.scoreEngagement(criteria),
      companySize: this.scoreCompanySize(criteria)
    };
  }

  // Score contact information (max 20 points)
  private scoreContactInfo(criteria: ScoringCriteria): number {
    let score = 0;
    
    if (criteria.hasPhone) score += 5;
    if (criteria.hasCompany) score += 10;
    
    // Business email domain bonus
    if (this.isBusinessEmail(criteria.emailDomain)) {
      score += 5;
    }
    
    return Math.min(score, 20);
  }

  // Score project value (max 30 points)
  private scoreProjectValue(criteria: ScoringCriteria): number {
    let score = 0;
    
    // Budget scoring
    score += this.scoreBudget(criteria.budgetRange);
    
    // Project type scoring
    score += this.scoreProjectType(criteria.projectType);
    
    // Timeline urgency
    score += this.scoreTimeline(criteria.timeline);
    
    return Math.min(score, 30);
  }

  // Score urgency indicators (max 25 points)
  private scoreUrgency(criteria: ScoringCriteria): number {
    let score = 0;
    
    // Response time (fresher leads get more points)
    if (criteria.timeToRespond <= 1) score += 15;      // Within 1 hour
    else if (criteria.timeToRespond <= 4) score += 10; // Within 4 hours
    else if (criteria.timeToRespond <= 24) score += 5; // Within 24 hours
    
    // Urgent keywords
    score += criteria.keywords.length * 2; // 2 points per urgent keyword
    
    return Math.min(score, 25);
  }

  // Score engagement (max 15 points)
  private scoreEngagement(criteria: ScoringCriteria): number {
    let score = 0;
    
    if (criteria.newsletterOptIn) score += 5;
    if (criteria.allowFollowUp) score += 5;
    
    // Message detail score
    if (criteria.messageLength > 200) score += 5;
    else if (criteria.messageLength > 100) score += 3;
    else if (criteria.messageLength > 50) score += 1;
    
    return Math.min(score, 15);
  }

  // Score company size (max 10 points)
  private scoreCompanySize(criteria: ScoringCriteria): number {
    let score = 0;
    
    // Enterprise domain bonus
    if (this.isEnterpriseCompany(criteria.companyDomain)) {
      score += 5;
    }
    
    // Estimated company size
    if (criteria.estimatedEmployees > 1000) score += 5;
    else if (criteria.estimatedEmployees > 100) score += 3;
    else if (criteria.estimatedEmployees > 10) score += 1;
    
    return Math.min(score, 10);
  }

  // Budget scoring helper
  private scoreBudget(budget: string): number {
    const budgetLower = budget.toLowerCase();
    
    if (budgetLower.includes('50,000') || budgetLower.includes('50k')) return 15;
    if (budgetLower.includes('25,000') || budgetLower.includes('25k')) return 12;
    if (budgetLower.includes('10,000') || budgetLower.includes('10k')) return 10;
    if (budgetLower.includes('5,000') || budgetLower.includes('5k')) return 7;
    if (budgetLower.includes('2,000') || budgetLower.includes('2k')) return 5;
    if (budgetLower.includes('1,000') || budgetLower.includes('1k')) return 3;
    
    // Range parsing
    if (budgetLower.includes('10,000') && budgetLower.includes('25,000')) return 12;
    if (budgetLower.includes('5,000') && budgetLower.includes('10,000')) return 8;
    if (budgetLower.includes('2,000') && budgetLower.includes('5,000')) return 6;
    
    return 0;
  }

  // Project type scoring helper
  private scoreProjectType(projectType: string): number {
    const typeLower = projectType.toLowerCase();
    
    // High-value project types
    if (typeLower.includes('website development') || 
        typeLower.includes('web application') ||
        typeLower.includes('enterprise')) return 8;
    
    if (typeLower.includes('content strategy') ||
        typeLower.includes('marketing campaign') ||
        typeLower.includes('technical documentation')) return 6;
    
    if (typeLower.includes('content writing') ||
        typeLower.includes('copywriting') ||
        typeLower.includes('blog writing')) return 4;
    
    if (typeLower.includes('editing') ||
        typeLower.includes('proofreading')) return 2;
    
    return 0;
  }

  // Timeline scoring helper
  private scoreTimeline(timeline: string): number {
    const timelineLower = timeline.toLowerCase();
    
    if (timelineLower.includes('asap') || 
        timelineLower.includes('urgent') ||
        timelineLower.includes('immediately')) return 7;
    
    if (timelineLower.includes('1 week') ||
        timelineLower.includes('one week')) return 6;
    
    if (timelineLower.includes('2 week') ||
        timelineLower.includes('two week')) return 5;
    
    if (timelineLower.includes('1 month') ||
        timelineLower.includes('one month')) return 4;
    
    if (timelineLower.includes('2 month') ||
        timelineLower.includes('two month')) return 3;
    
    return 2; // Default for any timeline
  }

  // Calculate grade based on total score
  private calculateGrade(totalScore: number): 'A' | 'B' | 'C' | 'D' {
    if (totalScore >= 80) return 'A';
    if (totalScore >= 60) return 'B';
    if (totalScore >= 40) return 'C';
    return 'D';
  }

  // Calculate priority based on score and criteria
  private calculatePriority(totalScore: number, criteria: ScoringCriteria): 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW' {
    // Override for time-sensitive leads
    if (criteria.keywords.some(k => ['urgent', 'asap', 'immediately'].includes(k)) ||
        criteria.timeToRespond <= 1) {
      return 'URGENT';
    }
    
    if (totalScore >= 80) return 'URGENT';
    if (totalScore >= 60) return 'HIGH';
    if (totalScore >= 40) return 'MEDIUM';
    return 'LOW';
  }

  // Generate actionable recommendations
  private generateRecommendations(totalScore: number, criteria: ScoringCriteria, lead: any): string[] {
    const recommendations: string[] = [];
    
    // High-priority actions
    if (totalScore >= 80) {
      recommendations.push('🔥 Top priority lead - Contact within 1 hour');
      recommendations.push('📞 Schedule a call immediately');
    } else if (totalScore >= 60) {
      recommendations.push('⭐ High-value lead - Contact within 4 hours');
      recommendations.push('💼 Prepare custom proposal');
    }
    
    // Specific improvement suggestions
    if (!criteria.hasPhone) {
      recommendations.push('📱 Request phone number for faster communication');
    }
    
    if (!criteria.hasCompany) {
      recommendations.push('🏢 Ask about company details and team size');
    }
    
    if (!criteria.budgetRange) {
      recommendations.push('💰 Discuss budget range and project scope');
    }
    
    if (criteria.messageLength < 50) {
      recommendations.push('📝 Gather more project requirements and details');
    }
    
    if (!criteria.newsletterOptIn) {
      recommendations.push('📧 Invite to newsletter for ongoing engagement');
    }
    
    // Timeline-based recommendations
    if (criteria.keywords.length > 0) {
      recommendations.push('⚡ Lead expressed urgency - prioritize response');
    }
    
    if (criteria.timeToRespond > 24) {
      recommendations.push('⏰ Lead is aging - follow up with value-driven message');
    }
    
    return recommendations;
  }

  // Helper functions
  private calculateTimeToRespond(createdAt: string | Date): number {
    const created = new Date(createdAt);
    const now = new Date();
    return (now.getTime() - created.getTime()) / (1000 * 60 * 60); // Hours
  }

  private extractUrgencyKeywords(message: string): string[] {
    const urgentKeywords = [
      'urgent', 'asap', 'immediately', 'rush', 'emergency', 'deadline',
      'soon', 'quickly', 'fast', 'priority', 'time-sensitive', 'hurry'
    ];
    
    return urgentKeywords.filter(keyword => message.includes(keyword));
  }

  private isBusinessEmail(domain: string): boolean {
    const commonBusinessDomains = [
      'company.com', 'corp.com', 'inc.com', 'llc.com', 'ltd.com'
    ];
    const personalDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'
    ];
    
    return !personalDomains.includes(domain) && domain.length > 0;
  }

  private extractCompanyDomain(company: string, email: string): string {
    if (company) {
      // Try to extract domain from company name
      const companyWords = company.toLowerCase().replace(/[^a-z0-9]/g, '');
      return `${companyWords}.com`;
    }
    
    return email.split('@')[1] || '';
  }

  private estimateCompanySize(company: string): number {
    const companyLower = company.toLowerCase();
    
    // Enterprise indicators
    if (companyLower.includes('corporation') || 
        companyLower.includes('international') ||
        companyLower.includes('global') ||
        companyLower.includes('enterprises')) {
      return 5000;
    }
    
    // Large company indicators
    if (companyLower.includes('solutions') ||
        companyLower.includes('systems') ||
        companyLower.includes('technologies')) {
      return 500;
    }
    
    // Medium company indicators
    if (companyLower.includes('group') ||
        companyLower.includes('associates') ||
        companyLower.includes('partners')) {
      return 100;
    }
    
    // Small company indicators
    if (companyLower.includes('studio') ||
        companyLower.includes('agency') ||
        companyLower.includes('consulting')) {
      return 25;
    }
    
    return 10; // Default small company
  }

  private isEnterpriseCompany(domain: string): boolean {
    const enterpriseIndicators = [
      '.gov', '.edu', '.org',
      'microsoft.com', 'google.com', 'amazon.com', 'apple.com',
      'salesforce.com', 'oracle.com', 'ibm.com'
    ];
    
    return enterpriseIndicators.some(indicator => domain.includes(indicator));
  }

  private async updateLeadPriority(leadId: string, priority: string): Promise<void> {
    try {
      await prisma.contactInquiry.update({
        where: { id: leadId },
        data: { priority: priority as any } // Type assertion for enum compatibility
      });
    } catch (error) {
      console.error('Error updating lead priority:', error);
    }
  }

  // Batch scoring for analytics
  async generateLeadScoreReport(): Promise<{
    totalLeads: number;
    averageScore: number;
    gradeDistribution: Record<string, number>;
    topLeads: LeadScore[];
    recommendations: string[];
  }> {
    const scores = await this.scoreAllLeads();
    
    const totalLeads = scores.length;
    const averageScore = scores.reduce((sum, s) => sum + s.totalScore, 0) / totalLeads;
    
    const gradeDistribution = scores.reduce((dist, score) => {
      dist[score.grade] = (dist[score.grade] || 0) + 1;
      return dist;
    }, {} as Record<string, number>);
    
    const topLeads = scores.slice(0, 10); // Top 10 leads
    
    const recommendations = [
      `${scores.filter(s => s.grade === 'A').length} A-grade leads need immediate attention`,
      `${scores.filter(s => s.priority === 'URGENT').length} urgent leads require same-day follow-up`,
      `Average lead score is ${averageScore.toFixed(1)} - focus on improving lead quality`,
      `${scores.filter(s => s.totalScore < 30).length} leads are low-quality and may need nurturing campaigns`
    ];
    
    return {
      totalLeads,
      averageScore,
      gradeDistribution,
      topLeads,
      recommendations
    };
  }
}

export const leadScoringService = new LeadScoringService();

// Convenience function for external imports
export async function calculateLeadScore(lead: any): Promise<LeadScore> {
  return leadScoringService.scoreLead(lead);
}
