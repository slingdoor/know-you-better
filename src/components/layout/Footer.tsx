'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-calm-900 text-calm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-display font-semibold text-xl">
                Know You Better
              </span>
            </div>
            <p className="text-calm-300 text-sm leading-relaxed">
              {t('home.description')}
            </p>
            <div className="flex items-center space-x-1 text-sm text-calm-400">
              <span>Made with</span>
              <Heart size={14} className="text-red-400 fill-current" />
              <span>for teen mental health</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href={`/${locale}`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                {t('nav.home')}
              </Link>
              <Link
                href={`/${locale}/analysis`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                {t('nav.analysis')}
              </Link>
              <Link
                href={`/${locale}/knowledge`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                {t('nav.knowledge')}
              </Link>
              <Link
                href={`/${locale}/counseling`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                {t('nav.counseling')}
              </Link>
              <Link
                href={`/${locale}/community`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                {t('nav.community')}
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <div className="space-y-2">
              <Link
                href={`/${locale}/help`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                Help Center
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </Link>
              <Link
                href={`/${locale}/privacy`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="block text-calm-300 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-calm-300">
                <Mail size={14} />
                <span>support@knowyoubetter.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-calm-300">
                <Phone size={14} />
                <span>1-800-SUPPORT</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-calm-300">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>123 Mental Health Way<br />Wellness City, WC 12345</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-calm-800">
              <p className="text-xs text-calm-400">
                24/7 Crisis Hotline: <span className="text-red-400 font-medium">988</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-calm-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-calm-400 text-sm">
            © 2024 Know You Better. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href={`/${locale}/accessibility`}
              className="text-calm-400 hover:text-white text-sm transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href={`/${locale}/cookies`}
              className="text-calm-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}