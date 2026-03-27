// Powered by OnSpace.AI — Types only - Data loaded from Telugu_IRV.sqlite
export interface Verse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  themes: string[];
  testament: 'Old' | 'New';
}

export interface Book {
  name: string;
  testament: 'Old' | 'New';
  chapters: number;
  category: string;
}

export const THEMES = [
  'Love', 'Faith', 'Hope', 'Peace', 'Wisdom',
  'Salvation', 'Prayer', 'Strength', 'Grace', 'Forgiveness',
  'Prophecy', 'Creation', 'Justice', 'Praise', 'Healing',
];

// All BOOKS data is automatically loaded from SQLite database
// No hardcoded data needed - database is source of truth

export const FEATURED_THEMES = ['Love', 'Faith', 'Hope', 'Strength', 'Wisdom', 'Peace'];
