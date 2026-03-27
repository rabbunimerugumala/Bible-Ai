// Powered by OnSpace.AI
import { useState, useCallback } from 'react';
import { ChatMessage, askQuestion } from '@/services/aiService';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Peace be with you. I am your Bible AI companion. Ask me anything about scripture — seek understanding of passages, explore themes, or request verses on any topic of your heart.',
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askQuestion(text);
      setMessages((prev) => [...prev, response]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const clearChat = useCallback(() => {
    setMessages([WELCOME]);
    setInput('');
  }, []);

  return { messages, loading, input, setInput, sendMessage, clearChat };
}
