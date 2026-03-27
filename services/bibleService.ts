// Powered by OnSpace.AI — SQLite Bible Service
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import { Verse, Book } from '@/constants/bibleData';

const DB_NAME = 'Telugu_IRV.sqlite';
let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

// Initialize database from assets
async function initializeDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const asset = Asset.fromModule(require('../assets/Telugu_IRV.sqlite'));
      await asset.downloadAsync();

      // expo-sqlite expects databases in the 'SQLite' subdirectory of the document directory
      const sqliteDir = `${FileSystem.documentDirectory}SQLite`;
      const dbPath = `${sqliteDir}/${DB_NAME}`;
      const assetPath = asset.localUri || asset.uri;

      console.log('[BibleService] Ensuring SQLite directory exists:', sqliteDir);
      const dirInfo = await FileSystem.getInfoAsync(sqliteDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });
      }

      console.log('[BibleService] Checking DB at path:', dbPath);
      const fileInfo = await FileSystem.getInfoAsync(dbPath);
      if (!fileInfo.exists) {
        console.log('[BibleService] Copying DB from assets to:', dbPath);
        await FileSystem.copyAsync({ from: assetPath, to: dbPath });
      } else {
        console.log('[BibleService] DB already exists. Size:', fileInfo.size);
      }

      // Opening with just the name will look in the 'SQLite' folder
      const _db = await SQLite.openDatabaseAsync(DB_NAME, { useNewConnection: true });
      console.log('[BibleService] Database opened successfully.');
      db = _db;
      return _db;
    } catch (error) {
      console.error('[BibleService] Database initialization error:', error);
      const fallback = await SQLite.openDatabaseAsync(':memory:', { useNewConnection: true });
      db = fallback;
      return fallback;
    }
  })();

  return initPromise;
}

// Ensure database is initialized
async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  return await initializeDatabase();
}

// ═══ CORE QUERIES ═══

