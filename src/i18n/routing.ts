import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'zh-CN', 'zh-TW'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/analysis': '/analysis',
    '/knowledge': '/knowledge',
    '/counseling': '/counseling',
    '/community': '/community',
    '/profile': '/profile'
  }
});
 
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);