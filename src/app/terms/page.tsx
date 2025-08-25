"use client";

import Link from "next/link";
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block mb-4 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
          Legal Information
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Terms of Service</h1>
        <p className="text-[var(--muted)] text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      <div className="prose dark:prose-invert max-w-none">
        <motion.section 
          className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-[var(--muted)]">
            Welcome to Flow2Chat. These Terms of Service govern your use of our Chrome extension and website. 
            By using Flow2Chat, you agree to these Terms. Please read them carefully.
          </p>
        </motion.section>

        <motion.section 
          className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">2. Using Our Services</h2>
          <p className="text-[var(--muted)] mb-4">
            Flow2Chat provides a browser extension that enhances ChatGPT by rendering Mermaid diagram code. 
            You must follow any policies made available to you within the Services.
          </p>
          <p className="text-[var(--muted)]">
            Using our Services does not give you ownership of any intellectual property rights in our Services 
            or the content you access. You may not use content from our Services without explicit permission.
          </p>
        </motion.section>

        <motion.section 
          className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">3. License</h2>
          <p className="text-[var(--muted)] mb-4">
            We grant you a limited, non-exclusive, non-transferable license to use Flow2Chat in accordance with these Terms.
          </p>
          <p className="text-[var(--muted)]">
            The Free version and Pro version provide different features as described on our pricing page. 
            The Pro version requires a one-time payment and provides additional functionality.
          </p>
        </motion.section>

        <motion.section 
          className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">4. Prohibited Uses</h2>
          <p className="text-[var(--muted)] mb-4">You agree not to use Flow2Chat:</p>
          <ul className="space-y-3 text-[var(--muted)]">
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">✗</div>
              <div>For any unlawful purpose or to violate any laws</div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">✗</div>
              <div>To reverse engineer or attempt to extract the source code</div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">✗</div>
              <div>To circumvent or disable any security or other technological features</div>
            </li>
          </ul>
        </motion.section>

        <motion.section 
          className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">5. Liability and Warranty Disclaimer</h2>
          <p className="text-[var(--muted)] mb-4">
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
          <p className="text-[var(--muted)]">
            WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
          </p>
        </motion.section>

        <motion.section 
          className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="text-[var(--muted)]">
            We may modify these Terms at any time. We'll post notice of modifications to these Terms on this page.
            Changes will not apply retroactively and will become effective 14 days after they are posted.
          </p>
        </motion.section>

        <motion.section 
          className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-[var(--muted)] mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="mt-6 flex gap-3">
            <motion.a 
              href="mailto:support@flow2chat.com" 
              className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-600 text-white font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              support@flow2chat.com
            </motion.a>
            <motion.a 
              href="/contact" 
              className="px-5 py-3 rounded-xl border border-white/15 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Form
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
