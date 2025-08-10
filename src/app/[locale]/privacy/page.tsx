import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-calm-900 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg text-calm-700">
          <p>
            This page is under construction. We take your privacy seriously and will provide detailed privacy information soon.
          </p>
        </div>
      </div>
    </div>
  );
}