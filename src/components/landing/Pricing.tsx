"use client";

import { motion } from 'framer-motion';
import { URLS } from '@/constants/urls';
import { PRICING_CONFIG } from '@/constants/pricing';

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-4xl mx-auto px-4 py-14" tabIndex={-1} role="region" aria-label="Pricing">
      <motion.h2 
        className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Pricing
      </motion.h2>
      <motion.p 
        className="mt-2 text-center text-[var(--muted)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Simple one‑time purchase. No subscriptions.
      </motion.p>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Free Tier */}
        <PricingTier 
          title={PRICING_CONFIG.FREE.TITLE}
          price={PRICING_CONFIG.FREE.PRICE}
          features={PRICING_CONFIG.FREE.FEATURES}
          buttonText={PRICING_CONFIG.FREE.BUTTON_TEXT}
          buttonLink={URLS.CHROME_STORE}
          isPrimary={PRICING_CONFIG.FREE.IS_PRIMARY}
          delay={0.3}
        />
        
        {/* Pro Tier */}
        <PricingTier 
          title={PRICING_CONFIG.PRO.TITLE}
          price={PRICING_CONFIG.PRO.PRICE}
          originalPrice={PRICING_CONFIG.PRO.ORIGINAL_PRICE}
          priceSubtext={PRICING_CONFIG.PRO.PRICE_SUBTEXT}
          features={PRICING_CONFIG.PRO.FEATURES}
          buttonText={PRICING_CONFIG.PRO.BUTTON_TEXT}
          buttonLink={URLS.GUMROAD_STORE}
          isPrimary={PRICING_CONFIG.PRO.IS_PRIMARY}
          delay={0.5}
        />
      </div>
      
      {/* Activation info */}
      <motion.div 
        className="mt-6 p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="text-sm text-[var(--text)]">
          <span className="font-semibold">After purchase:</span> {PRICING_CONFIG.AFTER_PURCHASE_TEXT}
        </div>
        <motion.a 
          href={URLS.ACTIVATE}
          className="inline-flex items-center gap-1 mt-2 text-sm text-accent hover:text-accent-600 transition-colors font-medium"
          whileHover={{ scale: 1.05 }}
        >
          View activation guide →
        </motion.a>
      </motion.div>
    </section>
  );
}

type PricingTierProps = {
  title: string;
  price: string;
  originalPrice?: string;
  priceSubtext?: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPrimary: boolean;
  className?: string;
  delay?: number;
}

function PricingTier({ 
  title, 
  price, 
  originalPrice,
  priceSubtext, 
  features, 
  buttonText, 
  buttonLink,
  isPrimary,
  className = "",
  delay = 0
}: PricingTierProps) {
  return (
    <motion.div 
      className={`p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] ${isPrimary ? 'shadow-glow' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      
      <div className="mt-1 flex items-baseline">
        <p className="text-4xl font-extrabold">{price}</p>
        
        {originalPrice && (
          <span className="ml-2 text-xl line-through opacity-70 text-[var(--muted)]">
            {originalPrice}
          </span>
        )}
        
        {priceSubtext && (
          <span className="ml-2 text-base font-medium text-[var(--muted)]">
            {priceSubtext}
          </span>
        )}
      </div>
      
      <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
        {features.map((feature, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.1 + (index * 0.1), duration: 0.4 }}
          >
            ✔ {feature}
          </motion.li>
        ))}
      </ul>
      <motion.a 
        href={buttonLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-6 inline-flex w-full justify-center px-4 py-2 rounded-xl bg-accent hover:bg-accent-600 text-white font-semibold"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {buttonText}
      </motion.a>
    </motion.div>
  );
}