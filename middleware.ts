import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes (/api/...)
  // - Next.js internals (/_next/...)
  // - Static files (containing a dot)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', '/']
};