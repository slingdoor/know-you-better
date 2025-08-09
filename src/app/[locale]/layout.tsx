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
  await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider>
        <MainLayout>
          {children}
        </MainLayout>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
