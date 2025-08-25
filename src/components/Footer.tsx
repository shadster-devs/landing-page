"use client";

import Link from "next/link";
import { motion } from 'framer-motion';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[var(--card)]/50">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3 text-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 text-[var(--text)] font-semibold">
            <span className="inline-flex h-7 w-7 rounded-lg bg-accent items-center justify-center text-white">F</span>
            Flow2Chat
          </div>
          <p className="mt-3 text-[var(--muted)]">Render Mermaid.js inside ChatGPT. Minimal, private, fast.</p>
          <div className="mt-4 flex gap-3">
            <motion.a 
              href="https://chromewebstore.google.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-2 rounded-lg border border-white/15"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Chrome
            </motion.a>
            <motion.a 
              href="https://gumroad.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-2 rounded-lg bg-accent text-white"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Pro
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h4 className="text-[var(--text)] font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>
              <motion.a 
                className="footer-link hover:text-accent" 
                href="#features"
                whileHover={{ x: 5 }}
              >
                Features
              </motion.a>
            </li>
            <li>
              <motion.a 
                className="footer-link hover:text-accent" 
                href="#pricing"
                whileHover={{ x: 5 }}
              >
                Pricing
              </motion.a>
            </li>
            <li>
              <motion.a 
                className="footer-link hover:text-accent" 
                href="#faq"
                whileHover={{ x: 5 }}
              >
                FAQ
              </motion.a>
            </li>
          </ul>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h4 className="text-[var(--text)] font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/privacy-policy" className="hover:text-accent">
                  Privacy
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.a 
                href="#" 
                className="hover:text-accent"
                whileHover={{ x: 5 }}
              >
                Terms
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="mailto:hello@example.com" 
                className="hover:text-accent"
                whileHover={{ x: 5 }}
              >
                Contact
              </motion.a>
            </li>
          </ul>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className=" py-6 text-center text-xs text-[var(--muted)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        © {new Date().getFullYear()} Flow2Chat. All rights reserved.
      </motion.div>
    </footer>
  );
}