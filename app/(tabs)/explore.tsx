// Powered by OnSpace.AI – Glassmorphism Home Screen with SQLite
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  Colors,
  Spacing,
  FontSize,
  FontWeight,
  BorderRadius,
  Shadow,
  GlassStyle,
} from "@/constants/theme";
import { VerseCard } from "@/components/ui/VerseCard";
import { getDailyVerse, getFeaturedVerses } from "@/services/bibleService";
import { Verse, FEATURED_THEMES } from "@/constants/bibleData";

const { width: SW } = Dimensions.get("window");

const QUICK_ACTIONS = [
  {
    label: "Ask AI",
    icon: "auto-awesome" as const,
    lib: "material",
    route: "/(tabs)/chat",
    color: Colors.primary,
  },
  {
    label: "Search",
    icon: "search" as const,
    lib: "feather",
    route: "/(tabs)/search",
    color: Colors.info,
  },
  {
    label: "Create",
    icon: "edit-3" as const,
    lib: "feather",
    route: "/(tabs)/creative",
    color: Colors.success,
  },
  {
    label: "Bible",
    icon: "bible" as const,
    lib: "fontAwesome5",
    route: "/",
    color: Colors.warning,
  },
];

// Default verse for initial load
const DEFAULT_VERSE: Verse = {
  id: "loading",
  book: "Loading...",
  chapter: 0,
  verse: 0,
  text: "Loading scripture from database...",
  themes: [],
  testament: "Old",
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [dailyVerse, setDailyVerse] = useState<Verse>(DEFAULT_VERSE);
  const [featured, setFeatured] = useState<Verse[]>([]);
  const [loadingDaily, setLoadingDaily] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  // Load daily verse
  useEffect(() => {
    (async () => {
      try {
        const verse = await getDailyVerse();
        setDailyVerse(verse);
      } catch (error) {
        console.error("Error loading daily verse:", error);
      } finally {
        setLoadingDaily(false);
      }
    })();
  }, []);

  // Load featured verses
  useEffect(() => {
    (async () => {
      try {
        const verses = await getFeaturedVerses(3);
        setFeatured(verses);
      } catch (error) {
        console.error("Error loading featured verses:", error);
      } finally {
        setLoadingFeatured(false);
      }
    })();
  }, []);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.xxl + insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ═══ HERO SECTION ═══ */}
      <View style={styles.hero}>
        <Image
          source={require("@/assets/images/hero-bible.png")}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={400}
        />
        {/* Deep gradient overlay */}
        <LinearGradient
          colors={["#050D1A00", "#050D1AB0", "#050D1AFF"]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Side vignette */}
        <LinearGradient
          colors={["#050D1A80", "#050D1A00", "#050D1A80"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={[styles.heroContent, { paddingTop: insets.top + Spacing.xl }]}
        >
          {/* App badge */}
          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />
            <Text style={styles.heroBadgeText}>AI-POWERED SCRIPTURE</Text>
          </View>

          {/* Title */}
          <Text style={styles.heroTitle}>Bible AI</Text>
          <Text style={styles.heroSub}>
            Explore the Word with intelligent search,{"\n"}conversational Q&A,
            and inspired generation
          </Text>

          {/* Quick Actions Grid */}
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((a) => (
              <Pressable
                key={a.label}
                style={({ pressed }) => [
                  styles.actionCard,
                  pressed && styles.actionCardPressed,
                ]}
                onPress={() => router.push(a.route as any)}
              >
                <LinearGradient
                  colors={[a.color + "28", a.color + "10"]}
                  style={styles.actionCardGrad}
                >
                  <View
                    style={[
                      styles.actionIconWrap,
                      { borderColor: a.color + "50" },
                    ]}
                  >
                    {a.lib === "material" ? (
                      <MaterialIcons
                        name={a.icon as any}
                        size={20}
                        color={a.color}
                      />
                    ) : (
                      <Feather name={a.icon as any} size={18} color={a.color} />
                    )}
                  </View>
                  <Text style={[styles.actionLabel, { color: a.color }]}>
                    {a.label}
                  </Text>
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
            <Text style={styles.sectionBadgeText}>IRV</Text>
          </View>
        </View>
        {loadingDaily ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading scripture...</Text>
          </View>
        ) : (
          <VerseCard verse={dailyVerse} variant="parchment" />
        )}
      </View>

      {/* ═══ BROWSE BY THEME ═══ */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by Theme</Text>
          <Pressable
            onPress={() => router.push("/")} // Updated from explore to /
            style={({ pressed }) => [
              styles.seeAllBtn,
              pressed && { opacity: 0.7 },
            ]}
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
                style={({ pressed }) => [
                  styles.themeChip,
                  pressed && { opacity: 0.75 },
                ]}
                onPress={() => router.push("/")} // Updated from explore to /
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
        {loadingFeatured ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading verses...</Text>
          </View>
        ) : featured.length > 0 ? (
          featured.map((verse) => (
            <VerseCard key={verse.id} verse={verse} variant="compact" />
          ))
        ) : (
          <Text style={styles.emptyText}>No featured verses available</Text>
        )}
      </View>

      {/* ═══ CREATIVE MODE BANNER ═══ */}
      <Pressable
        style={({ pressed }) => [
          styles.creativeBanner,
          pressed && { opacity: 0.88 },
        ]}
        onPress={() => router.push("/(tabs)/creative")}
      >
        <LinearGradient
          colors={["#1A3A1A", "#0D2A0D", "#050D1A"]}
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
              <Text style={styles.creativeBannerSub}>
                Generate scripture-inspired prose with AI
              </Text>
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
            onPress={() => router.push("/")} // Updated from explore to /
            style={({ pressed }) => [
              styles.seeAllBtn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={styles.seeAll}>All books</Text>
            <Feather name="chevron-right" size={14} color={Colors.primary} />
          </Pressable>
        </View>
        {/* Books are loaded from database - showing placeholder for now */}
        <Text style={styles.infoText}>
          Load books from database in explore screen
        </Text>
      </View>

      {/* ═══ STATS BAR ═══ */}
      <View style={styles.statsBar}>
        {[
          { label: "Gospel", value: "Telugu", icon: "book-open" as const },
          { label: "Version", value: "IRV", icon: "layers" as const },
          { label: "Themes", value: "15", icon: "tag" as const },
          { label: "AI Models", value: "4", icon: "cpu" as const },
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
    overflow: "hidden",
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    justifyContent: "flex-end",
    gap: Spacing.md,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  actionCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ffffff10",
  },
  actionCardPressed: {
    opacity: 0.85,
  },
  actionCardGrad: {
    padding: Spacing.md,
    gap: Spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    textAlign: "center",
  },

  // ── Sections ──
  section: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textWhite,
  },
  sectionBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primary + "20",
  },
  sectionBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  seeAll: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },

  // ── Verse Loading ──
  loadingCard: {
    paddingVertical: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.glass + "20",
  },
  loadingText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    paddingVertical: Spacing.md,
  },

  // ── Theme Chips ──
  themeScrollOuter: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  themeRow: {
    gap: Spacing.sm,
    paddingRight: Spacing.lg,
  },
  themeChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary + "20",
    borderWidth: 1,
    borderColor: Colors.primary + "30",
  },
  themeChipText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },

  // ── Creative Banner ──
  creativeBanner: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  creativeBannerGrad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  creativeGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.success + "15",
    opacity: 0.5,
    right: -50,
    bottom: -50,
  },
  creativeBannerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  creativeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.success + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  creativeBannerTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textWhite,
  },
  creativeBannerSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  creativeArrow: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.success + "20",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Books Grid ──
  booksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  bookChip: {
    width: CHIP_W - 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.glass + "10",
    borderWidth: 1,
    borderColor: Colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
  },
  bookChipPressed: {
    backgroundColor: Colors.glass + "20",
  },
  bookChipName: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textWhite,
    textAlign: "center",
  },
  bookChipMeta: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: "center",
  },

  // -- Stats Bar --
  statsBar: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textWhite,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
