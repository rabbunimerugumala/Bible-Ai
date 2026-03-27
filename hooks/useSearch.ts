// Powered by OnSpace.AI — Async SQLite Search Hook
import { useState, useCallback } from 'react';
import { Verse } from '@/constants/bibleData';
import { searchVerses } from '@/services/bibleService';
import { semanticSearch } from '@/services/aiService';

export type SearchMode = 'keyword' | 'semantic';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Verse[]>([]);
  const [mode, setMode] = useState<SearchMode>('keyword');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      setLoading(true);
      setHasSearched(true);
      try {
        if (mode === 'semantic') {
          const res = await semanticSearch(q);
          setResults(res);
        } else {
          const res = await searchVerses(q);
          setResults(res);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [mode]
  );

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  }, []);

  return { query, setQuery, results, mode, setMode, loading, hasSearched, search, clear };
}
