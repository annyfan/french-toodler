import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentManager } from '../../engine/ContentManager';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager } from '../../engine/SpeechManager';
import { ToddlerGraphic } from '../common/ToddlerGraphic';
import { SentenceExercise, SubjectPronoun } from '../../types';

interface SentenceBuilderProps {
  showLabels?: boolean;
  initialWordId?: string | null;
  onWordIdConsumed?: () => void;
  onBackToImagier?: (categoryId: number, wordId?: string) => void;
}

type CategoryFilter = 'all' | 'verb' | 'descriptor';

interface PronounDef {
  id: SubjectPronoun;
  label: string;
  icon: string;
  role: string;
  en: string;
  zh: string;
  group: 'singular' | 'plural';
}

const SINGULAR_PRONOUNS: PronounDef[] = [
  { id: 'je', label: 'Je / J’', icon: '👧', role: 'Moi !', en: 'I', zh: '我', group: 'singular' },
  { id: 'tu', label: 'Tu', icon: '👉', role: 'Toi !', en: 'You', zh: '你', group: 'singular' },
  { id: 'il', label: 'Il', icon: '👦', role: 'Garçon', en: 'He', zh: '他', group: 'singular' },
  { id: 'elle', label: 'Elle', icon: '👧', role: 'Fille', en: 'She', zh: '她', group: 'singular' },
];

const PLURAL_PRONOUNS: PronounDef[] = [
  { id: 'nous', label: 'Nous', icon: '👨‍👩‍👧', role: 'Ensemble', en: 'We', zh: '我们', group: 'plural' },
  { id: 'vous', label: 'Vous', icon: '👥', role: 'Vous tous', en: 'You', zh: '你们', group: 'plural' },
  { id: 'ils', label: 'Ils', icon: '👦👦', role: 'Garçons', en: 'They (m)', zh: '他们', group: 'plural' },
  { id: 'elles', label: 'Elles', icon: '👧👧', role: 'Filles', en: 'They (f)', zh: '她们', group: 'plural' },
];

const ALL_PRONOUNS: PronounDef[] = [...SINGULAR_PRONOUNS, ...PLURAL_PRONOUNS];

interface HeroSentenceImageProps {
  exercise: SentenceExercise;
  activeExample: 'A' | 'B';
  sentenceText: string;
  isPlaying: boolean;
}

