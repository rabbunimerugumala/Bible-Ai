// Powered by OnSpace.AI — Glassmorphism Creative Screen
import React from 'react';
import {
  View, Text, ScrollView, Pressable, TextInput,
  ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '@/constants/theme';
import { useCreative, CREATIVE_STYLES } from '@/hooks/useCreative';

const STYLE_CONFIG: Record<string, {
  icon: keyof typeof Feather.glyphMap;
  desc: string;
  color: string;
  gradient: [string, string];
}> = {
  Psalm: {
    icon: 'music',
    desc: 'Poetic praise & worship',
    color: '#7B8CE0',
    gradient: ['#7B8CE020', '#7B8CE008'],
  },
  Prophecy: {
    icon: 'eye',
    desc: 'Prophetic declarations',
    color: '#E07B7B',
    gradient: ['#E07B7B20', '#E07B7B08'],
  },
  Proverb: {
    icon: 'award',
    desc: 'Wisdom sayings',
    color: Colors.primary,
    gradient: [Colors.primary + '20', Colors.primary + '08'],
  },
  Gospel: {
    icon: 'heart',
    desc: 'Good news narrative',
    color: Colors.success,
    gradient: [Colors.success + '20', Colors.success + '08'],
  },
};

const PROMPT_SUGGESTIONS = [
  "God's faithfulness in trials",
  'A meditation on hope',
  'Praise for all creation',
  'Trusting in dark seasons',
  'The power of grace',
  'Walking in righteousness',
];

export default function CreativeScreen() {
  const insets = useSafeAreaInsets();
  const { prompt, setPrompt, style, setStyle, result, loading, generate, clear } = useCreative();

  const currentStyle = STYLE_CONFIG[style];

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + Spacing.xl, paddingBottom: insets.bottom + Spacing.xxl },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
      >
        {/* ─── Header ─── */}
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.glassGold, Colors.glass]}
            style={styles.headerIcon}
          >
            <Feather name="edit-3" size={24} color={Colors.primary} />
          </LinearGradient>
          <Text style={styles.title}>Creative Mode</Text>
          <Text style={styles.subtitle}>
            Generate original biblical-style prose{'\n'}powered by AI language models
          </Text>
          <View style={styles.headerBadge}>
            <MaterialIcons name="auto-awesome" size={12} color={Colors.primary} />
            <Text style={styles.headerBadgeText}>4 literary styles available</Text>
          </View>
        </View>

        {/* ─── Style Grid ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Writing Style</Text>
          <View style={styles.styleGrid}>
            {CREATIVE_STYLES.map((s) => {
              const cfg = STYLE_CONFIG[s];
              const isActive = style === s;
              return (
                <Pressable
                  key={s}
                  style={({ pressed }) => [
                    styles.styleCard,
                    pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
                  ]}
                  onPress={() => setStyle(s)}
                >
                  <LinearGradient
                    colors={isActive ? [cfg.color + '40', cfg.color + '18'] : cfg.gradient as [string,string]}
                    style={styles.styleCardGrad}
                  >
                    <View style={[
                      styles.styleIconWrap,
                      { borderColor: cfg.color + (isActive ? 'AA' : '50') },
                      isActive && { backgroundColor: cfg.color + '25' },
                    ]}>
                      <Feather name={cfg.icon} size={20} color={cfg.color} />
                    </View>
                    <Text style={[styles.styleCardName, { color: isActive ? cfg.color : Colors.textPrimary }]}>
                      {s}
                    </Text>
                    <Text style={styles.styleCardDesc}>{cfg.desc}</Text>
                    {isActive && (
                      <View style={[styles.styleCardCheck, { backgroundColor: cfg.color }]}>
                        <Feather name="check" size={10} color="#FFF" />
                      </View>
                    )}
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ─── Prompt ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Inspiration Topic <Text style={styles.optionalText}>(optional)</Text></Text>
          <TextInput
            style={styles.promptInput}
            value={prompt}
            onChangeText={setPrompt}
            placeholder={`e.g. Write a ${style.toLowerCase()} about God's mercy...`}
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
          <Text style={styles.charCount}>{prompt.length}/200</Text>

          <Text style={styles.chipLabel}>Quick Prompts</Text>
          <View style={styles.promptChips}>
            {PROMPT_SUGGESTIONS.map((s) => (
              <Pressable
                key={s}
                style={({ pressed }) => [styles.promptChip, pressed && { opacity: 0.7 }]}
                onPress={() => setPrompt(s)}
              >
                <Feather name="plus" size={11} color={Colors.textSecondary} />
                <Text style={styles.promptChipText}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ─── Generate Button ─── */}
        <Pressable
          style={({ pressed }) => [
            styles.generateBtn,
            loading && styles.generateBtnLoading,
            pressed && !loading && { opacity: 0.88 },
          ]}
          onPress={generate}
          disabled={loading}
        >
          <LinearGradient
            colors={loading
              ? [Colors.glass, Colors.glass]
              : [currentStyle.color, currentStyle.color + 'CC']}
            style={styles.generateBtnGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {loading ? (
              <>
                <ActivityIndicator color={Colors.primary} size="small" />
                <Text style={[styles.generateBtnText, { color: Colors.textSecondary }]}>
                  Composing your {style}...
                </Text>
              </>
            ) : (
              <>
                <MaterialIcons name="auto-awesome" size={18} color={Colors.background} />
                <Text style={styles.generateBtnText}>Generate {style}</Text>
              </>
            )}
          </LinearGradient>
        </Pressable>

        {/* ─── Result ─── */}
        {result && (
          <View style={styles.resultSection}>
            <View style={styles.resultHeader}>
              <View style={styles.resultTitleRow}>
                <View style={[styles.resultStyleDot, { backgroundColor: currentStyle.color }]} />
                <Text style={styles.resultTitle}>Generated {result.style}</Text>
              </View>
              <Pressable onPress={clear} hitSlop={8} style={styles.dismissBtn}>
                <Feather name="x" size={16} color={Colors.textMuted} />
              </Pressable>
            </View>

            {/* Parchment result card */}
            <LinearGradient
              colors={['#FDF6E3', '#F0E5C5', '#E8D8A8']}
              style={styles.resultParchment}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Top decorative rule */}
              <View style={styles.parchmentRule} />

              {/* Ornamental quote */}
              <Text style={styles.parchmentOpenQuote}>"</Text>

              <Text style={styles.resultText}>{result.text}</Text>

              {/* Bottom rule */}
              <View style={styles.parchmentRule} />
              <Text style={styles.resultAttrib}>— Generated by Bible AI · {result.style} Style</Text>
            </LinearGradient>

            {/* Action row */}
            <View style={styles.resultActions}>
              <Pressable
                style={({ pressed }) => [styles.resultActionBtn, pressed && { opacity: 0.7 }]}
                onPress={generate}
              >
                <Feather name="refresh-cw" size={14} color={Colors.primary} />
                <Text style={styles.resultActionText}>Regenerate</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.resultActionBtn, pressed && { opacity: 0.7 }]}
                onPress={clear}
              >
                <Feather name="trash-2" size={14} color={Colors.textSecondary} />
                <Text style={[styles.resultActionText, { color: Colors.textSecondary }]}>Clear</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.lg, gap: Spacing.xl },

  // Header
  header: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderGold,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.glassGold,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  headerBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },

  // Section
  section: { gap: Spacing.sm },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  optionalText: {
    color: Colors.textMuted,
    fontWeight: FontWeight.regular,
    textTransform: 'none',
    letterSpacing: 0,
  },

  // Style Grid
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  styleCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  styleCardGrad: {
    padding: Spacing.md,
    gap: Spacing.xs,
    alignItems: 'flex-start',
    minHeight: 100,
    position: 'relative',
  },
  styleIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  styleCardName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  styleCardDesc: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  styleCardCheck: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Prompt
  promptInput: {
    backgroundColor: Colors.glassMid,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minHeight: 90,
    textAlignVertical: 'top',
    includeFontPadding: false,
    lineHeight: 24,
  },
  charCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'right',
    marginTop: -Spacing.xs,
  },
  chipLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
    marginTop: Spacing.xs,
  },
  promptChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promptChipText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },

  // Generate Button
  generateBtn: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    ...Shadow.goldGlow,
  },
  generateBtnLoading: {
    shadowOpacity: 0,
    elevation: 0,
  },
  generateBtnGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    minHeight: 56,
    paddingHorizontal: Spacing.xl,
  },
  generateBtnText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.background,
    letterSpacing: 0.3,
  },

  // Result
  resultSection: { gap: Spacing.md },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  resultStyleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  dismissBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultParchment: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    gap: Spacing.sm,
    ...Shadow.gold,
    borderWidth: 1,
    borderColor: '#D4B89660',
  },
  parchmentRule: {
    height: 1,
    backgroundColor: '#A07830',
    opacity: 0.25,
    borderRadius: 1,
  },
  parchmentOpenQuote: {
    fontSize: 48,
    color: Colors.primaryDark,
    opacity: 0.2,
    fontWeight: FontWeight.extrabold,
    lineHeight: 40,
  },
  resultText: {
    fontSize: FontSize.md,
    color: Colors.textDark,
    lineHeight: 30,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  resultAttrib: {
    fontSize: FontSize.xs,
    color: Colors.primaryDark,
    fontWeight: FontWeight.semibold,
    textAlign: 'right',
    opacity: 0.7,
  },
  resultActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  resultActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    minHeight: 42,
  },
  resultActionText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
});
