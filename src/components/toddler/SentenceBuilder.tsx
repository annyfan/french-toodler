import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GrammarPair } from '../../types';
import { contentManager } from '../../engine/ContentManager';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager, slugifyText } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { ToddlerGraphic } from '../common/ToddlerGraphic';

export const SentenceBuilder: React.FC = () => {
  const [pairs, setPairs] = useState<GrammarPair[]>(contentManager.getGrammarPairs());
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [level, setLevel] = useState<1 | 2>(1);
  const [placedSlots, setPlacedSlots] = useState<{ slot1: boolean; slot2: boolean }>({
    slot1: false,
    slot2: false,
  });

  useEffect(() => {
    return contentManager.subscribe(() => {
      setPairs(contentManager.getGrammarPairs());
    });
  }, []);

  const totalPairs = pairs.length > 0 ? pairs.length : 1;
  const currentPair = pairs[currentPairIndex % totalPairs] || {
    id: 'syn_01',
    type: 'complexity',
    level1: 'Auto papa',
    level2: 'Auto à papa',
    blocks: ['Auto', 'papa'],
  };

  const blockWords = currentPair.blocks && currentPair.blocks.length >= 2 ? currentPair.blocks : ['Auto', 'papa'];
  const word1 = blockWords[0] || 'Auto';
  const word2 = blockWords[1] || 'Papa';

  const isComplete = placedSlots.slot1 && placedSlots.slot2;

  const handleTileTap = (slotNumber: 1 | 2) => {
    if (slotNumber === 1 && !placedSlots.slot1) {
      audioManager.playSnap();
      setPlacedSlots(prev => ({ ...prev, slot1: true }));
      const slug = slugifyText(word1);
      speechManager.speak(word1, `block_${slug}`);
      checkCompletion({ slot1: true, slot2: placedSlots.slot2 });
    } else if (slotNumber === 2 && !placedSlots.slot2) {
      audioManager.playSnap();
      setPlacedSlots(prev => ({ ...prev, slot2: true }));
      const slug = slugifyText(word2);
      speechManager.speak(word2, `block_${slug}`);
      checkCompletion({ slot1: placedSlots.slot1, slot2: true });
    }
  };

  const checkCompletion = (newSlots: { slot1: boolean; slot2: boolean }) => {
    if (newSlots.slot1 && newSlots.slot2) {
      audioManager.playFanfare();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.55 }
      });

      // Speak compound sentence in French based on level (pre-rendered studio audio)
      const sentenceToSpeak = level === 1 ? currentPair.level1 : currentPair.level2;
      const sentenceAudioId = `pair_${currentPair.id}_l${level}`;
      setTimeout(() => {
        speechManager.speak(sentenceToSpeak, sentenceAudioId);
      }, 350);

      progressTracker.recordGrammarInteraction(currentPair.id, level);
    }
  };

  const replaySentence = () => {
    const sentenceToSpeak = level === 1 ? currentPair.level1 : currentPair.level2;
    const sentenceAudioId = `pair_${currentPair.id}_l${level}`;
    speechManager.speak(sentenceToSpeak, sentenceAudioId);
  };

  const handleNext = () => {
    audioManager.playPop(500);
    setPlacedSlots({ slot1: false, slot2: false });
    setCurrentPairIndex(prev => prev + 1);
  };

  const handleReset = () => {
    audioManager.playPop(350);
    setPlacedSlots({ slot1: false, slot2: false });
  };

  const toggleLevel = () => {
    audioManager.playPop(400);
    setLevel(prev => (prev === 1 ? 2 : 1));
    setPlacedSlots({ slot1: false, slot2: false });
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-b from-teal-50 via-sky-50 to-amber-50 select-none overflow-hidden">
      {/* Top Bar: Level 1 / Level 2 Scaffold Toggle with clearance for top-right dock */}
      <div className="w-full flex items-center justify-between z-20 pr-60 md:pr-72">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleLevel}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-3xl font-bold text-sm md:text-base shadow-md border-2 transition-all ${
            level === 1
              ? 'bg-amber-400 text-amber-950 border-amber-300'
              : 'bg-emerald-500 text-white border-emerald-400'
          }`}
          aria-label="Changer de niveau"
        >
          <span className="text-xl">{level === 1 ? '🌱' : '🌳'}</span>
          <span>{level === 1 ? 'Niveau 1 (Mots simples)' : 'Niveau 2 (Phrases complètes)'}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md border-2 border-slate-200 flex items-center justify-center text-xl hover:bg-slate-50 transition-colors"
          aria-label="Recommencer"
        >
          <span>🔄</span>
        </motion.button>
      </div>

      {/* Center Sentence Assembly Drop-Zones */}
      <div className="relative flex-1 w-full max-w-2xl flex flex-col items-center justify-center gap-6">
        {/* Drop Slot Container */}
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap p-4 bg-white/70 backdrop-blur-md rounded-3xl border-4 border-dashed border-teal-300 shadow-xl min-h-[160px] md:min-h-[200px] w-full">
          {/* Slot 1 */}
          <motion.div
            layout
            onClick={() => {
              if (placedSlots.slot1) {
                speechManager.speak(word1, `block_${slugifyText(word1)}`);
              }
            }}
            className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 flex flex-col items-center justify-center shadow-md transition-all cursor-pointer ${
              placedSlots.slot1
                ? 'bg-amber-100 border-amber-400 scale-105 hover:bg-amber-200/80'
                : 'bg-slate-100/70 border-slate-300 border-dashed cursor-default'
            }`}
          >
            <AnimatePresence>
              {placedSlots.slot1 ? (
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  <ToddlerGraphic word={word1} size={90} />
                  <span className="text-xs md:text-sm font-extrabold text-slate-700 mt-1 uppercase tracking-wide">
                    {word1}
                  </span>
                </motion.div>
              ) : (
                <span className="text-4xl text-slate-400 opacity-60">1️⃣</span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Grammar Connector in Level 2 Mode */}
          {level === 2 && placedSlots.slot1 && placedSlots.slot2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-emerald-500 text-white rounded-2xl font-extrabold text-sm md:text-lg shadow-lg flex items-center justify-center"
            >
              <span>+</span>
            </motion.div>
          )}

          {/* Slot 2 */}
          <motion.div
            layout
            onClick={() => {
              if (placedSlots.slot2) {
                speechManager.speak(word2, `block_${slugifyText(word2)}`);
              }
            }}
            className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 flex flex-col items-center justify-center shadow-md transition-all cursor-pointer ${
              placedSlots.slot2
                ? 'bg-sky-100 border-sky-400 scale-105 hover:bg-sky-200/80'
                : 'bg-slate-100/70 border-slate-300 border-dashed cursor-default'
            }`}
          >
            <AnimatePresence>
              {placedSlots.slot2 ? (
                <motion.div
                  initial={{ scale: 0, rotate: 15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  <ToddlerGraphic word={word2} size={90} />
                  <span className="text-xs md:text-sm font-extrabold text-slate-700 mt-1 uppercase tracking-wide">
                    {word2}
                  </span>
                </motion.div>
              ) : (
                <span className="text-4xl text-slate-400 opacity-60">2️⃣</span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Celebratory Spoken Sentence Banner */}
        {isComplete && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              onClick={replaySentence}
              className="bg-white px-6 py-3 rounded-3xl shadow-xl border-4 border-emerald-400 flex items-center gap-3 cursor-pointer hover:bg-emerald-50 transition-colors group"
              title="Réécouter la phrase"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">🔊</span>
              <p className="text-xl md:text-2xl font-extrabold text-emerald-700 text-center">
                "{level === 1 ? currentPair.level1 : currentPair.level2}"
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              className="mt-2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500 text-white shadow-2xl border-4 border-white flex items-center justify-center text-3xl md:text-4xl animate-bounce"
              aria-label="Phrase suivante"
            >
              <span>👉</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Bottom Visual Word Tiles Selection Palette (0-Text Tile Tap) */}
      <div className="w-full flex items-center justify-center gap-4 md:gap-8 pb-4">
        {/* Tile 1 */}
        {!placedSlots.slot1 && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleTileTap(1)}
            className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white shadow-xl border-4 border-amber-400 flex flex-col items-center justify-center p-2 cursor-pointer transition-transform"
          >
            <ToddlerGraphic word={word1} size={70} />
            <span className="text-xs md:text-sm font-extrabold text-slate-700 mt-1 uppercase">
              {word1}
            </span>
          </motion.button>
        )}

        {/* Tile 2 */}
        {!placedSlots.slot2 && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleTileTap(2)}
            className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white shadow-xl border-4 border-sky-400 flex flex-col items-center justify-center p-2 cursor-pointer transition-transform"
          >
            <ToddlerGraphic word={word2} size={70} />
            <span className="text-xs md:text-sm font-extrabold text-slate-700 mt-1 uppercase">
              {word2}
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
};
