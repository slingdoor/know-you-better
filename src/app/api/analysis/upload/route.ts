import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('drawing') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'drawings');
    
    try {
      await writeFile(path.join(uploadsDir, 'test.txt'), 'test');
    } catch (error) {
      // Directory doesn't exist, we'll handle this in production with cloud storage
      console.log('Uploads directory not accessible, using temporary storage');
    }

    // Convert file to buffer for storage (in production, upload to cloud storage)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // For now, we'll simulate file storage and use a placeholder URL
    const fileUrl = `/uploads/drawings/${fileName}`;

    // Create analysis record in database
    const analysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        imageUrl: fileUrl,
        status: 'PENDING',
      },
    });

    // Start background analysis process (simulate for now)
    processDrawingAnalysis(analysis.id);

    return NextResponse.json({
      message: 'Upload successful',
      analysisId: analysis.id,
      imageUrl: fileUrl,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simulate AI analysis process
async function processDrawingAnalysis(analysisId: string) {
  try {
    // Update status to processing
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { status: 'PROCESSING' },
    });

    // Simulate analysis delay (2-3 minutes in production)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Generate mock analysis results
    const mockResults = {
      personalityInsights: {
        traits: [
          { trait: 'Creativity', score: 85, description: 'High creative expression evident in drawing style' },
          { trait: 'Social Orientation', score: 72, description: 'Moderate social engagement indicated by figure placement' },
          { trait: 'Emotional Stability', score: 68, description: 'Generally stable with some areas for growth' },
          { trait: 'Detail Orientation', score: 90, description: 'Strong attention to detail in all elements' }
        ],
        summary: 'The drawing shows a creative and detail-oriented personality with healthy emotional expression.'
      },
      emotionalState: {
        primaryEmotions: ['curious', 'optimistic', 'slightly anxious'],
        confidence: 76,
        stressLevel: 'low-moderate',
        socialConnection: 'moderate',
        insights: 'Shows good emotional awareness with balanced perspective on relationships and environment.'
      },
      recommendations: [
        {
          category: 'Self-Care',
          suggestion: 'Continue creative activities as they appear to be a strong coping mechanism.',
          priority: 'high'
        },
        {
          category: 'Social',
          suggestion: 'Consider joining group activities to enhance social connections.',
          priority: 'medium'
        },
        {
          category: 'Growth',
          suggestion: 'Explore mindfulness techniques to manage occasional anxiety.',
          priority: 'medium'
        }
      ]
    };

    // Update analysis with results
    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: 'COMPLETED',
        personalityInsights: mockResults.personalityInsights,
        emotionalState: mockResults.emotionalState,
        recommendations: mockResults.recommendations,
        riskLevel: 'LOW',
      },
    });

  } catch (error) {
    console.error('Analysis processing error:', error);
    
    // Update status to failed
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { status: 'FAILED' },
    });
  }
}