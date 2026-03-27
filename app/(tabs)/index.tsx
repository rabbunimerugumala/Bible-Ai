// Powered by OnSpace.AI — Glassmorphism Explore Screen with SQLite
import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants/theme';
import { VerseCard } from '@/components/ui/VerseCard';
import { Verse, Book } from '@/constants/bibleData';
import {
  getAllBooks,
  getChaptersByBook, getVersesByBookAndChapter,
} from '@/services/bibleService';

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
  History:  { icon: 'map',        color: '#E0C07B' },
  Acts:     { icon: 'move',       color: '#7BE0D0' },
  Other:    { icon: 'book-open',  color: Colors.primary },
};


export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  // Removed themes mode, defaulting to books
  
  // ── Books state (3-level: book → chapter → verses) ──
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [chapters, setChapters] = useState<number[]>([]);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  // Load all books on mount
  useEffect(() => {
    (async () => {
      try {
        const books = await getAllBooks();
        setAllBooks(books);
      } catch (e) {
        console.error('Error loading books:', e);
      } finally {
        setLoadingBooks(false);
      }
    })();
  }, []);

  // Load chapters when a book is selected
  useEffect(() => {
    if (!selectedBook) { setChapters([]); setSelectedChapter(null); setChapterVerses([]); return; }
    setSelectedChapter(null);
    setChapterVerses([]);
    setLoadingChapters(true);
    (async () => {
      try {
        setChapters(await getChaptersByBook(selectedBook));
      } catch (e) {
        console.error('Error loading chapters:', e);
      } finally {
        setLoadingChapters(false);
      }
    })();
  }, [selectedBook]);

  // Load verses when a chapter is selected
  useEffect(() => {
    if (!selectedBook || selectedChapter === null) { setChapterVerses([]); return; }
    setLoadingVerses(true);
    (async () => {
      try {
        setChapterVerses(await getVersesByBookAndChapter(selectedBook, selectedChapter));
      } catch (e) {
        console.error('Error loading chapter verses:', e);
      } finally {
        setLoadingVerses(false);
      }
    })();
  }, [selectedBook, selectedChapter]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.backgroundDeep, Colors.background]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Bible Library</Text>
            <Text style={styles.subtitle}>Search and read the 66 books of the Bible</Text>
          </View>
        </View>

        {/* Book Search Bar - Always visible when browsing books */}
        {!selectedBook && (
          <View style={styles.searchContainer}>
            <View style={styles.searchInner}>
              <Feather name="search" size={16} color={Colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search books (e.g. Genesis, మత్తయి)..."
                placeholderTextColor={Colors.textMuted}
                value={bookSearchQuery}
                onChangeText={setBookSearchQuery}
                autoCorrect={false}
              />
              {bookSearchQuery.length > 0 && (
                <Pressable onPress={() => setBookSearchQuery('')}>
                  <Feather name="x" size={16} color={Colors.textMuted} />
                </Pressable>
              )}
            </View>
          </View>
        )}
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme section commented out per user request */}
        {/* mode === 'themes' logic removed */}

        {/* ── Book List ── */}
        {loadingBooks ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading books from Bible...</Text>
          </View>
        ) : (
          (['Old', 'New'] as const).map((testament) => {
            const books = allBooks
              .filter((b) => b.testament === testament)
              .filter((b) => {
                if (!bookSearchQuery) return true;
                const query = bookSearchQuery.toLowerCase();
                return (
                  b.name.toLowerCase().includes(query) ||
                  b.category.toLowerCase().includes(query)
                );
              });

            if (books.length === 0) return null;
            return (
              <View key={testament} style={styles.section}>
                {/* Testament divider */}
                <View style={styles.testamentHeader}>
                  <View style={[styles.testamentDivider, { backgroundColor: Colors.primary + '30' }]} />
                  <Text style={styles.sectionLabel}>{testament} Testament</Text>
                  <View style={[styles.testamentDivider, { backgroundColor: Colors.primary + '30' }]} />
                </View>

                    <View style={styles.booksList}>
                      {books.map((book) => {
                        const isSelected = selectedBook === book.name;
                        const cfg = CATEGORY_CONFIG[book.category] ?? CATEGORY_CONFIG['Other'];
                        return (
                          <View key={book.name}>
                            {/* ── Book Row ── */}
                            <Pressable
                              style={({ pressed }) => [
                                styles.bookCard,
                                isSelected && styles.bookCardActive,
                                pressed && !isSelected && { opacity: 0.85 },
                              ]}
                              onPress={() => {
                                setSelectedBook(isSelected ? null : book.name);
                              }}
                            >
                              <View style={[
                                styles.bookIcon,
                                { borderColor: cfg.color + '50', backgroundColor: cfg.color + '15' },
                                isSelected && { backgroundColor: Colors.primary, borderColor: Colors.primary }
                              ]}>
                                <Feather name={cfg.icon} size={16} color={isSelected ? '#000' : cfg.color} />
                              </View>
                              <View style={styles.bookInfo}>
                                <Text style={[styles.bookName, isSelected && styles.bookNameActive]}>
                                  {book.name}
                                </Text>
                                <Text style={[styles.bookMeta, isSelected && styles.bookMetaActive]}>
                                  {book.category}
                                </Text>
                              </View>
                              <Feather
                                name={isSelected ? 'chevron-up' : 'chevron-right'}
                                size={16}
                                color={isSelected ? Colors.primary : Colors.textMuted}
                              />
                            </Pressable>

                            {/* ── Chapter Grid (shown when book selected) ── */}
                            {isSelected && (
                              <View style={styles.bookDetails}>
                                {loadingChapters ? (
                                  <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="small" color={Colors.primary} />
                                    <Text style={styles.loadingText}>Loading chapters...</Text>
                                  </View>
                                ) : chapters.length > 0 ? (
                                  <>
                                    <Text style={styles.chapterLabel}>Select a Chapter</Text>
                                    <View style={styles.chapterGrid}>
                                      {chapters.map((ch) => {
                                        const isChSel = selectedChapter === ch;
                                        return (
                                          <Pressable
                                            key={ch}
                                            style={[styles.chapterBtn, isChSel && styles.chapterBtnActive]}
                                            onPress={() => setSelectedChapter(isChSel ? null : ch)}
                                          >
                                            <Text style={[styles.chapterBtnText, isChSel && styles.chapterBtnTextActive]}>
                                              {ch}
                                            </Text>
                                          </Pressable>
                                        );
                                      })}
                                    </View>

                                    {/* ── Verses for selected chapter ── */}
                                    {selectedChapter !== null && (
                                      <View style={styles.versesSection}>
                                        {loadingVerses ? (
                                          <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="small" color={Colors.primary} />
                                            <Text style={styles.loadingText}>Loading verses...</Text>
                                          </View>
                                        ) : chapterVerses.length > 0 ? (
                                          <>
                                            <View style={styles.versesHeader}>
                                              <Text style={styles.versesHeaderText}>
                                                Chapter {selectedChapter} · {chapterVerses.length} verses
                                              </Text>
                                            </View>
                                            {chapterVerses.map((v) => (
                                              <VerseCard key={v.id} verse={v} variant="compact" />
                                            ))}
                                          </>
                                        ) : (
                                          <Text style={styles.emptyText}>No verses found</Text>
                                        )}
                                      </View>
                                    )}
                                  </>
                                ) : (
                                  <Text style={styles.emptyText}>No chapters found for {book.name}</Text>
                                )}
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })
            )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingVertical: 0 },

  // ── Header ──
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  headerTop: {
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textWhite,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  // ── Mode Toggle ──
  modeToggle: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  modeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  modeBtnActive: {
    borderColor: Colors.primary,
  },
  modeBtnText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.semibold,
  },
  modeBtnTextActive: {
    color: Colors.textWhite,
  },

  // ── Section ──
  section: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textWhite,
  },

  // ── Theme Grid ──
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  themeColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // ── Collections Grid ──
  collectionsGrid: {
    gap: Spacing.md,
  },
  collectionCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  collectionGrad: {
    padding: Spacing.lg,
    gap: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff05',
  },
  collectionDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  collectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    flex: 1,
  },
  collectionCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  collectionArrow: {
    marginLeft: Spacing.sm,
  },

  // ── Testament Header ──
  testamentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.md,
  },
  testamentDivider: {
    flex: 1,
    height: 1,
  },

  // ── Books ──
  bookCategory: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.semibold,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  booksList: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.glass + '10',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bookCardActive: {
    backgroundColor: Colors.primary + '20',
    borderColor: Colors.primary + '30',
  },
  bookCardActiveBlue: {
    backgroundColor: Colors.info + '20',
    borderColor: Colors.info + '50',
  },
  bookIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  bookName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textWhite,
  },
  bookNameActive: {
    color: Colors.primary,
  },
  bookMeta: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  bookMetaActive: {
    color: Colors.textSecondary,
  },
  bookDetails: {
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  bookStats: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary + '15',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  bookStatsText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
  moreVersesText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
  },

  // ── Badges & Status ──
  countBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primary + '20',
  },
  countBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },

  // ── Loading & Empty ──
  loadingContainer: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  loadingText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    paddingVertical: Spacing.lg,
  },
  infoText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    paddingVertical: Spacing.md,
  },

  // ── Chapter navigation ──
  chapterLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  chapterBtn: {
    minWidth: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  chapterBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chapterBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  chapterBtnTextActive: {
    color: Colors.backgroundDeep,
    fontWeight: FontWeight.bold,
  },

  // ── Verses panel ──
  versesSection: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  versesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary + '15',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  versesHeaderText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },

  // ── Search UI ──
  searchContainer: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
    marginTop: -8,
  },
  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glassMid,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: Colors.textWhite,
    fontSize: FontSize.sm,
    height: '100%',
  },
});
