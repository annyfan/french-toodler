import * as fs from 'fs';
import * as path from 'path';

const SPEC_FILE = path.resolve('Spécification Détaillée - Web Interactif & Vidéo Apprentissage du Français (3 ans).md');
const OUT_DIR = path.resolve('src/data');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const content = fs.readFileSync(SPEC_FILE, 'utf-8');

interface WordItem {
  id: string;
  fr: string;
  en: string;
  zh: string;
  categoryId: number;
  subcategory: string;
  phonetics: string;
  audioUrl: string;
  illustrationAsset: string;
  animationType: 'bounce' | 'shake' | 'scale' | 'wiggle' | 'float' | 'pop';
  tags: string[];
  complexityLevel: number;
}

interface CategoryInfo {
  id: number;
  name_fr: string;
  name_en: string;
  name_zh: string;
  icon: string;
  color: string;
}

interface GrammarPair {
  id: string;
  type: 'complexity' | 'expression';
  level1: string;
  level2: string;
  en: string;
  zh: string;
  blocks: string[];
}

const CATEGORY_METADATA: Record<number, { en: string; zh: string; icon: string; color: string }> = {
  1: { en: "Sound Effects & Animal Sounds", zh: "声音与动物叫声", icon: "Volume2", color: "#EF476F" },
  2: { en: "Animals", zh: "动物", icon: "Cat", color: "#FFD166" },
  3: { en: "Vehicles", zh: "车辆交通", icon: "Car", color: "#06D6A0" },
  4: { en: "Toys", zh: "玩具", icon: "Gamepad2", color: "#118AB2" },
  5: { en: "Food & Drinks", zh: "食物与饮品", icon: "Apple", color: "#FB5607" },
  6: { en: "Clothing", zh: "衣物服饰", icon: "Shirt", color: "#8338EC" },
  7: { en: "Body Parts", zh: "身体部位", icon: "Smile", color: "#3A86FF" },
  8: { en: "Small Household Items", zh: "家居日常用品", icon: "Coffee", color: "#FF006E" },
  9: { en: "Furniture & Rooms", zh: "家具与房间", icon: "Armchair", color: "#8AC926" },
  10: { en: "Outside Things", zh: "户外与自然", icon: "Trees", color: "#1982C4" },
  11: { en: "Places to Go", zh: "场所与地点", icon: "Building2", color: "#6A4C93" },
  12: { en: "People", zh: "人物角色", icon: "Users", color: "#F15BB5" },
  13: { en: "Games & Routines", zh: "游戏与日常作息", icon: "Clock", color: "#00BBF9" },
  14: { en: "Verbs / Actions", zh: "常用动词与动作", icon: "Zap", color: "#00F5D4" },
  15: { en: "Descriptive Words", zh: "形容词与描述词", icon: "Sparkles", color: "#FEE440" },
  16: { en: "Time Words", zh: "时间词汇", icon: "Calendar", color: "#9B5DE5" },
  17: { en: "Pronouns", zh: "人称代词", icon: "UserCheck", color: "#F72585" },
  18: { en: "Question Words", zh: "疑问代词", icon: "HelpCircle", color: "#7209B7" },
  19: { en: "Prepositions & Locations", zh: "介词与空间方位", icon: "Compass", color: "#3F37C9" },
  20: { en: "Quantifiers & Articles", zh: "冠词与数量词", icon: "Hash", color: "#4CC9F0" },
  21: { en: "Conjunctions", zh: "连词", icon: "Link", color: "#560BAD" }
};

const words: WordItem[] = [];
const categories: CategoryInfo[] = [];
const grammarPairs: GrammarPair[] = [];

// Match category headers e.g.:
// ## **1\. EFFETS SONORES ET SONS D'ANIMAUX (12)**
const lines = content.split('\n');

let currentCatId = 0;
let currentCatName = '';
let inVocabularySection = false;
let inGrammarSectionC = false;
let inGrammarSectionD = false;

