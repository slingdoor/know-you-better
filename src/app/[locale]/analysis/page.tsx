import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import DrawingAnalysisForm from '@/components/analysis/DrawingAnalysisForm';
import { Brain, Upload, FileImage, Sparkles } from 'lucide-react';

export default async function AnalysisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  const t = await getTranslations();

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/analysis`);
  }

  return (
    <div className="min-h-screen bg-gradient-calm py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="font-display font-bold text-4xl text-calm-900 mb-4">
            {t('analysis.title')}
          </h1>
          
          <p className="text-xl text-calm-600 max-w-2xl mx-auto">
            {t('analysis.uploadDescription')}
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="font-display font-semibold text-2xl text-calm-900 mb-6 text-center">
            How House-Tree-Person Analysis Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg text-calm-900 mb-2">1. Upload Your Drawing</h3>
              <p className="text-calm-600 text-sm">
                Upload a clear photo of your House-Tree-Person drawing. Make sure all elements are visible.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-lg text-calm-900 mb-2">2. AI Analysis</h3>
              <p className="text-calm-600 text-sm">
                Our AI analyzes symbolic elements, spatial relationships, and artistic choices in your drawing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-warm-600" />
              </div>
              <h3 className="font-semibold text-lg text-calm-900 mb-2">3. Get Insights</h3>
              <p className="text-calm-600 text-sm">
                Receive detailed insights about personality traits, emotional patterns, and personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-display font-semibold text-xl text-calm-900 mb-6">
            {t('analysis.uploadTitle')}
          </h2>
          
          <DrawingAnalysisForm locale={locale} />
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-sage-50 border border-sage-200 rounded-2xl p-6">
          <h3 className="font-semibold text-lg text-sage-900 mb-4 flex items-center">
            <FileImage className="w-5 h-5 mr-2" />
            Drawing Guidelines for Best Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-sage-700">
            <div>
              <h4 className="font-medium mb-2">What to Draw:</h4>
              <ul className="space-y-1">
                <li>• A house (any style or size)</li>
                <li>• A tree (any type)</li>
                <li>• A person (stick figure is fine)</li>
                <li>• Draw with pencil, pen, or digital tools</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Photo Tips:</h4>
              <ul className="space-y-1">
                <li>• Good lighting, avoid shadows</li>
                <li>• Clear, high-resolution image</li>
                <li>• Include the entire drawing</li>
                <li>• Avoid blurry or angled photos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-warm-50 border border-warm-200 rounded-2xl p-6">
          <h3 className="font-semibold text-warm-900 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-warm-800">
            This analysis is for educational and self-reflection purposes only. It should not be used as a substitute 
            for professional psychological evaluation or treatment. If you're experiencing mental health concerns, 
            please consult with a licensed mental health professional.
          </p>
        </div>
      </div>
    </div>
  );
}