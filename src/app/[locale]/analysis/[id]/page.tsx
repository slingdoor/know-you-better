import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import AnalysisProgress from '@/components/analysis/AnalysisProgress';

interface AnalysisPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);
  const t = await getTranslations();

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/analysis/${id}`);
  }

  // Fetch analysis from database
  const analysis = await prisma.analysis.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true }
      }
    }
  });

  if (!analysis) {
    notFound();
  }

  // Ensure user owns this analysis or is admin
  if (analysis.userId !== session.user?.id) {
    redirect(`/${locale}/analysis`);
  }

  return (
    <div className="min-h-screen bg-gradient-calm py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {analysis.status === 'COMPLETED' ? (
          <AnalysisResults analysis={{
            ...analysis,
            createdAt: analysis.createdAt.toISOString(),
            personalityInsights: analysis.personalityInsights as any,
            emotionalState: analysis.emotionalState as any,
            recommendations: analysis.recommendations as any,
            riskLevel: analysis.riskLevel as string,
          }} locale={locale} />
        ) : (
          <AnalysisProgress analysis={{
            ...analysis,
            createdAt: analysis.createdAt.toISOString()
          }} locale={locale} />
        )}
      </div>
    </div>
  );
}