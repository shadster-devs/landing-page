"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
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
        <motion.a 
          href="/" 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/icon.png" alt="Flow2Chat Icon" className="h-8 w-8 rounded-xl shadow-glow" />
          <span className="text-lg font-semibold">Flow2Chat</span>
        </motion.a>
        
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]" id="site-nav">
          <motion.a 
            href="/#features" 
            className="px-3 py-2 rounded-lg font-medium nav-link hover:text-accent hover:bg-accent/10 transition"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.a>
          <motion.a 
            href="/#pricing" 
            className="px-3 py-2 rounded-lg font-medium nav-link hover:text-accent hover:bg-accent/10 transition"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Pricing
          </motion.a>
          <motion.a 
            href="/#faq" 
            className="px-3 py-2 rounded-lg font-medium nav-link hover:text-accent hover:bg-accent/10 transition"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            FAQ
          </motion.a>
          <Link href="/editor" legacyBehavior passHref>
            <motion.a
              className="px-3 py-2 rounded-lg font-medium nav-link bg-accent/10 hover:bg-accent/20 transition flex items-center gap-1 relative overflow-hidden"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(90deg, #eeeeee, #19C37D, #eeeeee, #19C37D)',
                backgroundSize: '200% 100%',
                animation: 'gradient-flow 2s ease-in-out infinite',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              <Code size={16} style={{ color: '#19C37D' }} />
              Live Editor
            </motion.a>
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
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
          
          <motion.a 
            href="https://chromewebstore.google.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden sm:inline-flex px-3 py-2 rounded-lg border border-[var(--border)]/80 text-sm hover:border-[var(--border)]/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Chrome
          </motion.a>
          
          <motion.a 
            href="https://gumroad.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex px-4 py-2 rounded-lg bg-accent hover:bg-accent-600 text-sm font-semibold shadow-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Pro
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}