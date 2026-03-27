// Powered by OnSpace.AI
import { VERSES, BOOKS, Verse, Book } from '@/constants/bibleData';

export function searchVerses(query: string): Verse[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return VERSES.filter(
    (v) =>
      v.text.toLowerCase().includes(q) ||
      v.book.toLowerCase().includes(q) ||
      v.themes.some((t) => t.toLowerCase().includes(q))
  );
}

export function getVersesByTheme(theme: string): Verse[] {
  return VERSES.filter((v) => v.themes.includes(theme));
}

export function getVersesByBook(book: string): Verse[] {
  return VERSES.filter((v) => v.book === book);
}

export function getDailyVerse(): Verse {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return VERSES[dayOfYear % VERSES.length];
}

export function getFeaturedVerses(count = 5): Verse[] {
  const highlights = ['john-3-16', 'ps-23-1', 'phil-4-13', 'jer-29-11', 'isa-40-31'];
  return highlights
    .map((id) => VERSES.find((v) => v.id === id))
    .filter(Boolean) as Verse[];
}

export function getBookInfo(name: string): Book | undefined {
  return BOOKS.find((b) => b.name === name);
}

export function getRelatedVerses(verse: Verse, count = 3): Verse[] {
  const related = VERSES.filter(
    (v) =>
      v.id !== verse.id &&
      v.themes.some((t) => verse.themes.includes(t))
  );
  return related.slice(0, count);
}

export function formatReference(verse: Verse): string {
  return `${verse.book} ${verse.chapter}:${verse.verse}`;
}
