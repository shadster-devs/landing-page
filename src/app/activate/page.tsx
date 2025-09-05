"use client";

import { motion } from 'framer-motion';
import { CheckCircle, Chrome, Settings, Key, DollarSign } from 'lucide-react';
import { URLS } from '@/constants/urls';

export default function ActivatePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20">
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Activate Your <span className="text-accent">Pro License</span>
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Follow these simple steps to unlock all Pro features and start creating amazing diagrams
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1: Install */}
          <motion.div 
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Chrome className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Step 1: Install Extension</h3>
                <p className="text-[var(--muted)] mb-4">
                  Install the Flow2Chat extension from the Chrome Web Store if you haven't already.
                </p>
                <motion.a 
                  href={URLS.CHROME_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-600 text-white rounded-lg transition-colors shadow-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chrome size={16} />
                  Add to Chrome
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Step 2: Purchase */}
          <motion.div 
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Step 2: Buy Pro License</h3>
                <p className="text-[var(--muted)] mb-4">
                  Purchase your Pro license from Gumroad. You'll receive your license key via email instantly.
                </p>
                <motion.a 
                  href={URLS.GUMROAD_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-600 text-white rounded-lg transition-colors shadow-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Pro License
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Step 2: Open Extension Settings</h3>
                <p className="text-[var(--muted)] mb-4">
                  Click the Flow2Chat extension icon in your browser toolbar, then click "Options" or right-click the icon and select "Options".
                </p>
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4 w-full">
                  <p className="text-sm font-medium mb-2">Alternative method:</p>
                  <ol className="text-sm text-[var(--muted)] space-y-1">
                    <li>1. Go to chrome://extensions/</li>
                    <li>2. Find "Flow2Chat" extension</li>
                    <li>3. Click "Details" → "Extension options"</li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Key className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Step 3: Enter License Key</h3>
                <p className="text-[var(--muted)] mb-4">
                  In the License section, paste your license key (you received this via email after purchase).
                </p>
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4 w-full">
                  <p className="text-sm font-medium mb-2">License key format:</p>
                  <code className="text-sm bg-[var(--card)] px-2 py-1 rounded border border-[var(--border)]">
                    XXXX-XXXX-XXXX-XXXX
                  </code>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Step 4: Activate & Enjoy</h3>
                <p className="text-[var(--muted)] mb-4">
                  Click "Activate License" and you're done! All Pro features are now unlocked.
                </p>
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium mb-2">Pro Features Unlocked:</h3>
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>• All diagram types (Class, State, ER, Gantt, etc.)</li>
                    <li>• Multiple themes (Dark, Forest, Neutral)</li>
                    <li>• Direct copy/download as PNG</li>
                    <li>• No redirects to editor</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-[var(--muted)]">
            Need help? Email us at{' '}
            <a href={URLS.SUPPORT_EMAIL} className="text-accent hover:underline">
              shakthisagarm5918@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
