import { UserProgress, MasteryStatus, GrammarEvolutionStatus } from '../types';

const STORAGE_KEY = 'baobao_french_cdi_progress_v1';

export class ProgressTracker {
  private progress: UserProgress;
  private listeners: Set<(progress: UserProgress) => void> = new Set();

  constructor() {
    this.progress = this.loadInitialProgress();
  }

  private loadInitialProgress(): UserProgress {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }

    return {
      userId: 'toddler_profile_' + Math.random().toString(36).substring(2, 9),
      updatedAt: new Date().toISOString(),
      vocabulary: {},
      grammarPairs: {},
      wordExposures: {},
      totalWordsMastered: 0
    };
  }

  private persist() {
    this.progress.updatedAt = new Date().toISOString();
    // Recalculate total mastered
    const masteredCount = Object.values(this.progress.vocabulary).filter(v => v === 'OFTEN').length;
    this.progress.totalWordsMastered = masteredCount;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch {
      // Handle storage quota
    }
    this.notify();
  }

  public subscribe(fn: (progress: UserProgress) => void): () => void {
    this.listeners.add(fn);
    fn(this.progress);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach(fn => fn({ ...this.progress }));
  }

  public getProgress(): UserProgress {
    return { ...this.progress };
  }

  // Called automatically when toddler taps or plays with an object
  public recordWordInteraction(wordId: string): void {
    const currentCount = (this.progress.wordExposures[wordId] || 0) + 1;
    this.progress.wordExposures[wordId] = currentCount;

    // Auto-advance developmental mastery status based on repeated exposure
    const currentStatus = this.progress.vocabulary[wordId];
    if (!currentStatus || currentStatus === 'NOT_YET') {
      if (currentCount >= 2) {
        this.progress.vocabulary[wordId] = 'SOMETIMES';
      }
    } else if (currentStatus === 'SOMETIMES') {
      if (currentCount >= 5) {
        this.progress.vocabulary[wordId] = 'OFTEN';
      }
    }

    this.persist();
  }

  public setWordStatus(wordId: string, status: MasteryStatus): void {
    this.progress.vocabulary[wordId] = status;
    this.persist();
  }

  public recordGrammarInteraction(pairId: string, level: 1 | 2): void {
    const status: GrammarEvolutionStatus = level === 2 ? 'LEVEL_2_GRAMMATICAL' : 'LEVEL_1_TELEGRAPHIC';
    this.progress.grammarPairs[pairId] = status;
    this.persist();
  }

  public exportJSON(): string {
    return JSON.stringify(this.progress, null, 2);
  }

  public importJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.vocabulary && parsed.grammarPairs) {
        this.progress = parsed;
        this.persist();
        return true;
      }
    } catch {
      // Invalid JSON
    }
    return false;
  }

  public reset(): void {
    this.progress = {
      userId: 'toddler_profile_' + Math.random().toString(36).substring(2, 9),
      updatedAt: new Date().toISOString(),
      vocabulary: {},
      grammarPairs: {},
      wordExposures: {},
      totalWordsMastered: 0
    };
    this.persist();
  }
}

export const progressTracker = new ProgressTracker();
