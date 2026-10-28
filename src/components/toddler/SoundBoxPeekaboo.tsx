import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import vocabularyData from '../../data/vocabulary.json';
import { WordItem } from '../../types';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { ToddlerGraphic } from '../common/ToddlerGraphic';

// Pool of animals, vehicles, and sound-emitting objects for peekaboo
const PEEKABOO_CANDIDATES = (vocabularyData as WordItem[]).filter(w =>
  w.categoryId === 1 || // SFX / Animal sounds
  w.categoryId === 2 || // Animals
  w.categoryId === 3    // Vehicles
);

// Map SFX prompts
const SFX_MAP: Record<string, string> = {
  'ani_08': 'Miaou ! Miaou !', // chat
  'ani_11': 'Wouf wouf !',    // chien
  'ani_40': 'Meuh ! Meuh !',   // vache
  'ani_13': 'Cocorico !',      // coq
  'ani_07': 'Coin coin !',     // canard
  'ani_24': 'Bêêê !',          // mouton
  'ani_12': 'Groin groin !',   // cochon
  'ani_21': 'Hop ! Hop !',     // lapin
  'veh_01': 'Vroum ! Vroum !', // auto
  'veh_07': 'Pin-pon ! Pin-pon !', // camion de pompier
  'veh_12': 'Tchou tchou !',   // train
  'veh_03': 'Vrrrrrr !',       // avion
};

export const SoundBoxPeekaboo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  const currentItem = PEEKABOO_CANDIDATES[currentIndex % PEEKABOO_CANDIDATES.length];

  const playMysterySound = () => {
    if (!currentItem) return;
    const sfx = SFX_MAP[currentItem.id] || 'Coucou ! Qui est là ?';
    audioManager.playSwoop();
    speechManager.speak(sfx);
  };

  useEffect(() => {
    setIsRevealed(false);
    setIsCurtainOpen(false);

    // Play mystery prompt upon showing a new curtain
    const timer = setTimeout(() => {
      playMysterySound();
    }, 400);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleCurtainTap = () => {
    if (isCurtainOpen) return;

    setIsCurtainOpen(true);
    audioManager.playChime();

    // Trigger celebratory particle burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 }
    });

    // Pronounce the word in French (plays studio MP3)
    setTimeout(() => {
      setIsRevealed(true);
      speechManager.speak(currentItem.fr, currentItem.id);
      progressTracker.recordWordInteraction(currentItem.id);
    }, 300);
  };

  const handleNext = () => {
    audioManager.playPop(500);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-100 via-indigo-50 to-pink-100 select-none overflow-hidden">
      {/* Sound Replay Button (0-Text Ear/Speaker button) */}
      <div className="absolute top-6 left-6 z-30">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={playMysterySound}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-md shadow-xl border-4 border-amber-300 flex items-center justify-center text-3xl md:text-4xl"
          aria-label="Rejouer le son"
        >
          <span>👂</span>
        </motion.button>
      </div>

      {/* Main Peekaboo Stage */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-white shadow-2xl border-8 border-indigo-200 flex items-center justify-center overflow-hidden">
        {/* Hidden Item Behind the Curtains */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50/50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isCurtainOpen ? { scale: 1.1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="flex flex-col items-center justify-center"
          >
            <ToddlerGraphic
              id={currentItem.id}
              word={currentItem.fr}
              illustrationAsset={currentItem.illustrationAsset}
              category={currentItem.categoryId}
              size={180}
              className="drop-shadow-2xl"
            />
            {isRevealed && (
              <motion.div
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="mt-4 px-4 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-lg shadow-lg border-2 border-white"
              >
                {currentItem.fr} !
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Curtains / Mystery Flaps (Tap to open) */}
        <AnimatePresence>
          {!isCurtainOpen && (
            <motion.div
              onClick={handleCurtainTap}
              className="absolute inset-0 flex cursor-pointer z-20 group"
              whileTap={{ scale: 0.97 }}
            >
              {/* Left Curtain */}
              <motion.div
                initial={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="w-1/2 h-full bg-gradient-to-r from-rose-500 to-rose-400 border-r-2 border-rose-600 shadow-2xl flex items-center justify-end pr-2"
              >
                <div className="w-4 h-16 rounded-full bg-yellow-300/80 shadow-md group-hover:scale-110 transition-transform" />
              </motion.div>

              {/* Right Curtain */}
              <motion.div
                initial={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="w-1/2 h-full bg-gradient-to-l from-rose-500 to-rose-400 border-l-2 border-rose-600 shadow-2xl flex items-center justify-start pl-2"
              >
                <div className="w-4 h-16 rounded-full bg-yellow-300/80 shadow-md group-hover:scale-110 transition-transform" />
              </motion.div>

              {/* Pulsing Tap Affordance Badge in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-white shadow-xl flex items-center justify-center text-3xl"
                >
                  <span>✨</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Big Forward Navigation Button (Appears once revealed) */}
      <div className="mt-8 h-24 flex items-center justify-center">
        {isRevealed && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleNext}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-emerald-500 text-white shadow-2xl border-4 border-white flex items-center justify-center text-4xl animate-bounce"
            aria-label="Suivant"
          >
            <span>👉</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};
