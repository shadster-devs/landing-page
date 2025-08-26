"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SimpleNavbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  useEffect(() => {
    // Initial theme check
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    setIsDarkTheme(isDark);
    
    const handleThemeToggle = () => {
      const root = document.documentElement;
      const willBeDark = !root.classList.contains('dark');
      root.classList.toggle('dark');
      localStorage.setItem('theme', willBeDark ? 'dark' : 'light');
      setIsDarkTheme(willBeDark);
    };
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', handleThemeToggle);
    }
    
    return () => {
      if (themeToggle) {
        themeToggle.removeEventListener('click', handleThemeToggle);
      }
    };
  }, []);
  
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 backdrop-blur bg-[var(--bg)]/90 border-b border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="px-3 py-2 rounded-lg font-medium text-sm hover:text-accent hover:bg-accent/10 transition flex items-center gap-2">
              <ArrowLeft size={18} />
              Back
            </Link>
          </motion.div>
          
          <span className="hidden md:inline text-[var(--muted)]">|</span>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 rounded-xl bg-accent items-center justify-center text-white font-bold shadow-glow">F</span>
              <span className="text-lg font-semibold">Flow2Chat</span>
            </Link>
          </motion.div>
        </div>
        
        <div>
          <motion.button 
            id="themeToggle" 
            aria-label="Toggle theme" 
            className="px-3 py-2 rounded-lg border border-[var(--border)] text-sm hover:border-[var(--border)]/80"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkTheme ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}