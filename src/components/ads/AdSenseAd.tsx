"use client";

import { useEffect, useState, useRef } from 'react';
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
  const [adLoaded, setAdLoaded] = useState(false);
  const adRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && ADS_CONFIG.GOOGLE_ADSENSE.ENABLED) {
      try {
        console.log('🔍 AdSense Debug:', {
          slot,
          clientId: ADS_CONFIG.GOOGLE_ADSENSE.CLIENT_ID,
          domain: window.location.hostname,
          adsbygoogle: typeof (window as any).adsbygoogle
        });
        
        // Initialize AdSense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        
        // Check if ad loaded after a delay
        setTimeout(() => {
          if (adRef.current) {
            const hasContent = adRef.current.innerHTML.trim() !== '';
            const hasHeight = adRef.current.offsetHeight > 0;
            setAdLoaded(hasContent && hasHeight);
            console.log('📊 Ad loaded status:', { hasContent, hasHeight, loaded: hasContent && hasHeight });
          }
        }, 2000);
        
      } catch (error) {
        console.error('❌ AdSense error:', error);
      }
    }
  }, [slot]);

  // Don't render if ads disabled
  if (!ADS_CONFIG.GOOGLE_ADSENSE.ENABLED) {
    return null;
  }

  return (
    <ins 
      ref={adRef}
      className={`adsbygoogle ${className} ${adLoaded ? 'ad-loaded' : 'ad-loading'}`}
      style={{
        display: 'block',
        minHeight: adLoaded ? 'auto' : '0px',
        ...style
      }}
      data-ad-client={ADS_CONFIG.GOOGLE_ADSENSE.CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive.toString()}
    />
  );
}
