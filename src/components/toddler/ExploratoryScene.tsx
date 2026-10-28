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
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Wall: Warm honey striped wallpaper */}
            <div className="absolute inset-x-0 top-0 h-[62%] bg-[#FFF8EB] overflow-hidden">
              {/* Subtle vertical wallpaper stripe effect */}
              <div
                className="w-full h-full opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, #F59E0B 0, #F59E0B 4px, transparent 4px, transparent 32px)'
                }}
              />
              {/* Pennant Bunting Garland */}
              <div className="absolute top-2 right-36 left-48 h-10 flex items-center justify-around opacity-90">
                <div className="w-5 h-7 bg-[#EF476F] clip-triangle shadow-sm" />
                <div className="w-5 h-7 bg-[#FFD166] clip-triangle shadow-sm" />
                <div className="w-5 h-7 bg-[#06D6A0] clip-triangle shadow-sm" />
                <div className="w-5 h-7 bg-[#118AB2] clip-triangle shadow-sm" />
                <div className="w-5 h-7 bg-[#8338EC] clip-triangle shadow-sm" />
                <div className="w-5 h-7 bg-[#EF476F] clip-triangle shadow-sm" />
                <div className="w-5 h-7 bg-[#FFD166] clip-triangle shadow-sm" />
              </div>
              {/* Arched Window with Sunbeams & Curtains */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-36 bg-[#BAE6FD] rounded-t-full border-6 border-white shadow-md flex items-center justify-center overflow-hidden">
                {/* Hills outside */}
                <div className="absolute -bottom-6 -left-6 w-32 h-24 rounded-full bg-[#86EFAC]" />
                <div className="absolute -bottom-8 -right-6 w-36 h-28 rounded-full bg-[#4ADE80]" />
                <div className="absolute top-3 left-4 w-10 h-6 rounded-full bg-white/80" />
                <div className="absolute top-4 right-5 w-8 h-8 rounded-full bg-[#FEF08A] shadow-sm" />
                {/* Window panes */}
                <div className="absolute inset-x-0 top-1/2 h-1 bg-white/90" />
                <div className="absolute inset-y-0 left-1/2 w-1 bg-white/90" />
                {/* Cute Curtains */}
                <div className="absolute top-0 left-0 w-8 h-full bg-[#F4A261] rounded-br-2xl shadow-sm" />
                <div className="absolute top-0 right-0 w-8 h-full bg-[#F4A261] rounded-bl-2xl shadow-sm" />
              </div>
              {/* Framed Artwork on left wall */}
              <div className="absolute top-12 left-28 w-20 h-24 bg-[#FEF3C7] rounded-xl border-4 border-[#8B5A2B] shadow-md flex flex-col items-center justify-center p-1.5">
                <span className="text-2xl">🌻</span>
                <span className="text-[9px] font-bold text-amber-900 mt-1">Baobao</span>
              </div>
            </div>

            {/* Baseboard Molding */}
            <div className="absolute inset-x-0 top-[62%] h-4 bg-[#E5D0BA] border-t-2 border-[#D4A373] shadow-sm" />

            {/* Parquet Hardwood Floor */}
            <div
              className="absolute inset-x-0 bottom-0 h-[38%] bg-[#D4A373]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 2px, transparent 2px, transparent 36px), repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 120px)'
              }}
            >
              {/* Cozy Living Room Scalloped Rug */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[65%] max-w-2xl h-36 rounded-[80px] bg-[#FFE5D9] border-4 border-[#F4A261] shadow-inner opacity-90 flex items-center justify-center">
                <div className="w-[88%] h-24 rounded-[60px] border-2 border-dashed border-[#E76F51]/50" />
              </div>
            </div>
          </div>
        );

      case 'cuisine':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Wall: Mint Subway Tile */}
            <div className="absolute inset-x-0 top-0 h-[62%] bg-[#F0FDF4] overflow-hidden">
              <div
                className="w-full h-full opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #10B981 0, #10B981 2px, transparent 2px, transparent 28px), repeating-linear-gradient(90deg, #10B981 0, #10B981 2px, transparent 2px, transparent 56px)'
                }}
              />
              {/* Cute Kitchen Wall Clock */}
              <div className="absolute top-10 left-36 w-16 h-16 rounded-full bg-white border-4 border-[#059669] shadow-md flex items-center justify-center">
                <span className="text-xl">⏰</span>
              </div>
              {/* Kitchen Window */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-32 bg-[#BAE6FD] rounded-2xl border-6 border-white shadow-md flex items-center justify-center overflow-hidden">
                <div className="absolute -bottom-4 -left-4 w-28 h-20 rounded-full bg-[#86EFAC]" />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FEF08A]" />
                {/* Gingham Valance */}
                <div className="absolute top-0 inset-x-0 h-8 bg-[#EF476F] shadow-sm flex items-center justify-around">
                  <div className="w-full h-full opacity-30 bg-white" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff 0, #fff 6px, transparent 6px, transparent 12px)' }} />
                </div>
                {/* Window Pane Divider */}
                <div className="absolute inset-x-0 top-1/2 h-1 bg-white" />
                <div className="absolute inset-y-0 left-1/2 w-1 bg-white" />
              </div>
              {/* Cute Shelf on right */}
              <div className="absolute top-20 right-32 w-28 h-3 bg-[#8B5A2B] rounded-full shadow-md flex items-center justify-around">
                <span className="text-lg -mt-6">🫖</span>
                <span className="text-base -mt-5">🍯</span>
              </div>
            </div>

            {/* Kitchen Counter Baseboard */}
            <div className="absolute inset-x-0 top-[62%] h-4 bg-[#D1FAE5] border-t-2 border-[#10B981]/30 shadow-sm" />

            {/* Checkered Kitchen Floor */}
            <div
              className="absolute inset-x-0 bottom-0 h-[38%] bg-[#E2E8F0]"
              style={{
                backgroundImage: 'repeating-conic-gradient(#F8FAFC 0% 25%, #CBD5E1 0% 50%)',
                backgroundSize: '64px 64px'
              }}
            >
              {/* Soft Kitchen Mat */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] max-w-xl h-32 rounded-3xl bg-[#FEF08A]/70 border-3 border-[#F59E0B] shadow-inner" />
            </div>
          </div>
        );

      case 'cour':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Sunny Sky */}
            <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-[#38BDF8] via-[#7DD3FC] to-[#BAE6FD] overflow-hidden">
              {/* Soft Animated Background Clouds */}
              <div className="absolute top-6 left-12 w-28 h-10 rounded-full bg-white/70 blur-[1px]" />
              <div className="absolute top-12 right-24 w-36 h-12 rounded-full bg-white/80 blur-[1px]" />
              {/* Distant Rolling Hills */}
              <div className="absolute -bottom-10 -left-20 w-[60%] h-44 rounded-full bg-[#86EFAC] opacity-90" />
              <div className="absolute -bottom-12 -right-10 w-[65%] h-48 rounded-full bg-[#4ADE80] opacity-90" />
              {/* White Wooden Picket Fence */}
              <div className="absolute bottom-0 inset-x-0 h-14 flex items-end justify-around px-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-3.5 h-12 bg-white/95 rounded-t-md shadow-sm border border-slate-200" />
                ))}
                {/* Horizontal Fence Rail */}
                <div className="absolute bottom-3 inset-x-0 h-2 bg-white/90 shadow-sm" />
                <div className="absolute bottom-8 inset-x-0 h-2 bg-white/90 shadow-sm" />
              </div>
            </div>

            {/* Lush Green Lawn Floor */}
            <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-[#22C55E] to-[#16A34A] shadow-inner overflow-hidden">
              {/* Little Garden Flowers and Grass Blades */}
              <div className="absolute bottom-12 left-16 text-xl">🌼</div>
              <div className="absolute bottom-8 left-48 text-xl">🌸</div>
              <div className="absolute bottom-16 right-36 text-xl">🌷</div>
              <div className="absolute bottom-6 right-20 text-xl">🌼</div>
              <div className="absolute bottom-20 left-1/2 text-lg opacity-80">🦋</div>
            </div>
          </div>
        );

      case 'chambre':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Dreamy Twilight Lavender Wall */}
            <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-[#DDD6FE] via-[#E9D5FF] to-[#F5D0FE] overflow-hidden">
              {/* Star Garland */}
              <div className="absolute top-3 inset-x-20 h-10 flex items-center justify-around opacity-90">
                <span className="text-xl">⭐</span>
                <span className="text-sm">✨</span>
                <span className="text-xl">🌙</span>
                <span className="text-sm">✨</span>
                <span className="text-xl">⭐</span>
                <span className="text-sm">✨</span>
                <span className="text-xl">⭐</span>
              </div>
              {/* Arched Window with Moonlight/Daylight */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-36 bg-[#C7D2FE] rounded-t-full border-6 border-white shadow-md flex items-center justify-center overflow-hidden">
                <div className="absolute top-4 right-5 text-2xl">🌙</div>
                <div className="absolute top-10 left-6 text-sm">✨</div>
                <div className="absolute -bottom-6 -left-6 w-32 h-20 rounded-full bg-[#818CF8]" />
                <div className="absolute inset-x-0 top-1/2 h-1 bg-white/90" />
                <div className="absolute inset-y-0 left-1/2 w-1 bg-white/90" />
                <div className="absolute top-0 left-0 w-8 h-full bg-[#F472B6]/80 rounded-br-2xl" />
                <div className="absolute top-0 right-0 w-8 h-full bg-[#F472B6]/80 rounded-bl-2xl" />
              </div>
            </div>

            {/* Bedroom Baseboard */}
            <div className="absolute inset-x-0 top-[62%] h-4 bg-[#EDE9FE] border-t-2 border-[#C4B5FD] shadow-sm" />

            {/* Warm Wooden Floor */}
            <div
              className="absolute inset-x-0 bottom-0 h-[38%] bg-[#E2CFEA]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 32px)'
              }}
            >
              {/* Fluffy Star/Cloud Play Rug */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] max-w-xl h-36 rounded-full bg-white/90 border-4 border-[#C084FC] shadow-lg flex items-center justify-center">
                <div className="w-[85%] h-24 rounded-full border-2 border-dashed border-[#A855F7]/40 flex items-center justify-center text-3xl opacity-40">
                  ✨
                </div>
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
                  size={item.size}
                  className="drop-shadow-2xl transition-transform"
                />

                {/* Friendly Word Label */}
                {showLabels && (
                  <div className="mt-1 bg-white/95 backdrop-blur-md px-3 py-0.5 rounded-full shadow-lg border-2 border-slate-200 text-[11px] md:text-xs font-black text-slate-800 whitespace-nowrap pointer-events-none">
                    {word.fr}
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
