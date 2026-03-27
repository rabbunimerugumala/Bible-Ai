// ═══════════════════════════════════════════════════════════════════
// Bible AI — Master App Theme  (constants/AppTheme.ts)
// Single source of truth for ALL design tokens.
// Import from here across every screen, component, and service.
// ═══════════════════════════════════════════════════════════════════

import { StyleSheet } from 'react-native';

// ─────────────────────────────────────────────
// 🎨  COLOR PALETTE
// ─────────────────────────────────────────────
export const Colors = {
  // ── Primary (Royal Gold) ──
  primary:          '#D4AF5A',   // Royal gold — main brand accent
  primaryLight:     '#EDD98A',   // Champagne gold — lighter variant
  primaryDark:      '#9A7A32',   // Antique gold — darker variant
  primaryGlow:      '#D4AF5A40', // Gold with 25% opacity — glow rings

  // ── Backgrounds ──
  background:       '#050D1A',   // Void black-navy — root bg
  backgroundDeep:   '#020810',   // Deepest layer — header / tab bar under-bg
  backgroundMid:    '#08142A',   // Mid-layer — card backgrounds

  // ── Surfaces ──
  surface:          '#0E1E3A',   // Primary card surface
  surfaceElevated:  '#142848',   // Elevated card
  surfaceHigh:      '#1A3257',   // High elevation card
  surfaceWarm:      '#111D34',   // Warm dark navy
  surfaceParchment: '#F7EDD8',   // Cream parchment — verse highlight bg

  // ── Glassmorphism Layers ──
  glassUltraThin:   '#FFFFFF05', // 2% opacity — barely there
  glassThin:        '#FFFFFF0A', // 4% opacity — subtle
  glass:            '#FFFFFF0D', // 5% opacity — standard thin
  glassMid:         '#FFFFFF15', // 8% opacity — medium
  glassStrong:      '#FFFFFF22', // 13% opacity — strong
  glassFrost:       '#FFFFFF30', // 19% opacity — frosted
  glassDeep:        '#FFFFFF45', // 27% opacity — heavy glass
  glassGold:        '#D4AF5A0D', // Gold-tinted glass (5%)
  glassGoldMid:     '#D4AF5A19', // Gold-tinted glass (10%)
  glassBlue:        '#4A8FE00D', // Blue-tinted glass (5%)

  // ── Text ──
  textPrimary:      '#F0E8D0',   // Warm cream white — body text
  textSecondary:    '#8DA4BF',   // Muted slate blue — secondary labels
  textMuted:        '#4A6080',   // Dim slate — placeholders / hints
  textDark:         '#1A2535',   // Dark text (on parchment or light bg)
  textGold:         '#D4AF5A',   // Gold accent text
  textGoldLight:    '#EDD98A',   // Light gold — active state labels
  textWhite:        '#FFFFFF',   // Pure white

  // ── Semantic / Status ──
  success:          '#3DCF8A',   // Emerald green — Create mode, online dot
  successGlow:      '#3DCF8A30', // Success with 19% opacity
  error:            '#E05555',   // Crimson — error states
  errorGlow:        '#E0555530', // Error with 19% opacity
  warning:          '#E09A30',   // Amber — warning / Explore icon
  info:             '#4A8FE0',   // Steel blue — info tips, Search AI badge
  infoGlow:         '#4A8FE030', // Info with 19% opacity

  // ── Borders ──
  border:           '#FFFFFF0D', // Subtle glass border (5% white)
  borderLight:      '#FFFFFF18', // Light glass border (9% white)
  borderMid:        '#FFFFFF22', // Mid glass border (13% white)
  borderGold:       '#D4AF5A30', // Gold glass border (19% opacity)
  borderGoldStrong: '#D4AF5A60', // Strong gold border (38% opacity)
  borderGlow:       '#D4AF5A20', // Soft gold glow border (13% opacity)

  // ── Interactive ──
  pressed:          '#FFFFFF10', // Interaction overlay
  active:           '#D4AF5A20', // Active state background
  activeBlue:       '#4A8FE020', // Active state blue

  // ── Tab Bar ──
  tabBar:           '#060F1E',   // Near-black navy tab bar background
  tabBarBorder:     '#D4AF5A20', // Gold top-border of tab bar
  tabActive:        '#D4AF5A',   // Active tab icon / label
  tabInactive:      '#3A5070',   // Inactive tab icon / label

  // ── Glow Effects ──
  glow:             '#D4AF5A',   // Primary gold glow
  glowBlue:         '#4A8FE0',   // Blue glow (info states)
} as const;

