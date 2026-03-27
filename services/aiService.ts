// Powered by OnSpace.AI — Async SQLite AI Service
import { Verse } from '@/constants/bibleData';
import { searchVerses, getVersesByTheme, formatReference } from './bibleService';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  verses?: Verse[];
  timestamp: Date;
}

export interface GeneratedText {
  text: string;
  style: string;
}

// --- Q&A Mock Responses with Direct Data ---
const QA_PATTERNS: { keywords: string[]; response: string; themeQuery?: string }[] = [
  {
    keywords: ['love', 'loved', 'loving'],
    response:
      'The Bible speaks of love as the greatest commandment and the very nature of God. Love is not merely a feeling but an action — seen most perfectly in the sacrifice of Christ for humanity.',
    themeQuery: 'Love',
  },
  {
    keywords: ['faith', 'believe', 'trust'],
    response:
      'Faith is the foundation of the Christian life. It is the substance of things hoped for, the evidence of things not seen. Faith is not blind optimism — it is anchored in the character and promises of God.',
    themeQuery: 'Faith',
  },
  {
    keywords: ['fear', 'afraid', 'anxious', 'anxiety', 'worry'],
    response:
      'Scripture offers profound comfort for fear and anxiety. God repeatedly commands "fear not" — over 365 times — one for each day of the year. He is with you always.',
    themeQuery: 'Peace',
  },
  {
    keywords: ['prayer', 'pray', 'praying', 'intercede'],
    response:
      'Prayer is the lifeline of the believer — direct communication with God. Through prayer and supplication with thanksgiving let your requests be made known unto God.',
    themeQuery: 'Prayer',
  },
  {
    keywords: ['hope', 'hopeless', 'future', 'despair'],
    response:
      'Hope in Scripture is not wishful thinking — it is confident expectation. God has thoughts of peace toward you, not of evil, to give you an expected end.',
    themeQuery: 'Hope',
  },
  {
    keywords: ['salvation', 'saved', 'heaven', 'eternal life', 'gospel'],
    response:
      'Salvation is the central message of the Bible. It is not earned by works but received by faith. Jesus Christ paid the price for humanity\'s redemption.',
    themeQuery: 'Salvation',
  },
  {
    keywords: ['strength', 'strong', 'weak', 'tired', 'weary', 'power'],
    response:
      'God promises His strength to those who are weary. Those who wait upon the Lord shall renew their strength and mount up with wings as eagles. Human weakness becomes the canvas for divine power.',
    themeQuery: 'Strength',
  },
  {
    keywords: ['wisdom', 'wise', 'decision', 'guidance', 'direction', 'counsel'],
    response:
      'Wisdom begins with reverence for God. Trust in the Lord with all your heart and lean not on your own understanding. In all your ways acknowledge Him, and He shall direct your paths.',
    themeQuery: 'Wisdom',
  },
  {
    keywords: ['forgiveness', 'forgive', 'sin', 'guilt', 'repent', 'pardon'],
    response:
      'Forgiveness is at the heart of the Gospel. If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness. No sin is too great for God\'s grace.',
    themeQuery: 'Forgiveness',
  },
  {
    keywords: ['peace', 'rest', 'calm', 'troubled', 'serenity'],
    response:
      'The peace of God is not merely the absence of trouble — it is a supernatural calm that guards the heart even in the midst of storms. This peace surpasses understanding.',
    themeQuery: 'Peace',
  },
  {
    keywords: ['healing', 'sick', 'healed', 'health', 'wholeness'],
    response:
      'The Bible promises healing for both body and soul. God is known as the One who heals — throughout Scripture, His healing power is revealed to those who trust in Him.',
    themeQuery: 'Healing',
  },
  {
    keywords: ['grace', 'mercy', 'undeserving', 'compassion'],
    response:
      'Grace is God\'s unmerited favor — His love poured out on those who deserve it least. Where sin abounded, grace did much more abound. Grace is not a license to sin but the power to overcome it.',
    themeQuery: 'Grace',
  },
];

function findBestAnswer(question: string): { response: string; themeQuery?: string } | null {
  const q = question.toLowerCase();
  for (const pattern of QA_PATTERNS) {
    if (pattern.keywords.some((kw) => q.includes(kw))) {
      return { response: pattern.response, themeQuery: pattern.themeQuery };
    }
  }
  return null;
}

export async function askQuestion(question: string): Promise<ChatMessage> {
  await delay(1200 + Math.random() * 800);

  try {
    const answer = findBestAnswer(question);
    const searchResults = await searchVerses(question);

    let verses: Verse[] = [];
    if (answer?.themeQuery) {
      verses = await getVersesByTheme(answer.themeQuery);
      verses = verses.slice(0, 3);
    } else if (searchResults.length > 0) {
      verses = searchResults.slice(0, 2);
    }

    const text = answer
      ? answer.response
      : `That is a profound question. The Bible offers rich guidance across many topics. I searched the scriptures and found ${verses.length > 0 ? 'some relevant passages' : 'wisdom that may speak to your heart'}. Consider studying these verses in their full context, using concordances and commentaries for deeper insight.`;

    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      text,
      verses: verses.length > 0 ? verses : await searchVerses(question).then(r => r.slice(0, 2)),
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('askQuestion error:', error);
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      text: 'I encountered an error retrieving scripture. Please try again.',
      timestamp: new Date(),
    };
  }
}

