'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('analysis'), href: `/${locale}/analysis` },
    { name: t('knowledge'), href: `/${locale}/knowledge` },
    { name: t('counseling'), href: `/${locale}/counseling` },
    { name: t('community'), href: `/${locale}/community` },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-calm-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-display font-semibold text-xl text-calm-900">
              Know You Better
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-calm-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* User menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href={`/${locale}/auth/login`}
                className="text-calm-700 hover:text-primary-600 font-medium transition-colors"
              >
                {t('login')}
              </Link>
              <Link
                href={`/${locale}/auth/register`}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                {t('register')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-calm-700 hover:bg-calm-100 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-calm-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-calm-700 hover:text-primary-600 hover:bg-calm-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-calm-200 pt-2 mt-2">
                <Link
                  href={`/${locale}/auth/login`}
                  className="block px-3 py-2 text-calm-700 hover:text-primary-600 hover:bg-calm-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('login')}
                </Link>
                <Link
                  href={`/${locale}/auth/register`}
                  className="block px-3 py-2 text-primary-600 font-medium hover:bg-calm-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('register')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}