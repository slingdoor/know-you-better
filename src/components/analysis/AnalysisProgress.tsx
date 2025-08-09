'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Brain, Clock, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

interface AnalysisData {
  id: string;
  status: string;
  imageUrl: string;
  createdAt: string;
}

interface AnalysisProgressProps {
  analysis: AnalysisData;
  locale: string;
}

export default function AnalysisProgress({ analysis, locale }: AnalysisProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const steps = [
    { name: 'Upload Complete', description: 'Your drawing has been uploaded successfully' },
    { name: 'Image Processing', description: 'Analyzing drawing elements and composition' },
    { name: 'AI Analysis', description: 'Extracting psychological insights from your drawing' },
    { name: 'Report Generation', description: 'Creating your personalized analysis report' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (analysis.status === 'PENDING' || analysis.status === 'PROCESSING') {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          
          // Update current step based on progress
          if (newProgress > 25 && currentStep < 1) setCurrentStep(1);
          if (newProgress > 50 && currentStep < 2) setCurrentStep(2);
          if (newProgress > 75 && currentStep < 3) setCurrentStep(3);
          
          return Math.min(newProgress, 95); // Don't reach 100% until actually complete
        });
      }, 1000);

      // Check for updates every 10 seconds
      const statusCheck = setInterval(async () => {
        try {
          const response = await fetch(`/api/analysis/${analysis.id}/status`);
          const data = await response.json();
          
          if (data.status === 'COMPLETED') {
            setProgress(100);
            setCurrentStep(3);
            setTimeout(() => router.refresh(), 1000);
          } else if (data.status === 'FAILED') {
            clearInterval(interval);
            clearInterval(statusCheck);
          }
        } catch (error) {
          console.error('Error checking analysis status:', error);
        }
      }, 10000);

      return () => {
        clearInterval(interval);
        clearInterval(statusCheck);
      };
    }
  }, [analysis.id, analysis.status, currentStep, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-8 h-8 text-warm-500" />;
      case 'PROCESSING':
        return <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />;
      case 'FAILED':
        return <AlertCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Brain className="w-8 h-8 text-primary-500" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Your analysis is queued and will begin shortly...';
      case 'PROCESSING':
        return 'AI is analyzing your drawing...';
      case 'FAILED':
        return 'Analysis failed. Please try uploading again.';
      default:
        return 'Processing your drawing analysis...';
    }
  };

  if (analysis.status === 'FAILED') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="font-display font-bold text-2xl text-calm-900 mb-4">
            Analysis Failed
          </h1>
          
          <p className="text-calm-600 mb-8">
            We encountered an error while analyzing your drawing. This could be due to image quality 
            or temporary technical issues. Please try uploading your drawing again.
          </p>
          
          <div className="space-y-4">
            <Link
              href={`/${locale}/analysis`}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Try Again
            </Link>
            
            <div className="text-center">
              <Link
                href={`/${locale}/counseling`}
                className="text-primary-600 hover:text-primary-500 text-sm"
              >
                Or speak with a counselor instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/${locale}/analysis`}
          className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Analysis
        </Link>
      </div>

      {/* Main Progress Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            {getStatusIcon(analysis.status)}
          </div>
          
          <h1 className="font-display font-bold text-3xl text-calm-900 mb-4">
            Analyzing Your Drawing
          </h1>
          
          <p className="text-lg text-calm-600 mb-6">
            {getStatusMessage(analysis.status)}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-calm-200 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-calm-500">{Math.round(progress)}% complete</p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center p-4 rounded-lg transition-all ${
                index <= currentStep
                  ? 'bg-primary-50 border border-primary-200'
                  : 'bg-calm-50 border border-calm-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  index < currentStep
                    ? 'bg-secondary-500'
                    : index === currentStep
                    ? 'bg-primary-500'
                    : 'bg-calm-300'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                )}
              </div>
              
              <div>
                <h3
                  className={`font-semibold ${
                    index <= currentStep ? 'text-calm-900' : 'text-calm-500'
                  }`}
                >
                  {step.name}
                </h3>
                <p
                  className={`text-sm ${
                    index <= currentStep ? 'text-calm-600' : 'text-calm-400'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drawing Preview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-display font-semibold text-xl text-calm-900 mb-4">
          Your Drawing
        </h2>
        <div className="flex justify-center">
          <img
            src={analysis.imageUrl}
            alt="Drawing being analyzed"
            className="max-w-full max-h-64 rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-8 bg-sage-50 border border-sage-200 rounded-2xl p-6">
        <h3 className="font-semibold text-lg text-sage-900 mb-3">
          What happens next?
        </h3>
        <div className="space-y-2 text-sm text-sage-700">
          <p>• Your drawing will be analyzed using advanced AI psychology models</p>
          <p>• We'll identify patterns in your artistic choices and spatial arrangements</p>
          <p>• You'll receive insights about personality traits and emotional patterns</p>
          <p>• Personalized recommendations will be provided for your mental wellness journey</p>
        </div>
      </div>

      {/* Estimated time */}
      <div className="mt-6 text-center">
        <p className="text-sm text-calm-500">
          ⏱️ Typical analysis time: 2-3 minutes
        </p>
      </div>
    </div>
  );
}