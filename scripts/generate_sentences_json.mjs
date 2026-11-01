import fs from 'fs';
import path from 'path';

const MD_PATH = fs.existsSync(path.resolve('src/data/sentences_source.md'))
  ? path.resolve('src/data/sentences_source.md')
  : 'C:/Users/fanwe/.gemini/antigravity/brain/20366f2b-5dd0-4fec-b25a-2d648b8e1f92/.user_uploaded/media_1793543471323_4f886aa7.md';
const VOCAB_PATH = path.resolve('src/data/vocabulary.json');
const OUT_PATH = path.resolve('src/data/sentences.json');

const mdContent = fs.readFileSync(MD_PATH, 'utf8');
const vocab = JSON.parse(fs.readFileSync(VOCAB_PATH, 'utf8'));

// Helper to normalize text for search
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Build list of noun entries (categories 2 through 13)
// Map variants (e.g. bedaine, ventre, auto, voiture, chat, etc.)
const nounLookup = [];
for (const word of vocab) {
  if (word.categoryId >= 2 && word.categoryId <= 13) {
    const parts = word.fr.split('/');
    for (const p of parts) {
      const norm = normalize(p);
      if (norm.length >= 3) {
        nounLookup.push({ key: norm, word });
      }
    }
  }
}

// Sort longest keys first for greedy matching
nounLookup.sort((a, b) => b.key.length - a.key.length);

function findObjectWord(sentenceText, currentWordId) {
  const normSent = ' ' + normalize(sentenceText) + ' ';

  for (const { key, word } of nounLookup) {
    if (word.id === currentWordId) continue;
    const regex = new RegExp(`[\\s]${key}[s]?[\\s]`, 'i');
    if (regex.test(normSent)) {
      return word.id;
    }
  }

  return null;
}

function parseSection(sectionText, type, idPrefix, pad) {
  const blocks = sectionText.split(/(?=###\s+\d+\.)/g).filter(b => b.trim().startsWith('###'));
  const results = [];
  const pronouns = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];

  for (const block of blocks) {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const headerMatch = lines[0].match(/###\s+(\d+)\.\s+(.+)/);
    if (!headerMatch) continue;

    const index = parseInt(headerMatch[1], 10);
    const wordTitle = headerMatch[2].trim();
    const id = idPrefix + String(index).padStart(pad, '0');

    const vocabItem = vocab.find(w => w.id === id);

    const sentencesA = {};
    const sentencesB = {};

    for (const line of lines) {
      if (!line.startsWith('|')) continue;
      const parts = line.split('|').map(p => p.trim()).filter(p => p.length > 0);
      if (parts.length >= 3) {
        const pronom = parts[0].toLowerCase();
        if (pronouns.includes(pronom)) {
          sentencesA[pronom] = parts[1];
          sentencesB[pronom] = parts[2];
        }
      }
    }

    // Identify object/complement noun for illustration
    const objectWordIdA = findObjectWord(sentencesA['je'] || '', id);
    const objectWordIdB = findObjectWord(sentencesB['je'] || '', id);

    results.push({
      id,
      index,
      word: vocabItem ? vocabItem.fr : wordTitle,
      type,
      categoryId: vocabItem ? vocabItem.categoryId : (type === 'verb' ? 14 : 15),
      en: vocabItem ? vocabItem.en : '',
      zh: vocabItem ? vocabItem.zh : '',
      illustrationAsset: vocabItem ? vocabItem.illustrationAsset : `${id}.svg`,
      examples: {
        A: {
          sentences: sentencesA,
          objectWordId: objectWordIdA
        },
        B: {
          sentences: sentencesB,
          objectWordId: objectWordIdB
        }
      }
    });
  }
  return results;
}

const verbSection = mdContent.slice(mdContent.indexOf('## 1. Verbes'), mdContent.indexOf('## 2. Mots descriptifs'));
const descSection = mdContent.slice(mdContent.indexOf('## 2. Mots descriptifs'));

const parsedVerbs = parseSection(verbSection, 'verb', 'vrb_', 3);
const parsedDescriptors = parseSection(descSection, 'descriptor', 'des_', 2);

const allSentences = [...parsedVerbs, ...parsedDescriptors];

fs.writeFileSync(OUT_PATH, JSON.stringify(allSentences, null, 2), 'utf8');

console.log(`Successfully generated ${OUT_PATH}`);
console.log(`Total words: ${allSentences.length} (Verbs: ${parsedVerbs.length}, Descriptors: ${parsedDescriptors.length})`);
