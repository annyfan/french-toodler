import baseSentences from '../data/sentences.json';
import baseCategories from '../data/categories.json';
import baseVocabulary from '../data/vocabulary.json';
import baseGrammarPairs from '../data/grammarPairs.json';
import { CategoryInfo, WordItem, GrammarPair, SentenceExercise } from '../types';
import { mediaCustomizationManager } from './MediaCustomizationManager';

const STORAGE_KEY = 'baobao_custom_content_v1';

interface CustomContentStore {
  categories: CategoryInfo[];
  words: WordItem[];
  grammarPairs: GrammarPair[];
  wordOverrides?: Record<string, Partial<WordItem>>;
  grammarPairOverrides?: Record<string, Partial<GrammarPair>>;
}

export class ContentManager {
  private customCategories: CategoryInfo[] = [];
  private customWords: WordItem[] = [];
  private customGrammarPairs: GrammarPair[] = [];
  private wordOverrides: Record<string, Partial<WordItem>> = {};
  private grammarPairOverrides: Record<string, Partial<GrammarPair>> = {};
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: CustomContentStore = JSON.parse(saved);
        this.customCategories = parsed.categories || [];
        this.customWords = parsed.words || [];
        this.customGrammarPairs = parsed.grammarPairs || [];
        this.wordOverrides = parsed.wordOverrides || {};
        this.grammarPairOverrides = parsed.grammarPairOverrides || {};
      }
    } catch (e) {
      console.warn('Failed to load custom content:', e);
    }
  }

  private persist(): void {
    if (typeof window === 'undefined') return;
    try {
      const data: CustomContentStore = {
        categories: this.customCategories,
        words: this.customWords,
        grammarPairs: this.customGrammarPairs,
        wordOverrides: this.wordOverrides,
        grammarPairOverrides: this.grammarPairOverrides,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save custom content to localStorage:', e);
    }
    this.notify();
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn());
  }

  // --- Categories ---
  public getCategories(): CategoryInfo[] {
    return [...(baseCategories as CategoryInfo[]), ...this.customCategories];
  }

  public getCategory(id: number): CategoryInfo | undefined {
    return this.getCategories().find(c => c.id === id);
  }

  public isCustomCategory(id: number): boolean {
    return this.customCategories.some(c => c.id === id);
  }

  public addCategory(cat: Omit<CategoryInfo, 'id'>): CategoryInfo {
    const all = this.getCategories();
    const maxId = all.reduce((max, c) => Math.max(max, c.id), 0);
    const newCategory: CategoryInfo = {
      ...cat,
      id: maxId + 1,
    };
    this.customCategories.push(newCategory);
    this.persist();
    return newCategory;
  }

  public updateCategory(id: number, data: Partial<CategoryInfo>): void {
    const idx = this.customCategories.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.customCategories[idx] = {
        ...this.customCategories[idx],
        ...data,
      };
      this.persist();
    }
  }

  public deleteCategory(id: number): void {
    this.customCategories = this.customCategories.filter(c => c.id !== id);
    this.customWords = this.customWords.filter(w => w.categoryId !== id);
    this.persist();
  }

  // --- Vocabulary Words ---
  public getWords(): WordItem[] {
    const baseWithOverrides = (baseVocabulary as WordItem[]).map(base => {
      const override = this.wordOverrides[base.id.toLowerCase()];
      return override ? { ...base, ...override } : base;
    });
    return [...baseWithOverrides, ...this.customWords];
  }

  public getWord(id: string): WordItem | undefined {
    return this.getWords().find(w => w.id.toLowerCase() === id.toLowerCase());
  }

  public isCustomWord(id: string): boolean {
    return this.customWords.some(w => w.id.toLowerCase() === id.toLowerCase());
  }

  public isOverriddenWord(id: string): boolean {
    return !!this.wordOverrides[id.toLowerCase()];
  }

  public addWord(
    wordData: Omit<WordItem, 'id' | 'audioUrl' | 'illustrationAsset'> & {
      audioUrl?: string;
      illustrationAsset?: string;
    },
    customImage?: string,
    customAudio?: string
  ): WordItem {
    const safeSlug = wordData.fr
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 16);

    const newId = `usr_${safeSlug}_${Date.now().toString(36).slice(-4)}`;

    const newWord: WordItem = {
      id: newId,
      fr: wordData.fr.trim(),
      en: (wordData.en || '').trim(),
      zh: (wordData.zh || '').trim(),
      categoryId: wordData.categoryId,
      subcategory: wordData.subcategory || 'VOCABULAIRE PERSONNALISÉ',
      phonetics: wordData.phonetics?.trim() || `/${wordData.fr.trim()}/`,
      audioUrl: wordData.audioUrl || `/audio/words/${newId}.mp3`,
      illustrationAsset: wordData.illustrationAsset || `${newId}.svg`,
      animationType: wordData.animationType || 'bounce',
      tags: wordData.tags || ['personnalisé', 'parent'],
      complexityLevel: wordData.complexityLevel || 1,
    };

    this.customWords.push(newWord);

    if (customImage) {
      mediaCustomizationManager.setCustomImage(newId, customImage);
    }
    if (customAudio) {
      mediaCustomizationManager.setCustomAudio(newId, customAudio);
    }

    this.persist();
    return newWord;
  }

  public updateWord(
    id: string,
    data: Partial<WordItem>,
    customImage?: string | null,
    customAudio?: string | null
  ): void {
    const normId = id.toLowerCase();
    const isCustom = this.isCustomWord(normId);

    if (isCustom) {
      const idx = this.customWords.findIndex(w => w.id.toLowerCase() === normId);
      if (idx !== -1) {
        this.customWords[idx] = {
          ...this.customWords[idx],
          ...data,
        };
      }
    } else {
      // Base word override
      this.wordOverrides[normId] = {
        ...(this.wordOverrides[normId] || {}),
        ...data,
      };
    }

    // Handle custom image updates
    if (customImage !== undefined) {
      if (customImage) {
        mediaCustomizationManager.setCustomImage(normId, customImage);
      } else {
        mediaCustomizationManager.removeCustomImage(normId);
      }
    }

    // Handle custom audio updates
    if (customAudio !== undefined) {
      if (customAudio) {
        mediaCustomizationManager.setCustomAudio(normId, customAudio);
      } else {
        mediaCustomizationManager.removeCustomAudio(normId);
      }
    }

    this.persist();
  }

  public resetWordOverride(id: string): void {
    const normId = id.toLowerCase();
    if (this.wordOverrides[normId]) {
      delete this.wordOverrides[normId];
      this.persist();
    }
  }

  public deleteWord(id: string): void {
    const normId = id.toLowerCase();
    this.customWords = this.customWords.filter(w => w.id.toLowerCase() !== normId);
    if (this.wordOverrides[normId]) {
      delete this.wordOverrides[normId];
    }
    mediaCustomizationManager.removeCustomImage(normId);
    mediaCustomizationManager.removeCustomAudio(normId);
    this.persist();
  }

  // --- Grammar Pairs (Sentences & Syntax) ---
  public getGrammarPairs(): GrammarPair[] {
    const baseWithOverrides = (baseGrammarPairs as GrammarPair[]).map(base => {
      const override = this.grammarPairOverrides[base.id];
      return override ? { ...base, ...override } : base;
    });
    return [...baseWithOverrides, ...this.customGrammarPairs];
  }

  public getGrammarPair(id: string): GrammarPair | undefined {
    return this.getGrammarPairs().find(p => p.id === id);
  }

  public isCustomGrammarPair(id: string): boolean {
    return this.customGrammarPairs.some(p => p.id === id);
  }

  public isOverriddenGrammarPair(id: string): boolean {
    return !!this.grammarPairOverrides[id];
  }

  public addGrammarPair(pairData: Omit<GrammarPair, 'id'>): GrammarPair {
    const safeSlug = pairData.level1
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 14);

    const newId = `grm_usr_${safeSlug}_${Date.now().toString(36).slice(-4)}`;

    const newPair: GrammarPair = {
      id: newId,
      type: pairData.type || 'complexity',
      level1: pairData.level1.trim(),
      level2: pairData.level2.trim(),
      en: pairData.en?.trim() || '',
      zh: pairData.zh?.trim() || '',
      blocks: pairData.blocks && pairData.blocks.length >= 2
        ? [pairData.blocks[0].trim(), pairData.blocks[1].trim()]
        : [pairData.level1.split(' ')[0] || 'Mot 1', pairData.level1.split(' ')[1] || 'Mot 2'],
    };

    this.customGrammarPairs.push(newPair);
    this.persist();
    return newPair;
  }

  public updateGrammarPair(id: string, data: Partial<GrammarPair>): void {
    const isCustom = this.isCustomGrammarPair(id);

    if (isCustom) {
      const idx = this.customGrammarPairs.findIndex(p => p.id === id);
      if (idx !== -1) {
        this.customGrammarPairs[idx] = {
          ...this.customGrammarPairs[idx],
          ...data,
        };
      }
    } else {
      // Base grammar pair override
      this.grammarPairOverrides[id] = {
        ...(this.grammarPairOverrides[id] || {}),
        ...data,
      };
    }

    this.persist();
  }

  public resetGrammarPairOverride(id: string): void {
    if (this.grammarPairOverrides[id]) {
      delete this.grammarPairOverrides[id];
      this.persist();
    }
  }

  public deleteGrammarPair(id: string): void {
    this.customGrammarPairs = this.customGrammarPairs.filter(p => p.id !== id);
    if (this.grammarPairOverrides[id]) {
      delete this.grammarPairOverrides[id];
    }
    this.persist();
  }

  // --- Sentence Exercises (from sentences.json) ---
  public getSentences(): SentenceExercise[] {
    return baseSentences as unknown as SentenceExercise[];
  }

  public getSentence(id: string): SentenceExercise | undefined {
    return this.getSentences().find(s => s.id.toLowerCase() === id.toLowerCase());
  }

  public hasSentence(id: string): boolean {
    if (!id) return false;
    return this.getSentence(id) !== undefined;
  }
}

export const contentManager = new ContentManager();
