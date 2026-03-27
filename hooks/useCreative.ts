// Powered by OnSpace.AI — Async Creative Hook with SQLite
import { useState, useCallback } from 'react';
import { GeneratedText, generateBiblicalText } from '@/services/aiService';

export const CREATIVE_STYLES = ['Psalm', 'Prophecy', 'Proverb', 'Gospel'];

export function useCreative() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Psalm');
  const [result, setResult] = useState<GeneratedText | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<GeneratedText[]>([]);

  const generate = useCallback(async () => {
    if (loading || !prompt.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const generated = await generateBiblicalText(prompt, style);
      setResult(generated);
      setHistory((prev) => [generated, ...prev].slice(0, 10));
    } catch (error) {
      console.error('Creative generation error:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [prompt, style, loading]);

  const clear = useCallback(() => {
    setPrompt('');
    setResult(null);
  }, []);

  return { prompt, setPrompt, style, setStyle, result, loading, history, generate, clear };
}