// --- Creative Text Generation ---
const CREATIVE_TEMPLATES: Record<string, string[]> = {
  Psalm: [
    `Praise be unto the Lord, for His mercies endure forever.\nAs the morning light breaketh upon the mountains,\nSo doth His grace illuminate the hearts of those who seek Him.\nI shall lift mine eyes unto the hills,\nFrom whence cometh my help.\nThe Lord is my light and my salvation —\nWhom shall I fear?\nIn His presence is fullness of joy;\nAt His right hand are pleasures forevermore.`,
    `O Lord, how excellent is Thy name in all the earth!\nThou hast set Thy glory above the heavens.\nWhen I consider Thy works — the moon and the stars —\nWhat is man, that Thou art mindful of him?\nYet Thou hast made him a little lower than the angels,\nAnd crowned him with glory and honour.\nLet the redeemed of the Lord say so,\nWhom He hath redeemed from the hand of the enemy.`,
  ],
  Prophecy: [
    `Thus saith the Lord of hosts:\nBehold, I will do a new thing in the earth.\nThe valleys shall be exalted,\nAnd every mountain and hill shall be made low.\nFor the glory of the Lord shall be revealed,\nAnd all flesh shall see it together.\nThe people that walked in darkness have seen a great light;\nThey that dwell in the land of the shadow of death —\nUpon them hath the light shined.`,
    `Hear ye the word of the Lord,\nFor He hath spoken in righteousness.\nA voice crieth in the wilderness:\nPrepare ye the way of the Lord,\nMake straight in the desert a highway for our God.\nFor He shall come as a refiner's fire,\nAnd as fuller's soap — to purify His people.\nAnd His name shall be called Wonderful, Counsellor,\nThe Mighty God, The Everlasting Father, The Prince of Peace.`,
  ],
  Proverb: [
    `A wise heart seeketh understanding,\nBut the fool despiseth correction.\nThe beginning of wisdom is the fear of the Lord,\nAnd knowledge of the Holy One is understanding.\nHe that walketh with the wise shall be wise,\nBut a companion of fools shall be destroyed.\nA soft answer turneth away wrath,\nBut grievous words stir up anger.\nTrust in the Lord with all thine heart.`,
    `The righteous man walketh in his integrity;\nBlessed are his children after him.\nA good name is rather to be chosen than great riches,\nAnd loving favour rather than silver and gold.\nIn all labour there is profit,\nBut the talk of the lips tendeth only to penury.\nThe Lord hath made all things for his purpose —\nYea, even the wicked for the day of evil.`,
  ],
  Gospel: [
    `Verily, verily I say unto you:\nHe that believeth on the Son hath everlasting life.\nFor God sent not his Son into the world to condemn the world,\nBut that the world through him might be saved.\nCome unto me, all ye that labour and are heavy laden,\nAnd I will give you rest.\nFor my yoke is easy, and my burden is light.\nBlessed are they that hunger and thirst after righteousness:\nFor they shall be filled.`,
    `The kingdom of heaven is like a grain of mustard seed,\nWhich a man took and sowed in his field.\nIt is the least of all seeds,\nBut when it is grown, it becometh a great tree —\nSo that the birds of the air come and lodge in its branches.\nFor with God all things are possible.\nSeek ye first the kingdom of God and His righteousness,\nAnd all these things shall be added unto you.`,
  ],
};

export async function generateBiblicalText(
  prompt: string,
  style: string
): Promise<GeneratedText> {
  await delay(2000 + Math.random() * 1000);
  const templates = CREATIVE_TEMPLATES[style] || CREATIVE_TEMPLATES['Psalm'];
  const chosen = templates[Math.floor(Math.random() * templates.length)];
  return { text: chosen, style };
}

// --- Semantic Search (Mock) ---
export async function semanticSearch(query: string): Promise<Verse[]> {
  await delay(800 + Math.random() * 400);
  
  try {
    const allResults = await searchVerses(query);
    
    const keywords = query.toLowerCase().split(' ').filter((w) => w.length > 3);
    const scored = allResults.map((v) => {
      let score = 0;
      keywords.forEach((kw) => {
        if (v.text.toLowerCase().includes(kw)) score += 2;
        if (v.themes.some((t) => t.toLowerCase().includes(kw))) score += 1;
        if (v.book.toLowerCase().includes(kw)) score += 1;
      });
      return { verse: v, score };
    });
    
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((s) => s.verse);
  } catch (error) {
    console.error('semanticSearch error:', error);
    return [];
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
