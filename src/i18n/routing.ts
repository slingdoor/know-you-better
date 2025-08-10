import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'zh-CN', 'zh-TW'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
 
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);