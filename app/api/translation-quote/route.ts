import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      wordCount,
      sourceLanguage,
      targetLanguage,
      documentType,
      complexity,
      tier,
      email,
      name,
      company,
      requirements
    } = body;

    // Validate required fields
    if (!wordCount || !targetLanguage || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate pricing (same logic as frontend)
    const basePrice = tier === 'express' ? 0.25 : tier === 'premium' ? 0.18 : 0.12;
    
    const languageMultipliers: Record<string, number> = {
      'es': 1.0, 'fr': 1.0, 'de': 1.0, 'it': 1.0, 'pt': 1.0,
      'zh': 1.3, 'ja': 1.4, 'ko': 1.3, 'ar': 1.3, 'hi': 1.2,
      'ru': 1.2, 'pl': 1.2, 'nl': 1.1, 'sv': 1.2, 'no': 1.2,
      'fi': 1.5, 'hu': 1.4, 'he': 1.3, 'th': 1.4, 'vi': 1.3,
      'mt': 2.0, 'is': 1.8, 'eu': 1.7, 'ka': 1.8, 'hy': 1.6
    };

    const complexityMultipliers = {
      basic: 1.0,
      intermediate: 1.2,
      advanced: 1.5,
      expert: 2.0
    };

    const typeMultipliers: Record<string, number> = {
      business: 1.0,
      legal: 1.8,
      medical: 2.0,
      technical: 1.6,
      marketing: 1.2,
      academic: 1.4
    };

    const langMultiplier = languageMultipliers[targetLanguage] || 1.5;
    const complexMultiplier = complexityMultipliers[complexity as keyof typeof complexityMultipliers] || 1.2;
    const typeMultiplier = typeMultipliers[documentType] || 1.0;

    const totalPrice = Math.round(basePrice * wordCount * langMultiplier * complexMultiplier * typeMultiplier);

    // Calculate turnaround time
    const getTurnaroundDays = () => {
      if (wordCount <= 1000) return tier === 'express' ? 1 : tier === 'premium' ? 2 : 3;
      if (wordCount <= 3000) return tier === 'express' ? 2 : tier === 'premium' ? 3 : 5;
      return tier === 'express' ? 3 : tier === 'premium' ? 5 : 7;
    };

    const turnaroundDays = getTurnaroundDays();

    // Generate quote ID
    const quoteId = `TRANS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // In a real application, you would:
    // 1. Save the quote to a database
    // 2. Send email confirmation
    // 3. Integrate with CRM system
    // 4. Set up project management

    // For demo purposes, we'll just return the quote details
    const quote = {
      quoteId,
      projectDetails: {
        wordCount,
        sourceLanguage,
        targetLanguage,
        documentType,
        complexity,
        tier
      },
      pricing: {
        baseRate: basePrice,
        totalPrice,
        currency: 'USD',
        breakdown: {
          languageMultiplier: langMultiplier,
          complexityMultiplier: complexMultiplier,
          typeMultiplier: typeMultiplier
        }
      },
      timeline: {
        turnaroundDays,
        estimatedDelivery: new Date(Date.now() + turnaroundDays * 24 * 60 * 60 * 1000).toISOString()
      },
      contact: {
        name,
        email,
        company
      },
      requirements,
      status: 'pending',
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };

    // Here you would typically:
    // - Save to database
    // - Send confirmation email
    // - Notify sales team
    // - Create project in management system

    return NextResponse.json({
      success: true,
      message: 'Quote generated successfully',
      quote
    });

  } catch (error) {
    console.error('Error generating quote:', error);
    return NextResponse.json(
      { error: 'Failed to generate quote' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get quote by ID
  const url = new URL(request.url);
  const quoteId = url.searchParams.get('id');

  if (!quoteId) {
    return NextResponse.json(
      { error: 'Quote ID required' },
      { status: 400 }
    );
  }

  // In a real application, fetch from database
  // For demo, return a sample quote
  return NextResponse.json({
    success: true,
    quote: {
      quoteId,
      status: 'pending',
      message: 'Quote retrieval feature coming soon'
    }
  });
}