/** Common Gradients for the entire app */
export const Gradients = {
  // Brand / Primary
  primary:      ['#D4AF5A', '#9A7A32'] as const,
  primaryLight: ['#EDD98A', '#D4AF5A'] as const,
  
  // Backgrounds
  deep:         ['#020810', '#050D1A'] as const,
  main:         ['#050D1A', '#08142A'] as const,
  
  // Status
  success:      ['#3DCF8A', '#2AA36B'] as const,
  info:         ['#4A8FE0', '#3572B2'] as const,
  warning:      ['#E09A30', '#B37822'] as const,
  error:        ['#E05555', '#B84040'] as const,
  
  // Glass
  glass:        ['#FFFFFF15', '#FFFFFF05'] as const,
  glassStrong:  ['#FFFFFF25', '#FFFFFF12'] as const,
  glassGold:    ['#D4AF5A25', '#D4AF5A0D'] as const,
  
  // Custom
  creative:     ['#1A3A1A', '#0D2A0D', '#050D1A'] as const,
  parchment:    ['#FDF6E3', '#F4E8C8', '#EDD9A3'] as const,
} as const;

// ─────────────────────────────────────────────
// 📐  SPACING  (4-point grid)
// ─────────────────────────────────────────────
export const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
  xxxl: 64,
} as const;

// ─────────────────────────────────────────────
// 🔤  TYPOGRAPHY
// ─────────────────────────────────────────────
export const FontSize = {
  xs:      12,  // Labels, badges, hints
  sm:      14,  // Body text, captions
  md:      16,  // Default body
  lg:      18,  // Section titles
  xl:      20,  // Screen titles
  xxl:     24,  // Card headings
  xxxl:    32,  // Large numbers, stats
  display: 42,  // Hero / display text
} as const;

export const FontWeight = {
  regular:   '400' as const,
  medium:    '500' as const,
  semibold:  '600' as const,
  bold:      '700' as const,
  extrabold: '800' as const,
} as const;

export const LineHeight = {
  tight:  18,
  normal: 22,
  loose:  28,
} as const;

// ─────────────────────────────────────────────
// 🔵  BORDER RADIUS
// ─────────────────────────────────────────────
export const BorderRadius = {
  xs:   6,
  sm:   10,
  md:   14,
  lg:   20,
  xl:   28,
  xxl:  36,
  full: 999,  // Pill / circle
} as const;

// ─────────────────────────────────────────────
// 🌑  SHADOWS
// ─────────────────────────────────────────────
export const Shadow = {
  /** Standard glass card shadow */
  glass: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.40,
    shadowRadius:  24,
    elevation:     12,
  },
  sm: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius:  8,
    elevation:     4,
  },
  md: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius:  16,
    elevation:     8,
  },
  lg: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius:  24,
    elevation:     16,
  },
  /** Gold accent shadow — send button, active chips */
  gold: {
    shadowColor:   '#D4AF5A',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius:  16,
    elevation:     8,
  },
  /** Diffuse gold ambient glow */
  goldGlow: {
    shadowColor:   '#D4AF5A',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.50,
    shadowRadius:  20,
    elevation:     10,
  },
  /** Inner top shadow for recessed elements */
  inset: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: -2 },
    shadowOpacity: 0.30,
    shadowRadius:  8,
    elevation:     4,
  },
} as const;

// ─────────────────────────────────────────────
// 🪟  GLASSMORPHISM CARD PRESETS
// ─────────────────────────────────────────────
export const GlassStyle = {
  /** Standard glass card */
  card: {
    backgroundColor: Colors.glassMid,
    borderWidth:     1,
    borderColor:     Colors.borderLight,
    ...Shadow.glass,
  },
  /** Ultra-thin glass card — collection rows, subtle chips */
  cardThin: {
    backgroundColor: Colors.glassThin,
    borderWidth:     1,
    borderColor:     Colors.border,
  },
  /** Gold-tinted glass card — verse of the day, featured */
  cardGold: {
    backgroundColor: Colors.glassGold,
    borderWidth:     1,
    borderColor:     Colors.borderGold,
    ...Shadow.gold,
  },
  /** Stronger glass — modals, overlays */
  cardStrong: {
    backgroundColor: Colors.glassStrong,
    borderWidth:     1,
    borderColor:     Colors.borderMid,
    ...Shadow.lg,
  },
  /** Parchment card — highlighted verse, quote blocks */
  cardParchment: {
    backgroundColor: Colors.surfaceParchment,
    borderWidth:     1,
    borderColor:     Colors.borderGold,
    ...Shadow.md,
  },
} as const;

