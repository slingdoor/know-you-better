import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";

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
      <MainLayout>
        {children}
      </MainLayout>
    </NextIntlClientProvider>
  );
}