const animationTypes: WordItem['animationType'][] = ['bounce', 'pop', 'wiggle', 'scale', 'shake', 'float'];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  if (line.includes("# **3\\. 全量三语词汇与句型数据库")) {
    inVocabularySection = true;
    continue;
  }
  if (line.includes("# **4\\. 语法与句子复杂度演进数据库")) {
    inVocabularySection = false;
  }

  if (inVocabularySection) {
    // Check for category header: ## **1\. EFFETS SONORES ET SONS D'ANIMAUX (12)**
    const catMatch = line.match(/^##\s*\*\*(\d+)\\\.\s*([^*]+)\s*\(\d+\)\*\*/);
    if (catMatch) {
      currentCatId = parseInt(catMatch[1], 10);
      currentCatName = catMatch[2].trim();
      const meta = CATEGORY_METADATA[currentCatId] || { en: currentCatName, zh: currentCatName, icon: 'BookOpen', color: '#3B82F6' };
      categories.push({
        id: currentCatId,
        name_fr: currentCatName,
        name_en: meta.en,
        name_zh: meta.zh,
        icon: meta.icon,
        color: meta.color
      });
      continue;
    }

    // Check for table row: | ID | Français (Québec) | English | 中文 | Phonétique | Asset |
    if (line.startsWith('|') && !line.includes('ID | Français') && !line.includes(':----')) {
      const parts = line.split('|').map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (parts.length >= 6) {
        const [rawId, rawFr, rawEn, rawZh, rawPhonetics, rawAsset] = parts;
        const id = rawId.replace(/\\/g, '').trim();
        const fr = rawFr.replace(/\\/g, '').trim();
        const en = rawEn.replace(/\\/g, '').trim();
        const zh = rawZh.replace(/\\/g, '').trim();
        const phonetics = rawPhonetics.replace(/\\/g, '').trim();
        const asset = rawAsset.replace(/\\/g, '').trim();

        if (id && fr) {
          // Determine complexity based on category and word length
          let complexity = 1;
          if (currentCatId >= 14 && currentCatId <= 16) complexity = 2;
          if (currentCatId >= 17) complexity = 3;

          words.push({
            id,
            fr,
            en,
            zh,
            categoryId: currentCatId,
            subcategory: currentCatName,
            phonetics,
            audioUrl: `/audio/words/${id}.mp3`,
            illustrationAsset: asset,
            animationType: animationTypes[(words.length) % animationTypes.length],
            tags: [currentCatName.toLowerCase(), id.split('_')[0]],
            complexityLevel: complexity
          });
        }
      }
    }
  }

  // Grammar Parsing
  if (line.includes("Section C: Complexité des phrases")) {
    inGrammarSectionC = true;
    inGrammarSectionD = false;
    continue;
  }
  if (line.includes("Section D: Formes d'expression")) {
    inGrammarSectionC = false;
    inGrammarSectionD = true;
    continue;
  }
  if (line.startsWith('# **5\\.')) {
    inGrammarSectionC = false;
    inGrammarSectionD = false;
  }

  if (inGrammarSectionC && line.startsWith('|') && !line.includes('Pair ID') && !line.includes(':----')) {
    const parts = line.split('|').map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
    if (parts.length >= 5) {
      const [rawId, rawLvl1, rawLvl2, rawEn, rawZh] = parts;
      const id = rawId.replace(/\\/g, '').trim();
      const lvl1 = rawLvl1.replace(/\\/g, '').trim();
      const lvl2 = rawLvl2.replace(/\\/g, '').trim();
      const en = rawEn.replace(/\\/g, '').trim();
      const zh = rawZh.replace(/\\/g, '').trim();
      if (id && lvl1 && lvl2) {
        grammarPairs.push({
          id,
          type: 'complexity',
          level1: lvl1,
          level2: lvl2,
          en: en,
          zh: zh,
          blocks: lvl1.split(/\s+/).filter(Boolean)
        });
      }
    }
  }

  if (inGrammarSectionD && line.startsWith('|') && !line.includes('Pair ID') && !line.includes(':----')) {
    const parts = line.split('|').map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
    if (parts.length >= 5) {
      const [rawId, rawFormA, rawFormB, rawEn, rawZh] = parts;
      const id = rawId.replace(/\\/g, '').trim();
      const formA = rawFormA.replace(/\\/g, '').trim();
      const formB = rawFormB.replace(/\\/g, '').trim();
      const en = rawEn.replace(/\\/g, '').trim();
      const zh = rawZh.replace(/\\/g, '').trim();
      if (id && formA && formB) {
        grammarPairs.push({
          id,
          type: 'expression',
          level1: formA,
          level2: formB,
          en: en,
          zh: zh,
          blocks: formA.split(/\s+/).filter(Boolean)
        });
      }
    }
  }
}

