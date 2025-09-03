"use client";

import { motion } from "framer-motion";

interface EditorBannerProps {
  plan?: 'free' | 'pro';
}

export default function EditorBanner({ plan = 'free' }: EditorBannerProps) {
  // Hide banner for Pro users
  if (plan === 'pro') {
    return null;
  }

  return (
    <div className="bg-accent text-white py-2 px-4 flex items-center justify-between">
      <div className="text-md">Render diagrams directly in ChatGPT conversations with Flow2Chat extension</div>
      <div className="flex items-center gap-2">
        <motion.a
          href="https://chromewebstore.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white text-sm py-2 px-3 rounded hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add to Chrome - Free
        </motion.a>
        <motion.a
          href="/#pricing"
          className="bg-white text-accent text-sm py-2 px-3 rounded hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See Pro Features
        </motion.a>
      </div>
    </div>
  );
}

