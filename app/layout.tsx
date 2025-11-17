import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StickyCta from "@/components/StickyCta";
import { SITE_URL } from "@/lib/constants";
import { getContactPointSchema, getWebsiteSchema } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "1031 Exchange Fort Worth | Tax-Deferred Real Estate Exchange",
  description:
    "1031 Exchange services in Fort Worth, TX. Expert guidance for tax-deferred real estate exchanges. Contact us at 801 Cherry St, Fort Worth, TX 76102 or call 817-985-3561.",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = [getWebsiteSchema(), getContactPointSchema()];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <StickyCta />
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
