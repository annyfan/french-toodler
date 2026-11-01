import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import scenesData from '../../data/scenes.json';
import vocabularyData from '../../data/vocabulary.json';
import { SceneConfig, WordItem, SceneItemConfig } from '../../types';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { ToddlerGraphic } from '../common/ToddlerGraphic';
import confetti from 'canvas-confetti';

const allWords = vocabularyData as WordItem[];
const wordsMap = new Map<string, WordItem>(
  allWords.map(w => [w.id, w])
);

// Category pools for room shuffling
const ROOM_POOLS: Record<string, number[]> = {
  salon: [9, 8, 4],     // Meubles, Objets ménagers, Jouets
  cuisine: [5, 8],      // Nourriture, Objets ménagers
  cour: [2, 10, 3],     // Animaux, Dehors, Véhicules
  chambre: [9, 6, 4],   // Meubles, Vêtements, Jouets
};

interface ExploratorySceneProps {
  showLabels?: boolean;
  shuffleTrigger?: number;
}

export const ExploratoryScene: React.FC<ExploratorySceneProps> = ({
  showLabels = true,
  shuffleTrigger = 0
}) => {
  const baseScenes: SceneConfig[] = scenesData as SceneConfig[];
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeItem, setActiveItem] = useState<{ id: string; fr: string; x: number; y: number } | null>(null);
  const [customItemsMap, setCustomItemsMap] = useState<Record<string, SceneItemConfig[]>>({});

  const currentScene = baseScenes[activeSceneIndex] || baseScenes[0];
  const displayedItems = customItemsMap[currentScene.id] || currentScene.items;

  // React to shuffle trigger from the top-right corner dock
  useEffect(() => {
    if (shuffleTrigger > 0) {
      handleShuffleScene();
    }
  }, [shuffleTrigger]);

  const handleItemTap = (wordId: string, clientX: number, clientY: number) => {
    const word = wordsMap.get(wordId);
    if (!word) return;

    // 1. Playful floating visual cue
    setActiveItem({ id: wordId, fr: word.fr, x: clientX, y: clientY });
    setTimeout(() => setActiveItem(null), 1400);

    // 2. Pronounce in Quebec French (crystal-clear studio MP3)
    speechManager.speak(word.fr, word.id);

    // 3. Record interaction in CDI tracker
    progressTracker.recordWordInteraction(wordId);
  };

  const handleShuffleScene = () => {
    audioManager.playChime();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.5 }
    });

    const poolCategoryIds = ROOM_POOLS[currentScene.id] || [2, 5, 4, 3];
    const candidateWords = allWords.filter(w => poolCategoryIds.includes(w.categoryId));

    // Pick random candidate words for each item slot
    const shuffledItems: SceneItemConfig[] = currentScene.items.map((baseItem) => {
      const randomWord = candidateWords[Math.floor(Math.random() * candidateWords.length)];
      return {
        ...baseItem,
        wordId: randomWord.id,
        label: randomWord.fr
      };
    });

    setCustomItemsMap(prev => ({
      ...prev,
      [currentScene.id]: shuffledItems
    }));
  };

  // Render Rich Illustrated Room Backgrounds
  const renderRoomBackdrop = () => {
    switch (currentScene.id) {
      case 'salon':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top Wall (60% height) - Warm Buttercream & Honey Wallpaper */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[#FFFDF5] via-[#FEF3E2] to-[#FDE8CF] overflow-hidden">
              {/* Cute Wallpaper Polka Dots & Mini Triangles */}
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="salon-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
                    <circle cx="24" cy="24" r="3.5" fill="#F59E0B" opacity="0.5" />
                    <circle cx="4" cy="4" r="2" fill="#FB7185" opacity="0.4" />
                    <circle cx="44" cy="4" r="2" fill="#FB7185" opacity="0.4" />
                    <path d="M 12 36 L 16 36 L 14 40 Z" fill="#38BDF8" opacity="0.4" />
                    <path d="M 36 12 L 40 12 L 38 16 Z" fill="#34D399" opacity="0.4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#salon-pattern)" />
              </svg>

              {/* Colorful Bunting Garland Draped Across the Top */}
              <svg className="absolute top-0 inset-x-0 w-full h-16 sm:h-20" viewBox="0 0 1000 80" preserveAspectRatio="none">
                <path d="M 0 15 Q 250 45 500 20 Q 750 45 1000 15" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.6" />
                <polygon points="60,20 80,48 100,23" fill="#FF6B8B" />
                <polygon points="150,28 170,58 190,30" fill="#4ECDC4" />
                <polygon points="240,33 260,62 280,32" fill="#FFE66D" />
                <polygon points="330,30 350,58 370,27" fill="#A78BFA" />
                <polygon points="420,23 440,50 460,21" fill="#FB923C" />
                <polygon points="510,21 530,49 550,22" fill="#38BDF8" />
                <polygon points="600,27 620,56 640,29" fill="#F472B6" />
                <polygon points="690,32 710,61 730,33" fill="#34D399" />
                <polygon points="780,32 800,60 820,30" fill="#FBBF24" />
                <polygon points="870,26 890,54 910,24" fill="#818CF8" />
              </svg>

              {/* Big Bright Arched Window (Center) - Safely cleared below top docks */}
              <div className="absolute top-18 sm:top-20 left-1/2 -translate-x-1/2 w-44 sm:w-56 md:w-64 h-32 sm:h-40 md:h-48 rounded-t-[100px] border-6 sm:border-8 border-white shadow-2xl bg-sky-200 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="salon-sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="60%" stopColor="#BAE6FD" />
                      <stop offset="100%" stopColor="#E0F2FE" />
                    </linearGradient>
                  </defs>
                  <rect width="240" height="180" fill="url(#salon-sky)" />
                  {/* Vibrant Rainbow */}
                  <circle cx="120" cy="180" r="115" fill="none" stroke="#F43F5E" strokeWidth="6" opacity="0.85" />
                  <circle cx="120" cy="180" r="109" fill="none" stroke="#FB923C" strokeWidth="6" opacity="0.85" />
                  <circle cx="120" cy="180" r="103" fill="none" stroke="#FACC15" strokeWidth="6" opacity="0.85" />
                  <circle cx="120" cy="180" r="97" fill="none" stroke="#4ADE80" strokeWidth="6" opacity="0.85" />
                  <circle cx="120" cy="180" r="91" fill="none" stroke="#38BDF8" strokeWidth="6" opacity="0.85" />
                  {/* Distant Hills */}
                  <circle cx="20" cy="210" r="110" fill="#86EFAC" />
                  <circle cx="220" cy="220" r="120" fill="#4ADE80" />
                  {/* Cute Smiling Cloud */}
                  <g transform="translate(55, 40)">
                    <ellipse cx="40" cy="20" rx="30" ry="16" fill="white" />
                    <circle cx="25" cy="12" r="14" fill="white" />
                    <circle cx="50" cy="10" r="16" fill="white" />
                    <circle cx="32" cy="18" r="2.5" fill="#1E293B" />
                    <circle cx="48" cy="18" r="2.5" fill="#1E293B" />
                    <ellipse cx="26" cy="22" rx="3.5" ry="2" fill="#FB7185" opacity="0.8" />
                    <ellipse cx="54" cy="22" rx="3.5" ry="2" fill="#FB7185" opacity="0.8" />
                    <path d="M 37 23 Q 40 27 43 23" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </g>
                  {/* Window Panes */}
                  <line x1="0" y1="90" x2="240" y2="90" stroke="white" strokeWidth="6" />
                  <line x1="120" y1="0" x2="120" y2="180" stroke="white" strokeWidth="6" />
                </svg>
                {/* Sunny Coral Curtains with Scalloped Edge */}
                <div className="absolute inset-y-0 left-0 w-7 sm:w-9 bg-gradient-to-r from-[#FF7A59] to-[#FF9E80] shadow-md rounded-r-2xl border-r-2 border-white/60" />
                <div className="absolute inset-y-0 right-0 w-7 sm:w-9 bg-gradient-to-l from-[#FF7A59] to-[#FF9E80] shadow-md rounded-l-2xl border-l-2 border-white/60" />
              </div>

              {/* Left Side: Framed Portrait of Yannick with a boy's image (Safely below room switcher) */}
              <div className="absolute top-20 sm:top-24 left-4 sm:left-10 md:left-16 flex flex-col items-center">
                <div className="w-16 sm:w-20 h-22 sm:h-26 bg-[#FFFBEB] rounded-2xl border-4 border-[#F59E0B] shadow-xl flex flex-col items-center justify-center p-1 relative">
                  {/* Hanging cord */}
                  <div className="absolute -top-3 w-2 h-2 rounded-full bg-[#B45309]" />
                  <div className="absolute -top-2.5 w-7 h-3.5 border-t-2 border-slate-400 rotate-12" />

                  {/* High Quality Storybook Portrait of Yannick */}
                  <div className="w-13 sm:w-16 h-15 sm:h-18 rounded-xl overflow-hidden shadow-sm border-2 border-amber-300 bg-amber-50">
                    <img
                      src="./illustrations/yannick.png"
                      alt="Yannick"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Portrait Label */}
                  <span className="text-[10px] sm:text-xs font-black text-amber-950 mt-1 tracking-tight leading-none">
                    Yannick
                  </span>
                </div>
              </div>

              {/* Right Side: Cozy Bookshelf with Plant & Clock (Safely below action dock) */}
              <div className="absolute top-20 sm:top-24 right-4 sm:right-10 md:right-16 flex flex-col items-center">
                <div className="flex items-end gap-1.5 mb-0.5">
                  <span className="text-xl sm:text-2xl">🌱</span>
                  <span className="text-base sm:text-lg">📚</span>
                  <span className="text-lg sm:text-xl">⏰</span>
                </div>
                <div className="w-24 sm:w-32 h-3.5 bg-[#8B5A2B] rounded-full shadow-md border-b-2 border-[#5C3A1E]" />
              </div>
            </div>

            {/* Decorative Baseboard Trim */}
            <div className="absolute inset-x-0 top-[60%] h-5 bg-gradient-to-b from-[#F1E4D4] to-[#E5D0BA] border-t-2 border-white/90 shadow-md z-10 flex items-center justify-around">
              <div className="w-full h-1 bg-[#D4A373]/40" />
            </div>

            {/* Warm Hardwood Floor (40% height) */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-[#E7B988] via-[#DEAA74] to-[#D49B60] overflow-hidden">
              <div
                className="w-full h-full opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 2px, transparent 2px, transparent 36px), repeating-linear-gradient(90deg, #000 0, #000 2px, transparent 2px, transparent 140px)'
                }}
              />

              {/* Giant Cute Smiling Bear Rug */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[75%] max-w-2xl h-36 sm:h-44 rounded-[100px] bg-gradient-to-b from-[#FFF1E6] to-[#FFE5D4] border-4 border-[#F4A261] shadow-2xl flex items-center justify-center relative overflow-hidden">
                {/* Bear Ears */}
                <div className="absolute -top-3.5 left-14 sm:left-24 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#FFE5D4] border-4 border-[#F4A261] flex items-center justify-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#F4A261]/40" />
                </div>
                <div className="absolute -top-3.5 right-14 sm:right-24 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#FFE5D4] border-4 border-[#F4A261] flex items-center justify-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#F4A261]/40" />
                </div>
                {/* Bear Face */}
                <div className="flex flex-col items-center opacity-85">
                  <div className="flex items-center gap-12 sm:gap-20">
                    <div className="w-4 sm:w-5 h-2 sm:h-2.5 border-b-3 border-[#9A3412] rounded-full" />
                    <div className="w-4 sm:w-5 h-2 sm:h-2.5 border-b-3 border-[#9A3412] rounded-full" />
                  </div>
                  <div className="flex items-center justify-between w-24 sm:w-36 -mt-1">
                    <div className="w-3.5 sm:w-4 h-2 sm:h-2.5 rounded-full bg-[#FB7185] opacity-70" />
                    <div className="w-7 sm:w-8 h-5 sm:h-6 rounded-full bg-white flex flex-col items-center justify-center border border-[#F4A261]/50 shadow-xs">
                      <div className="w-3 sm:w-3.5 h-2 sm:h-2.5 bg-[#7C2D12] rounded-full" />
                      <div className="w-1.5 h-1 border-b-2 border-[#7C2D12]" />
                    </div>
                    <div className="w-3.5 sm:w-4 h-2 sm:h-2.5 rounded-full bg-[#FB7185] opacity-70" />
                  </div>
                </div>
                <div className="absolute inset-2 sm:inset-3 rounded-[90px] border-2 border-dashed border-[#F4A261]/50 pointer-events-none" />
              </div>
            </div>
          </div>
        );

      case 'cuisine':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top Wall (60% height) - Mint & Strawberry Bakery Theme */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0] overflow-hidden">
              {/* Fresh Kitchen Subway Tile Pattern */}
              <div
                className="w-full h-full opacity-35"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #059669 0, #059669 2px, transparent 2px, transparent 28px), repeating-linear-gradient(90deg, #059669 0, #059669 2px, transparent 2px, transparent 56px)'
                }}
              />

              {/* Left Kitchen Cupboard (Pastel Pink) - Safely below room switcher */}
              <div className="absolute top-20 sm:top-24 left-4 sm:left-10 md:left-16 w-16 sm:w-20 h-24 sm:h-30 bg-[#FFE4E6] rounded-2xl border-4 border-[#FDA4AF] shadow-md flex flex-col items-center justify-around p-1">
                <span className="text-xs sm:text-sm">💖</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shadow-xs" />
                <div className="w-full h-0.5 bg-[#FDA4AF]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shadow-xs" />
              </div>

              {/* Sunny Garden Window with Apple Tree & Bird (Center) - Safely cleared below top docks */}
              <div className="absolute top-18 sm:top-20 left-1/2 -translate-x-1/2 w-44 sm:w-56 md:w-64 h-32 sm:h-40 md:h-48 rounded-2xl border-6 sm:border-8 border-white shadow-2xl bg-[#BAE6FD] overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice">
                  <rect width="240" height="180" fill="#7DD3FC" />
                  {/* Sunbeams */}
                  <circle cx="210" cy="30" r="30" fill="#FDE047" opacity="0.9" />
                  <circle cx="210" cy="30" r="45" fill="#FEF08A" opacity="0.4" />
                  {/* Garden Apple Tree */}
                  <circle cx="60" cy="190" r="90" fill="#4ADE80" />
                  <circle cx="40" cy="110" r="45" fill="#22C55E" />
                  <circle cx="85" cy="100" r="40" fill="#16A34A" />
                  {/* Red Apples on Tree */}
                  <circle cx="35" cy="105" r="5" fill="#EF4444" />
                  <circle cx="55" cy="120" r="5" fill="#EF4444" />
                  <circle cx="80" cy="95" r="5" fill="#EF4444" />
                  <circle cx="95" cy="115" r="5" fill="#EF4444" />
                  {/* Happy Yellow Bird */}
                  <g transform="translate(130, 80)">
                    <circle cx="10" cy="10" r="8" fill="#FACC15" />
                    <circle cx="12" cy="9" r="1.5" fill="#1E293B" />
                    <polygon points="17,10 22,8 18,13" fill="#F97316" />
                    <ellipse cx="6" cy="12" rx="6" ry="4" fill="#EAB308" />
                    <text x="18" y="2" fontSize="10" fill="#0284C7">🎵</text>
                  </g>
                  {/* Window Dividers */}
                  <line x1="0" y1="90" x2="240" y2="90" stroke="white" strokeWidth="6" />
                  <line x1="120" y1="0" x2="120" y2="180" stroke="white" strokeWidth="6" />
                </svg>
                {/* Red & White Gingham Checkered Valance Canopy */}
                <div className="absolute top-0 inset-x-0 h-9 sm:h-11 bg-[#F43F5E] shadow-md overflow-hidden flex items-center justify-around border-b-2 border-white">
                  <div
                    className="w-full h-full opacity-40 bg-white"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, #fff 0, #fff 8px, transparent 8px, transparent 16px), repeating-linear-gradient(0deg, #fff 0, #fff 8px, transparent 8px, transparent 16px)'
                    }}
                  />
                  {/* Scalloped Lace Ruffles */}
                  <div className="absolute bottom-0 inset-x-0 flex justify-between">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-5 h-2.5 bg-white rounded-b-full shadow-xs -mb-1" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Spice & Jam Shelf (Safely below action dock) */}
              <div className="absolute top-20 sm:top-24 right-4 sm:right-10 md:right-16 flex flex-col items-center">
                <div className="flex items-end gap-1.5 mb-0.5">
                  <span className="text-xl sm:text-2xl">🍯</span>
                  <span className="text-xl sm:text-2xl">🍓</span>
                  <span className="text-xl sm:text-2xl">🫖</span>
                </div>
                <div className="w-24 sm:w-30 h-3.5 bg-[#B45309] rounded-full shadow-md border-b-2 border-[#78350F]" />
                {/* Hanging Mugs */}
                <div className="flex items-center gap-3 sm:gap-4 mt-1">
                  <span className="text-base sm:text-lg">☕</span>
                  <span className="text-base sm:text-lg">🥛</span>
                </div>
              </div>
            </div>

            {/* Kitchen Counter Ledge Baseboard */}
            <div className="absolute inset-x-0 top-[60%] h-5 bg-gradient-to-b from-[#A7F3D0] to-[#6EE7B7] border-t-2 border-white shadow-md z-10 flex items-center justify-around">
              <div className="w-full h-1 bg-[#059669]/30" />
            </div>

            {/* Checkered Diner Floor (40% height) */}
            <div
              className="absolute inset-x-0 bottom-0 h-[40%] bg-[#FFFBEB]"
              style={{
                backgroundImage: 'repeating-conic-gradient(#FFFDF5 0% 25%, #FED7AA 0% 50%)',
                backgroundSize: '56px 56px'
              }}
            >
              {/* Giant Cute Watermelon Slice Rug */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[75%] max-w-2xl h-36 sm:h-44 rounded-t-full bg-gradient-to-b from-[#EF4444] to-[#DC2626] border-6 sm:border-8 border-[#15803D] shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                {/* White Rind Layer */}
                <div className="absolute inset-x-0 top-0 h-3 bg-[#DCFCE7]" />
                {/* Watermelon Seeds */}
                <div className="flex items-center justify-around w-48 sm:w-72 mt-2 opacity-85">
                  <span className="text-xs sm:text-sm font-black rotate-12">💧</span>
                  <span className="text-xs sm:text-sm font-black -rotate-12">💧</span>
                  <span className="text-xs sm:text-sm font-black rotate-12">💧</span>
                  <span className="text-xs sm:text-sm font-black -rotate-12">💧</span>
                </div>
                <div className="flex items-center justify-around w-32 sm:w-48 mt-1 opacity-85">
                  <span className="text-xs sm:text-sm font-black -rotate-12">💧</span>
                  <span className="text-xs sm:text-sm font-black rotate-12">💧</span>
                  <span className="text-xs sm:text-sm font-black -rotate-12">💧</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-2 bg-[#15803D]" />
              </div>
            </div>
          </div>
        );

      case 'cour':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top Sunny Sky (58% height) */}
            <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-[#38BDF8] via-[#7DD3FC] to-[#BAE6FD] overflow-hidden">
              {/* Big Happy Smiling Cartoon Sun (Right Sky - Safely below action dock) */}
              <div className="absolute top-20 sm:top-24 right-6 sm:right-14 md:right-20 w-22 sm:w-28 h-22 sm:h-28 flex items-center justify-center">
                {/* Sun Rays */}
                <div className="absolute inset-0 rounded-full bg-[#FEF08A] opacity-40 animate-pulse" />
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Golden Rays */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 44 * Math.cos((i * Math.PI) / 6)}
                      y2={50 + 44 * Math.sin((i * Math.PI) / 6)}
                      stroke="#FBBF24"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  ))}
                  {/* Sun Body */}
                  <circle cx="50" cy="50" r="30" fill="#F59E0B" />
                  <circle cx="50" cy="50" r="28" fill="#FBBF24" />
                  {/* Smiling Face */}
                  <circle cx="41" cy="46" r="3.5" fill="#78350F" />
                  <circle cx="59" cy="46" r="3.5" fill="#78350F" />
                  <ellipse cx="36" cy="53" rx="4" ry="2.5" fill="#FB7185" opacity="0.8" />
                  <ellipse cx="64" cy="53" rx="4" ry="2.5" fill="#FB7185" opacity="0.8" />
                  <path d="M 44 54 Q 50 61 56 54" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              {/* Radiant Double Rainbow (Center Sky - Safely arched) */}
              <svg className="absolute top-12 sm:top-14 left-1/2 -translate-x-1/2 w-[85%] max-w-2xl h-36 sm:h-44" viewBox="0 0 600 240" preserveAspectRatio="none">
                <circle cx="300" cy="240" r="230" fill="none" stroke="#F43F5E" strokeWidth="8" opacity="0.8" />
                <circle cx="300" cy="240" r="222" fill="none" stroke="#FB923C" strokeWidth="8" opacity="0.8" />
                <circle cx="300" cy="240" r="214" fill="none" stroke="#FACC15" strokeWidth="8" opacity="0.8" />
                <circle cx="300" cy="240" r="206" fill="none" stroke="#4ADE80" strokeWidth="8" opacity="0.8" />
                <circle cx="300" cy="240" r="198" fill="none" stroke="#38BDF8" strokeWidth="8" opacity="0.8" />
              </svg>

              {/* Floating Fluffy Clouds (Left Sky - Safely below room switcher) */}
              <div className="absolute top-20 sm:top-24 left-6 sm:left-14 flex items-center">
                <div className="w-24 sm:w-30 h-10 sm:h-12 rounded-full bg-white/90 shadow-md flex items-center justify-around px-2 border-2 border-white">
                  <div className="w-2 h-2 rounded-full bg-[#1E293B]" />
                  <div className="w-2 h-2 rounded-full bg-[#1E293B]" />
                </div>
              </div>

              {/* Rolling Green Hills in Background */}
              <div className="absolute -bottom-10 -left-20 w-[60%] h-48 rounded-full bg-[#86EFAC] opacity-90 shadow-inner" />
              <div className="absolute -bottom-12 -right-10 w-[65%] h-52 rounded-full bg-[#4ADE80] opacity-90 shadow-inner" />

              {/* Big Lush Cartoon Tree on Left with Apples & Birdhouse */}
              <div className="absolute bottom-2 left-6 sm:left-14 flex flex-col items-center z-10">
                {/* Treetop */}
                <div className="relative w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-gradient-to-b from-[#4ADE80] to-[#16A34A] shadow-xl flex items-center justify-center">
                  {/* Apples */}
                  <span className="absolute top-6 left-6 text-base sm:text-lg">🍎</span>
                  <span className="absolute top-14 right-6 text-base sm:text-lg">🍎</span>
                  <span className="absolute bottom-6 left-12 text-base sm:text-lg">🍎</span>
                  {/* Wooden Birdhouse */}
                  <div className="w-8 h-10 bg-[#B45309] rounded-t-lg border-2 border-[#78350F] shadow-md flex flex-col items-center justify-around p-0.5">
                    <div className="w-3 h-3 rounded-full bg-[#451A03]" />
                    <span className="text-[10px] leading-none">🐦</span>
                  </div>
                </div>
                {/* Tree Trunk */}
                <div className="w-6 sm:w-8 h-10 bg-gradient-to-r from-[#92400E] to-[#78350F] rounded-b-md shadow-md -mt-2" />
              </div>

              {/* White Picket Fence Across Horizon */}
              <div className="absolute bottom-0 inset-x-0 h-14 flex items-end justify-around px-2">
                {Array.from({ length: 26 }).map((_, i) => (
                  <div key={i} className="w-3.5 sm:w-4 h-12 bg-white rounded-t-md shadow-sm border border-slate-200 relative">
                    {i === 18 && <span className="absolute -top-2 left-0 text-xs">🐞</span>}
                  </div>
                ))}
                <div className="absolute bottom-3 inset-x-0 h-2 bg-white/95 shadow-sm" />
                <div className="absolute bottom-8 inset-x-0 h-2 bg-white/95 shadow-sm" />
              </div>
            </div>

            {/* Vibrant Emerald Lawn (42% height) */}
            <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-[#22C55E] via-[#16A34A] to-[#15803D] shadow-inner overflow-hidden">
              {/* Curved Garden Stepping Stones Path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                <ellipse cx="200" cy="160" rx="36" ry="18" fill="#FDE68A" stroke="#D97706" strokeWidth="3" opacity="0.9" />
                <ellipse cx="320" cy="140" rx="40" ry="20" fill="#FED7AA" stroke="#EA580C" strokeWidth="3" opacity="0.9" />
                <ellipse cx="440" cy="110" rx="38" ry="19" fill="#E9D5FF" stroke="#9333EA" strokeWidth="3" opacity="0.9" />
                <ellipse cx="560" cy="90" rx="36" ry="18" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" opacity="0.9" />
                <ellipse cx="680" cy="65" rx="34" ry="17" fill="#FECDD3" stroke="#E11D48" strokeWidth="3" opacity="0.9" />
              </svg>

              {/* Colorful Wildflower Patches & Fluttering Butterflies */}
              <div className="absolute bottom-10 left-8 sm:left-24 text-2xl animate-bounce">🌻</div>
              <div className="absolute bottom-16 left-36 sm:left-56 text-xl">🌷</div>
              <div className="absolute bottom-6 left-64 sm:left-80 text-xl">🌼</div>
              <div className="absolute bottom-14 right-48 sm:right-72 text-2xl">🌸</div>
              <div className="absolute bottom-8 right-24 sm:right-40 text-xl">🌷</div>
              <div className="absolute bottom-18 right-10 text-2xl">🌻</div>
              {/* Butterflies */}
              <div className="absolute bottom-24 left-1/3 text-2xl animate-pulse">🦋</div>
              <div className="absolute bottom-12 right-1/3 text-xl">🦋</div>
            </div>
          </div>
        );

      case 'chambre':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top Wall (60% height) - Dreamy Starlight Indigo to Lavender */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[#1E1B4B] via-[#3730A3] to-[#7C3AED] overflow-hidden">
              {/* Twinkling Golden Stars & Constellation Dust */}
              <div className="absolute inset-0">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white shadow-xs"
                    style={{
                      left: `${(i * 19) % 96}%`,
                      top: `${(i * 29) % 85}%`,
                      width: `${(i % 3) + 2}px`,
                      height: `${(i % 3) + 2}px`,
                      opacity: (i % 2 === 0 ? 0.9 : 0.6)
                    }}
                  />
                ))}
                {/* 4-point Sparkle Stars */}
                <span className="absolute top-6 left-16 text-lg sm:text-xl text-yellow-300">✨</span>
                <span className="absolute top-12 left-44 text-sm sm:text-base text-yellow-200">⭐</span>
                <span className="absolute top-8 right-24 text-lg sm:text-xl text-yellow-300">✨</span>
                <span className="absolute top-16 right-48 text-sm sm:text-base text-yellow-200">⭐</span>
              </div>

              {/* Glowing Moon & Star Garland */}
              <svg className="absolute top-0 inset-x-0 w-full h-16 sm:h-20" viewBox="0 0 1000 70" preserveAspectRatio="none">
                <path d="M 0 15 Q 250 42 500 20 Q 750 42 1000 15" stroke="#FDE047" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.7" />
                {/* Glowing Star & Moon Ornaments */}
                <circle cx="100" cy="30" r="7" fill="#FDE047" />
                <path d="M 200 28 A 8 8 0 0 0 208 40 A 10 10 0 1 1 200 28 Z" fill="#FEF08A" />
                <circle cx="300" cy="38" r="8" fill="#F472B6" />
                <circle cx="400" cy="30" r="7" fill="#FDE047" />
                <path d="M 500 22 A 8 8 0 0 0 508 34 A 10 10 0 1 1 500 22 Z" fill="#FEF08A" />
                <circle cx="600" cy="30" r="8" fill="#A78BFA" />
                <circle cx="700" cy="36" r="7" fill="#FDE047" />
                <path d="M 800 30 A 8 8 0 0 0 808 42 A 10 10 0 1 1 800 30 Z" fill="#FEF08A" />
                <circle cx="900" cy="24" r="7" fill="#F472B6" />
              </svg>

              {/* Magical Crescent Moon Window (Center) - Safely cleared below top docks */}
              <div className="absolute top-18 sm:top-20 left-1/2 -translate-x-1/2 w-44 sm:w-56 md:w-64 h-32 sm:h-40 md:h-48 rounded-t-[100px] border-6 sm:border-8 border-white shadow-2xl bg-[#0F172A] overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice">
                  <rect width="240" height="180" fill="#0F172A" />
                  {/* Shooting Star */}
                  <line x1="20" y1="20" x2="90" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                  <polygon points="90,55 82,53 85,60" fill="white" />
                  {/* Sleepy Crescent Moon with Nightcap */}
                  <g transform="translate(100, 35)">
                    {/* Golden Crescent Moon */}
                    <path d="M 40 10 A 30 30 0 0 0 50 65 A 35 35 0 1 1 40 10 Z" fill="#FDE047" />
                    {/* Cute Nightcap on Moon */}
                    <polygon points="40,12 25,-8 50,8" fill="#F43F5E" />
                    <line x1="33" y1="2" x2="45" y2="10" stroke="white" strokeWidth="2.5" />
                    <circle cx="23" cy="-10" r="5" fill="white" />
                    {/* Sleepy Face */}
                    <path d="M 28 35 Q 32 39 36 35" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <ellipse cx="26" cy="40" rx="3.5" ry="2" fill="#FB7185" opacity="0.8" />
                  </g>
                  {/* Cloud under moon */}
                  <ellipse cx="120" cy="140" rx="60" ry="22" fill="#E2E8F0" opacity="0.85" />
                  <circle cx="95" cy="125" r="22" fill="#E2E8F0" opacity="0.85" />
                  <circle cx="145" cy="122" r="24" fill="#E2E8F0" opacity="0.85" />
                  {/* Window Frame Panes */}
                  <line x1="0" y1="90" x2="240" y2="90" stroke="white" strokeWidth="6" />
                  <line x1="120" y1="0" x2="120" y2="180" stroke="white" strokeWidth="6" />
                </svg>
                {/* Dreamy Lavender Curtains */}
                <div className="absolute inset-y-0 left-0 w-7 sm:w-9 bg-gradient-to-r from-[#A855F7] to-[#C084FC] shadow-md rounded-r-2xl border-r-2 border-white/60" />
                <div className="absolute inset-y-0 right-0 w-7 sm:w-9 bg-gradient-to-l from-[#A855F7] to-[#C084FC] shadow-md rounded-l-2xl border-l-2 border-white/60" />
              </div>

              {/* Left Side: Toy Rocket & Teddy Bear Shelf (Safely below room switcher) */}
              <div className="absolute top-20 sm:top-24 left-4 sm:left-10 md:left-16 flex flex-col items-center">
                <div className="flex items-end gap-2 mb-0.5">
                  <span className="text-xl sm:text-2xl">🚀</span>
                  <span className="text-xl sm:text-2xl">🧸</span>
                </div>
                <div className="w-24 sm:w-28 h-3.5 bg-[#6D28D9] rounded-full shadow-md border-b-2 border-[#4C1D95]" />
              </div>

              {/* Right Side: Glowing Cloud Nightlight (Safely below action dock) */}
              <div className="absolute top-20 sm:top-24 right-4 sm:right-10 md:right-16 flex flex-col items-center">
                <div className="w-12 sm:w-16 h-8 sm:h-10 rounded-full bg-yellow-100 shadow-xl border-2 border-yellow-200 flex items-center justify-center relative">
                  <span className="text-xs">💤</span>
                  <div className="absolute -inset-1 rounded-full bg-yellow-200 opacity-40 blur-xs -z-10" />
                </div>
              </div>
            </div>

            {/* Baseboard with Tiny Mouse Door */}
            <div className="absolute inset-x-0 top-[60%] h-5 bg-gradient-to-b from-[#C4B5FD] to-[#A78BFA] border-t-2 border-white shadow-md z-10 flex items-center justify-between px-16 sm:px-28">
              <div className="w-5 h-5 -mt-3 rounded-t-full bg-[#4C1D95] border-2 border-[#6D28D9] flex items-center justify-center shadow-md">
                <div className="w-1 h-1 rounded-full bg-yellow-300 ml-1.5" />
              </div>
            </div>

            {/* Warm Lavender Wood Floor (40% height) */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-[#E2D4F0] via-[#D5C2E8] to-[#C8B0DF] overflow-hidden">
              <div
                className="w-full h-full opacity-15"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #3B0764 0, #3B0764 2px, transparent 2px, transparent 36px), repeating-linear-gradient(90deg, #3B0764 0, #3B0764 2px, transparent 2px, transparent 130px)'
                }}
              />

              {/* Giant Smiling Sleepy Cloud Rug */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[75%] max-w-2xl h-36 sm:h-44 rounded-full bg-gradient-to-b from-white via-white to-[#F1F5F9] border-4 border-[#C084FC] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                {/* Cloud Puffs Silhouette */}
                <div className="flex items-center gap-12 sm:gap-20">
                  <div className="w-5 sm:w-6 h-2.5 sm:h-3 border-b-3 border-[#6B21A8] rounded-full" />
                  <div className="w-5 sm:w-6 h-2.5 sm:h-3 border-b-3 border-[#6B21A8] rounded-full" />
                </div>
                {/* Rosy Cheeks & Sweet Smile */}
                <div className="flex items-center justify-between w-28 sm:w-40 mt-1">
                  <div className="w-4 sm:w-5 h-2.5 sm:h-3 rounded-full bg-[#F472B6] opacity-75" />
                  <div className="w-5 h-2.5 border-b-3 border-[#6B21A8] rounded-full" />
                  <div className="w-4 sm:w-5 h-2.5 sm:h-3 rounded-full bg-[#F472B6] opacity-75" />
                </div>
                {/* Star Tassels on edges */}
                <span className="absolute bottom-2 left-8 text-xs text-yellow-400">⭐</span>
                <span className="absolute bottom-2 right-8 text-xs text-yellow-400">⭐</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden select-none">
      {/* Top Left: Room Switcher (Always accessible, compact, never covering canvas items) */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border-2 border-slate-200">
        {baseScenes.map((sc, idx) => {
          const isSelected = idx === activeSceneIndex;
          const sceneIcons = ['🛋️', '🍳', '🌳', '🛏️'];
          const sceneNames = ['Salon', 'Cuisine', 'Jardin', 'Chambre'];
          return (
            <motion.button
              key={sc.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                audioManager.playPop(450 + idx * 50);
                setActiveSceneIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-base font-black transition-all shadow-sm ${
                isSelected
                  ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 scale-105 shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-700'
              }`}
              title={sc.name_fr}
            >
              <span>{sceneIcons[idx % sceneIcons.length]}</span>
              <span className="text-xs font-black hidden sm:inline">{sceneNames[idx]}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Main Interactive Room Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* Render Rich Room Backdrop */}
        {renderRoomBackdrop()}

        {/* Interactive Scene Hotspots */}
        {displayedItems.map((item, idx) => {
          const word = wordsMap.get(item.wordId);
          if (!word) return null;

          return (
            <motion.div
              key={`${item.wordId}-${idx}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation z-20 flex flex-col items-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.04, type: 'spring', stiffness: 350, damping: 20 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{
                scale: 1.35,
                rotate: [0, -8, 8, 0],
                transition: { type: 'spring', stiffness: 500, damping: 12 }
              }}
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                handleItemTap(item.wordId, rect.left + rect.width / 2, rect.top);
              }}
            >
              <div className="relative group flex flex-col items-center">
                {/* Glow halo on hover/touch */}
                <div className="absolute -inset-3 bg-yellow-300/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <ToddlerGraphic
                  id={word.id}
                  word={word.fr}
                  illustrationAsset={word.illustrationAsset}
                  category={word.categoryId}
                  size={Math.max(item.size, 72)}
                  className="drop-shadow-2xl transition-transform"
                />

                {/* Friendly Word Label & Grey Translations (Toggled by 🏷️ Mots) */}
                {showLabels && (
                  <div className="mt-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border-2 border-slate-200 pointer-events-none flex flex-col items-center leading-tight">
                    <span className="text-[11px] md:text-xs font-black text-slate-800 whitespace-nowrap">
                      {word.fr}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-bold text-slate-400 whitespace-nowrap">
                      {word.en} • {word.zh}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Floating Tap Feedback Particle */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -90, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: activeItem.x,
                top: activeItem.y,
                pointerEvents: 'none',
                zIndex: 999
              }}
              className="flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
              <span className="text-4xl filter drop-shadow">⭐</span>
              <span className="mt-1 bg-amber-400 text-amber-950 font-black text-sm px-3.5 py-1 rounded-full shadow-2xl border-2 border-white">
                {activeItem.fr} !
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
