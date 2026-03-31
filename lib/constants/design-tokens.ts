export const DESIGN_TOKENS = {
  colors: {
    base: {
      light: '#f8f6f0',
      dark: '#0F1115'
    },
    accent: {
      primary: '#E07A5F',
      hover: '#EE8D73'
    }
  },
  motion: {
    micro: { duration: 0.3, ease: 'easeOut' },
    macro: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } 
  }
} as const;
