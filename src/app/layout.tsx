import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/landing/Footer";
import ThemeInitializer from "@/components/landing/ThemeInitializer";
import ScrollSpy from "@/components/landing/ScrollSpy";
import NavbarWrapper from "@/components/landing/NavbarWrapper";
import { PRICING_CONFIG } from "@/constants/pricing";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Flow2Chat — Render Diagrams in ChatGPT",
  description: "Flow2Chat renders Mermaid.js diagrams directly inside ChatGPT. Install free on Chrome. Unlock Pro on Gumroad.",
  icons: {
    icon: [
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  keywords: ["ChatGPT extension", "Mermaid diagrams", "flowcharts", "Chrome extension", "diagram renderer"],
  authors: [{ name: "Flow2Chat Team" }],
  metadataBase: new URL("https://www.flow2chat.com"),
  openGraph: {
      title: "Flow2Chat — Render Diagrams in ChatGPT",
      description: `Auto‑render Mermaid diagrams inside ChatGPT. ${PRICING_CONFIG.PRO.PRICE} one‑time Pro.`,
    images: [
      {
        url: "/example.mp4",
        width: 1200,
        height: 630,
        alt: "Flow2Chat Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flow2Chat — Render Diagrams in ChatGPT",
    description: `Auto‑render Mermaid diagrams inside ChatGPT. ${PRICING_CONFIG.PRO.PRICE} one‑time Pro.`,
    images: ["/example.mp4"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-[var(--bg)] text-[var(--text)]`}>
        {/* Theme and scroll initialization */}
        <ThemeInitializer />
        <ScrollSpy />
        
        {/* Global layout */}
        <NavbarWrapper />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
