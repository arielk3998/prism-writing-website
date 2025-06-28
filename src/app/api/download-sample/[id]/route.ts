import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioItem, PortfolioItem } from '../../../../data/portfolioData';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const portfolioItem = getPortfolioItem(id);
    
    if (!portfolioItem) {
      return NextResponse.json({ error: 'Sample not found' }, { status: 404 });
    }

    // Generate a watermarked PDF sample
    // For now, we'll create a mock PDF response
    // In production, you would use a PDF library like jsPDF or Puppeteer
    const pdfContent = generateWatermarkedPDF(portfolioItem);
    
    const response = new NextResponse(pdfContent);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', `attachment; filename="${portfolioItem.title.replace(/[^a-zA-Z0-9]/g, '_')}_Sample.pdf"`);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;
  } catch (error) {
    console.error('Error generating PDF sample:', error);
    return NextResponse.json({ error: 'Failed to generate sample' }, { status: 500 });
  }
}

function generateWatermarkedPDF(item: PortfolioItem): Buffer {
  // This is a mock PDF generator
  // In a real implementation, you would use libraries like:
  // - jsPDF for client-side PDF generation
  // - Puppeteer for server-side PDF generation from HTML
  // - PDFKit for programmatic PDF creation
  
  const pdfHeader = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 500
>>
stream
BT
/F1 24 Tf
100 700 Td
(${item.title}) Tj
0 -30 Td
/F1 12 Tf
(© 2024 Prism Writing Cooperative - Sample Document) Tj
0 -50 Td
(${item.subtitle}) Tj
0 -30 Td
(Category: ${item.category}) Tj
0 -30 Td
(Pages: ${item.pages}) Tj
0 -30 Td
(Year: ${item.year}) Tj
0 -50 Td
(WATERMARKED SAMPLE - NOT FOR DISTRIBUTION) Tj
0 -30 Td
(This is a demonstration sample of our work.) Tj
0 -20 Td
(Contact us for complete documentation projects.) Tj
0 -50 Td
(Sample Content:) Tj
0 -20 Td
(${item.sampleContent.excerpt.substring(0, 200)}...) Tj
0 -50 Td
/F1 8 Tf
(PRISM WRITING COOPERATIVE - CONFIDENTIAL) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000273 00000 n 
0000000823 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
901
%%EOF`;

  return Buffer.from(pdfHeader, 'utf-8');
}
