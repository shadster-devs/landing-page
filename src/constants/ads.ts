// Ad network configuration
export const ADS_CONFIG = {
  // Google AdSense (recommended)
  GOOGLE_ADSENSE: {
    CLIENT_ID: 'ca-pub-5484630893518635',
    ENABLED: true, // Ready to use
    SLOTS: {
      TOP_BANNER: '3144648750',     // Flow2Chat Top Banner
      SIDEBAR: '4505831888',        // Flow2Chat Sidebar
      BOTTOM_BANNER: '9983758966',  // Flow2Chat Bottom Banner
    }
  },

  // Alternative: Media.net
  MEDIA_NET: {
    SITE_ID: 'XXXXXX',  // TODO: Replace with Media.net site ID
    ENABLED: false,
  },

  // Ad placement rules
  PLACEMENT: {
    SHOW_ON_FREE_PLAN: true,
    SHOW_ON_PRO_PLAN: false,
    MIN_SESSION_TIME: 30000, // Show ads after 30 seconds
    FREQUENCY_CAP: 3, // Max 3 ads per session
  },

  // Ad sizes (IAB standard)
  SIZES: {
    LEADERBOARD: { width: 728, height: 90 },    // Top/bottom banner
    MEDIUM_RECTANGLE: { width: 300, height: 250 }, // Sidebar
    LARGE_RECTANGLE: { width: 336, height: 280 },  // Sidebar alternative
  }
} as const;
