"use client";

import { motion } from 'framer-motion';
import { 
  Zap, 
  LayoutGrid, 
  Lock, 
  Paintbrush, 
  Rocket, 
  Monitor 
} from 'lucide-react';

export default function Features() {
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

  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-20" tabIndex={-1} role="region" aria-label="Features">
      <motion.h2 
        className="text-4xl md:text-5xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Features
      </motion.h2>
      <motion.div 
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <FeatureItem
          icon={<Zap className="h-5 w-5" />}
          title="Auto‑render"
          description="Detects diagram code blocks and renders them instantly inside ChatGPT."
        />
        <FeatureItem
          icon={<LayoutGrid className="h-5 w-5" />}
          title="All diagram types"
          description="Flowchart, Sequence, Class, ER, Gantt, State, Pie, Journey, and more — visualize any concept."
        />
        <FeatureItem
          icon={<Lock className="h-5 w-5" />}
          title="Tiny & private"
          description="Less than 100KB, minimal permissions, no tracking. Fully local."
        />
        <FeatureItem
          icon={<Paintbrush className="h-5 w-5" />}
          title="Themes & export"
          description="Choose multiple themes, and export diagrams as SVG or PNG with one click."
        />
        <FeatureItem
          icon={<Rocket className="h-5 w-5" />}
          title="Fast & reliable"
          description="Optimized for speed. Works seamlessly with ChatGPT conversations."
        />
        <FeatureItem
          icon={<Monitor className="h-5 w-5" />}
          title="Cross platform"
          description="Works with Chrome, Edge, and other Chromium-based browsers."
        />
      </motion.div>
    </section>
  );
}

type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="bg-[var(--card)] border border-white/10 rounded-xl p-6 hover:shadow-sm transition-all"
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-[var(--muted)]">{description}</p>
    </motion.div>
  );
}