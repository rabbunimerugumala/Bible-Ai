// Powered by OnSpace.AI — Glassmorphism Chat Screen
import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, Pressable, TextInput,
  ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '@/constants/theme';
import { VerseCard } from '@/components/ui/VerseCard';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from '@/services/aiService';

const QUICK_QUESTIONS = [
  { q: 'What does the Bible say about love?', icon: 'heart' as const },
  { q: 'How can I overcome fear and anxiety?', icon: 'shield' as const },
  { q: 'What is salvation and how is it received?', icon: 'anchor' as const },
  { q: 'Tell me about living by faith', icon: 'star' as const },
];

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
      {!isUser && (
        <View style={styles.aiAvatar}>
          <LinearGradient
            colors={[Colors.glassGold, Colors.glass]}
            style={styles.aiAvatarGrad}
          >
            <MaterialIcons name="auto-awesome" size={15} color={Colors.primary} />
          </LinearGradient>
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
        {isUser ? (
          <Text style={styles.bubbleTextUser}>{message.text}</Text>
        ) : (
          <>
            <Text style={styles.bubbleTextAI}>{message.text}</Text>
            {message.verses && message.verses.length > 0 && (
              <View style={styles.versesInBubble}>
                {message.verses.map((v) => (
                  <VerseCard key={v.id} verse={v} variant="compact" />
                ))}
              </View>
            )}
          </>
        )}
      </View>
      {isUser && (
        <View style={styles.userAvatar}>
          <Feather name="user" size={14} color={Colors.textSecondary} />
        </View>
      )}
    </View>
  );
}

function TypingIndicator() {
  return (
    <View style={styles.messageRow}>
      <View style={styles.aiAvatar}>
        <LinearGradient
          colors={[Colors.glassGold, Colors.glass]}
          style={styles.aiAvatarGrad}
        >
          <MaterialIcons name="auto-awesome" size={15} color={Colors.primary} />
        </LinearGradient>
      </View>
      <View style={[styles.bubble, styles.bubbleAI, styles.typingBubble]}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.typingText}>Searching the scriptures...</Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { messages, loading, input, setInput, sendMessage, clearChat } = useChat();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    return () => clearTimeout(t);
  }, [messages, loading]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <LinearGradient
        colors={[Colors.backgroundDeep, Colors.background]}
        style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}
      >
        <View style={styles.headerLeft}>
          <View style={styles.aiIconWrap}>
            <LinearGradient
              colors={[Colors.glassGold, Colors.glassMid]}
              style={styles.aiIconGrad}
            >
              <MaterialIcons name="auto-awesome" size={22} color={Colors.primary} />
            </LinearGradient>
            {/* Online dot */}
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Bible AI</Text>
            <View style={styles.headerStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.headerSub}>Scripture intelligence active</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={clearChat}
          hitSlop={10}
          style={({ pressed }) => [styles.clearBtn, pressed && { opacity: 0.6 }]}
        >
          <Feather name="rotate-ccw" size={16} color={Colors.textSecondary} />
          <Text style={styles.clearBtnText}>Reset</Text>
        </Pressable>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {loading && <TypingIndicator />}

        {/* Quick Questions */}
        {messages.length === 1 && !loading && (
          <View style={styles.quickSection}>
            <View style={styles.quickLabelRow}>
              <View style={styles.quickLabelLine} />
              <Text style={styles.quickLabel}>Quick Questions</Text>
              <View style={styles.quickLabelLine} />
            </View>
            {QUICK_QUESTIONS.map(({ q, icon }) => (
              <Pressable
                key={q}
                style={({ pressed }) => [styles.quickChip, pressed && { opacity: 0.75 }]}
                onPress={() => sendMessage(q)}
              >
                <View style={styles.quickChipIcon}>
                  <Feather name={icon} size={14} color={Colors.primary} />
                </View>
                <Text style={styles.quickChipText}>{q}</Text>
                <Feather name="send" size={13} color={Colors.textMuted} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Input Row */}
      <View style={[styles.inputRow, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything about scripture..."
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={500}
            onSubmitEditing={() => input.trim() && sendMessage(input)}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendBtn,
              (!input.trim() || loading) && styles.sendBtnDisabled,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={Colors.background} />
            ) : (
              <Feather
                name="send"
                size={16}
                color={input.trim() ? Colors.background : Colors.textMuted}
              />
            )}
          </Pressable>
        </View>
        <Text style={styles.inputHint}>Powered by Bible AI • Scripture-grounded answers</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  aiIconWrap: {
    position: 'relative',
  },
  aiIconGrad: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  headerSub: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 36,
  },
  clearBtnText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },

  // Messages
  messages: { flex: 1 },
  messagesContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  messageRowUser: {
    flexDirection: 'row-reverse',
  },
  aiAvatar: {
    flexShrink: 0,
  },
  aiAvatarGrad: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  bubbleAI: {
    backgroundColor: Colors.glassMid,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleTextAI: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: 25,
  },
  bubbleTextUser: {
    fontSize: FontSize.md,
    color: Colors.background,
    lineHeight: 25,
    fontWeight: FontWeight.medium,
  },
  versesInBubble: {
    marginTop: Spacing.xs,
    gap: Spacing.xs,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  typingText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },

  // Quick questions
  quickSection: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  quickLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  quickLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  quickLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    minHeight: 52,
  },
  quickChipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.glassGold,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickChipText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
  },

  // Input
  inputRow: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.backgroundDeep,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.glassMid,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    paddingTop: Spacing.sm + 2,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    maxHeight: 120,
    minHeight: 46,
    includeFontPadding: false,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.gold,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.glass,
    shadowOpacity: 0,
    elevation: 0,
  },
  inputHint: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
