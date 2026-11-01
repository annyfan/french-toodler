import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CategoryInfo, WordItem } from '../../types';
import { contentManager } from '../../engine/ContentManager';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { audioManager } from '../../engine/AudioContextManager';
import { ToddlerGraphic } from '../common/ToddlerGraphic';

const CATEGORY_EMOJIS: Record<number, string> = {
  1: '🔊', // Sons
  2: '🐾', // Animaux
  3: '🚗', // Véhicules
  4: '🧸', // Jouets
  5: '🍎', // Nourriture
  6: '👕', // Vêtements
  7: '👃', // Corps
  8: '☕', // Maison
  9: '🛋️', // Meubles
  10: '🌳', // Dehors
  11: '🏫', // Endroits
  12: '👶', // Gens
  13: '🎮', // Jeux
  14: '⚡', // Verbes
  15: '✨', // Descriptifs
  16: '⏳', // Temps
  17: '👤', // Pronoms
  18: '❓', // Questions
  19: '🧭', // Prépositions
  20: '🔢', // Quantités
  21: '🔗', // Conjonctions
};

const CATEGORY_SPOKEN_NAMES: Record<number, string> = {
  1: "Les effets sonores et bruits",
  2: "Les animaux",
  3: "Les véhicules",
  4: "Les jouets",
  5: "La nourriture et les boissons",
  6: "Les vêtements",
  7: "Les parties du corps",
  8: "Les objets de la maison",
  9: "Les meubles et pièces",
  10: "Les choses de dehors",
  11: "Les endroits où aller",
  12: "La famille et les personnes",
  13: "Les jeux et la routine",
  14: "Les verbes et actions",
  15: "Les mots descriptifs",
  16: "Le temps et les moments",
  17: "Les pronoms",
  18: "Les questions",
  19: "Les prépositions et positions",
  20: "Les quantités et chiffres",
  21: "Les petits mots de liaison",
};

interface PictureDictionaryProps {
  showLabels?: boolean;
  initialCategoryId?: number | null;
  highlightWordId?: string | null;
  onCategoryConsumed?: () => void;
  onNavigateToSentences?: (wordId: string) => void;
}

