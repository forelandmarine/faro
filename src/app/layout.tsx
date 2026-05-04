import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import {
  ENTITY_PARAGRAPH,
  ENTITY_SHORT,
  RELATED_SITES,
  SITE_URL,
} from "@/content/entity";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});


export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  title: {
    default: "Faro Creative — Founder-led design and development studio",
    template: "%s",
  },
  description: ENTITY_SHORT,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Faro Creative — Founder-led design and development studio",
    description: ENTITY_SHORT,
    url: SITE_URL,
    siteName: "Faro Creative",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faro Creative — Founder-led design and development studio",
    description: ENTITY_SHORT,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/favicon-180x180.png", sizes: "180x180" },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Faro Creative",
  alternateName: "Faro",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-512x512.png`,
  description: ENTITY_PARAGRAPH,
  email: "hello@faro.is",
  founder: {
    "@type": "Person",
    name: "Jack",
    jobTitle: "Founder, designer and developer",
  },
  areaServed: ["United Kingdom", "Spain", "Worldwide"],
  knowsAbout: [
    "Web design",
    "Brand identity",
    "Front-end engineering",
    "Editorial design",
    "Superyacht industry",
    "Wellness and pilates",
  ],
  sameAs: RELATED_SITES.map((s) => s.url),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Faro Creative",
  url: SITE_URL,
  description: ENTITY_SHORT,
  publisher: { "@type": "Organization", name: "Faro Creative" },
  inLanguage: "en-GB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="text-foreground grain">{children}</body>
    </html>
  );
}
