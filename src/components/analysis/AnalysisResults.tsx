'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  Download, 
  Share2, 
  ArrowLeft,
  User,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Star
} from 'lucide-react';

interface AnalysisData {
  id: string;
  status: string;
  imageUrl: string;
  createdAt: string;
  personalityInsights?: any;
  emotionalState?: any;
  recommendations?: any[];
  riskLevel?: string;
}

interface AnalysisResultsProps {
  analysis: AnalysisData;
  locale: string;
}

export default function AnalysisResults({ analysis, locale }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState('personality');
  const t = useTranslations();

  const { personalityInsights, emotionalState, recommendations, riskLevel } = analysis;

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-secondary-600 bg-secondary-50 border-secondary-200';
      case 'MODERATE': return 'text-warm-600 bg-warm-50 border-warm-200';
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      case 'CRITICAL': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-calm-600 bg-calm-50 border-calm-200';
    }
  };

  const tabs = [
    { id: 'personality', name: 'Personality Insights', icon: User },
    { id: 'emotional', name: 'Emotional State', icon: Heart },
    { id: 'recommendations', name: 'Recommendations', icon: Lightbulb },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/${locale}/analysis`}
            className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Analysis
          </Link>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
              <Share2 size={16} className="mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors">
              <Download size={16} className="mr-2" />
              {t('analysis.downloadReport')}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h1 className="font-display font-bold text-2xl text-calm-900">
                Drawing Analysis Results
              </h1>
              <p className="text-calm-600">
                Completed on {new Date(analysis.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {riskLevel && (
            <div className={`inline-flex items-center px-3 py-2 rounded-lg border text-sm font-medium ${getRiskLevelColor(riskLevel)}`}>
              <CheckCircle size={16} className="mr-2" />
              Risk Level: {riskLevel}
            </div>
          )}
        </div>
      </div>

      {/* Original Drawing */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-display font-semibold text-xl text-calm-900 mb-4">
          Your Drawing
        </h2>
        <div className="flex justify-center">
          <img
            src={analysis.imageUrl}
            alt="Uploaded drawing"
            className="max-w-full max-h-96 rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Analysis Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-calm-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 bg-primary-50'
                      : 'border-transparent text-calm-500 hover:text-calm-700 hover:bg-calm-50'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'personality' && personalityInsights && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Personality Traits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalityInsights.traits?.map((trait: any, index: number) => (
                    <div key={index} className="bg-calm-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-calm-900">{trait.trait}</h4>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-warm-500 mr-1" />
                          <span className="text-sm font-medium">{trait.score}/100</span>
                        </div>
                      </div>
                      <div className="w-full bg-calm-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${trait.score}%` }}
                        />
                      </div>
                      <p className="text-sm text-calm-600">{trait.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {personalityInsights.summary && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h4 className="font-medium text-primary-900 mb-2">Overall Assessment</h4>
                  <p className="text-primary-800">{personalityInsights.summary}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'emotional' && emotionalState && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Emotional Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 mb-2">Confidence Level</h4>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-secondary-600 mr-2" />
                      <span className="text-xl font-bold text-secondary-800">
                        {emotionalState.confidence}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-warm-50 rounded-lg p-4">
                    <h4 className="font-medium text-warm-900 mb-2">Stress Level</h4>
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-warm-600 mr-2" />
                      <span className="text-lg font-semibold text-warm-800 capitalize">
                        {emotionalState.stressLevel}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-sage-50 rounded-lg p-4">
                    <h4 className="font-medium text-sage-900 mb-2">Social Connection</h4>
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-sage-600 mr-2" />
                      <span className="text-lg font-semibold text-sage-800 capitalize">
                        {emotionalState.socialConnection}
                      </span>
                    </div>
                  </div>
                </div>

                {emotionalState.primaryEmotions && (
                  <div className="mb-6">
                    <h4 className="font-medium text-calm-900 mb-3">Primary Emotions Detected</h4>
                    <div className="flex flex-wrap gap-2">
                      {emotionalState.primaryEmotions.map((emotion: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium capitalize"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {emotionalState.insights && (
                  <div className="bg-calm-50 border border-calm-200 rounded-lg p-4">
                    <h4 className="font-medium text-calm-900 mb-2">Emotional Insights</h4>
                    <p className="text-calm-700">{emotionalState.insights}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && recommendations && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-calm-900 mb-4">Personalized Recommendations</h3>
              
              <div className="space-y-4">
                {recommendations.map((rec: any, index: number) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      rec.priority === 'high'
                        ? 'border-secondary-200 bg-secondary-50'
                        : rec.priority === 'medium'
                        ? 'border-warm-200 bg-warm-50'
                        : 'border-calm-200 bg-calm-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-calm-900">{rec.category}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          rec.priority === 'high'
                            ? 'bg-secondary-200 text-secondary-800'
                            : rec.priority === 'medium'
                            ? 'bg-warm-200 text-warm-800'
                            : 'bg-calm-200 text-calm-800'
                        }`}
                      >
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="text-calm-700">{rec.suggestion}</p>
                  </div>
                ))}
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <h4 className="font-medium text-primary-900 mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Next Steps
                </h4>
                <p className="text-primary-800 mb-4">
                  Consider booking a consultation with one of our professional counselors to discuss 
                  these insights and create a personalized growth plan.
                </p>
                <Link
                  href={`/${locale}/counseling`}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}