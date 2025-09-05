"use client";

import { useEffect } from 'react';
import { ADS_CONFIG } from '@/constants/ads';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({ 
  slot, 
  format = 'auto', 
  responsive = true,
  style,
  className = ''
}: AdSenseAdProps) {
  
  useEffect(() => {
    if (typeof window !== 'undefined' && ADS_CONFIG.GOOGLE_ADSENSE.ENABLED) {
      try {
        // Initialize AdSense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Don't render if ads disabled
  if (!ADS_CONFIG.GOOGLE_ADSENSE.ENABLED) {
    return null;
  }

  return (
    <ins 
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        ...style
      }}
      data-ad-client={ADS_CONFIG.GOOGLE_ADSENSE.CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive.toString()}
    />
  );
}
