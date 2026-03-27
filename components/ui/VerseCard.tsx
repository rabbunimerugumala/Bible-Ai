// Powered by OnSpace.AI — Glassmorphism VerseCard
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow, GlassStyle } from '@/constants/theme';
import { Verse } from '@/constants/bibleData';
import { formatReference } from '@/services/bibleService';

interface VerseCardProps {
  verse: Verse;
  variant?: 'default' | 'parchment' | 'compact' | 'hero';
  onPress?: () => void;
}

export function VerseCard({ verse, variant = 'default', onPress }: VerseCardProps) {
  const isParchment = variant === 'parchment';
  const isCompact = variant === 'compact';
  const isHero = variant === 'hero';

  if (isParchment) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.parchmentCard, pressed && styles.pressed]}
      >
        <LinearGradient
          colors={['#FDF6E3', '#F4E8C8', '#EDD9A3']}
          style={styles.parchmentGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Decorative corner ornament */}
          <View style={styles.parchmentOrn}>
            <Text style={styles.parchmentOrnText}>✦</Text>
          </View>

          {/* Gold accent line */}
          <View style={styles.parchmentAccent} />

          <View style={styles.parchmentContent}>
            <Text style={styles.parchmentQuote}>"</Text>
            <Text style={styles.parchmentText}>{verse.text}</Text>
            <View style={styles.parchmentFooter}>
              <Text style={styles.parchmentRef}>{formatReference(verse)}</Text>
              <View style={styles.parchmentThemes}>
                {verse.themes.slice(0, 2).map((t) => (
                  <View key={t} style={styles.parchmentTag}>
                    <Text style={styles.parchmentTagText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Bottom corner ornament */}
          <View style={styles.parchmentOrnBR}>
            <Text style={styles.parchmentOrnText}>✦</Text>
          </View>
        </LinearGradient>
      </Pressable>
    );
  }

  if (isCompact) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.compactCard, pressed && styles.pressed]}
      >
        <View style={styles.compactAccent} />
        <View style={styles.compactContent}>
          <Text style={styles.compactText} numberOfLines={2}>{verse.text}</Text>
          <Text style={styles.compactRef}>{formatReference(verse)}</Text>
        </View>
        <Feather name="chevron-right" size={14} color={Colors.textMuted} style={styles.compactArrow} />
      </Pressable>
    );
  }

  // Default glass card
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.glassCard, pressed && styles.pressed]}
    >
      {/* Glass background overlay */}
      <LinearGradient
        colors={[Colors.glassMid, Colors.glass]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Gold left accent bar */}
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primary, Colors.primaryDark]}
        style={styles.accentBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <View style={styles.glassContent}>
        {/* Quote mark */}
        <Text style={styles.quoteChar}>"</Text>
        <Text style={styles.glassVerseText}>{verse.text}</Text>

        <View style={styles.glassFooter}>
          <View style={styles.glassRefBadge}>
            <Text style={styles.glassRef}>{formatReference(verse)}</Text>
          </View>
          <View style={styles.glassTags}>
            {verse.themes.slice(0, 2).map((t) => (
              <View key={t} style={styles.glassTag}>
                <Text style={styles.glassTagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  // === Glass Default Card ===
  glassCard: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.glass,
  },
  accentBar: {
    width: 4,
    flexShrink: 0,
  },
  glassContent: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  quoteChar: {
    fontSize: 28,
    color: Colors.primaryGlow,
    fontWeight: FontWeight.extrabold,
    lineHeight: 20,
    marginBottom: -4,
  },
  glassVerseText: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: 27,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  glassFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  glassRefBadge: {
    backgroundColor: Colors.primaryGlow,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  glassRef: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  glassTags: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  glassTag: {
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  glassTagText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },

  // === Parchment Hero Card ===
  parchmentCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadow.gold,
  },
  parchmentGradient: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: '#D4B896',
    position: 'relative',
    overflow: 'hidden',
  },
  parchmentOrn: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.lg,
    opacity: 0.4,
  },
  parchmentOrnBR: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.lg,
    opacity: 0.4,
  },
  parchmentOrnText: {
    fontSize: 16,
    color: Colors.primaryDark,
  },
  parchmentAccent: {
    height: 2,
    backgroundColor: Colors.primaryDark,
    opacity: 0.35,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg + 20,
    borderRadius: 1,
  },
  parchmentContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  parchmentQuote: {
    fontSize: 48,
    color: Colors.primaryDark,
    opacity: 0.25,
    lineHeight: 40,
    fontWeight: FontWeight.extrabold,
  },
  parchmentText: {
    fontSize: FontSize.lg,
    color: Colors.textDark,
    lineHeight: 30,
    fontStyle: 'italic',
    letterSpacing: 0.3,
    fontWeight: FontWeight.medium,
  },
  parchmentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#C4A07040',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  parchmentRef: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primaryDark,
    letterSpacing: 0.5,
  },
  parchmentThemes: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  parchmentTag: {
    backgroundColor: '#9A7A3220',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#9A7A3240',
  },
  parchmentTagText: {
    fontSize: 10,
    color: Colors.primaryDark,
    fontWeight: FontWeight.semibold,
  },

  // === Compact Card ===
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    minHeight: 60,
    ...Shadow.sm,
  },
  compactAccent: {
    width: 3,
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
  compactContent: {
    flex: 1,
    padding: Spacing.md,
    gap: 3,
  },
  compactText: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  compactRef: {
    fontSize: FontSize.xs,
    color: Colors.textGold,
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.4,
  },
  compactArrow: {
    paddingRight: Spacing.sm,
    flexShrink: 0,
  },
});
