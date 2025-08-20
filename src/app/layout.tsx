import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flow2Chat - Premium Mermaid Diagram Renderer for ChatGPT ($10)",
  description: "Transform your flowcharts into interactive chat experiences with our premium Chrome extension. One-time $10 payment.",
  keywords: ["ChatGPT extension", "Mermaid diagrams", "flowcharts", "Chrome extension", "diagram renderer"],
  authors: [{ name: "Flow2Chat Team" }],
  metadataBase: new URL("https://flow2chat.com"),
  openGraph: {
    title: "Flow2Chat - Premium Mermaid Diagram Renderer for ChatGPT",
    description: "Transform your flowcharts into interactive chat experiences with our premium Chrome extension. One-time $10 payment.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Flow2Chat Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}