// Scene definitions with interactive placement coordinates (percentages 0-100)
const scenes = [
  {
    id: "salon",
    name_fr: "Le Salon",
    name_en: "Living Room",
    name_zh: "客厅",
    bgGradient: "from-amber-100 via-orange-50 to-amber-200",
    floorColor: "#D4A373",
    items: [
      { wordId: "fur_04", x: 48, y: 55, size: 160, label: "divan / sofa" },
      { wordId: "ani_08", x: 52, y: 56, size: 70, label: "chat" },
      { wordId: "fur_32", x: 80, y: 35, size: 120, label: "télévision" },
      { wordId: "fur_13", x: 20, y: 32, size: 80, label: "lampe" },
      { wordId: "toy_16", x: 28, y: 64, size: 60, label: "livre" },
      { wordId: "toy_02", x: 74, y: 72, size: 65, label: "ballon" },
      { wordId: "toy_20", x: 38, y: 52, size: 65, label: "toutou" }
    ]
  },
  {
    id: "cuisine",
    name_fr: "La Cuisine",
    name_en: "Kitchen",
    name_zh: "厨房",
    bgGradient: "from-emerald-50 via-teal-50 to-cyan-100",
    floorColor: "#A8DADC",
    items: [
      { wordId: "fur_08", x: 22, y: 38, size: 140, label: "frigidaire" },
      { wordId: "fur_29", x: 60, y: 58, size: 150, label: "table" },
      { wordId: "fur_02", x: 42, y: 58, size: 90, label: "chaise" },
      { wordId: "foo_46", x: 57, y: 50, size: 55, label: "pomme" },
      { wordId: "foo_01", x: 63, y: 50, size: 55, label: "banane" },
      { wordId: "foo_32", x: 68, y: 47, size: 55, label: "lait" },
      { wordId: "foo_05", x: 73, y: 52, size: 50, label: "biscuit" },
      { wordId: "hou_46", x: 53, y: 53, size: 45, label: "tasse" }
    ]
  },
  {
    id: "cour",
    name_fr: "La Cour & Le Jardin",
    name_en: "Backyard & Park",
    name_zh: "院子与公园",
    bgGradient: "from-sky-200 via-sky-100 to-emerald-100",
    floorColor: "#74C69D",
    items: [
      { wordId: "out_01", x: 18, y: 40, size: 160, label: "arbre" },
      { wordId: "out_30", x: 82, y: 18, size: 90, label: "soleil" },
      { wordId: "out_17", x: 50, y: 20, size: 80, label: "nuage" },
      { wordId: "ani_11", x: 32, y: 68, size: 95, label: "chien" },
      { wordId: "ani_26", x: 22, y: 35, size: 50, label: "oiseau" },
      { wordId: "ani_15", x: 14, y: 58, size: 55, label: "écureuil" },
      { wordId: "out_04", x: 66, y: 52, size: 120, label: "balançoire" },
      { wordId: "veh_05", x: 82, y: 65, size: 95, label: "bicyclette" }
    ]
  },
  {
    id: "chambre",
    name_fr: "La Chambre",
    name_en: "Bedroom",
    name_zh: "卧室",
    bgGradient: "from-indigo-100 via-purple-50 to-pink-100",
    floorColor: "#E2CFEA",
    items: [
      { wordId: "fur_14", x: 45, y: 54, size: 160, label: "lit" },
      { wordId: "toy_20", x: 38, y: 48, size: 65, label: "toutou" },
      { wordId: "fur_10", x: 80, y: 42, size: 120, label: "garde-robe" },
      { wordId: "toy_04", x: 22, y: 72, size: 75, label: "bloc" },
      { wordId: "toy_18", x: 62, y: 70, size: 70, label: "poupée" },
      { wordId: "clo_22", x: 54, y: 50, size: 60, label: "pyjama" }
    ]
  }
];

// Write files
fs.writeFileSync(path.join(OUT_DIR, 'vocabulary.json'), JSON.stringify(words, null, 2), 'utf-8');
fs.writeFileSync(path.join(OUT_DIR, 'categories.json'), JSON.stringify(categories, null, 2), 'utf-8');
fs.writeFileSync(path.join(OUT_DIR, 'grammarPairs.json'), JSON.stringify(grammarPairs, null, 2), 'utf-8');
fs.writeFileSync(path.join(OUT_DIR, 'scenes.json'), JSON.stringify(scenes, null, 2), 'utf-8');

console.log(`Successfully parsed:`);
console.log(`- ${words.length} Vocabulary Words`);
console.log(`- ${categories.length} Categories`);
console.log(`- ${grammarPairs.length} Grammar Evolution Benchmark Pairs`);
console.log(`- ${scenes.length} Interactive Vector Scenes`);
