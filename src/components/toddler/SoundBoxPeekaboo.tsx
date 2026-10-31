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

// Map SFX prompts to pre-rendered studio neural audio files (fr-CA-SylvieNeural)
const SFX_AUDIO_MAP: Record<string, { audioId: string; text: string }> = {
  'ani_08': { audioId: 'sfx_ani_08', text: 'Miaou ! Miaou !' },     // chat
  'ani_11': { audioId: 'sfx_ani_11', text: 'Wouf wouf !' },         // chien
  'ani_40': { audioId: 'sfx_ani_40', text: 'Meuh ! Meuh !' },       // vache
  'ani_13': { audioId: 'sfx_ani_13', text: 'Cocorico !' },          // coq
  'ani_07': { audioId: 'sfx_ani_07', text: 'Coin coin !' },         // canard
  'ani_24': { audioId: 'sfx_ani_24', text: 'Bêêê !' },              // mouton
  'ani_02': { audioId: 'sfx_ani_02', text: 'Bêêê !' },              // agneau
  'ani_12': { audioId: 'sfx_ani_12', text: 'Groin groin !' },       // cochon
  'ani_21': { audioId: 'sfx_ani_21', text: 'Hop ! Hop !' },         // lapin
  'ani_01': { audioId: 'sfx_ani_01', text: 'Bzzzz !' },             // abeille
  'ani_04': { audioId: 'sfx_ani_04', text: 'Hi-han !' },            // âne
  'ani_09': { audioId: 'sfx_ani_09', text: 'Hiii !' },              // cheval
  'ani_19': { audioId: 'sfx_ani_19', text: 'Croac croac !' },       // grenouille
  'ani_20': { audioId: 'sfx_ani_20', text: 'Hou hou !' },           // hibou
  'ani_22': { audioId: 'sfx_ani_22', text: 'Grrr !' },              // lion
  'ani_23': { audioId: 'sfx_ani_23', text: 'Aouh !' },              // loup
  'ani_26': { audioId: 'sfx_ani_26', text: 'Cui cui !' },           // oiseau
  'ani_28': { audioId: 'sfx_ani_28', text: 'Grrr !' },              // ours
  'ani_34': { audioId: 'sfx_ani_34', text: 'Cot cot cot !' },       // poule
  'ani_36': { audioId: 'sfx_ani_36', text: 'Ouh ouh ah ah !' },     // singe
  'ani_37': { audioId: 'sfx_ani_37', text: 'Couic couic !' },       // souris
  'ani_38': { audioId: 'sfx_ani_38', text: 'Grrr !' },              // tigre
  'veh_01': { audioId: 'sfx_veh_01', text: 'Vroum ! Vroum !' },     // auto
  'veh_02': { audioId: 'sfx_veh_02', text: 'Vroum ! Vroum !' },     // autobus
  'veh_03': { audioId: 'sfx_veh_03', text: 'Vrrrrrr !' },           // avion
  'veh_04': { audioId: 'sfx_veh_04', text: 'Pouët pouët !' },       // bateau
  'veh_05': { audioId: 'sfx_veh_05', text: 'Dring dring !' },       // bicyclette
  'veh_06': { audioId: 'sfx_veh_06', text: 'Vroum ! Vroum !' },     // camion
  'veh_07': { audioId: 'sfx_veh_07', text: 'Pin-pon ! Pin-pon !' }, // camion de pompier
  'veh_08': { audioId: 'sfx_veh_08', text: 'Vrrrrrr !' },           // hélicoptère
  'veh_09': { audioId: 'sfx_veh_09', text: 'Vroum ! Vroum !' },     // moto
  'veh_11': { audioId: 'sfx_veh_11', text: 'Vroum ! Vroum !' },     // tracteur
  'veh_12': { audioId: 'sfx_veh_12', text: 'Tchou tchou !' },       // train
  'veh_14': { audioId: 'sfx_veh_14', text: 'Dring dring !' },       // tricycle
};

export const SoundBoxPeekaboo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  const currentItem = PEEKABOO_CANDIDATES[currentIndex % PEEKABOO_CANDIDATES.length];

  const playMysterySound = () => {
    if (!currentItem) return;
    const match = SFX_AUDIO_MAP[currentItem.id];
    let audioId = 'sfx_peekaboo_intro';
    let text = 'Coucou ! Qui est là ?';

    if (match) {
      audioId = match.audioId;
      text = match.text;
    } else if (currentItem.id.startsWith('sfx_')) {
      audioId = currentItem.id;
      text = currentItem.fr;
    }

    audioManager.playSwoop();
    speechManager.speak(text, audioId);
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
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-md shadow-xl border-4 border-amber-300 flex items-center justify-center text-3xl md:text-4xl hover:scale-105 transition-transform"
          aria-label="Rejouer le son"
          title="Écouter le son mystère"
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
            onClick={() => {
              if (isRevealed) {
                speechManager.speak(currentItem.fr, currentItem.id);
              }
            }}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <ToddlerGraphic
              id={currentItem.id}
              word={currentItem.fr}
              illustrationAsset={currentItem.illustrationAsset}
              category={currentItem.categoryId}
              size={180}
              className="drop-shadow-2xl hover:scale-105 transition-transform"
            />
            {isRevealed && (
              <motion.div
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="mt-4 px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 font-black text-lg shadow-lg border-2 border-white flex items-center gap-2 hover:bg-amber-300 transition-colors"
              >
                <span>🔊</span>
                <span>{currentItem.fr} !</span>
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
