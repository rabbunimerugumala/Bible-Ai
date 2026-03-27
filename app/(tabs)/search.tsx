// Powered by OnSpace.AI — Glassmorphism Search Screen
import React from 'react';
import {
  View, Text, ScrollView, Pressable, ActivityIndicator, StyleSheet, FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '@/constants/theme';
import { SearchBar } from '@/components/ui/SearchBar';
import { VerseCard } from '@/components/ui/VerseCard';
import { useSearch } from '@/hooks/useSearch';

const SUGGESTED = [
  'peace in troubled times',
  'strength and courage',
  'God is love',
  'faith without works',
  'the good shepherd',
  'light in darkness',
  'wisdom from above',
  'hope and future',
];

const SUGGESTION_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  'peace in troubled times': 'wind',
  'strength and courage': 'shield',
  'God is love': 'heart',
  'faith without works': 'anchor',
  'the good shepherd': 'compass',
  'light in darkness': 'sun',
  'wisdom from above': 'award',
  'hope and future': 'star',
};

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { query, setQuery, results, mode, setMode, loading, hasSearched, search, clear } = useSearch();

  const handleSearch = () => search(query);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.backgroundDeep, Colors.background]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Search Scripture</Text>
            <Text style={styles.subtitle}>Keyword and semantic AI search</Text>
          </View>
          <View style={styles.aiPill}>
            <Feather name="cpu" size={12} color={Colors.primary} />
            <Text style={styles.aiPillText}>AI</Text>
          </View>
        </View>

        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmit={handleSearch}
          onClear={clear}
          placeholder="Search by word, topic, or phrase..."
          autoFocus={false}
        />

        {/* Mode + Search row */}
        <View style={styles.modeRow}>
          <View style={styles.modePills}>
            {(['keyword', 'semantic'] as const).map((m) => (
              <Pressable
                key={m}
                style={[styles.modePill, mode === m && styles.modePillActive]}
                onPress={() => setMode(m)}
              >
                <Feather
                  name={m === 'keyword' ? 'type' : 'cpu'}
                  size={12}
                  color={mode === m ? Colors.background : Colors.textSecondary}
                />
                <Text style={[styles.modePillText, mode === m && styles.modePillTextActive]}>
                  {m === 'keyword' ? 'Keyword' : 'Semantic AI'}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            style={[styles.searchBtn, !!query.trim() && styles.searchBtnActive]}
            onPress={handleSearch}
            disabled={!query.trim()}
          >
            <Feather name="search" size={15} color={!!query.trim() ? Colors.background : Colors.textMuted} />
            <Text style={[styles.searchBtnText, !!query.trim() && styles.searchBtnTextActive]}>
              Search
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* Body */}
      {loading ? (
        <View style={styles.center}>
          <View style={styles.loadingCard}>
            <ActivityIndicator color={Colors.primary} size="large" />
            <Text style={styles.loadingTitle}>
              {mode === 'semantic' ? 'AI Semantic Search' : 'Searching...'}
            </Text>
            <Text style={styles.loadingText}>
              {mode === 'semantic'
                ? 'Finding verses by meaning and concept...'
                : 'Matching keywords in scripture...'}
            </Text>
          </View>
        </View>
      ) : !hasSearched ? (
        <ScrollView
          contentContainerStyle={styles.suggestions}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.suggestLabel}>Suggested Searches</Text>
          <View style={styles.suggestionGrid}>
            {SUGGESTED.map((s) => (
              <Pressable
                key={s}
                style={({ pressed }) => [styles.suggestionCard, pressed && { opacity: 0.75 }]}
                onPress={() => { setQuery(s); search(s); }}
              >
                <View style={styles.suggestionIconWrap}>
                  <Feather name={SUGGESTION_ICONS[s] || 'search'} size={16} color={Colors.primary} />
                </View>
                <Text style={styles.suggestionText}>{s}</Text>
                <Feather name="arrow-right" size={13} color={Colors.textMuted} />
              </Pressable>
            ))}
          </View>

          {/* Semantic tip */}
          <View style={styles.tipCard}>
            <Feather name="cpu" size={16} color={Colors.info} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Try Semantic AI Mode</Text>
              <Text style={styles.tipText}>
                Finds verses by meaning — not just exact words. Ask in natural language.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : results.length === 0 ? (
        <View style={styles.center}>
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Feather name="book-open" size={32} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No verses found</Text>
            <Text style={styles.emptyText}>
              Try different keywords or switch to Semantic AI mode for meaning-based results
            </Text>
            <Pressable
              style={styles.emptyAction}
              onPress={() => setMode(mode === 'keyword' ? 'semantic' : 'keyword')}
            >
              <Feather name="refresh-cw" size={14} color={Colors.primary} />
              <Text style={styles.emptyActionText}>
                Switch to {mode === 'keyword' ? 'Semantic AI' : 'Keyword'} mode
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(v) => v.id}
          renderItem={({ item }) => <VerseCard verse={item} />}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.resultsHeader}>
              <View style={styles.resultsLeft}>
                <Text style={styles.resultsCount}>{results.length}</Text>
                <Text style={styles.resultsLabel}>
                  {results.length === 1 ? 'verse' : 'verses'} found
                </Text>
              </View>
              <View style={styles.resultsBadge}>
                <Feather name={mode === 'semantic' ? 'cpu' : 'type'} size={12} color={Colors.primary} />
                <Text style={styles.resultsBadgeText}>
                  {mode === 'semantic' ? 'Semantic AI' : 'Keyword'}
                </Text>
              </View>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

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
  aiPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.glassGold,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    marginTop: 4,
  },
  aiPillText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },

  // Mode row
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  modePills: {
    flexDirection: 'row',
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.full,
    padding: 3,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 2,
  },
  modePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 1,
    borderRadius: BorderRadius.full,
    minHeight: 34,
  },
  modePillActive: {
    backgroundColor: Colors.primary,
  },
  modePillText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  modePillTextActive: {
    color: Colors.background,
    fontWeight: FontWeight.semibold,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 1,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 38,
  },
  searchBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  searchBtnText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  searchBtnTextActive: {
    color: Colors.background,
    fontWeight: FontWeight.semibold,
  },

  // Center states
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  loadingCard: {
    backgroundColor: Colors.glassMid,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    width: '100%',
  },
  loadingTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  loadingText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  emptyCard: {
    backgroundColor: Colors.glassMid,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    width: '100%',
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.glassGold,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    marginTop: Spacing.xs,
  },
  emptyActionText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },

  // Suggestions
  suggestions: {
    padding: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  suggestLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: Spacing.xs,
  },
  suggestionGrid: {
    gap: Spacing.sm,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 52,
  },
  suggestionIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.glassGold,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  suggestionText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
    textTransform: 'capitalize',
  },

  // Tip
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.infoGlow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.info + '30',
    marginTop: Spacing.md,
  },
  tipContent: { flex: 1, gap: 4 },
  tipTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.info,
  },
  tipText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  // Results
  resultsList: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultsLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  resultsCount: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  resultsLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  resultsBadge: {
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
  resultsBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
});
