import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { 
  Brain, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Calendar,
  Upload,
  Heart,
  Shield,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, href, gradient }: FeatureCardProps) {
  return (
    <Link 
      href={href}
      className="group block p-6 bg-white rounded-2xl shadow-sm border border-calm-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg text-calm-900 mb-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-calm-600 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
        <span>Learn More</span>
        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-warm overflow-hidden">
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles size={16} className="mr-2" />
              <span>AI-Powered Mental Health Support</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-calm-900 mb-6 animate-slide-up">
              {t('home.title')}
            </h1>
            
            <p className="text-xl sm:text-2xl text-calm-700 mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('home.subtitle')}
            </p>
            
            <p className="text-lg text-calm-600 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('home.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href={`/${locale}/analysis`}
                className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                {t('home.uploadDrawing')}
              </Link>
              <Link
                href={`/${locale}/counseling`}
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                {t('home.bookConsultation')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-calm-900 mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-calm-600 max-w-3xl mx-auto">
              Our platform combines AI technology with human expertise to provide personalized, accessible mental health care for adolescents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="text-white" size={24} />}
              title={t('nav.analysis')}
              description={t('home.uploadDescription')}
              href={`/${locale}/analysis`}
              gradient="bg-gradient-to-br from-primary-500 to-primary-600"
            />
            
            <FeatureCard
              icon={<MessageCircle className="text-white" size={24} />}
              title={t('nav.counseling')}
              description="Connect with professional counselors through secure video calls or instant messaging for personalized support."
              href={`/${locale}/counseling`}
              gradient="bg-gradient-to-br from-secondary-500 to-secondary-600"
            />
            
            <FeatureCard
              icon={<BookOpen className="text-white" size={24} />}
              title={t('nav.knowledge')}
              description="Access a comprehensive library of articles, videos, and interactive content about teen mental health topics."
              href={`/${locale}/knowledge`}
              gradient="bg-gradient-to-br from-warm-500 to-warm-600"
            />
            
            <FeatureCard
              icon={<Users className="text-white" size={24} />}
              title={t('nav.community')}
              description="Join a supportive community where you can share experiences and connect with peers in a safe, moderated environment."
              href={`/${locale}/community`}
              gradient="bg-gradient-to-br from-sage-500 to-sage-600"
            />
            
            <FeatureCard
              icon={<Shield className="text-white" size={24} />}
              title="Privacy & Security"
              description="Your privacy is our top priority. All data is encrypted and protected with industry-leading security measures."
              href={`/${locale}/privacy`}
              gradient="bg-gradient-to-br from-calm-600 to-calm-700"
            />
            
            <FeatureCard
              icon={<Award className="text-white" size={24} />}
              title="Expert-Backed"
              description="All content and AI models are developed and reviewed by licensed mental health professionals and researchers."
              href={`/${locale}/about`}
              gradient="bg-gradient-to-br from-purple-500 to-purple-600"
            />
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-gradient-calm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-calm-900 mb-4">
              {t('home.quickAccess')}
            </h2>
            <p className="text-xl text-calm-600">
              Get started immediately with these popular features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="text-white" size={28} />
              </div>
              <h3 className="font-display font-semibold text-xl text-calm-900 mb-4">
                {t('home.uploadDrawing')}
              </h3>
              <p className="text-calm-600 mb-6">
                Upload your House-Tree-Person drawing and get instant AI psychological insights.
              </p>
              <Link
                href={`/${locale}/analysis`}
                className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="font-display font-semibold text-xl text-calm-900 mb-4">
                {t('home.browseKnowledge')}
              </h3>
              <p className="text-calm-600 mb-6">
                Explore our comprehensive library of mental health resources and educational content.
              </p>
              <Link
                href={`/${locale}/knowledge`}
                className="inline-block bg-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-colors"
              >
                Browse Now
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-warm-500 to-warm-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="font-display font-semibold text-xl text-calm-900 mb-4">
                {t('home.joinCommunity')}
              </h3>
              <p className="text-calm-600 mb-6">
                Connect with peers and share your journey in our safe, supportive community space.
              </p>
              <Link
                href={`/${locale}/community`}
                className="inline-block bg-warm-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-warm-600 transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of teens who have found support, understanding, and growth through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/auth/register`}
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
            >
              Create Free Account
            </Link>
            <Link
              href={`/${locale}/about`}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}