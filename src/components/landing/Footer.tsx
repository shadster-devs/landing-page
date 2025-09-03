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
    <footer className="border-t border-[var(--border)] bg-[var(--card)]/50">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3 text-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 text-[var(--text)] font-semibold">
            <img src="/icon.png" alt="Flow2Chat Icon" className="h-7 w-7 rounded-lg" />
            Flow2Chat
          </div>
          <p className="mt-3 text-[var(--muted)]">Render Mermaid.js inside ChatGPT. Minimal, private, fast.</p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h4 className="text-[var(--text)] font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>
              <motion.a 
                className="footer-link hover:text-accent" 
                href="/#features"
                whileHover={{ x: 5 }}
              >
                Features
              </motion.a>
            </li>
            <li>
              <motion.a 
                className="footer-link hover:text-accent" 
                href="/#pricing"
                whileHover={{ x: 5 }}
              >
                Pricing
              </motion.a>
            </li>
            <li>
              <motion.a 
                className="footer-link hover:text-accent" 
                href="/#faq"
                whileHover={{ x: 5 }}
              >
                FAQ
              </motion.a>
            </li>
            <li>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/editor" className="hover:text-accent">
                  Live Editor
                </Link>
              </motion.div>
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
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/terms" className="hover:text-accent">
                  Terms
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </motion.div>
            </li>
          </ul>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="py-6 text-center text-xs text-[var(--muted)]"
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