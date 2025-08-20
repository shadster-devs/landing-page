"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Components
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Examples from "@/components/Examples";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14L12 16L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10L12 12L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 6L12 8L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span className="text-xl font-bold">Flow2Chat</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm hover:text-emerald-600 transition-colors">Features</Link>
            <Link href="#examples" className="text-sm hover:text-emerald-600 transition-colors">Examples</Link>
            <Link href="#download" className="text-sm hover:text-emerald-600 transition-colors">Purchase</Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full">
              Chrome Only
            </span>
            <motion.a 
              href="#download"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Buy Now - $10
            </motion.a>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <Examples />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}