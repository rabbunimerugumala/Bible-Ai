// Powered by OnSpace.AI — Glassmorphism Explore Screen
import React, { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '@/constants/theme';
import { ThemeTag } from '@/components/ui/ThemeTag';
import { VerseCard } from '@/components/ui/VerseCard';
import { THEMES, BOOKS, FEATURED_THEMES } from '@/constants/bibleData';
import { getVersesByTheme, getVersesByBook } from '@/services/bibleService';

type ExploreMode = 'themes' | 'books';

const CATEGORY_CONFIG: Record<string, {
  icon: keyof typeof Feather.glyphMap;
  color: string;
}> = {
  Law:      { icon: 'book',       color: '#D4AF5A' },
  Poetry:   { icon: 'music',      color: '#7B8CE0' },
  Wisdom:   { icon: 'award',      color: '#E0C07B' },
  Prophecy: { icon: 'eye',        color: '#E07B7B' },
  Gospel:   { icon: 'heart',      color: '#E07BA8' },
  Epistle:  { icon: 'mail',       color: '#7BE0C0' },
};

const THEME_COLORS: Record<string, string> = {
  Love:       '#E07BA8',
  Faith:      '#7B8CE0',
  Hope:       '#7BE0C0',
  Peace:      '#7BB8E0',
  Wisdom:     Colors.primary,
  Salvation:  '#E07B7B',
  Prayer:     '#A87BE0',
  Strength:   '#E0A07B',
  Grace:      '#7BE0A8',
  Forgiveness:'#E0D07B',
  Prophecy:   '#E08C7B',
  Creation:   '#7BC8E0',
  Justice:    '#C07BE0',
  Praise:     '#E0C07B',
  Healing:    '#7BE0B8',
};

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<ExploreMode>('themes');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const themeVerses = selectedTheme ? getVersesByTheme(selectedTheme) : [];
  const bookVerses = selectedBook ? getVersesByBook(selectedBook) : [];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.backgroundDeep, Colors.background]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>Browse themes and books of the Bible</Text>
          </View>
          <View style={styles.statsPill}>
            <Text style={styles.statsPillText}>30 verses</Text>
          </View>
        </View>

        {/* Mode Toggle */}
        <View style={styles.modeToggle}>
          {(['themes', 'books'] as ExploreMode[]).map((m) => (
            <Pressable
              key={m}
              style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
              onPress={() => {
                setMode(m);
                setSelectedTheme(null);
                setSelectedBook(null);
              }}
            >
              {mode === m && (
                <LinearGradient
                  colors={[Colors.glassGold, Colors.primaryGlow]}
                  style={StyleSheet.absoluteFill}
                />
              )}
              <Feather
                name={m === 'themes' ? 'tag' : 'book-open'}
                size={14}
                color={mode === m ? Colors.primary : Colors.textSecondary}
              />
              <Text style={[styles.modeBtnText, mode === m && styles.modeBtnTextActive]}>
                {m === 'themes' ? 'Themes' : 'Books'}
              </Text>
            </Pressable>
          ))}
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {mode === 'themes' ? (
          <>
            {/* All Themes */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>All Themes</Text>
              <View style={styles.themeGrid}>
                {THEMES.map((theme) => (
                  <ThemeTag
                    key={theme}
                    label={theme}
                    selected={selectedTheme === theme}
                    onPress={() => setSelectedTheme(selectedTheme === theme ? null : theme)}
                  />
                ))}
              </View>
            </View>

            {/* Selected theme verses */}
            {selectedTheme ? (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <View style={[styles.themeColorDot, { backgroundColor: THEME_COLORS[selectedTheme] || Colors.primary }]} />
                    <Text style={styles.sectionTitle}>{selectedTheme}</Text>
                  </View>
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>
                      {themeVerses.length} {themeVerses.length === 1 ? 'verse' : 'verses'}
                    </Text>
                  </View>
                </View>
                {themeVerses.length > 0
                  ? themeVerses.map((v) => <VerseCard key={v.id} verse={v} />)
                  : <Text style={styles.emptyText}>No curated verses for this theme yet</Text>
                }
              </View>
            ) : (
              /* Featured Collections */
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Featured Collections</Text>
                <View style={styles.collectionsGrid}>
                  {FEATURED_THEMES.map((theme) => {
                    const count = getVersesByTheme(theme).length;
                    const color = THEME_COLORS[theme] || Colors.primary;
                    return (
                      <Pressable
                        key={theme}
                        style={({ pressed }) => [
                          styles.collectionCard,
                          pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
                        ]}
                        onPress={() => setSelectedTheme(theme)}
                      >
                        <LinearGradient
                          colors={[color + '20', color + '08']}
                          style={styles.collectionGrad}
                        >
                          <View style={[styles.collectionDot, { backgroundColor: color }]} />
                          <Text style={[styles.collectionTitle, { color }]}>{theme}</Text>
                          <Text style={styles.collectionCount}>{count} verses</Text>
                          <Feather name="chevron-right" size={14} color={color} style={styles.collectionArrow} />
                        </LinearGradient>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}
          </>
        ) : (
          <>
            {/* Old Testament */}
            <View style={styles.section}>
              <View style={styles.testamentHeader}>
                <View style={[styles.testamentDivider, { backgroundColor: Colors.primary }]} />
                <Text style={styles.sectionLabel}>Old Testament</Text>
                <View style={[styles.testamentDivider, { backgroundColor: Colors.primary }]} />
              </View>
              {BOOKS.filter((b) => b.testament === 'Old').map((book) => {
                const cfg = CATEGORY_CONFIG[book.category] || { icon: 'book' as const, color: Colors.primary };
                const isSelected = selectedBook === book.name;
                const verses = isSelected ? getVersesByBook(book.name) : [];
                return (
                  <View key={book.name}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.bookCard,
                        isSelected && styles.bookCardActive,
                        pressed && !isSelected && { opacity: 0.85 },
                      ]}
                      onPress={() => setSelectedBook(isSelected ? null : book.name)}
                    >
                      <View style={[
                        styles.bookIcon,
                        { borderColor: cfg.color + '50', backgroundColor: cfg.color + '15' },
                      ]}>
                        <Feather name={cfg.icon} size={16} color={isSelected ? '#FFF' : cfg.color} />
                      </View>
                      <View style={styles.bookInfo}>
                        <Text style={[styles.bookName, isSelected && styles.bookNameActive]}>
                          {book.name}
                        </Text>
                        <Text style={[styles.bookMeta, isSelected && styles.bookMetaActive]}>
                          {book.category} · {book.chapters} ch.
                        </Text>
                      </View>
                      <Feather
                        name={isSelected ? 'chevron-up' : 'chevron-right'}
                        size={16}
                        color={isSelected ? Colors.primary : Colors.textMuted}
                      />
                    </Pressable>
                    {isSelected && verses.length > 0 && (
                      <View style={styles.bookVerses}>
                        {verses.map((v) => <VerseCard key={v.id} verse={v} variant="compact" />)}
                      </View>
                    )}
                    {isSelected && verses.length === 0 && (
                      <View style={styles.noVersesCard}>
                        <Feather name="book-open" size={20} color={Colors.textMuted} />
                        <Text style={styles.emptyText}>No curated verses for {book.name} yet</Text>
                      </View>
                    )}
                  </View>
                );
              })}

              {/* New Testament */}
              <View style={[styles.testamentHeader, { marginTop: Spacing.lg }]}>
                <View style={[styles.testamentDivider, { backgroundColor: Colors.info }]} />
                <Text style={[styles.sectionLabel, { color: Colors.info }]}>New Testament</Text>
                <View style={[styles.testamentDivider, { backgroundColor: Colors.info }]} />
              </View>
              {BOOKS.filter((b) => b.testament === 'New').map((book) => {
                const cfg = CATEGORY_CONFIG[book.category] || { icon: 'book' as const, color: Colors.info };
                const isSelected = selectedBook === book.name;
                const verses = isSelected ? getVersesByBook(book.name) : [];
                return (
                  <View key={book.name}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.bookCard,
                        isSelected && styles.bookCardActiveBlue,
                        pressed && !isSelected && { opacity: 0.85 },
                      ]}
                      onPress={() => setSelectedBook(isSelected ? null : book.name)}
                    >
                      <View style={[
                        styles.bookIcon,
                        { borderColor: cfg.color + '50', backgroundColor: cfg.color + '15' },
                      ]}>
                        <Feather name={cfg.icon} size={16} color={isSelected ? '#FFF' : cfg.color} />
                      </View>
                      <View style={styles.bookInfo}>
                        <Text style={[styles.bookName, isSelected && styles.bookNameActive]}>
                          {book.name}
                        </Text>
                        <Text style={[styles.bookMeta, isSelected && styles.bookMetaActive]}>
                          {book.category} · {book.chapters} ch.
                        </Text>
                      </View>
                      <Feather
                        name={isSelected ? 'chevron-up' : 'chevron-right'}
                        size={16}
                        color={isSelected ? Colors.info : Colors.textMuted}
                      />
                    </Pressable>
                    {isSelected && verses.length > 0 && (
                      <View style={styles.bookVerses}>
                        {verses.map((v) => <VerseCard key={v.id} verse={v} variant="compact" />)}
                      </View>
                    )}
                    {isSelected && verses.length === 0 && (
                      <View style={styles.noVersesCard}>
                        <Feather name="book-open" size={20} color={Colors.textMuted} />
                        <Text style={styles.emptyText}>No curated verses for {book.name} yet</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsPill: {
    backgroundColor: Colors.glassGold,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    marginTop: 4,
  },
  statsPillText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },

  // Mode toggle
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.full,
    padding: 3,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: 'flex-start',
    gap: 2,
  },
  modeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    minHeight: 36,
    overflow: 'hidden',
    position: 'relative',
  },
  modeBtnActive: {
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  modeBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  modeBtnTextActive: {
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },

  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.lg },

  // Sections
  section: { paddingTop: Spacing.xl, gap: Spacing.sm },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: Spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  themeColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  countBadge: {
    backgroundColor: Colors.glassGold,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  countBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },

  // Theme grid
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  // Collections grid
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  collectionCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  collectionGrad: {
    padding: Spacing.md,
    minHeight: 80,
    gap: 4,
    position: 'relative',
  },
  collectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  collectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  collectionCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  collectionArrow: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
  },

  // Book cards
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
    minHeight: 60,
    marginBottom: Spacing.xs,
  },
  bookCardActive: {
    borderColor: Colors.borderGold,
    backgroundColor: Colors.glassGold,
  },
  bookCardActiveBlue: {
    borderColor: Colors.info + '50',
    backgroundColor: Colors.info + '10',
  },
  bookIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bookInfo: { flex: 1 },
  bookName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  bookNameActive: { color: Colors.primary },
  bookMeta: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bookMetaActive: { color: Colors.textGold + '80' },
  bookVerses: {
    marginLeft: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: Colors.borderGold,
    paddingLeft: Spacing.md,
  },

  // Testament header
  testamentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  testamentDivider: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },

  noVersesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    marginLeft: Spacing.md,
    marginRight: 0,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    flex: 1,
  },
});
