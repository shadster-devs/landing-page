"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
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
          </Link>
          <Link href="/" className="text-sm hover:text-emerald-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p>
                This Privacy Policy describes how the Flow2Chat Mermaid Diagram Renderer Chrome extension 
                (referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) handles data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Collection</h2>
              <p>
                The Flow2Chat Mermaid Diagram Renderer extension does not collect, store, or transmit any user data. 
                All diagram rendering happens locally in your browser and no information is sent to external servers.
              </p>
              <p>
                The extension only processes Mermaid code found in ChatGPT conversations to render diagrams. 
                This processing is done entirely client-side (in your browser) without sending any data to our servers 
                or third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Use of Permissions</h2>
              <p>Our extension requires the following permissions:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>activeTab:</strong> Used solely to detect and render Mermaid diagrams on ChatGPT pages.</li>
                <li><strong>tabs:</strong> Used to determine if you are currently on ChatGPT and enable/disable the extension popup buttons accordingly.</li>
                <li><strong>Host permissions:</strong> Limited to specific domains (chat.openai.com and chatgpt.com) to ensure the extension only runs where needed.</li>
              </ul>
              <p>
                These permissions are the minimum required for the extension to function and are not used for any data collection purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
              <p>
                Our extension does not integrate with any third-party services for data collection, analytics, 
                or tracking. The only external dependency is the Mermaid.js library, which is bundled with the 
                extension and runs entirely in your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Storage</h2>
              <p>
                The extension does not store any user data persistently, neither on your device nor on remote servers.
                Any rendering state is temporary and exists only during the browser session.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Children&apos;s Privacy</h2>
              <p>
                Our extension is not directed at children under the age of 13, and we do not knowingly collect 
                any personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this 
                Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                <a href="mailto:support@flow2chat.com" className="text-emerald-600 hover:text-emerald-700">
                  support@flow2chat.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Flow2Chat. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/privacy-policy" className="text-emerald-600 dark:text-emerald-400">Privacy Policy</Link>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Terms of Service</Link>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
