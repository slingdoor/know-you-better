import { redirect } from 'next/navigation';

export default function RootPage() {
  // Always redirect to English locale as default
  redirect('/en');
}