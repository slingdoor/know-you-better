'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from '../../i18n/routing';
import { useLocale } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // Manual locale detection from URL as fallback
  const [actualLocale, setActualLocale] = useState('en');
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const pathLocales = ['zh-CN', 'zh-TW', 'en'];
      const detectedLocale = pathLocales.find(loc => path.startsWith(`/${loc}`)) || 'en';
      setActualLocale(detectedLocale);
    }
  }, []);

  // Use manual detection if useLocale() is not working
  const workingLocale = actualLocale !== 'en' ? actualLocale : locale;
  const currentLanguage = languages.find(lang => lang.code === workingLocale) || languages[0];
  
  // Debug locale detection
  console.log('🔍 LanguageSelector Debug:', {
    useLocaleResult: locale,
    manualDetection: actualLocale,
    workingLocale: workingLocale,
    currentUrl: typeof window !== 'undefined' ? window.location.pathname : 'SSR',
    pathnameFromHook: pathname,
    selectedLanguage: currentLanguage
  });

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
    
    // Simplified and more reliable approach
    const currentPath = window.location.pathname;
    const currentLocales = ['en', 'zh-CN', 'zh-TW'];
    
    // Remove any existing locale from the beginning of the path
    let cleanPath = currentPath;
    for (const loc of currentLocales) {
      if (currentPath === `/${loc}` || currentPath.startsWith(`/${loc}/`)) {
        cleanPath = currentPath.replace(`/${loc}`, '') || '/';
        break;
      }
    }
    
    // Ensure cleanPath starts with / if it's not just /
    if (cleanPath !== '/' && !cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    
    // Construct the new path
    const newPath = `/${langCode}${cleanPath === '/' ? '' : cleanPath}`;
    
    console.log('Language switch:', { currentPath, cleanPath, newPath, langCode });
    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-calm-700 hover:bg-calm-100 transition-colors"
      >
        <Globe size={16} />
        <span className="hidden sm:block text-sm font-medium">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-calm-200 py-1 z-20">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-calm-50 transition-colors flex items-center space-x-2 ${
                  language.code === locale ? 'text-primary-600 bg-primary-50' : 'text-calm-700'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
                {language.code === locale && (
                  <span className="ml-auto text-primary-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}