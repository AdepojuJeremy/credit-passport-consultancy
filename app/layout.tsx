import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { MeasurementProvider } from "@/components/measurement-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site-url";
import { siteStructuredData } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Credit strategy, decision intelligence, risk analytics, financial data, AI and research for lenders and financial institutions.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFBFC",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "CreditPassport Consulting",
  title: {
    default: "CreditPassport Consulting",
    template: "%s | CreditPassport Consulting",
  },
  description,
  icons: {
    icon: "/brand/logo_icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "CreditPassport Consulting",
    title: "CreditPassport Consulting",
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CreditPassport Consulting — better decisions, better credit systems.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreditPassport Consulting",
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
        <JsonLd data={siteStructuredData()} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <MeasurementProvider />
        <ScrollProgress />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
