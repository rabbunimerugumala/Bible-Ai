// Powered by OnSpace.AI — Glassmorphism Tab Layout
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';

function GoldTabBar({ style, children }: { style?: any; children: React.ReactNode }) {
  return (
    <View style={[style, { position: 'relative', overflow: 'hidden' }]}>
      <LinearGradient
        colors={[Colors.backgroundDeep, Colors.tabBar]}
        style={StyleSheet.absoluteFill}
      />
      {/* Top border glow */}
      <View style={styles.topBorder} />
      {children}
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.select({
    ios: insets.bottom + 62,
    android: insets.bottom + 62,
    default: 72,
  });

  const tabBarPaddingBottom = Platform.select({
    ios: insets.bottom + 6,
    android: insets.bottom + 6,
    default: 8,
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: tabBarHeight,
          paddingTop: 8,
          paddingBottom: tabBarPaddingBottom,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
        },
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={[Colors.backgroundDeep + 'F0', Colors.tabBar + 'FA']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.topBorder} />
          </View>
        ),
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
              <FontAwesome5 name="bible" size={size - 3} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
              <Feather name="search" size={size - 1} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Ask AI',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconWrap, focused && styles.tabIconWrapCenter]}>
              <MaterialIcons name="auto-awesome" size={focused ? size + 1 : size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="creative"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
              <Feather name="edit-3" size={size - 1} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
              <Feather name="compass" size={size - 1} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.borderGold,
    opacity: 0.5,
  },
  tabIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: {
    backgroundColor: Colors.primaryGlow,
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  tabIconWrapCenter: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primaryGlow,
    borderWidth: 1,
    borderColor: Colors.borderGoldStrong,
  },
});
