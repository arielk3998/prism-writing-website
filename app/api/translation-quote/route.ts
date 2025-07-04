import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const quoteRequestSchema = z.object({
  sourceLanguage: z.string().min(2).max(10),
  targetLanguages: z.array(z.string().min(2).max(10)).min(1).max(10),
  serviceType: z.enum(['document', 'website', 'certified', 'interpretation']),
  urgency: z.enum(['standard', 'express', 'urgent']),
  wordCount: z.number().min(1).max(100000).optional(),
  fileCount: z.number().min(1).max(50).optional(),
  specializations: z.array(z.string()).optional(),
  additionalServices: z.array(z.string()).optional(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().max(1000).optional(),
})

// Legacy schema for backward compatibility
const legacyQuoteSchema = z.object({
  wordCount: z.number(),
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
  documentType: z.string(),
  complexity: z.string(),
  tier: z.string(),
  email: z.string().email(),
  name: z.string(),
  company: z.string().optional(),
  requirements: z.string().optional(),
})

// Pricing configuration
const basePrices = {
  document: {
    standard: 0.12,
    express: 0.18,
    urgent: 0.25
  },
  website: {
    standard: 0.15,
    express: 0.22,
    urgent: 0.30
  },
  certified: {
    standard: 35, // per page
    express: 50,
    urgent: 70
  },
  interpretation: {
    standard: 150, // per hour
    express: 200,
    urgent: 300
  }
}

// Language multipliers
const languageMultipliers: Record<string, number> = {
  'es': 1.0, 'fr': 1.0, 'de': 1.0, 'it': 1.0, 'pt': 1.0,
  'zh': 1.3, 'ja': 1.4, 'ko': 1.3, 'ar': 1.3, 'hi': 1.2,
  'ru': 1.2, 'pl': 1.2, 'nl': 1.1, 'sv': 1.2, 'no': 1.2,
  'fi': 1.5, 'hu': 1.4, 'he': 1.3, 'th': 1.4, 'vi': 1.3,
  'mt': 2.0, 'is': 1.8, 'eu': 1.7, 'ka': 1.8, 'hy': 1.6
}

// Specialization multipliers
const specializationMultipliers: Record<string, number> = {
  'medical': 2.0,
  'legal': 1.8,
  'technical': 1.6,
  'financial': 1.5,
  'marketing': 1.2,
  'academic': 1.3,
  'business': 1.0,
}

function calculateQuote(data: z.infer<typeof quoteRequestSchema>) {
  const basePrice = basePrices[data.serviceType][data.urgency]
  let totalPrice = 0
  
  // Calculate base cost
  if (data.serviceType === 'certified') {
    const pages = Math.ceil((data.wordCount || 250) / 250)
    totalPrice = basePrice * pages
  } else if (data.serviceType === 'interpretation') {
    const hours = Math.max(2, Math.ceil((data.wordCount || 500) / 125))
    totalPrice = basePrice * hours
  } else {
    totalPrice = basePrice * (data.wordCount || 1000)
  }
  
  // Apply language multipliers
  let languageMultiplier = 1.0
  data.targetLanguages.forEach(lang => {
    languageMultiplier *= (languageMultipliers[lang] || 1.1)
  })
  
  // Apply specialization multipliers
  let specializationMultiplier = 1.0
  if (data.specializations?.length) {
    data.specializations.forEach(spec => {
      specializationMultiplier *= (specializationMultipliers[spec] || 1.0)
    })
  }
  
  // Multiple language discount
  const multiLanguageDiscount = data.targetLanguages.length > 1 
    ? 1 - (data.targetLanguages.length - 1) * 0.05 
    : 1.0
  
  totalPrice *= languageMultiplier * specializationMultiplier * multiLanguageDiscount
  
  // Calculate delivery time
  let deliveryDays = 1
  if (data.serviceType === 'document') {
    deliveryDays = data.urgency === 'urgent' ? 1 : data.urgency === 'express' ? 2 : 3
  } else if (data.serviceType === 'website') {
    deliveryDays = data.urgency === 'urgent' ? 2 : data.urgency === 'express' ? 5 : 7
  } else if (data.serviceType === 'certified') {
    deliveryDays = data.urgency === 'urgent' ? 1 : data.urgency === 'express' ? 2 : 3
  }
  
  if (data.wordCount && data.wordCount > 5000) {
    deliveryDays += Math.ceil(data.wordCount / 5000)
  }
  
  return {
    basePrice: Math.round(basePrice * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    deliveryDays,
    languageMultiplier: Math.round(languageMultiplier * 100) / 100,
    specializationMultiplier: Math.round(specializationMultiplier * 100) / 100,
    multiLanguageDiscount: Math.round(multiLanguageDiscount * 100) / 100,
  }
}

// Legacy calculation for backward compatibility
function calculateLegacyQuote(body: any) {
  const basePrice = body.tier === 'express' ? 0.25 : body.tier === 'premium' ? 0.18 : 0.12
  const langMultiplier = languageMultipliers[body.targetLanguage] || 1.1
  const complexityMult = body.complexity === 'expert' ? 2.0 : body.complexity === 'advanced' ? 1.5 : 1.2
  const typeMult = specializationMultipliers[body.documentType] || 1.0
  
  const totalPrice = body.wordCount * basePrice * langMultiplier * complexityMult * typeMult
  const deliveryDays = body.tier === 'express' ? 1 : body.tier === 'premium' ? 3 : 5
  
  return {
    totalPrice: Math.round(totalPrice * 100) / 100,
    deliveryDays,
    basePrice,
    breakdown: `${body.wordCount} words × $${basePrice} × ${langMultiplier} (language) × ${complexityMult} (complexity) × ${typeMult} (type)`
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Try new schema first, fall back to legacy
    let quote
    let quoteData
    
    try {
      quoteData = quoteRequestSchema.parse(body)
      quote = calculateQuote(quoteData)
    } catch {
      // Try legacy format
      const legacyData = legacyQuoteSchema.parse(body)
      quote = calculateLegacyQuote(legacyData)
      quoteData = legacyData
    }
    
    // Store quote (mock implementation)
    const quoteRecord = {
      id: crypto.randomUUID(),
      ...quoteData,
      quote,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    console.log('Quote generated:', quoteRecord)
    
    return NextResponse.json({
      success: true,
      data: {
        id: quoteRecord.id,
        quote,
        estimatedDelivery: new Date(Date.now() + quote.deliveryDays * 24 * 60 * 60 * 1000).toISOString(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }
    }, { status: 200 })
    
  } catch (error) {
    console.error('Quote calculation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      supportedLanguages: Object.keys(languageMultipliers),
      serviceTypes: Object.keys(basePrices),
      urgencyLevels: ['standard', 'express', 'urgent'],
      specializations: Object.keys(specializationMultipliers),
      basePrices,
    }
  })
}
