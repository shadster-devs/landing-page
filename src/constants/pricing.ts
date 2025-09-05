// Pricing configuration - easy to update
export const PRICING_CONFIG = {
  FREE: {
    TITLE: 'Free',
    PRICE: '$0',
    FEATURES: [
      'Flowcharts and sequence diagrams',
      'Default theme',
      'Regular updates',
      'Basic support'
    ] as string[],
    BUTTON_TEXT: 'Add to Chrome',
    IS_PRIMARY: false
  },
  PRO: {
    TITLE: 'Pro',
    PRICE: '$5',
    ORIGINAL_PRICE: '$10',
    PRICE_SUBTEXT: 'one‑time',
    FEATURES: [
      'Everything in Free',
      'All diagram types',
      'Multiple themes',
      'One-time purchase'
    ] as string[],
    BUTTON_TEXT: 'Buy on Gumroad',
    IS_PRIMARY: true
  },
  
  // Marketing copy
  AFTER_PURCHASE_TEXT: 'You\'ll receive a license key via email. Enter it in the extension settings to activate Pro features.'
} as const;