export async function searchVerses(query: string): Promise<Verse[]> {
  if (!query.trim()) return [];

  const db = await getDatabase();
  const q = `%${query.toLowerCase()}%`;

  try {
    const result = await db.getAllAsync<any>(
      `SELECT id, book, chapter, verse, text FROM verses 
       WHERE LOWER(text) LIKE ? 
       LIMIT 20`,
      [q]
    );

    return result.map(mapRowToVerse);
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export async function getVersesByBook(bookName: string): Promise<Verse[]> {
  const db = await getDatabase();
  const bookId = resolveBookId(bookName);
  if (bookId === null) return [];

  try {
    const result = await db.getAllAsync<any>(
      `SELECT id, book, chapter, verse, text FROM verses 
       WHERE book = ? 
       ORDER BY chapter, verse`,
      [Number(bookId)]
    );

    return result.map(mapRowToVerse);
  } catch (error) {
    console.error('Get verses by book error:', error);
    return [];
  }
}

export async function getChaptersByBook(bookName: string): Promise<number[]> {
  const db = await getDatabase();
  const bookId = resolveBookId(bookName);
  if (bookId === null) return [];

  try {
    const result = await db.getAllAsync<{ chapter: number }>(
      `SELECT DISTINCT chapter FROM verses WHERE book = ? ORDER BY chapter`,
      [Number(bookId)]
    );
    return result.map((r) => r.chapter);
  } catch (error) {
    console.error('Get chapters error:', error);
    return [];
  }
}

export async function getVersesByBookAndChapter(
  bookName: string,
  chapter: number
): Promise<Verse[]> {
  const db = await getDatabase();
  const bookId = resolveBookId(bookName);
  if (bookId === null) return [];

  try {
    const result = await db.getAllAsync<any>(
      `SELECT id, book, chapter, verse, text FROM verses
       WHERE book = ? AND chapter = ?
       ORDER BY verse`,
      [Number(bookId), Number(chapter)]
    );
    return result.map(mapRowToVerse);
  } catch (error) {
    console.error('Get verses by chapter error:', error);
    return [];
  }
}


export async function getVersesByTheme(theme: string): Promise<Verse[]> {
  // Since the database doesn't have themes, we search for theme-related keywords
  const themeKeywords: Record<string, string[]> = {
    'Love': ['love', 'beloved', 'affection'],
    'Faith': ['faith', 'believe', 'trust'],
    'Hope': ['hope', 'expectation'],
    'Peace': ['peace', 'tranquil', 'calm'],
    'Wisdom': ['wisdom', 'wise', 'understanding'],
    'Salvation': ['salvation', 'save', 'redeemed'],
    'Prayer': ['prayer', 'pray', 'petition'],
    'Strength': ['strength', 'strong', 'mighty'],
    'Grace': ['grace', 'merciful', 'compassion'],
    'Forgiveness': ['forgiveness', 'forgive', 'pardon'],
    'Prophecy': ['prophecy', 'prophet'],
    'Creation': ['creation', 'created'],
    'Justice': ['justice', 'righteous'],
    'Praise': ['praise', 'worship', 'glory'],
    'Healing': ['healing', 'heal', 'sick'],
  };

  const keywords = themeKeywords[theme] || [theme.toLowerCase()];
  const db = await getDatabase();

  try {
    let query = `SELECT id, book, chapter, verse, text FROM verses WHERE `;
    const conditions = keywords.map(() => `LOWER(text) LIKE ?`).join(' OR ');
    query += conditions;
    query += ` ORDER BY book, chapter, verse LIMIT 30`;

    const params = keywords.map(kw => `%${kw}%`);
    const result = await db.getAllAsync<any>(query, params);

    return result.map(mapRowToVerse);
  } catch (error) {
    console.error('Get verses by theme error:', error);
    return [];
  }
}

export async function getDailyVerse(): Promise<Verse> {
  const db = await getDatabase();

  try {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );

    // Get total verse count
    const countResult = await db.getFirstAsync<any>(
      'SELECT COUNT(*) as count FROM verses'
    );

    const totalVerses = countResult?.count || 1;
    const offset = dayOfYear % totalVerses;

    const result = await db.getFirstAsync<any>(
      `SELECT id, book, chapter, verse, text FROM verses 
       ORDER BY id LIMIT 1 OFFSET ?`,
      [Number(offset)]
    );

    return result ? mapRowToVerse(result) : getDefaultVerse();
  } catch (error) {
    console.error('Get daily verse error:', error);
    return getDefaultVerse();
  }
}

export async function getFeaturedVerses(count = 5): Promise<Verse[]> {
  const db = await getDatabase();

  try {
    const result = await db.getAllAsync<any>(
      `SELECT id, book, chapter, verse, text FROM verses 
       ORDER BY RANDOM() 
       LIMIT ?`,
      [Number(count)]
    );

    return result.map(mapRowToVerse);
  } catch (error) {
    console.error('Get featured verses error:', error);
    return [];
  }
}

export async function getBookInfo(name: string): Promise<Book | undefined> {
  const db = await getDatabase();
  const bookId = resolveBookId(name);
  if (bookId === null) return undefined;

  try {
    const result = await db.getFirstAsync<any>(
      `SELECT book, 
              COUNT(*) as chapter_count, 
              MAX(chapter) as max_ch
       FROM verses 
       WHERE book = ?
       GROUP BY book`,
      [bookId]
    );

    if (!result) return undefined;

    return {
      name: resolveBookName(bookId),
      testament: BOOK_MAP[bookId].testament,
      chapters: result.max_ch || 0,
      category: BOOK_MAP[bookId].category,
    };
  } catch (error) {
    console.error('Get book info error:', error);
    return undefined;
  }
}

export async function getRelatedVerses(verse: Verse, count = 3): Promise<Verse[]> {
  const db = await getDatabase();
  const bookId = resolveBookId(verse.book);
  if (bookId === null) return [];

  try {
    // Get verses from same book/chapter
    const result = await db.getAllAsync<any>(
      `SELECT id, book, chapter, verse, text FROM verses 
       WHERE (book = ? AND chapter = ?) 
       OR (book = ? AND verse != ?)
       ORDER BY RANDOM()
       LIMIT ?`,
      [bookId, verse.chapter, bookId, verse.verse, count]
    );

    return result.map(mapRowToVerse);
  } catch (error) {
    console.error('Get related verses error:', error);
    return [];
  }
}

export function formatReference(verse: Verse): string {
  return `${verse.book} ${verse.chapter}:${verse.verse}`;
}

// ─── Universal Book Mapping (1-66) ───────────────────────────────
const BOOK_MAP: Record<number, { telugu: string; english: string; testament: 'Old' | 'New'; category: string }> = {
  1: { telugu: 'ఆదికాండము', english: 'Genesis', testament: 'Old', category: 'Law' },
  2: { telugu: 'నిర్గమకాండము', english: 'Exodus', testament: 'Old', category: 'Law' },
  3: { telugu: 'లేవీయకాండము', english: 'Leviticus', testament: 'Old', category: 'Law' },
  4: { telugu: 'సంఖ్యాకాండము', english: 'Numbers', testament: 'Old', category: 'Law' },
  5: { telugu: 'ద్వితీయోపదేశకాండము', english: 'Deuteronomy', testament: 'Old', category: 'Law' },
  6: { telugu: 'యెహోషువ', english: 'Joshua', testament: 'Old', category: 'History' },
  7: { telugu: 'న్యాయాధిపతులు', english: 'Judges', testament: 'Old', category: 'History' },
  8: { telugu: 'రూతు', english: 'Ruth', testament: 'Old', category: 'History' },
  9: { telugu: '1 సమూయేలు', english: '1 Samuel', testament: 'Old', category: 'History' },
  10: { telugu: '2 సమూయేలు', english: '2 Samuel', testament: 'Old', category: 'History' },
  11: { telugu: '1 రాజులు', english: '1 Kings', testament: 'Old', category: 'History' },
  12: { telugu: '2 రాజులు', english: '2 Kings', testament: 'Old', category: 'History' },
  13: { telugu: '1 దినవృత్తాంతములు', english: '1 Chronicles', testament: 'Old', category: 'History' },
  14: { telugu: '2 దినవృత్తాంతములు', english: '2 Chronicles', testament: 'Old', category: 'History' },
  15: { telugu: 'ఎజ్రా', english: 'Ezra', testament: 'Old', category: 'History' },
  16: { telugu: 'నెహెమ్యా', english: 'Nehemiah', testament: 'Old', category: 'History' },
  17: { telugu: 'ఎస్తేరు', english: 'Esther', testament: 'Old', category: 'History' },
  18: { telugu: 'యోబు', english: 'Job', testament: 'Old', category: 'Poetry' },
  19: { telugu: 'కీర్తనలు', english: 'Psalms', testament: 'Old', category: 'Poetry' },
  20: { telugu: 'సామెతలు', english: 'Proverbs', testament: 'Old', category: 'Wisdom' },
  21: { telugu: 'ప్రసంగి', english: 'Ecclesiastes', testament: 'Old', category: 'Poetry' },
  22: { telugu: 'పరమగీతము', english: 'Song of Solomon', testament: 'Old', category: 'Poetry' },
  23: { telugu: 'యెషయా', english: 'Isaiah', testament: 'Old', category: 'Prophecy' },
  24: { telugu: 'యిర్మియా', english: 'Jeremiah', testament: 'Old', category: 'Prophecy' },
  25: { telugu: 'విలాపవాక్యములు', english: 'Lamentations', testament: 'Old', category: 'Prophecy' },
  26: { telugu: 'యెహెజ్కేలు', english: 'Ezekiel', testament: 'Old', category: 'Prophecy' },
  27: { telugu: 'దానియేలు', english: 'Daniel', testament: 'Old', category: 'Prophecy' },
  28: { telugu: 'హోషేయ', english: 'Hosea', testament: 'Old', category: 'Prophecy' },
  29: { telugu: 'యోవేలు', english: 'Joel', testament: 'Old', category: 'Prophecy' },
  30: { telugu: 'ఆమోసు', english: 'Amos', testament: 'Old', category: 'Prophecy' },
  31: { telugu: 'ఓబద్యా', english: 'Obadiah', testament: 'Old', category: 'Prophecy' },
  32: { telugu: 'యోనా', english: 'Jonah', testament: 'Old', category: 'Prophecy' },
  33: { telugu: 'మీకా', english: 'Micah', testament: 'Old', category: 'Prophecy' },
  34: { telugu: 'నహూము', english: 'Nahum', testament: 'Old', category: 'Prophecy' },
  35: { telugu: 'హబక్కూకు', english: 'Habakkuk', testament: 'Old', category: 'Prophecy' },
  36: { telugu: 'జెఫన్యా', english: 'Zephaniah', testament: 'Old', category: 'Prophecy' },
  37: { telugu: 'హగ్గయి', english: 'Haggai', testament: 'Old', category: 'Prophecy' },
  38: { telugu: 'జెకర్యా', english: 'Zechariah', testament: 'Old', category: 'Prophecy' },
  39: { telugu: 'మలాకీ', english: 'Malachi', testament: 'Old', category: 'Prophecy' },
  40: { telugu: 'మత్తయి', english: 'Matthew', testament: 'New', category: 'Gospel' },
  41: { telugu: 'మార్కు', english: 'Mark', testament: 'New', category: 'Gospel' },
  42: { telugu: 'లూకా', english: 'Luke', testament: 'New', category: 'Gospel' },
  43: { telugu: 'యోహాను', english: 'John', testament: 'New', category: 'Gospel' },
  44: { telugu: 'అపొస్తలుల కార్యములు', english: 'Acts', testament: 'New', category: 'Acts' },
  45: { telugu: 'రోమీయులకు', english: 'Romans', testament: 'New', category: 'Epistle' },
  46: { telugu: '1 కొరింథీయులకు', english: '1 Corinthians', testament: 'New', category: 'Epistle' },
  47: { telugu: '2 కొరింథీయులకు', english: '2 Corinthians', testament: 'New', category: 'Epistle' },
  48: { telugu: 'గలతీయులకు', english: 'Galatians', testament: 'New', category: 'Epistle' },
  49: { telugu: 'ఎఫెసీయులకు', english: 'Ephesians', testament: 'New', category: 'Epistle' },
  50: { telugu: 'ఫిలిప్పీయులకు', english: 'Philippians', testament: 'New', category: 'Epistle' },
  51: { telugu: 'కొలొస్సయులకు', english: 'Colossians', testament: 'New', category: 'Epistle' },
  52: { telugu: '1 థెస్సలొనీకయులకు', english: '1 Thessalonians', testament: 'New', category: 'Epistle' },
  53: { telugu: '2 థెస్సలొనీకయులకు', english: '2 Thessalonians', testament: 'New', category: 'Epistle' },
  54: { telugu: '1 తిమోతికి', english: '1 Timothy', testament: 'New', category: 'Epistle' },
  55: { telugu: '2 తిమోతికి', english: '2 Timothy', testament: 'New', category: 'Epistle' },
  56: { telugu: 'తీతుకు', english: 'Titus', testament: 'New', category: 'Epistle' },
  57: { telugu: 'ఫిలేమోనుకు', english: 'Philemon', testament: 'New', category: 'Epistle' },
  58: { telugu: 'హెబ్రీయులకు', english: 'Hebrews', testament: 'New', category: 'Epistle' },
  59: { telugu: 'యాకోబు', english: 'James', testament: 'New', category: 'Epistle' },
  60: { telugu: '1 పేతురు', english: '1 Peter', testament: 'New', category: 'Epistle' },
  61: { telugu: '2 పేతురు', english: '2 Peter', testament: 'New', category: 'Epistle' },
  62: { telugu: '1 యోహాను', english: '1 John', testament: 'New', category: 'Epistle' },
  63: { telugu: '2 యోహాను', english: '2 John', testament: 'New', category: 'Epistle' },
  64: { telugu: '3 యోహాను', english: '3 John', testament: 'New', category: 'Epistle' },
  65: { telugu: 'యూదా', english: 'Jude', testament: 'New', category: 'Epistle' },
  66: { telugu: 'ప్రకటన గ్రంథము', english: 'Revelation', testament: 'New', category: 'Prophecy' },
};

/** Resolve book ID from name (Telugu or English) */
function resolveBookId(name: any): number | null {
  if (name === null || name === undefined) return null;
  if (typeof name === 'number') return name >= 1 && name <= 66 ? name : null;
  const str = String(name).trim();
  if (!str) return null;

  const lower = str.toLowerCase();
  for (const [id, meta] of Object.entries(BOOK_MAP)) {
    if (meta.telugu === str || meta.english.toLowerCase() === lower) {
      return parseInt(id);
    }
  }
  return null;
}

/** Resolve Telugu book name from ID */
function resolveBookName(id: number | string): string {
  const numId = typeof id === 'string' ? parseInt(id) : id;
  return BOOK_MAP[numId]?.telugu || String(id);
}

/** Resolve English name for internal logic */
function resolveEnglishName(bookNameOrId: string | number): string {
  if (typeof bookNameOrId === 'number') return BOOK_MAP[bookNameOrId]?.english || '';
  const id = resolveBookId(bookNameOrId);
  return id ? BOOK_MAP[id].english : bookNameOrId;
}

// ═══ HELPERS ═══

function mapRowToVerse(row: any): Verse {
  const bookId = row.book;
  const bookName = resolveBookName(bookId);
  return {
    id: `v-${bookId}-${row.chapter}-${row.verse}`,
    book: bookName,
    chapter: row.chapter ?? 0,
    verse: row.verse ?? 0,
    text: row.text ?? '',
    themes: extractThemes(row.text ?? ''),
    testament: detectTestament(bookName),
  };
}

function extractThemes(text: string): string[] {
  const themeKeywords: Record<string, string> = {
    'Love': 'love|beloved|affection|merciful',
    'Faith': 'faith|believe|trust|rely',
    'Hope': 'hope|expect|anticipation',
    'Peace': 'peace|tranquil|calm|serenity',
    'Wisdom': 'wisdom|wise|understanding|knowledge',
    'Salvation': 'salvation|save|redeemed|liberty',
    'Prayer': 'prayer|pray|petition|supplicate',
    'Strength': 'strength|strong|mighty|power',
    'Grace': 'grace|merciful|compassion|kindness',
    'Forgiveness': 'forgiveness|forgive|pardon|atonement',
    'Prophecy': 'prophecy|prophet|vision',
    'Creation': 'creation|created|made',
    'Justice': 'justice|righteous|judgment',
    'Praise': 'praise|worship|glory|exalt',
    'Healing': 'healing|heal|sick|cure',
  };

  const lowerText = text.toLowerCase();
  const found: string[] = [];

  for (const [theme, pattern] of Object.entries(themeKeywords)) {
    if (new RegExp(pattern).test(lowerText)) {
      found.push(theme);
    }
  }

  return found.length > 0 ? found : ['Faith']; // Default theme
}

function detectTestament(bookName: string): 'Old' | 'New' {
  if (!bookName || typeof bookName !== 'string') return 'Old';
  const english = resolveEnglishName(bookName).toLowerCase();
  const ntFragments = [
    'matthew', 'mark', 'luke', 'john', 'acts',
    'romans', 'corinthians', 'galatians', 'ephesians',
    'philippians', 'colossians', 'thessalonians',
    'timothy', 'titus', 'philemon', 'hebrews',
    'james', 'peter', 'jude', 'revelation',
  ];
  return ntFragments.some((b) => english.includes(b)) ? 'New' : 'Old';
}

function detectCategory(bookName: string): string {
  if (!bookName || typeof bookName !== 'string') return 'Other';
  const lower = resolveEnglishName(bookName).toLowerCase();
  const categories: Record<string, string[]> = {
    Law:      ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'],
    History:  ['joshua', 'judges', 'ruth', 'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah', 'esther'],
    Poetry:   ['job', 'psalms', 'ecclesiastes', 'song'],
    Wisdom:   ['proverbs'],
    Prophecy: ['isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'revelation'],
    Gospel:   ['matthew', 'mark', 'luke', 'john'],
    Epistle:  ['romans', 'corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', 'thessalonians', 'timothy', 'titus', 'philemon', 'hebrews', 'james', 'peter', 'jude'],
    Acts:     ['acts'],
  };
  for (const [category, fragments] of Object.entries(categories)) {
    if (fragments.some((f) => lower.includes(f))) return category;
  }
  return 'Other';
}

function getDefaultVerse(): Verse {
  return {
    id: 'john-3-16',
    book: 'John',
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    themes: ['Love', 'Salvation'],
    testament: 'New',
  };
}

// Returns all 66 books in canonical order
export async function getAllBooks(): Promise<Book[]> {
  return Object.entries(BOOK_MAP).map(([id, meta]) => ({
    name: meta.telugu,
    testament: meta.testament,
    chapters: 0, // Not strictly needed for the list view
    category: meta.category,
  }));
}

// Export database for debugging
export async function getDBInfo(): Promise<any> {
  const db = await getDatabase();
  try {
    const tables = await db.getAllAsync('SELECT name FROM sqlite_master WHERE type="table"');
    const verseCount = await db.getFirstAsync('SELECT COUNT(*) as count FROM verses');
    return { tables, verseCount };
  } catch (error) {
    console.error('Get DB info error:', error);
    return null;
  }
}

