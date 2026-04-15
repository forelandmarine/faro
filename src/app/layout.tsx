import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

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
  title: "FARO Creative Studio",
  description:
    "Brands designed to be found. Web design, brand identity, creative media, and interactive experiences.",
  metadataBase: new URL("https://faro.is"),
  openGraph: {
    title: "FARO Creative Studio",
    description: "Brands designed to be found.",
    url: "https://faro.is",
    siteName: "FARO",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "FARO Creative Studio",
    description: "Brands designed to be found.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} antialiased`} suppressHydrationWarning>
      <body className="text-foreground grain">{children}</body>
    </html>
  );
}
