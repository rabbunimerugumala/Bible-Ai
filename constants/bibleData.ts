// Powered by OnSpace.AI
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

export const BOOKS: Book[] = [
  { name: 'Genesis', testament: 'Old', chapters: 50, category: 'Law' },
  { name: 'Psalms', testament: 'Old', chapters: 150, category: 'Poetry' },
  { name: 'Proverbs', testament: 'Old', chapters: 31, category: 'Wisdom' },
  { name: 'Isaiah', testament: 'Old', chapters: 66, category: 'Prophecy' },
  { name: 'Jeremiah', testament: 'Old', chapters: 52, category: 'Prophecy' },
  { name: 'Matthew', testament: 'New', chapters: 28, category: 'Gospel' },
  { name: 'John', testament: 'New', chapters: 21, category: 'Gospel' },
  { name: 'Romans', testament: 'New', chapters: 16, category: 'Epistle' },
  { name: 'Corinthians', testament: 'New', chapters: 16, category: 'Epistle' },
  { name: 'Philippians', testament: 'New', chapters: 4, category: 'Epistle' },
  { name: 'Hebrews', testament: 'New', chapters: 13, category: 'Epistle' },
  { name: 'Revelation', testament: 'New', chapters: 22, category: 'Prophecy' },
];

export const VERSES: Verse[] = [
  {
    id: 'john-3-16',
    book: 'John', chapter: 3, verse: 16,
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    themes: ['Love', 'Salvation', 'Faith'],
    testament: 'New',
  },
  {
    id: 'ps-23-1',
    book: 'Psalms', chapter: 23, verse: 1,
    text: 'The Lord is my shepherd; I shall not want.',
    themes: ['Peace', 'Faith', 'Hope'],
    testament: 'Old',
  },
  {
    id: 'ps-23-4',
    book: 'Psalms', chapter: 23, verse: 4,
    text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
    themes: ['Faith', 'Hope', 'Peace'],
    testament: 'Old',
  },
  {
    id: 'phil-4-13',
    book: 'Philippians', chapter: 4, verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.',
    themes: ['Strength', 'Faith'],
    testament: 'New',
  },
  {
    id: 'jer-29-11',
    book: 'Jeremiah', chapter: 29, verse: 11,
    text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.',
    themes: ['Hope', 'Peace', 'Faith'],
    testament: 'Old',
  },
  {
    id: 'rom-8-28',
    book: 'Romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    themes: ['Faith', 'Hope', 'Love'],
    testament: 'New',
  },
  {
    id: 'prov-3-5',
    book: 'Proverbs', chapter: 3, verse: 5,
    text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding.',
    themes: ['Wisdom', 'Faith'],
    testament: 'Old',
  },
  {
    id: 'prov-3-6',
    book: 'Proverbs', chapter: 3, verse: 6,
    text: 'In all thy ways acknowledge him, and he shall direct thy paths.',
    themes: ['Wisdom', 'Faith'],
    testament: 'Old',
  },
  {
    id: 'isa-40-31',
    book: 'Isaiah', chapter: 40, verse: 31,
    text: 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    themes: ['Strength', 'Hope', 'Faith'],
    testament: 'Old',
  },
  {
    id: 'matt-5-3',
    book: 'Matthew', chapter: 5, verse: 3,
    text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.',
    themes: ['Salvation', 'Hope'],
    testament: 'New',
  },
  {
    id: 'matt-6-33',
    book: 'Matthew', chapter: 6, verse: 33,
    text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
    themes: ['Faith', 'Wisdom'],
    testament: 'New',
  },
  {
    id: 'john-14-6',
    book: 'John', chapter: 14, verse: 6,
    text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.',
    themes: ['Salvation', 'Faith'],
    testament: 'New',
  },
  {
    id: 'john-8-32',
    book: 'John', chapter: 8, verse: 32,
    text: 'And ye shall know the truth, and the truth shall make you free.',
    themes: ['Wisdom', 'Salvation'],
    testament: 'New',
  },
  {
    id: 'ps-46-1',
    book: 'Psalms', chapter: 46, verse: 1,
    text: 'God is our refuge and strength, a very present help in trouble.',
    themes: ['Strength', 'Faith', 'Peace'],
    testament: 'Old',
  },
  {
    id: 'ps-119-105',
    book: 'Psalms', chapter: 119, verse: 105,
    text: 'Thy word is a lamp unto my feet, and a light unto my path.',
    themes: ['Wisdom', 'Faith'],
    testament: 'Old',
  },
  {
    id: 'gen-1-1',
    book: 'Genesis', chapter: 1, verse: 1,
    text: 'In the beginning God created the heaven and the earth.',
    themes: ['Creation'],
    testament: 'Old',
  },
  {
    id: 'rom-12-2',
    book: 'Romans', chapter: 12, verse: 2,
    text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.',
    themes: ['Wisdom', 'Faith', 'Grace'],
    testament: 'New',
  },
  {
    id: 'heb-11-1',
    book: 'Hebrews', chapter: 11, verse: 1,
    text: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    themes: ['Faith', 'Hope'],
    testament: 'New',
  },
  {
    id: 'phil-4-6',
    book: 'Philippians', chapter: 4, verse: 6,
    text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
    themes: ['Prayer', 'Peace', 'Faith'],
    testament: 'New',
  },
  {
    id: 'phil-4-7',
    book: 'Philippians', chapter: 4, verse: 7,
    text: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    themes: ['Peace', 'Faith'],
    testament: 'New',
  },
  {
    id: 'matt-11-28',
    book: 'Matthew', chapter: 11, verse: 28,
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    themes: ['Peace', 'Hope', 'Salvation'],
    testament: 'New',
  },
  {
    id: 'ps-27-1',
    book: 'Psalms', chapter: 27, verse: 1,
    text: 'The Lord is my light and my salvation; whom shall I fear? the Lord is the strength of my life; of whom shall I be afraid?',
    themes: ['Salvation', 'Strength', 'Faith'],
    testament: 'Old',
  },
  {
    id: '1cor-13-13',
    book: 'Corinthians', chapter: 13, verse: 13,
    text: 'And now abideth faith, hope, charity, these three; but the greatest of these is charity.',
    themes: ['Love', 'Faith', 'Hope'],
    testament: 'New',
  },
  {
    id: 'john-1-1',
    book: 'John', chapter: 1, verse: 1,
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    themes: ['Creation', 'Faith'],
    testament: 'New',
  },
  {
    id: 'rev-21-4',
    book: 'Revelation', chapter: 21, verse: 4,
    text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.',
    themes: ['Hope', 'Salvation', 'Healing'],
    testament: 'New',
  },
  {
    id: 'isa-53-5',
    book: 'Isaiah', chapter: 53, verse: 5,
    text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.',
    themes: ['Salvation', 'Healing', 'Prophecy'],
    testament: 'Old',
  },
  {
    id: 'ps-34-8',
    book: 'Psalms', chapter: 34, verse: 8,
    text: 'O taste and see that the Lord is good: blessed is the man that trusteth in him.',
    themes: ['Faith', 'Praise'],
    testament: 'Old',
  },
  {
    id: 'rom-5-8',
    book: 'Romans', chapter: 5, verse: 8,
    text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
    themes: ['Love', 'Grace', 'Salvation'],
    testament: 'New',
  },
  {
    id: 'eph-2-8',
    book: 'Ephesians', chapter: 2, verse: 8,
    text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.',
    themes: ['Grace', 'Salvation', 'Faith'],
    testament: 'New',
  },
  {
    id: 'matt-5-9',
    book: 'Matthew', chapter: 5, verse: 9,
    text: 'Blessed are the peacemakers: for they shall be called the children of God.',
    themes: ['Peace', 'Justice'],
    testament: 'New',
  },
];

export const DAILY_VERSES = [
  VERSES[0], VERSES[2], VERSES[4], VERSES[8], VERSES[10],
  VERSES[14], VERSES[17], VERSES[22], VERSES[24],
];

export const FEATURED_THEMES = ['Love', 'Faith', 'Hope', 'Strength', 'Wisdom', 'Peace'];