// ─────────────────────────────────────────────
// 🗂️  THEME CONFIG  (icon + color per Bible category)
//     Used in Explore screen and any book list.
// ─────────────────────────────────────────────
export const CategoryConfig: Record<string, { color: string; icon: string }> = {
  Law:      { color: '#D4AF5A', icon: 'book'      },
  History:  { color: '#E0C07B', icon: 'map'       },
  Poetry:   { color: '#7B8CE0', icon: 'music'     },
  Wisdom:   { color: '#E0C07B', icon: 'award'     },
  Prophecy: { color: '#E07B7B', icon: 'eye'       },
  Gospel:   { color: '#E07BA8', icon: 'heart'     },
  Epistle:  { color: '#7BE0C0', icon: 'mail'      },
  Acts:     { color: '#7BE0D0', icon: 'move'      },
  Other:    { color: '#D4AF5A', icon: 'book-open' },
};

// ─────────────────────────────────────────────
// 🏷️  THEME COLORS  (15 biblical themes)
//     Used in Explore, Home chips, VerseCard tags.
// ─────────────────────────────────────────────
export const ThemeColors: Record<string, string> = {
  Love:        '#E07BA8',
  Faith:       '#7B8CE0',
  Hope:        '#7BE0C0',
  Peace:       '#7BB8E0',
  Wisdom:      '#D4AF5A',
  Salvation:   '#E07B7B',
  Prayer:      '#A87BE0',
  Strength:    '#E0A07B',
  Grace:       '#7BE0A8',
  Forgiveness: '#E0D07B',
  Prophecy:    '#E08C7B',
  Creation:    '#7BC8E0',
  Justice:     '#C07BE0',
  Praise:      '#E0C07B',
  Healing:     '#7BE0B8',
};

// ─────────────────────────────────────────────
// ⚡  QUICK-ACCESS COMMON STYLES
//     Pre-built StyleSheet objects for common patterns.
// ─────────────────────────────────────────────
export const CommonStyles = StyleSheet.create({
  /** Full-screen root view */
  screenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  /** Centered loading / empty state */
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  /** Standard section row with space-between */
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  /** Horizontal row, items centered */
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /** Glass pill badge (e.g., "IRV", "AI") */
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical:   4,
    borderRadius:      BorderRadius.full,
    backgroundColor:   Colors.glassGold,
    borderWidth:       1,
    borderColor:       Colors.borderGold,
  },
  badgeText: {
    fontSize:    FontSize.xs,
    fontWeight:  FontWeight.bold,
    color:       Colors.primary,
    letterSpacing: 0.5,
  },
  /** Standard section title */
  sectionTitle: {
    fontSize:   FontSize.lg,
    fontWeight: FontWeight.bold,
    color:      Colors.textWhite,
  },
  /** Muted section label (uppercase) */
  sectionLabel: {
    fontSize:      FontSize.xs,
    fontWeight:    FontWeight.bold,
    color:         Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  /** Empty state / placeholder text */
  emptyText: {
    fontSize:   FontSize.sm,
    color:      Colors.textMuted,
    fontStyle:  'italic',
    textAlign:  'center',
  },
  /** Loading indicator row */
  loadingRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing.sm,
    paddingVertical: Spacing.lg,
  },
  loadingText: {
    fontSize: FontSize.sm,
    color:    Colors.textSecondary,
  },
  /** Interactive state overlay styles */
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  activeGlow: {
    ...Shadow.goldGlow,
    borderColor: Colors.primary,
    backgroundColor: Colors.active,
  },
});

// ─────────────────────────────────────────────
// 🏁  RE-EXPORTS — backward compat with old imports
//     Existing files that import from constants/theme.ts
//     will continue to work. Update them gradually.
// ─────────────────────────────────────────────
export { Colors as default };
