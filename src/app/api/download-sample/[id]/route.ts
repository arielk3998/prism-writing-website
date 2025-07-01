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
  },
  'iso-13485-qms-manual-sample': {
    filename: 'iso-13485-qms-manual-sample.html',
    displayName: 'ISO 13485 Quality Management System Manual'
  },
  'gdpr-dpia-sample': {
    filename: 'gdpr-dpia-sample.html',
    displayName: 'GDPR Data Protection Impact Assessment'
  },
  'nasa-software-engineering-sample': {
    filename: 'nasa-software-engineering-sample.html',
    displayName: 'NASA Software Engineering Standards (NPR 7150.2D)'
  },
  'sox-compliance-sample': {
    filename: 'sox-compliance-sample.html',
    displayName: 'SOX Section 404 Internal Controls Documentation'
  },
  'fda-21cfr11-validation-sample': {
    filename: 'fda-21cfr11-validation-sample.html',
    displayName: 'FDA 21 CFR Part 11 Electronic Records Validation'
  },
  'do-178c-software-development-sample': {
    filename: 'do-178c-software-development-sample.html',
    displayName: 'DO-178C Avionics Software Development Plan'
  },
  'iso-27001-isms-sample': {
    filename: 'iso-27001-isms-sample.html',
    displayName: 'ISO 27001 Information Security Management System'
  },
  'nist-cybersecurity-framework-sample': {
    filename: 'nist-cybersecurity-framework-sample.html',
    displayName: 'NIST Cybersecurity Framework Implementation Guide'
  },
  'pci-dss-compliance-sample': {
    filename: 'pci-dss-compliance-sample.html',
    displayName: 'PCI DSS 4.0 Compliance Documentation'
  },
  'hipaa-compliance-sample': {
    filename: 'hipaa-compliance-sample.html',
    displayName: 'HIPAA Privacy and Security Rules Compliance'
  },
  'iso-9001-qms-manual-sample': {
    filename: 'iso-9001-qms-manual-sample.html',
    displayName: 'ISO 9001 Quality Management System Manual'
  },
  'iso-14001-ems-manual-sample': {
    filename: 'iso-14001-ems-manual-sample.html',
    displayName: 'ISO 14001 Environmental Management System Manual'
  },
  'fedramp-security-assessment-sample': {
    filename: 'fedramp-security-assessment-sample.html',
    displayName: 'FedRAMP Security Assessment Plan'
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
    
    // Determine content type based on file extension
    const fileExtension = path.extname(sampleInfo.filename).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (fileExtension === '.pdf') {
      contentType = 'application/pdf';
    } else if (fileExtension === '.html') {
      contentType = 'text/html';
    }
    
    // Return the file with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
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