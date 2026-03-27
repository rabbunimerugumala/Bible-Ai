// constants/theme.ts
// ── Backward-compatible re-export ──────────────────────────────────
// All tokens now live in AppTheme.ts (single source of truth).
// This file re-exports everything so existing imports like:
//   import { Colors, Spacing, Shadow } from '@/constants/theme'
// continue to work without any changes.
// ───────────────────────────────────────────────────────────────────

export {
  Colors,
  Spacing,
  FontSize,
  FontWeight,
  LineHeight,
  BorderRadius,
  Shadow,
  GlassStyle,
  CategoryConfig,
  ThemeColors,
  CommonStyles,
} from './AppTheme';
