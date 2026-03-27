// Powered by OnSpace.AI — Glassmorphism Design System
export const Colors = {
  // === Primary Palette ===
  primary: '#D4AF5A',          // Royal gold
  primaryLight: '#EDD98A',     // Champagne gold
  primaryDark: '#9A7A32',      // Deep antique gold
  primaryGlow: '#D4AF5A40',    // Gold glow (for glass effects)

  // === Background System ===
  background: '#050D1A',       // Void black-navy
  backgroundDeep: '#020810',   // Deepest background layer
  backgroundMid: '#08142A',    // Mid-layer background

  // === Glass Surfaces (glassmorphism) ===
  glass: '#FFFFFF08',          // Ultra-thin glass tint
  glassMid: '#FFFFFF12',       // Mid glass surface
  glassStrong: '#FFFFFF1A',    // Strong glass surface
  glassFrost: '#FFFFFF22',     // Frosted glass
  glassGold: '#D4AF5A0D',     // Gold-tinted glass

  // === Card Surfaces ===
  surface: '#0E1E3A',          // Primary card surface
  surfaceElevated: '#142848',  // Elevated card
  surfaceHigh: '#1A3257',      // High elevation card
  surfaceWarm: '#111D34',      // Warm dark navy
  surfaceParchment: '#F7EDD8', // Cream parchment (for verse highlights)

  // === Text ===
  textPrimary: '#F0E8D0',      // Warm cream white
  textSecondary: '#8DA4BF',    // Muted slate blue
  textMuted: '#4A6080',        // Dim slate
  textDark: '#1A2535',         // Dark text (on light backgrounds)
  textGold: '#D4AF5A',         // Gold accent text
  textGoldLight: '#EDD98A',    // Light gold text
  textWhite: '#FFFFFF',        // Pure white

  // === Semantic Colors ===
  success: '#3DCF8A',
  successGlow: '#3DCF8A30',
  error: '#E05555',
  errorGlow: '#E0555530',
  warning: '#E09A30',
  info: '#4A8FE0',
  infoGlow: '#4A8FE030',

  // === Border System ===
  border: '#FFFFFF0D',         // Subtle glass border
  borderLight: '#FFFFFF18',    // Light glass border
  borderMid: '#FFFFFF22',      // Mid glass border
  borderGold: '#D4AF5A30',    // Gold glass border
  borderGoldStrong: '#D4AF5A60', // Strong gold border
  borderGlow: '#D4AF5A20',    // Soft gold glow border

  // === Tab Bar ===
  tabBar: '#060F1E',           // Near-black navy tab bar
  tabBarBorder: '#D4AF5A20',  // Gold tab border
  tabActive: '#D4AF5A',        // Active gold
  tabInactive: '#3A5070',      // Inactive muted

  // === Glow Effects ===
  glow: '#D4AF5A',
  glowBlue: '#4A8FE0',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 42,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const BorderRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
  full: 999,
};

// Glass morphism shadow system
export const Shadow = {
  glass: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 16,
  },
  gold: {
    shadowColor: '#D4AF5A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  goldGlow: {
    shadowColor: '#D4AF5A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  inset: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Glass card style helper
export const GlassStyle = {
  card: {
    backgroundColor: Colors.glassMid,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.glass,
  },
  cardGold: {
    backgroundColor: Colors.glassGold,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    ...Shadow.gold,
  },
  cardStrong: {
    backgroundColor: Colors.glassStrong,
    borderWidth: 1,
    borderColor: Colors.borderMid,
    ...Shadow.lg,
  },
};
