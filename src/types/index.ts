export type MasteryStatus = 'NOT_YET' | 'SOMETIMES' | 'OFTEN';

export interface WordItem {
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

export interface CategoryInfo {
  id: number;
  name_fr: string;
  name_en: string;
  name_zh: string;
  icon: string;
  color: string;
}

export type GrammarEvolutionStatus = 'LEVEL_1_TELEGRAPHIC' | 'LEVEL_2_GRAMMATICAL';

export interface GrammarPair {
  id: string;
  type: 'complexity' | 'expression';
  level1: string;
  level2: string;
  en: string;
  zh: string;
  blocks: string[];
}

export interface UserProgress {
  userId: string;
  updatedAt: string;
  vocabulary: Record<string, MasteryStatus>;
  grammarPairs: Record<string, GrammarEvolutionStatus>;
  wordExposures: Record<string, number>;
  totalWordsMastered: number;
}

export interface SceneItemConfig {
  wordId: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  label?: string;
}

export interface SceneConfig {
  id: string;
  name_fr: string;
  name_en: string;
  name_zh: string;
  bgGradient: string;
  floorColor: string;
  items: SceneItemConfig[];
}

export type ToddlerModule = 'exploratory' | 'imagier' | 'sentences' | 'simon';

export type AudioPriorityMode = 'STUDIO_THEN_SPEECH' | 'ALWAYS_SPEECH' | 'CUSTOM_AUDIO_FIRST';

export interface VoiceSettings {
  voiceURI: string;
  rate: number;
  pitch: number;
  priority: AudioPriorityMode;
}

export interface CustomMediaRecord {
  customImages: Record<string, string>;
  customAudios: Record<string, string>;
  voiceSettings: VoiceSettings;
}

export type SubjectPronoun = 'je' | 'tu' | 'il' | 'elle' | 'nous' | 'vous' | 'ils' | 'elles';

export interface SentenceExampleSet {
  sentences: Record<SubjectPronoun, string>;
  translations?: {
    en: Record<SubjectPronoun, string>;
    zh: Record<SubjectPronoun, string>;
  };
  objectWordId?: string | null;
}

export interface SentenceExercise {
  id: string;
  index: number;
  word: string;
  type: 'verb' | 'descriptor';
  categoryId: number;
  en: string;
  zh: string;
  illustrationAsset: string;
  examples: {
    A: SentenceExampleSet;
    B: SentenceExampleSet;
  };
}
