import type { Metadata } from "next";
import { Inter, Noto_Sans_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const notoSansDisplay = Noto_Sans_Display({
  variable: "--font-noto-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FARO — Creative Studio",
  description:
    "Brands designed to be found. Web design, brand identity, creative media, and interactive experiences.",
  metadataBase: new URL("https://faro.is"),
  openGraph: {
    title: "FARO — Creative Studio",
    description: "Brands designed to be found.",
    url: "https://faro.is",
    siteName: "FARO",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "FARO — Creative Studio",
    description: "Brands designed to be found.",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansDisplay.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
