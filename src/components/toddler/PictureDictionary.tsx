import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CategoryInfo, WordItem } from '../../types';
import { contentManager } from '../../engine/ContentManager';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
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

export const PictureDictionary: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>(contentManager.getCategories());
  const [words, setWords] = useState<WordItem[]>(contentManager.getWords());

  const [activeCategoryId, setActiveCategoryId] = useState<number>(2); // Default to Animals
  const [activeWordId, setActiveWordId] = useState<string | null>(null);

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

  const getCategoryEmoji = (cat: CategoryInfo): string => {
    if (CATEGORY_EMOJIS[cat.id]) return CATEGORY_EMOJIS[cat.id];
    // Check if cat.icon is an actual emoji (not an alphanumeric English name)
    if (cat.icon && !/^[A-Za-z0-9_-]+$/.test(cat.icon)) return cat.icon;
    return '🎈';
  };

  const handleCategorySelect = (cat: CategoryInfo) => {
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
      {/* Row 1: Dedicated Top Header Bar */}
      {/* Leaves ample clearance on the right so the 3 floating buttons dock never obstructs any category or control */}
      <div className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200/60 px-4 py-2 z-20 flex items-center justify-between min-h-[56px] flex-shrink-0">
        {/* Left: Current Active Category Banner */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl md:text-3xl leading-none">
            {getCategoryEmoji(currentCategory)}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-lg font-black text-slate-800 leading-tight">
                {currentCategory.name_fr}
              </h2>
              <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                {categoryWords.length} mots
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 hidden sm:block">
              {currentCategory.name_en} • {currentCategory.name_zh}
            </p>
          </div>
        </div>

        {/* Right Clearance Zone: Guaranteed safe area for the top-right dock in ToddlerShell */}
        <div className="w-60 md:w-72 flex-shrink-0 pointer-events-none" aria-hidden="true" />
      </div>

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
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Row 3: Main Words Grid */}
      <div className="flex-1 w-full overflow-y-auto p-4 pb-28 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {categoryWords.map((word) => {
            const isPlaying = activeWordId === word.id;

            return (
              <motion.div
                key={word.id}
                whileTap={{
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  transition: { type: 'spring', stiffness: 500, damping: 12 }
                }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleWordTap(word)}
                className={`relative flex flex-col items-center justify-between p-3.5 rounded-3xl bg-white shadow-md border-3 transition-all cursor-pointer ${
                  isPlaying
                    ? 'border-amber-400 ring-4 ring-amber-200 shadow-xl bg-amber-50/60'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                {/* Visual Graphic */}
                <div className="relative my-2 flex items-center justify-center min-h-[85px]">
                  <ToddlerGraphic
                    id={word.id}
                    word={word.fr}
                    illustrationAsset={word.illustrationAsset}
                    category={word.categoryId}
                    size={80}
                    className="drop-shadow-md"
                  />
                  {isPlaying && (
                    <div className="absolute -top-3 -right-3 text-3xl animate-bounce">
                      ⭐
                    </div>
                  )}
                </div>

                {/* French Word Label */}
                <div className="w-full text-center mt-2">
                  <span className="block text-sm md:text-base font-black text-slate-800 capitalize leading-tight">
                    {word.fr}
                  </span>
                  <span className="block text-[10px] md:text-[11px] font-bold text-slate-400 mt-0.5 truncate">
                    {word.zh} • {word.en}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
