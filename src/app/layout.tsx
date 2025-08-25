import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import ThemeInitializer from "@/components/ThemeInitializer";
import ScrollSpy from "@/components/ScrollSpy";
import NavbarWrapper from "@/components/NavbarWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Flow2Chat — Render Mermaid in ChatGPT (Chrome Extension)",
  description: "Flow2Chat renders Mermaid.js diagrams directly inside ChatGPT. Install free on Chrome. Unlock Pro on Gumroad.",
  keywords: ["ChatGPT extension", "Mermaid diagrams", "flowcharts", "Chrome extension", "diagram renderer"],
  authors: [{ name: "Flow2Chat Team" }],
  metadataBase: new URL("https://flow2chat.com"),
  openGraph: {
    title: "Flow2Chat — Mermaid in ChatGPT",
    description: "Auto‑render Mermaid diagrams inside ChatGPT. $10 one‑time Pro.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flow2Chat Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flow2Chat — Mermaid in ChatGPT",
    description: "Auto‑render Mermaid diagrams inside ChatGPT. $10 one‑time Pro.",
    images: ["/og-image.jpg"],
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