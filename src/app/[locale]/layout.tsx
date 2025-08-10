import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import AuthProvider from "@/components/auth/AuthProvider";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  // Debug translation loading
  console.log('🌐 Layout Debug:', {
    locale,
    messagesKeys: messages ? Object.keys(messages).slice(0, 5) : 'No messages',
    sampleTranslation: messages?.nav?.home || 'No nav.home translation',
    sampleHomeTitle: messages?.home?.title || 'No home.title translation'
  });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AuthProvider>
        <MainLayout>
          {children}
        </MainLayout>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
