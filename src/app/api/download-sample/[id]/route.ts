import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Map of sample IDs to their corresponding files
const sampleFiles: Record<string, { filename: string; displayName: string }> = {
  'paymentpro-api-sample': {
    filename: 'PaymentPro_API_Documentation_Sample.pdf',
    displayName: 'PaymentPro API Documentation Sample'
  },
  'meditech-procedures-sample': {
    filename: 'MediTech_SOPs_Healthcare_Sample.pdf',
    displayName: 'MediTech Healthcare SOPs Sample'
  },
  'smartcity-installation-sample': {
    filename: 'SmartCity_Installation_Manual_Sample.pdf',
    displayName: 'SmartCity IoT Installation Manual Sample'
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    // Validate the sample ID
    if (!sampleFiles[id]) {
      return new NextResponse('Sample not found', { status: 404 });
    }

    const sampleInfo = sampleFiles[id];
    const filePath = path.join(process.cwd(), 'public', 'samples', sampleInfo.filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse('Sample file not found', { status: 404 });
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath);
    
    // Return the PDF with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${sampleInfo.filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}