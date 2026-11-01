import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToddlerModule } from '../../types';
import { audioManager } from '../../engine/AudioContextManager';
import { ExploratoryScene } from './ExploratoryScene';
import { PictureDictionary } from './PictureDictionary';
import { SentenceBuilder } from './SentenceBuilder';
import { SimonSays } from './SimonSays';
import { ParentGate } from '../parent/ParentGate';

interface ToddlerShellProps {
  onOpenParentPortal: () => void;
}

export const ToddlerShell: React.FC<ToddlerShellProps> = ({ onOpenParentPortal }) => {
  const [activeModule, setActiveModule] = useState<ToddlerModule>('exploratory');
  const [isMuted, setIsMuted] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [shuffleTrigger, setShuffleTrigger] = useState(0);
  const [sentenceInitialWordId, setSentenceInitialWordId] = useState<string | null>(null);
  const [imagierInitialCategoryId, setImagierInitialCategoryId] = useState<number | null>(null);
  const [imagierHighlightWordId, setImagierHighlightWordId] = useState<string | null>(null);

  const handleNavigateToSentences = (wordId: string) => {
    setSentenceInitialWordId(wordId);
    setActiveModule('sentences');
  };

  const handleBackToImagier = (categoryId?: number, wordId?: string) => {
    audioManager.playPop(480);
    if (categoryId) {
      setImagierInitialCategoryId(categoryId);
    }
    if (wordId) {
      setImagierHighlightWordId(wordId);
    }
    setActiveModule('imagier');
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioManager.setMuted(nextMuted);
  };

  const handleShuffle = () => {
    setShuffleTrigger(prev => prev + 1);
  };

  const navItems: { id: ToddlerModule; icon: string; color: string; label: string }[] = [
    { id: 'exploratory', icon: '🏠', color: 'from-amber-400 to-orange-400', label: 'Maison' },
    { id: 'imagier', icon: '📖', color: 'from-indigo-500 to-purple-600', label: 'Imagier (664)' },
    { id: 'sentences', icon: '🧩', color: 'from-teal-400 to-emerald-500', label: 'Phrases' },
    { id: 'simon', icon: '🤸', color: 'from-sky-400 to-indigo-500', label: 'Yannick a dit' },
  ];

  const handleNavClick = (moduleId: ToddlerModule) => {
    audioManager.playPop(520);
    if (moduleId === 'sentences') {
      setSentenceInitialWordId(null);
    }
    if (moduleId === 'imagier') {
      setImagierInitialCategoryId(null);
      setImagierHighlightWordId(null);
    }
    setActiveModule(moduleId);
  };

  return (
    <div className="relative w-full h-screen min-h-screen flex flex-col bg-slate-900 select-none overflow-hidden">
      {/* Top Header Controls (Zero obstruction across the canvas) */}
      <header className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        {/* Left Side Placeholder (Room Switcher lives here inside ExploratoryScene) */}
        <div className="pointer-events-auto" />

        {/* Top Right Corner Dock: The 3 control buttons + Parent Gate Lock! */}
        <div className="pointer-events-auto flex items-center gap-1.5 md:gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-2xl shadow-xl border-2 border-slate-200">
          {/* Button 1: Surprise 🎲 (available in Exploratory room) */}
          {activeModule === 'exploratory' && (
            <motion.button
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={handleShuffle}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-black shadow-sm transition-all"
              title="Changer les objets (Surprise !)"
            >
              <span className="text-sm leading-none">🎲</span>
              <span className="hidden sm:inline">Surprise !</span>
            </motion.button>
          )}

          {/* Button 2: Toggle Labels 🏷️ */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              showLabels
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
            title="Afficher/Masquer les étiquettes"
          >
            {showLabels ? '🏷️ Mots' : '🏷️ Sans texte'}
          </button>

          {/* Button 3: Audio Mute 🔊 */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors"
            title={isMuted ? "Activer le son" : "Couper le son"}
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
          >
            <span className={`text-base leading-none ${isMuted ? 'text-rose-500' : 'text-emerald-600'}`}>
              {isMuted ? '🔇' : '🔊'}
            </span>
          </motion.button>

          {/* Vertical Separator */}
          <div className="w-px h-5 bg-slate-200 mx-0.5" />

          {/* Parent Gate Lock */}
          <ParentGate onSuccess={onOpenParentPortal} compact={true} />
        </div>
      </header>

      {/* Main Toddler Content Area */}
      <main className="relative flex-1 w-full h-full overflow-hidden pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          {activeModule === 'exploratory' && (
            <motion.div
              key="exploratory"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <ExploratoryScene
                showLabels={showLabels}
                shuffleTrigger={shuffleTrigger}
              />
            </motion.div>
          )}

          {activeModule === 'imagier' && (
            <motion.div
              key="imagier"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <PictureDictionary
                showLabels={showLabels}
                initialCategoryId={imagierInitialCategoryId}
                highlightWordId={imagierHighlightWordId}
                onCategoryConsumed={() => {
                  setImagierInitialCategoryId(null);
                  setImagierHighlightWordId(null);
                }}
                onNavigateToSentences={handleNavigateToSentences}
              />
            </motion.div>
          )}

          {activeModule === 'sentences' && (
            <motion.div
              key="sentences"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <SentenceBuilder
                showLabels={showLabels}
                initialWordId={sentenceInitialWordId}
                onWordIdConsumed={() => setSentenceInitialWordId(null)}
                onBackToImagier={handleBackToImagier}
              />
            </motion.div>
          )}

          {activeModule === 'simon' && (
            <motion.div
              key="simon"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <SimonSays showLabels={showLabels} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3 bg-white/95 backdrop-blur-xl px-3 py-2 rounded-3xl shadow-2xl border-2 border-slate-200">
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-3 py-1.5 md:px-4 md:py-2.5 rounded-2xl flex flex-col items-center justify-center transition-all shadow-sm ${
                isActive
                  ? `bg-gradient-to-tr ${item.color} text-white ring-2 ring-amber-300 shadow-md scale-105 -translate-y-1`
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              aria-label={item.label}
            >
              <span className="text-2xl md:text-3xl leading-none">{item.icon}</span>
              <span className={`text-[10px] md:text-xs font-extrabold tracking-tight mt-1 whitespace-nowrap ${isActive ? 'text-white' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};
