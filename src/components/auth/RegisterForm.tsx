'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import GoogleLoginButton from './GoogleLoginButton';

interface RegisterFormProps {
  locale: string;
}

export default function RegisterForm({ locale }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    parentEmail: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMinor, setIsMinor] = useState(false);

  const router = useRouter();
  const t = useTranslations();

  // Calculate if user is a minor when date of birth changes
  const handleDateOfBirthChange = (dateOfBirth: string) => {
    setFormData(prev => ({ ...prev, dateOfBirth }));
    
    if (dateOfBirth) {
      const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
      setIsMinor(age < 18);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (isMinor && !formData.parentEmail) {
      setError('Parent/guardian email is required for users under 18');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          parentEmail: isMinor ? formData.parentEmail : undefined,
        }),
      });

      if (response.ok) {
        router.push(`/${locale}/auth/login?message=registration-success`);
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Google Registration */}
      <GoogleLoginButton locale={locale} isRegister />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-calm-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-calm-500">Or create account with email</span>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-calm-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full px-3 py-2 border border-calm-300 rounded-lg shadow-sm placeholder-calm-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-calm-700">
            {t('auth.email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1 block w-full px-3 py-2 border border-calm-300 rounded-lg shadow-sm placeholder-calm-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-calm-700">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleDateOfBirthChange(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-calm-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {isMinor && (
          <div className="bg-warm-50 border border-warm-200 rounded-lg p-3">
            <label htmlFor="parentEmail" className="block text-sm font-medium text-warm-800 mb-2">
              Parent/Guardian Email (Required for users under 18)
            </label>
            <input
              id="parentEmail"
              name="parentEmail"
              type="email"
              required={isMinor}
              value={formData.parentEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
              className="block w-full px-3 py-2 border border-warm-300 rounded-lg shadow-sm placeholder-warm-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Parent or guardian email"
            />
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-calm-700">
            {t('auth.password')}
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="block w-full px-3 py-2 pr-10 border border-calm-300 rounded-lg shadow-sm placeholder-calm-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-calm-400" />
              ) : (
                <Eye className="h-4 w-4 text-calm-400" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-calm-500">
            Minimum 8 characters with letters and numbers
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-calm-700">
            {t('auth.confirmPassword')}
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="block w-full px-3 py-2 pr-10 border border-calm-300 rounded-lg shadow-sm placeholder-calm-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-calm-400" />
              ) : (
                <Eye className="h-4 w-4 text-calm-400" />
              )}
            </button>
          </div>
        </div>

        <div className="text-xs text-calm-500">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}