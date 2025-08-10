import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh-CN', 'zh-TW'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show locale in URL
  localePrefix: 'always',
  
  // Explicitly handle locale detection
  localeDetection: true
});

export const config = {
  // Match all paths except API routes, static files, etc.
  matcher: [
    // Skip all internal paths (_next)
    // Skip all API routes
    // Skip all files with extensions (images, favicon, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};