import { getTranslations } from 'next-intl/server';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back to home */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t('common.back')}
        </Link>

        {/* Logo and title */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-display font-bold text-calm-900">
          {t('auth.registerTitle')}
        </h2>
        <p className="mt-2 text-center text-sm text-calm-600">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link
            href={`/${locale}/auth/login`}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            {t('nav.login')}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
          <RegisterForm locale={locale} />
        </div>
      </div>

      {/* Important notice for minors */}
      <div className="mt-8 max-w-md mx-auto">
        <div className="bg-warm-50 border border-warm-200 rounded-lg p-4">
          <p className="text-sm text-warm-800">
            <strong>Important:</strong> If you're under 18, we may need parent/guardian contact information 
            to ensure your safety and provide appropriate support.
          </p>
        </div>
      </div>

      {/* Crisis support notice */}
      <div className="mt-4 text-center">
        <p className="text-sm text-calm-600">
          In crisis? Call{' '}
          <a href="tel:988" className="font-medium text-red-600 hover:text-red-500">
            988
          </a>{' '}
          for immediate support
        </p>
      </div>
    </div>
  );
}