export const PictureDictionary: React.FC<PictureDictionaryProps> = ({
  showLabels = true,
  initialCategoryId = null,
  highlightWordId = null,
  onCategoryConsumed,
  onNavigateToSentences,
}) => {
  const [categories, setCategories] = useState<CategoryInfo[]>(contentManager.getCategories());
  const [words, setWords] = useState<WordItem[]>(contentManager.getWords());

  const [activeCategoryId, setActiveCategoryId] = useState<number>(() => initialCategoryId || 2);
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync category if navigated from outside (e.g. from Phrases with Verbes cat 14 or Descriptifs cat 15)
  useEffect(() => {
    if (initialCategoryId) {
      setActiveCategoryId(initialCategoryId);
      setSearchQuery('');
      if (onCategoryConsumed) {
        onCategoryConsumed();
      }
    }
  }, [initialCategoryId]);

  // Highlight word if returning to a specific word
  useEffect(() => {
    if (highlightWordId) {
      setActiveWordId(highlightWordId);
      const timer = setTimeout(() => {
        setActiveWordId(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [highlightWordId]);

  useEffect(() => {
    return contentManager.subscribe(() => {
      setCategories(contentManager.getCategories());
      setWords(contentManager.getWords());
    });
  }, []);

  const currentCategory = categories.find(c => c.id === activeCategoryId) || categories[0] || {
    id: 1,
    name_fr: 'Catégorie',
    name_en: 'Category',
    name_zh: '类别',
  };
  const categoryWords = words.filter(w => w.categoryId === activeCategoryId);

  // Normalize text helper for robust accent-insensitive search
  const normalizeSearch = (str: string): string => {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  const isSearching = searchQuery.trim().length > 0;

  // Filter words across all 664 words by French, English, Chinese, or category name
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = normalizeSearch(searchQuery);

    return words.filter((word) => {
      // 1. French match
      if (normalizeSearch(word.fr).includes(q)) return true;
      // 2. English match
      if (normalizeSearch(word.en).includes(q)) return true;
      // 3. Chinese match
      if (word.zh && word.zh.includes(searchQuery.trim())) return true;
      // 4. Category name match
      const cat = categories.find(c => c.id === word.categoryId);
      if (cat) {
        if (normalizeSearch(cat.name_fr).includes(q)) return true;
        if (normalizeSearch(cat.name_en).includes(q)) return true;
        if (cat.name_zh && cat.name_zh.includes(searchQuery.trim())) return true;
      }
      return false;
    });
  }, [words, searchQuery, categories, isSearching]);

  const displayedWords = isSearching ? searchResults : categoryWords;

  const getCategoryEmoji = (cat: CategoryInfo): string => {
    if (CATEGORY_EMOJIS[cat.id]) return CATEGORY_EMOJIS[cat.id];
    // Check if cat.icon is an actual emoji (not an alphanumeric English name)
    if (cat.icon && !/^[A-Za-z0-9_-]+$/.test(cat.icon)) return cat.icon;
    return '🎈';
  };

  const handleCategorySelect = (cat: CategoryInfo) => {
    if (searchQuery) {
      setSearchQuery('');
    }
    setActiveCategoryId(cat.id);
    const spokenName = CATEGORY_SPOKEN_NAMES[cat.id] || cat.name_fr;
    speechManager.speakCategory(cat.id, spokenName);
  };

  const handleWordTap = (word: WordItem) => {
    // Pure, crystal-clear speech playback without clashing oscillator boing sound
    setActiveWordId(word.id);
    speechManager.speak(word.fr, word.id);
    progressTracker.recordWordInteraction(word.id);

    setTimeout(() => {
      setActiveWordId(null);
    }, 1200);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-sky-50 via-amber-50/50 to-indigo-50/40 select-none overflow-hidden">
      {/* Row 1: Dedicated Top Header Bar with Category Banner & Search */}
      {/* Leaves ample clearance on the right so the floating buttons dock never obstructs any category or control */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-3 sm:px-4 py-2 z-20 flex flex-wrap items-center justify-between gap-2 min-h-[56px] flex-shrink-0 pr-48 sm:pr-60 md:pr-72">
        {/* Left: Active Category / Search Info Banner */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <span className="text-2xl md:text-3xl leading-none shrink-0">
            {isSearching ? '🔍' : getCategoryEmoji(currentCategory)}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800 leading-tight truncate">
                {isSearching ? `Recherche : « ${searchQuery} »` : currentCategory.name_fr}
              </h2>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${
                isSearching
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}>
                {displayedWords.length} {displayedWords.length > 1 ? 'mots' : 'mot'}
              </span>
              {onNavigateToSentences && !isSearching && (activeCategoryId === 14 || activeCategoryId === 15) && (
                <button
                  onClick={() => {
                    audioManager.playPop(520);
                    onNavigateToSentences(categoryWords[0]?.id || (activeCategoryId === 14 ? 'vrb_001' : 'des_01'));
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-black shadow-xs transition-all ml-1"
                >
                  <span>🗣️</span>
                  <span>Pratiquer en phrases</span>
                  <span>➡️</span>
                </button>
              )}
            </div>
            {showLabels && (
              <p className="text-[11px] font-bold text-slate-400 hidden sm:block truncate">
                {isSearching
                  ? `${searchResults.length} results • 找到 ${searchResults.length} 个词`
                  : `${currentCategory.name_en} • ${currentCategory.name_zh}`}
              </p>
            )}
          </div>
        </div>

        {/* Center/Right: Search Bar Input */}
        <div className="relative flex-1 min-w-[170px] max-w-xs sm:max-w-sm">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400 text-xs sm:text-sm pointer-events-none">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher (ex: chat, pomme)..."
              className="w-full pl-8 sm:pl-9 pr-7 py-1.5 rounded-2xl bg-slate-100/90 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 focus:border-indigo-400 text-xs sm:text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  audioManager.playPop(420);
                  setSearchQuery('');
                }}
                className="absolute right-2 w-5 h-5 rounded-full bg-slate-300 hover:bg-slate-400 text-white text-[11px] flex items-center justify-center font-black transition-colors"
                title="Effacer la recherche"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Search Status Ribbon */}
      {isSearching && (
        <div className="w-full bg-amber-50/90 border-b border-amber-200/80 px-4 py-1.5 flex items-center justify-between text-xs font-bold text-amber-900 z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>
              {searchResults.length === 0
                ? 'Aucun résultat trouvé'
                : `Recherche parmi les 664 mots de l’imagier`}
            </span>
            {showLabels && (
              <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                (Search in FR / EN / ZH • 支持中英法三语搜索)
              </span>
            )}
          </div>
          <button
            onClick={() => {
              audioManager.playPop(420);
              setSearchQuery('');
            }}
            className="text-xs text-amber-800 hover:text-amber-950 font-black flex items-center gap-1 underline cursor-pointer"
          >
            ✕ Effacer la recherche
          </button>
        </div>
      )}

      {/* Row 2: Category Selector Carousel */}
      {/* Completely free of any floating buttons above it; scrolls edge-to-edge horizontally */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-3 py-2 z-10 shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
        {categories.map((cat) => {
          const isSelected = cat.id === activeCategoryId;
          const emoji = getCategoryEmoji(cat);
          const count = words.filter(w => w.categoryId === cat.id).length;

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleCategorySelect(cat)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 transition-all shadow-xs ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-lg md:text-xl leading-none">{emoji}</span>
              <div className="flex flex-col text-left">
                <span className="text-xs md:text-sm font-black whitespace-nowrap leading-tight">
                  {cat.name_fr}
                </span>
                <span className={`text-[10px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {count} mots
                </span>
                {showLabels && (
                  <span className={`text-[9px] font-semibold truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {cat.name_en} • {cat.name_zh}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Row 3: Main Words Grid */}
      <div className="flex-1 w-full overflow-y-auto p-4 pb-28 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {displayedWords.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center px-4">
              <span className="text-5xl mb-3">🔍🎈</span>
              <h3 className="text-lg md:text-xl font-black text-slate-800">
                Aucun mot trouvé pour « {searchQuery} »
              </h3>
              {showLabels && (
                <p className="text-xs font-bold text-slate-400 mt-1">
                  No results found • 未找到相关词语
                </p>
              )}
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-2 max-w-md">
                Essaie de chercher un mot en français, en anglais ou en chinois (ex : chat, apple, 玩具, manger)...
              </p>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  audioManager.playPop(420);
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
              >
                <span>✕</span>
                <span>Effacer la recherche</span>
              </motion.button>
            </div>
          ) : (
            displayedWords.map((word) => {
              const isPlaying = activeWordId === word.id;
              const hasSentences = contentManager.hasSentence(word.id);
              const wordCategory = categories.find(c => c.id === word.categoryId);

              return (
                <motion.div
                  key={word.id}
                  whileTap={{
                    scale: 1.05,
                    rotate: [0, -3, 3, 0],
                    transition: { type: 'spring', stiffness: 500, damping: 12 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleWordTap(word)}
                  className={`relative flex flex-col items-center justify-between p-3.5 rounded-3xl bg-white shadow-md border-3 transition-all cursor-pointer ${
                    isPlaying
                      ? 'border-amber-400 ring-4 ring-amber-200 shadow-xl bg-amber-50/60'
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {/* Category Badge when searching */}
                  {isSearching && wordCategory && (
                    <div className="w-full flex items-center justify-center mb-1">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-full truncate max-w-full">
                        {getCategoryEmoji(wordCategory)} {wordCategory.name_fr}
                      </span>
                    </div>
                  )}

                  {/* Visual Graphic */}
                  <div className="relative my-2 flex items-center justify-center min-h-[96px]">
                    <ToddlerGraphic
                      id={word.id}
                      word={word.fr}
                      illustrationAsset={word.illustrationAsset}
                      category={word.categoryId}
                      size={90}
                      className="drop-shadow-md"
                    />
                    {isPlaying && (
                      <div className="absolute -top-3 -right-3 text-3xl animate-bounce">
                        ⭐
                      </div>
                    )}
                  </div>

                  {/* French Word Label & Grey Translations (Toggled by 🏷️ Mots) */}
                  {showLabels && (
                    <div className="w-full text-center mt-2">
                      <span className="block text-sm md:text-base font-black text-slate-800 capitalize leading-tight">
                        {word.fr}
                      </span>
                      <span className="block text-[10px] md:text-[11px] font-bold text-slate-400 mt-0.5 truncate">
                        {word.en} • {word.zh}
                      </span>
                    </div>
                  )}

                  {/* Link to Sentences (For verbs & descriptive words) */}
                  {onNavigateToSentences && hasSentences && (
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        audioManager.playPop(540);
                        onNavigateToSentences(word.id);
                      }}
                      className="mt-2.5 w-full py-1.5 px-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all group z-10"
                      title={`Pratiquer « ${word.fr} » en phrases complètes`}
                    >
                      <span>💬</span>
                      <span>Phrases</span>
                      <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">➡️</span>
                    </motion.button>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
