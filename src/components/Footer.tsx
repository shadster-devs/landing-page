"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14L12 16L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10L12 12L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 6L12 8L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold">Flow2Chat</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Transform your flowcharts into interactive chat experiences with our premium Chrome extension for ChatGPT.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.571 21.128 10.285 21.879V14.892H7.689V12H10.285V9.797C10.285 7.291 11.754 5.907 14.021 5.907C15.099 5.907 16.235 6.102 16.235 6.102V8.562H15.001C13.786 8.562 13.372 9.333 13.372 10.124V12H16.118L15.645 14.892H13.372V21.879C18.085 21.129 21.656 16.99 21.656 12C21.656 6.477 17.179 2 11.656 2H12Z" fill="currentColor"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Features</Link></li>
              <li><Link href="#examples" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Examples</Link></li>
              <li><Link href="#download" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Purchase</Link></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Changelog</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Documentation</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Help Center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Contact Support</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">FAQ</a></li>
              <li><a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">Mermaid.js</a></li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} Flow2Chat. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Terms of Service</Link>
            <Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Contact</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;