"use client";

import { motion } from 'framer-motion';
import AdSenseAd from './AdSenseAd';
import { ADS_CONFIG } from '@/constants/ads';

interface AdBannerProps {
  position: 'bottom' | 'sidebar';
  plan: 'free' | 'pro';
  className?: string;
}

export default function AdBanner({ position, plan, className = '' }: AdBannerProps) {
  // Don't show ads for Pro users
  if (plan === 'pro') return null;

  // Get the appropriate ad slot based on position
  const adSlot = position === 'sidebar' 
    ? ADS_CONFIG.GOOGLE_ADSENSE.SLOTS.SIDEBAR 
    : ADS_CONFIG.GOOGLE_ADSENSE.SLOTS.BOTTOM_BANNER;

  return (
    <AdSenseAd 
      slot={adSlot}
      format="auto"
      responsive={true}
      className={className}
    />
  );
}
