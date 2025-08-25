"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Ensure state stays in sync with actual video state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Render <span className="text-accent">UML Diagrams</span> inside ChatGPT using <span className="text-accent">Mermaid.js</span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-[var(--muted)] max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Auto‑detects Mermaid code blocks and renders flowcharts, sequence, ER, class, Gantt, state, and more — right in your chat.
            </motion.p>
            <motion.div 
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.a 
                href="https://chromewebstore.google.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-600 text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Chrome — Free
              </motion.a>
              <motion.a 
                href="#pricing" 
                className="px-5 py-3 rounded-xl border border-white/15 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Pricing
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Demo video */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative shadow-glow">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/example.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom play/pause button */}
              <motion.button 
                onClick={togglePlay}
                className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-accent text-white grid place-items-center shadow-glow z-10 transition-all"
                aria-label={isPlaying ? "Pause video" : "Play video"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}