const HeroSentenceImage: React.FC<HeroSentenceImageProps> = ({
  exercise,
  activeExample,
  sentenceText,
  isPlaying,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image states when exercise or active example changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [exercise.id, activeExample]);

  const imageUrl = `./illustrations/sentences/${exercise.id}_${activeExample}.jpg`;

  if (!imageError) {
    return (
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] flex items-center justify-center bg-slate-50 overflow-hidden">
        <img
          key={`${exercise.id}_${activeExample}`}
          src={imageUrl}
          alt={sentenceText}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover sm:object-contain transition-all duration-300 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${isPlaying ? 'scale-[1.02]' : ''}`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // Graceful Single-Image Story Fallback featuring Yannick as Hero
  // (Cohesive story vignette: Yannick performing the action, never split dual cards or arrows)
  return (
    <div className="w-full h-[240px] sm:h-[300px] md:h-[340px] flex items-center justify-center bg-gradient-to-b from-sky-100 via-teal-50 to-amber-50 p-4 relative overflow-hidden">
      {/* Background soft storybook elements */}
      <div className="absolute top-3 left-4 text-3xl opacity-40 select-none">☁️</div>
      <div className="absolute top-4 right-8 text-3xl opacity-40 select-none">☀️</div>
      <div className="absolute bottom-2 left-6 text-2xl opacity-30 select-none">🌸</div>
      <div className="absolute bottom-2 right-6 text-2xl opacity-30 select-none">🌿</div>

      {/* Hero Vignette: Yannick + Core Concept */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 z-10">
        {/* Yannick character */}
        <div className="w-32 h-44 sm:w-44 sm:h-56 relative shrink-0 flex items-center justify-center drop-shadow-md">
          <img
            src="./illustrations/yannick.png"
            alt="Yannick"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Action / Context Badge */}
        <div className="flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-3xl p-3 sm:p-4 shadow-lg border-2 border-teal-200 max-w-[200px] text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-1">
            <ToddlerGraphic
              id={exercise.id}
              word={exercise.word}
              category={exercise.categoryId}
              size={72}
            />
          </div>
          <span className="text-base sm:text-lg font-black text-slate-800 capitalize leading-tight">
            {exercise.word}
          </span>
          <span className="text-[11px] font-bold text-teal-600 mt-0.5">
            {exercise.type === 'verb' ? 'Action de Yannick' : 'Description'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  showLabels = true,
  initialWordId = null,
  onWordIdConsumed,
  onBackToImagier,
}) => {
  const [exercises, setExercises] = useState<SentenceExercise[]>(() => contentManager.getSentences());
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [currentWordId, setCurrentWordId] = useState<string>(() => contentManager.getSentences()[0]?.id || 'vrb_001');
  const [activeExample, setActiveExample] = useState<'A' | 'B'>('A');
  const [activePronoun, setActivePronoun] = useState<SubjectPronoun>('je');
  const [isWordPickerOpen, setIsWordPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pickerFilter, setPickerFilter] = useState<CategoryFilter>('all');
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync exercises if updated in content manager
  useEffect(() => {
    return contentManager.subscribe(() => {
      setExercises(contentManager.getSentences());
    });
  }, []);

  // Filter exercises by category for main stage
  const filteredExercises = useMemo(() => {
    if (categoryFilter === 'verb') return exercises.filter(e => e.type === 'verb');
    if (categoryFilter === 'descriptor') return exercises.filter(e => e.type === 'descriptor');
    return exercises;
  }, [exercises, categoryFilter]);

  // Current active exercise - single source of truth based on currentWordId
  const currentExercise = useMemo(() => {
    return exercises.find(e => e.id.toLowerCase() === currentWordId.toLowerCase()) || exercises[0];
  }, [exercises, currentWordId]);

  // Index within filtered list for display (e.g. 5 / 109)
  const currentIndex = useMemo(() => {
    const idx = filteredExercises.findIndex(e => e.id.toLowerCase() === currentWordId.toLowerCase());
    return idx !== -1 ? idx : 0;
  }, [filteredExercises, currentWordId]);

  // Resolve current sentence and object
  const currentExampleSet = currentExercise ? currentExercise.examples[activeExample] : undefined;
  const currentPronounDef = ALL_PRONOUNS.find(p => p.id === activePronoun);
  const sentenceText = currentExampleSet ? currentExampleSet.sentences[activePronoun] : '';
  const currentEnSentence = currentExampleSet?.translations?.en?.[activePronoun] || '';
  const currentZhSentence = currentExampleSet?.translations?.zh?.[activePronoun] || '';
  const objectWordId = currentExampleSet?.objectWordId;
  const objectWord = objectWordId ? contentManager.getWord(objectWordId) : undefined;

  // Play authentic studio neural audio (fr-CA-SylvieNeural) with SpeechSynthesis fallback
  const playSentence = useCallback((
    targetWordId = currentWordId,
    targetExample = activeExample,
    targetPronoun = activePronoun,
    textOverride?: string
  ) => {
    const targetEx = exercises.find(e => e.id.toLowerCase() === targetWordId.toLowerCase());
    const exSet = targetEx?.examples?.[targetExample] || targetEx?.examples?.A;
    const text = textOverride || exSet?.sentences?.[targetPronoun] || exSet?.sentences?.je;
    if (!text) return;

    setIsPlaying(true);

    speechManager.playSentenceAudio(
      targetWordId,
      targetExample,
      targetPronoun,
      text,
      () => {
        setIsPlaying(false);
      }
    );
  }, [currentWordId, activeExample, activePronoun, exercises]);

  // Keep ref to playSentence for reliable, non-stale timer calls without triggering re-renders
  const playSentenceRef = useRef(playSentence);
  useEffect(() => {
    playSentenceRef.current = playSentence;
  }, [playSentence]);

  // Directly select and activate a word from modal or navigation
  const selectWord = useCallback((wordId: string) => {
    const target = exercises.find(e => e.id.toLowerCase() === wordId.toLowerCase());
    if (!target) return;

    audioManager.playPop(520);
    setCurrentWordId(target.id);
    setIsWordPickerOpen(false);
    setSearchQuery('');

    // Align main filter if target type is not in current filter
    if (categoryFilter !== 'all' && categoryFilter !== target.type) {
      setCategoryFilter(target.type);
    }

    // Play studio sentence immediately for this newly selected word
    setTimeout(() => {
      playSentenceRef.current(target.id, activeExample, activePronoun);
    }, 120);
  }, [exercises, categoryFilter, activeExample, activePronoun]);

  // Handle external navigation with pre-selected word ID (e.g. from L'Imagier)
  useEffect(() => {
    if (!initialWordId) return;

    // Immediately consume the word ID in parent to avoid re-triggering on future renders
    if (onWordIdConsumed) {
      onWordIdConsumed();
    }

    const allExercises = exercises.length > 0 ? exercises : contentManager.getSentences();
    const target = allExercises.find(e => e.id.toLowerCase() === initialWordId.toLowerCase());
    if (target) {
      setCurrentWordId(target.id);
      setCategoryFilter(target.type);
      setActiveExample('A');
      setActivePronoun('je');
      const timer = setTimeout(() => {
        playSentenceRef.current(target.id, 'A', 'je');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [initialWordId, onWordIdConsumed, exercises]);

  // Handle pronoun selection with immediate speech
  const handleSelectPronoun = (pronoun: SubjectPronoun) => {
    audioManager.playPop(460);
    setActivePronoun(pronoun);
    playSentence(currentWordId, activeExample, pronoun);
  };

  // Toggle example A/B
  const handleToggleExample = (example: 'A' | 'B') => {
    audioManager.playPop(480);
    setActiveExample(example);
    playSentence(currentWordId, example, activePronoun);
  };

  // Switch category filter in main view
  const handleCategoryFilterChange = (filter: CategoryFilter) => {
    audioManager.playPop(380);
    setCategoryFilter(filter);
    // If current word is not in the new filter, switch to first word in new filter
    if (filter !== 'all' && currentExercise.type !== filter) {
      const list = exercises.filter(e => e.type === filter);
      if (list[0]) {
        setCurrentWordId(list[0].id);
        setTimeout(() => {
          playSentence(list[0].id, activeExample, activePronoun);
        }, 120);
      }
    }
  };

  // Next word
  const handleNext = useCallback(() => {
    audioManager.playPop(500);
    const idx = filteredExercises.findIndex(e => e.id.toLowerCase() === currentWordId.toLowerCase());
    const nextIdx = (idx + 1) % filteredExercises.length;
    const nextWord = filteredExercises[nextIdx];
    if (nextWord) {
      setCurrentWordId(nextWord.id);
      playSentence(nextWord.id, activeExample, activePronoun);
    }
  }, [filteredExercises, currentWordId, activeExample, activePronoun, playSentence]);

  // Previous word
  const handlePrev = useCallback(() => {
    audioManager.playPop(420);
    const idx = filteredExercises.findIndex(e => e.id.toLowerCase() === currentWordId.toLowerCase());
    const prevIdx = (idx - 1 + filteredExercises.length) % filteredExercises.length;
    const prevWord = filteredExercises[prevIdx];
    if (prevWord) {
      setCurrentWordId(prevWord.id);
      playSentence(prevWord.id, activeExample, activePronoun);
    }
  }, [filteredExercises, currentWordId, activeExample, activePronoun, playSentence]);

  // Random word
  const handleRandom = useCallback(() => {
    audioManager.playPop(600);
    if (filteredExercises.length <= 1) return;
    const otherWords = filteredExercises.filter(e => e.id.toLowerCase() !== currentWordId.toLowerCase());
    const randWord = otherWords[Math.floor(Math.random() * otherWords.length)] || filteredExercises[0];
    if (randWord) {
      setCurrentWordId(randWord.id);
      playSentence(randWord.id, activeExample, activePronoun);
    }
  }, [filteredExercises, currentWordId, activeExample, activePronoun, playSentence]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWordPickerOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        playSentence();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, playSentence, isWordPickerOpen]);

  // Filter words for picker modal
  const pickerFiltered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return exercises.filter(item => {
      const matchCat = pickerFilter === 'all' || item.type === pickerFilter;
      const matchQuery = !q || item.word.toLowerCase().includes(q) || item.en.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [exercises, pickerFilter, searchQuery]);

  if (!currentExercise) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-slate-500 font-bold">
        Chargement des exercices de phrases...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 md:p-6 bg-gradient-to-b from-teal-50/90 via-sky-50/70 to-amber-50/90 select-none overflow-y-auto">
      {/* 1. Header Bar: Filter Tabs & Quick Word Picker (Carefully cleared of top-right dock) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 z-20 pr-56 sm:pr-64 md:pr-72 mb-2">
        {/* Category Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-sm border border-slate-200">
          <button
            onClick={() => handleCategoryFilterChange('all')}
            className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex flex-col items-center ${
              categoryFilter === 'all'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🌟 Tous (169)</span>
            {showLabels && (
              <span className={`text-[9px] font-bold ${categoryFilter === 'all' ? 'text-teal-100' : 'text-slate-400'}`}>
                All • 全部
              </span>
            )}
          </button>
          <button
            onClick={() => handleCategoryFilterChange('verb')}
            className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex flex-col items-center ${
              categoryFilter === 'verb'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🏃 Verbes (109)</span>
            {showLabels && (
              <span className={`text-[9px] font-bold ${categoryFilter === 'verb' ? 'text-emerald-100' : 'text-slate-400'}`}>
                Verbs • 动词
              </span>
            )}
          </button>
          <button
            onClick={() => handleCategoryFilterChange('descriptor')}
            className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex flex-col items-center ${
              categoryFilter === 'descriptor'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎨 Descriptifs (60)</span>
            {showLabels && (
              <span className={`text-[9px] font-bold ${categoryFilter === 'descriptor' ? 'text-indigo-100' : 'text-slate-400'}`}>
                Descriptors • 描述词
              </span>
            )}
          </button>
        </div>

        {/* Word Browser & L'Imagier Navigation Button */}
        <div className="flex items-center gap-1.5">
          {onBackToImagier && (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                const targetCat = currentExercise.categoryId || (currentExercise.type === 'descriptor' ? 15 : 14);
                onBackToImagier(targetCat, currentExercise.id);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-black shadow-sm border border-indigo-200 transition-all"
              title={`Voir « ${currentExercise.word} » dans la catégorie ${currentExercise.type === 'verb' ? 'Verbes (Cat. 14)' : 'Descriptifs (Cat. 15)'} de L'Imagier`}
            >
              <span>📖</span>
              <span>L'Imagier</span>
              <span className="text-[10px] text-indigo-500 font-bold hidden sm:inline">
                ({currentExercise.type === 'verb' ? 'Verbes' : 'Descriptifs'})
              </span>
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              setPickerFilter(categoryFilter);
              setSearchQuery('');
              setIsWordPickerOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-sm border border-slate-200 transition-all"
            title="Choisir un mot dans la liste"
          >
            <span>📖</span>
            <span className="hidden sm:inline">Choisir :</span>
            <span className="font-black text-teal-700 capitalize max-w-[120px] truncate">
              {currentExercise.word}
            </span>
            <span className="text-xs text-slate-400">
              ({currentIndex + 1}/{filteredExercises.length})
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9, rotate: 180 }}
            onClick={handleRandom}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center justify-center font-bold text-sm shadow-sm"
            title="Mot aléatoire (Surprise)"
          >
            🎲
          </motion.button>
        </div>
      </div>

      {/* 2. Main Practice Stage */}
      <div className="relative flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-start gap-3 my-1">
        {/* A. Dual Concepts Visual Cards: [Action / Descriptor] + [Object / Context] */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {/* Card 1: The Core Word (Verb or Descriptor) */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => speechManager.speak(currentExercise.word, currentExercise.id)}
            className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/95 border-2 border-teal-200 hover:border-teal-400 shadow-md text-left transition-all group"
            title={`Écouter le mot : ${currentExercise.word}`}
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-teal-50/80 border border-teal-100 flex items-center justify-center p-1 overflow-hidden group-hover:scale-105 transition-transform">
              <ToddlerGraphic
                id={currentExercise.id}
                word={currentExercise.word}
                category={currentExercise.categoryId}
                size={80}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  currentExercise.type === 'verb'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {currentExercise.type === 'verb' ? 'Action' : 'Description'}
                </span>
                <span className="text-xs text-slate-400 font-bold">#{currentExercise.index}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 capitalize leading-tight truncate">
                {currentExercise.word}
              </h3>
              {showLabels && (
                <p className="text-xs font-semibold text-slate-400 truncate">
                  {currentExercise.en} {currentExercise.zh && `• ${currentExercise.zh}`}
                </p>
              )}
            </div>
            <span className="text-base text-teal-600 opacity-70 group-hover:opacity-100">🔊</span>
          </motion.button>

          {/* Card 2: The Object / Context Companion */}
          {objectWord ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => speechManager.speak(objectWord.fr, objectWord.id)}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/95 border-2 border-sky-200 hover:border-sky-400 shadow-md text-left transition-all group"
              title={`Écouter l'objet : ${objectWord.fr}`}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center justify-center p-1 overflow-hidden group-hover:scale-105 transition-transform">
                <ToddlerGraphic
                  id={objectWord.id}
                  word={objectWord.fr}
                  category={objectWord.categoryId}
                  size={80}
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black uppercase tracking-wider inline-block mb-0.5">
                  Objet
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-800 capitalize leading-tight truncate">
                  {objectWord.fr}
                </h4>
                {showLabels && (
                  <p className="text-xs font-semibold text-slate-400 truncate">
                    {objectWord.en} {objectWord.zh && `• ${objectWord.zh}`}
                  </p>
                )}
              </div>
              <span className="text-base text-sky-600 opacity-70 group-hover:opacity-100">🔊</span>
            </motion.button>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-amber-50/80 border border-amber-100 flex items-center justify-center text-4xl">
                {currentExercise.type === 'verb' ? '🎯' : '✨'}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Contexte {activeExample}
                </span>
                <p className="text-base sm:text-lg font-extrabold text-slate-700 leading-snug">
                  {currentExercise.examples[activeExample].sentences['je'].replace(/^[^a-zA-ZÀ-ÿ]+/, '').split(' ').slice(1).join(' ')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* B. Example Toggle (Modèle A vs Modèle B) */}
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-1">
            Modèle de phrase :
          </span>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleToggleExample('A')}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-all ${
              activeExample === 'A'
                ? 'bg-teal-500 text-white border-teal-600 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>🅰️ Exemple A</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleToggleExample('B')}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-all ${
              activeExample === 'B'
                ? 'bg-teal-500 text-white border-teal-600 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>🅱️ Exemple B</span>
          </motion.button>
        </div>

        {/* C. Meaningful Scene Illustration featuring Yannick & Active Sentence Banner */}
        <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-lg border-2 border-teal-200 overflow-hidden flex flex-col">
          {/* Single Unified Scene Illustration featuring Yannick */}
          <div className="relative w-full bg-gradient-to-b from-sky-50/50 to-teal-50/30 flex items-center justify-center p-2 sm:p-3 overflow-hidden">
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                audioManager.playPop(520);
                playSentence();
              }}
              className="relative w-full rounded-2xl overflow-hidden cursor-pointer group flex items-center justify-center bg-white shadow-sm border border-slate-100"
              title="Touche l'illustration pour écouter Yannick !"
            >
              <HeroSentenceImage
                exercise={currentExercise}
                activeExample={activeExample}
                sentenceText={sentenceText}
                isPlaying={isPlaying}
              />

              {/* Floating Audio Play Indicator Badge */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-teal-200 text-xs font-black text-teal-800 pointer-events-none group-hover:scale-105 transition-transform">
                <span className={`text-sm ${isPlaying ? 'animate-bounce' : ''}`}>{isPlaying ? '🗣️' : '🔊'}</span>
                <span>{isPlaying ? 'Sylvie parle...' : 'Touche pour écouter !'}</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive French Sentence Banner */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              audioManager.playPop(520);
              playSentence();
            }}
            className={`w-full p-4 sm:p-5 text-center transition-all flex flex-col items-center justify-center gap-1.5 border-t-2 ${
              isPlaying
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-white hover:bg-emerald-50/40 text-slate-800 border-teal-100'
            }`}
          >
            {/* Play Badge */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-base ${isPlaying ? 'animate-bounce' : ''}`}>
                {isPlaying ? '🗣️' : '🔊'}
              </span>
              <span className={`text-xs font-black uppercase tracking-wider ${isPlaying ? 'text-emerald-100' : 'text-emerald-700'}`}>
                {isPlaying ? 'Lecture en cours (Voix studio Sylvie)...' : 'Touche pour réécouter la phrase'}
              </span>
            </div>

            {/* Large Clear Natural French Sentence */}
            <p className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight ${
              isPlaying ? 'text-white' : 'text-slate-900'
            }`}>
              {sentenceText}
            </p>

            {/* Bilingual English & Chinese Translations in Grey (Controlled by 🏷️ Mots) */}
            {showLabels && (currentEnSentence || currentZhSentence) && (
              <div className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-sm sm:text-base font-bold transition-colors ${
                isPlaying ? 'text-emerald-100' : 'text-slate-400'
              }`}>
                {currentEnSentence && <span>{currentEnSentence}</span>}
                {currentEnSentence && currentZhSentence && <span>•</span>}
                {currentZhSentence && <span>{currentZhSentence}</span>}
              </div>
            )}
          </motion.button>
        </div>

        {/* B. ALL 8 Subject Pronoun Selectors (Je, Tu, Il, Elle, Nous, Vous, Ils, Elles) */}
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-md border-2 border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
              👤 Choisir la personne (8 pronoms disponibles) :
            </span>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              Touche un pronom pour écouter
            </span>
          </div>

          {/* Row 1: Singular Pronouns (Je, Tu, Il, Elle) */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1 px-1">
              Singulier (1 personne) :
            </span>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {SINGULAR_PRONOUNS.map(p => {
                const isActive = activePronoun === p.id;
                return (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleSelectPronoun(p.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'bg-gradient-to-b from-teal-500 to-emerald-600 text-white border-emerald-600 shadow-md scale-102 font-black ring-2 ring-teal-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-bold'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl leading-none mb-1">{p.icon}</span>
                    <span className="text-sm sm:text-base leading-tight font-black">{p.label}</span>
                    {showLabels ? (
                      <span className={`text-[10px] leading-tight font-bold ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                        {p.en} • {p.zh}
                      </span>
                    ) : (
                      <span className={`text-[10px] leading-tight ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                        {p.role}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Plural Pronouns (Nous, Vous, Ils, Elles) - ALWAYS VISIBLE! */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 block mb-1 px-1">
              Pluriel (Plusieurs personnes) :
            </span>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {PLURAL_PRONOUNS.map(p => {
                const isActive = activePronoun === p.id;
                return (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleSelectPronoun(p.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white border-purple-600 shadow-md scale-102 font-black ring-2 ring-indigo-200'
                        : 'bg-indigo-50/50 hover:bg-indigo-50 text-slate-700 border-indigo-200/80 font-bold'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl leading-none mb-1">{p.icon}</span>
                    <span className="text-sm sm:text-base leading-tight font-black">{p.label}</span>
                    {showLabels ? (
                      <span className={`text-[10px] leading-tight font-bold ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {p.en} • {p.zh}
                      </span>
                    ) : (
                      <span className={`text-[10px] leading-tight ${isActive ? 'text-indigo-100' : 'text-indigo-400'}`}>
                        {p.role}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* E. Complete 8-Sentence Conjugation View (Tous les pronoms visibles en un coup d'œil) */}
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-md border-2 border-slate-200 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase tracking-wider">
              <span>📖</span>
              <span>Toutes les phrases pour « {currentExercise.word} » ({activeExample === 'A' ? 'Modèle A' : 'Modèle B'}) :</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400">8 formes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {ALL_PRONOUNS.map(p => {
              const sentence = currentExampleSet?.sentences[p.id] || '';
              const transEn = currentExampleSet?.translations?.en?.[p.id] || '';
              const transZh = currentExampleSet?.translations?.zh?.[p.id] || '';
              const isActive = activePronoun === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    audioManager.playPop(460);
                    setActivePronoun(p.id);
                    playSentence(currentWordId, activeExample, p.id, sentence);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border-2 transition-all text-left group ${
                    isActive
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-300'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-lg shrink-0">{p.icon}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-black shrink-0 ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {p.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className={`block text-xs sm:text-sm truncate font-bold ${
                        isActive ? 'text-emerald-950 font-black' : 'text-slate-700'
                      }`}>
                        {sentence}
                      </span>
                      {showLabels && (transEn || transZh) && (
                        <span className="block text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">
                          {transEn} {transZh && `• ${transZh}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-sm shrink-0 ml-1.5 transition-transform ${
                    isActive ? 'text-emerald-600 scale-110' : 'text-slate-400 group-hover:text-emerald-600'
                  }`}>
                    {isActive && isPlaying ? '🗣️' : '🔊'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* F. Action Mime & Repeat Cue (Speech Therapy & Parent Guidance) */}
        <div className="w-full max-w-2xl flex items-center justify-between gap-3 px-4 py-2 bg-amber-100/70 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 font-bold">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎭</span>
            <span>
              <strong>Mime le geste :</strong> Fais l’action de « {currentExercise.word} » !
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-800 shrink-0">
            <span>🗣️</span>
            <span>Répète !</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Footer Bar: Prev / Counter / Next */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between gap-3 pt-2 pb-1 z-20">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-black text-sm shadow-md border-2 border-slate-200 transition-all"
        >
          <span>⬅️</span>
          <span className="hidden sm:inline">Précédent</span>
        </motion.button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-black text-slate-600">
            {currentIndex + 1} / {filteredExercises.length}
          </span>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: Math.min(8, filteredExercises.length) }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex % Math.min(8, filteredExercises.length)
                    ? 'bg-emerald-500 w-4'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleNext}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-lg border-2 border-emerald-400 transition-all"
        >
          <span>Suivant</span>
          <span>➡️</span>
        </motion.button>
      </div>

      {/* 4. Full Word Browser / Search Drawer Modal */}
      <AnimatePresence>
        {isWordPickerOpen && (
          <div
            onClick={() => setIsWordPickerOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border-4 border-teal-200 flex flex-col overflow-hidden cursor-default"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-teal-50/50">
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Choisir un mot ({pickerFiltered.length})
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    109 verbes et 60 mots descriptifs avec phrases modèles
                  </p>
                </div>
                <button
                  onClick={() => setIsWordPickerOpen(false)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Category Filter Pills inside Modal */}
              <div className="px-4 pt-3 pb-2 border-b border-slate-100 flex items-center gap-1.5 bg-slate-50">
                <button
                  onClick={() => setPickerFilter('all')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    pickerFilter === 'all'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🌟 Tous (169)
                </button>
                <button
                  onClick={() => setPickerFilter('verb')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    pickerFilter === 'verb'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🏃 Verbes (109)
                </button>
                <button
                  onClick={() => setPickerFilter('descriptor')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    pickerFilter === 'descriptor'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🎨 Descriptifs (60)
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-3 border-b border-slate-200 bg-white">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un verbe ou mot (ex: aimer, manger, chaud)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  autoFocus
                />
              </div>

              {/* Word List Grid */}
              <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pickerFiltered.map(item => {
                  const isCurrent = item.id.toLowerCase() === currentWordId.toLowerCase();
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectWord(item.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-teal-500 text-white border-teal-600 shadow-md ring-2 ring-teal-300'
                          : 'bg-white hover:bg-teal-50/50 text-slate-800 border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center p-0.5 border border-slate-200/60">
                        <ToddlerGraphic
                          id={item.id}
                          word={item.word}
                          category={item.categoryId}
                          size={44}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-xs sm:text-sm font-black capitalize truncate">
                          {item.word}
                        </span>
                        <span className={`block text-[10px] truncate ${isCurrent ? 'text-teal-100 font-bold' : 'text-slate-400 font-semibold'}`}>
                          {item.en} {item.zh && `• ${item.zh}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
