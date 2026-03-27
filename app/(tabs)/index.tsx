// Powered by OnSpace.AI — Glassmorphism Home Screen
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow, GlassStyle } from '@/constants/theme';
import { VerseCard } from '@/components/ui/VerseCard';
import { getDailyVerse, getFeaturedVerses } from '@/services/bibleService';
import { FEATURED_THEMES, BOOKS } from '@/constants/bibleData';

const { width: SW } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { label: 'Ask AI',    icon: 'auto-awesome' as const, lib: 'material', route: '/(tabs)/chat',     color: Colors.primary },
  { label: 'Search',   icon: 'search'        as const, lib: 'feather',  route: '/(tabs)/search',   color: Colors.info },
  { label: 'Create',   icon: 'edit-3'        as const, lib: 'feather',  route: '/(tabs)/creative', color: Colors.success },
  { label: 'Explore',  icon: 'compass'       as const, lib: 'feather',  route: '/(tabs)/explore',  color: Colors.warning },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dailyVerse = useMemo(() => getDailyVerse(), []);
  const featured = useMemo(() => getFeaturedVerses(3), []);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: Spacing.xxl + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      {/* ═══ HERO SECTION ═══ */}
      <View style={styles.hero}>
        <Image
          source={require('@/assets/images/hero-bible.png')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={400}
        />
        {/* Deep gradient overlay */}
        <LinearGradient
          colors={['#050D1A00', '#050D1AB0', '#050D1AFF']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Side vignette */}
        <LinearGradient
          colors={['#050D1A80', '#050D1A00', '#050D1A80']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />

        <View style={[styles.heroContent, { paddingTop: insets.top + Spacing.xl }]}>
          {/* App badge */}
          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />
            <Text style={styles.heroBadgeText}>AI-POWERED SCRIPTURE</Text>
          </View>

          {/* Title */}
          <Text style={styles.heroTitle}>Bible AI</Text>
          <Text style={styles.heroSub}>
            Explore the Word with intelligent search,{'\n'}conversational Q&A, and inspired generation
          </Text>

          {/* Quick Actions Grid */}
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((a) => (
              <Pressable
                key={a.label}
                style={({ pressed }) => [styles.actionCard, pressed && styles.actionCardPressed]}
                onPress={() => router.push(a.route as any)}
              >
                <LinearGradient
                  colors={[a.color + '28', a.color + '10']}
                  style={styles.actionCardGrad}
                >
                  <View style={[styles.actionIconWrap, { borderColor: a.color + '50' }]}>
                    {a.lib === 'material'
                      ? <MaterialIcons name={a.icon as any} size={20} color={a.color} />
                      : <Feather name={a.icon as any} size={18} color={a.color} />
                    }
                  </View>
                  <Text style={[styles.actionLabel, { color: a.color }]}>{a.label}</Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* ═══ VERSE OF THE DAY ═══ */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconWrap}>
              <Feather name="sun" size={14} color={Colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Verse of the Day</Text>
          </View>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>KJV</Text>
          </View>
        </View>
        <VerseCard verse={dailyVerse} variant="parchment" />
      </View>

      {/* ═══ BROWSE BY THEME ═══ */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by Theme</Text>
          <Pressable
            onPress={() => router.push('/(tabs)/explore')}
            style={({ pressed }) => [styles.seeAllBtn, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.seeAll}>See all</Text>
            <Feather name="chevron-right" size={14} color={Colors.primary} />
          </Pressable>
        </View>
        <View style={styles.themeScrollOuter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.themeRow}
          >
            {FEATURED_THEMES.map((theme) => (
              <Pressable
                key={theme}
                style={({ pressed }) => [styles.themeChip, pressed && { opacity: 0.75 }]}
                onPress={() => router.push('/(tabs)/explore')}
              >
                <Text style={styles.themeChipText}>{theme}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* ═══ FEATURED VERSES ═══ */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconWrap}>
              <Feather name="bookmark" size={14} color={Colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Beloved Verses</Text>
          </View>
        </View>
        {featured.map((verse) => (
          <VerseCard key={verse.id} verse={verse} variant="compact" />
        ))}
      </View>

      {/* ═══ CREATIVE MODE BANNER ═══ */}
      <Pressable
        style={({ pressed }) => [styles.creativeBanner, pressed && { opacity: 0.88 }]}
        onPress={() => router.push('/(tabs)/creative')}
      >
        <LinearGradient
          colors={['#1A3A1A', '#0D2A0D', '#050D1A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.creativeBannerGrad}
        >
          {/* Decorative glow */}
          <View style={styles.creativeGlow} />

          <View style={styles.creativeBannerLeft}>
            <View style={styles.creativeIconWrap}>
              <Feather name="edit-3" size={22} color={Colors.success} />
            </View>
            <View>
              <Text style={styles.creativeBannerTitle}>Creative Mode</Text>
              <Text style={styles.creativeBannerSub}>Generate scripture-inspired prose with AI</Text>
            </View>
          </View>
          <View style={styles.creativeArrow}>
            <Feather name="arrow-right" size={18} color={Colors.success} />
          </View>
        </LinearGradient>
      </Pressable>

      {/* ═══ BOOKS QUICK VIEW ═══ */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconWrap}>
              <FontAwesome5 name="bible" size={13} color={Colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Books of the Bible</Text>
          </View>
          <Pressable
            onPress={() => router.push('/(tabs)/explore')}
            style={({ pressed }) => [styles.seeAllBtn, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.seeAll}>All books</Text>
            <Feather name="chevron-right" size={14} color={Colors.primary} />
          </Pressable>
        </View>
        <View style={styles.booksGrid}>
          {BOOKS.slice(0, 8).map((book) => (
            <Pressable
              key={book.name}
              style={({ pressed }) => [styles.bookChip, pressed && styles.bookChipPressed]}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Text style={styles.bookChipName}>{book.name}</Text>
              <Text style={styles.bookChipMeta}>{book.testament}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* ═══ STATS BAR ═══ */}
      <View style={styles.statsBar}>
        {[
          { label: 'Verses', value: '31,102', icon: 'book-open' as const },
          { label: 'Books', value: '66', icon: 'layers' as const },
          { label: 'Themes', value: '15', icon: 'tag' as const },
          { label: 'AI Models', value: '4', icon: 'cpu' as const },
        ].map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Feather name={stat.icon} size={14} color={Colors.primary} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const CHIP_W = (SW - Spacing.lg * 2 - Spacing.sm * 3) / 4;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: { gap: 0 },

  // ── Hero ──
  hero: {
    height: 420,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    justifyContent: 'flex-end',
    gap: Spacing.md,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  heroBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: FontWeight.extrabold,
    color: Colors.textWhite,
    letterSpacing: -1,
    lineHeight: 54,
  },
  heroSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  // Actions grid
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  actionCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionCardGrad: {
    padding: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.xs,
    minHeight: 72,
    justifyContent: 'center',
  },
  actionCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  actionIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.3,
  },

  // ── Sections ──
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.glassGold,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  sectionBadge: {
    backgroundColor: Colors.glassGold,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  sectionBadgeText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },

  // Themes
  themeScrollOuter: {
    minHeight: 44,
  },
  themeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  themeChip: {
    backgroundColor: Colors.glassMid,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    minHeight: 36,
    justifyContent: 'center',
  },
  themeChipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textGold,
  },

  // Creative Banner
  creativeBanner: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.success + '30',
    ...Shadow.md,
  },
  creativeBannerGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  creativeGlow: {
    position: 'absolute',
    left: -30,
    top: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.success + '15',
  },
  creativeBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  creativeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.success + '18',
    borderWidth: 1,
    borderColor: Colors.success + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creativeBannerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  creativeBannerSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    maxWidth: 180,
  },
  creativeArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.success + '18',
    borderWidth: 1,
    borderColor: Colors.success + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Books grid
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  bookChip: {
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    width: CHIP_W,
    minHeight: 52,
    justifyContent: 'center',
  },
  bookChipPressed: {
    backgroundColor: Colors.glassGold,
    borderColor: Colors.borderGold,
  },
  bookChipName: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  bookChipMeta: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },

  // Stats bar
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: 4,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  statValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
