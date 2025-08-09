import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Know You Better - Adolescent Psychological Counseling Platform",
  description: "AI-powered psychological analysis, professional counseling, and supportive community for teen mental health.",
  keywords: ["psychology", "counseling", "mental health", "adolescent", "teen", "therapy", "support"],
  authors: [{ name: "Know You Better Team" }],
  openGraph: {
    title: "Know You Better - Adolescent Psychological Counseling Platform",
    description: "AI-powered psychological analysis and professional counseling for teen mental health.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gradient-calm antialiased">
        {children}
      </body>
    </html>
  );
}