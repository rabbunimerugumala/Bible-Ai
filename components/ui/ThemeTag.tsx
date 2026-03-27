// Powered by OnSpace.AI — Glassmorphism ThemeTag
import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants/theme';

interface ThemeTagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
}

export function ThemeTag({ label, selected = false, onPress, size = 'md' }: ThemeTagProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tag,
        size === 'sm' && styles.tagSm,
        selected && styles.tagSelected,
        pressed && styles.tagPressed,
      ]}
    >
      {selected && <View style={styles.selectedDot} />}
      <Text style={[
        styles.label,
        size === 'sm' && styles.labelSm,
        selected && styles.labelSelected,
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minHeight: 34,
  },
  tagSm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    minHeight: 28,
  },
  tagSelected: {
    backgroundColor: Colors.primaryGlow,
    borderColor: Colors.borderGoldStrong,
  },
  tagPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  selectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    letterSpacing: 0.2,
  },
  labelSm: {
    fontSize: FontSize.xs,
  },
  labelSelected: {
    color: Colors.textGold,
    fontWeight: FontWeight.semibold,
  },
});
