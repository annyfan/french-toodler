import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { ToddlerGraphic } from '../common/ToddlerGraphic';

interface SimonChallenge {
  id: string;
  type: 'body' | 'action';
  prompt: string;
  wordId: string;
  targetId: string;
  label?: string;
}

const CHALLENGES: SimonChallenge[] = [
  // Body parts
  { id: 'nez', type: 'body', prompt: 'Touche le nez !', wordId: 'bod_18', targetId: 'nez' },
  { id: 'yeux', type: 'body', prompt: 'Touche les yeux !', wordId: 'bod_27', targetId: 'yeux' },
  { id: 'bouche', type: 'body', prompt: 'Touche la bouche !', wordId: 'bod_03', targetId: 'bouche' },
  { id: 'oreilles', type: 'body', prompt: 'Touche les oreilles !', wordId: 'bod_20', targetId: 'oreilles' },
  { id: 'mains', type: 'body', prompt: 'Touche les mains !', wordId: 'bod_15', targetId: 'mains' },
  { id: 'tete', type: 'body', prompt: 'Touche ta tête !', wordId: 'bod_24', targetId: 'tete' },
  { id: 'bras', type: 'body', prompt: 'Touche les bras !', wordId: 'bod_04', targetId: 'bras' },
  { id: 'ventre', type: 'body', prompt: 'Touche ton ventre !', wordId: 'bod_01', targetId: 'ventre' },
  { id: 'jambes', type: 'body', prompt: 'Touche tes jambes !', wordId: 'bod_11', targetId: 'jambes' },
  { id: 'pieds', type: 'body', prompt: 'Touche tes pieds !', wordId: 'bod_23', targetId: 'pieds' },
  // Verbs / Actions
  { id: 'saute', type: 'action', prompt: 'Saute ! Saute !', wordId: 'vrb_091', targetId: 'jump', label: 'Saute' },
  { id: 'dors', type: 'action', prompt: 'Fais dodo !', wordId: 'vrb_043', targetId: 'sleep', label: 'Dodo' },
  { id: 'mange', type: 'action', prompt: 'Miam miam ! Mange !', wordId: 'vrb_066', targetId: 'eat', label: 'Mange' },
  { id: 'danse', type: 'action', prompt: 'Danse !', wordId: 'vrb_036', targetId: 'dance', label: 'Danse' },
  { id: 'bois', type: 'action', prompt: 'Bois un peu !', wordId: 'vrb_019', targetId: 'drink', label: 'Bois' },
  { id: 'marche', type: 'action', prompt: 'Marche !', wordId: 'vrb_067', targetId: 'walk', label: 'Marche' },
  { id: 'cours', type: 'action', prompt: 'Cours !', wordId: 'vrb_033', targetId: 'run', label: 'Cours' },
  { id: 'lave', type: 'action', prompt: 'Lave tes mains !', wordId: 'vrb_063', targetId: 'wash', label: 'Lave' },
  { id: 'brosse', type: 'action', prompt: 'Brosse tes dents !', wordId: 'vrb_022', targetId: 'brush', label: 'Brosse' },
  { id: 'range', type: 'action', prompt: 'Range tes jouets !', wordId: 'vrb_085', targetId: 'tidy', label: 'Range' },
];

export const SimonSays: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [avatarAction, setAvatarAction] = useState<string>('idle');
  const [isSuccess, setIsSuccess] = useState(false);

  const currentChallenge = CHALLENGES[currentIndex % CHALLENGES.length];

  const playPrompt = () => {
    if (!currentChallenge) return;
    audioManager.playPop(420);
    speechManager.speak(`Yannick dit : ${currentChallenge.prompt}`);
  };

  useEffect(() => {
    setAvatarAction('idle');
    setIsSuccess(false);

    const timer = setTimeout(() => {
      playPrompt();
    }, 400);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleTargetTap = (targetId: string) => {
    if (isSuccess) return;

    if (targetId === currentChallenge.targetId) {
      // Success!
      setIsSuccess(true);
      setAvatarAction(targetId);
      audioManager.playFanfare();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });

      speechManager.speak(`Bravo ! C'est super !`);
      progressTracker.recordWordInteraction(currentChallenge.wordId);

      setTimeout(() => {
        setIsSuccess(false);
        setAvatarAction('idle');
        setCurrentIndex(prev => prev + 1);
      }, 2400);
    } else {
      // Try again gentle boing
      audioManager.playBoing();
      speechManager.speak(currentChallenge.prompt);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-b from-sky-100 via-indigo-50 to-amber-100 select-none overflow-hidden">
      {/* Audio Prompt Replay Button */}
      <div className="absolute top-6 left-6 z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={playPrompt}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 shadow-xl border-4 border-amber-300 flex items-center justify-center text-3xl md:text-4xl"
          aria-label="Rejouer l'instruction"
        >
          <span>🗣️</span>
        </motion.button>
      </div>

      {/* Center Interactive Character Avatar (Yannick) */}
      <div className="relative flex-1 w-full max-w-md flex flex-col items-center justify-center">
        <h1 className="absolute top-2 text-2xl md:text-3xl font-black text-indigo-900 drop-shadow-sm">
          Yannick a dit
        </h1>
        {/* Animated Avatar Container */}
        <motion.div
          animate={
            avatarAction === 'jump'
              ? { y: [0, -60, 0, -40, 0], scale: [1, 1.1, 1] }
              : avatarAction === 'dance'
              ? { rotate: [0, -10, 10, -10, 0], x: [0, -15, 15, 0] }
              : avatarAction === 'sleep'
              ? { rotate: [0, 15, 15], opacity: 0.8 }
              : avatarAction === 'jump' || avatarAction === 'run' || avatarAction === 'walk'
              ? { x: [0, -18, 18, 0], y: [0, -10, 0] }
              : avatarAction === 'drink' || avatarAction === 'wash' || avatarAction === 'brush' || avatarAction === 'tidy'
              ? { rotate: [0, -8, 8, 0], y: [0, -4, 0] }
              : { y: [0, -6, 0] }
          }
          transition={{
            repeat: avatarAction === 'idle' ? Infinity : 0,
            duration: avatarAction === 'idle' ? 3 : 0.8,
            ease: 'easeInOut'
          }}
          className="relative w-56 h-[min(40vh,18rem)] md:w-64 md:h-[min(40vh,22rem)] flex flex-col items-center justify-center mt-8"
        >
          {/* Sleeping Zzz animation */}
          {avatarAction === 'sleep' && (
            <div className="absolute -top-8 right-8 text-3xl font-extrabold text-indigo-500 animate-bounce">
              💤
            </div>
          )}

          {/* SVG Character Avatar with Interactive Hitspots */}
          <svg viewBox="0 0 200 320" className="w-full h-full drop-shadow-2xl">
            {/* Arms */}
            <path d="M 56 145 Q 42 160 34 196 L 26 224" fill="none" stroke="#E0A97E" strokeWidth="18" strokeLinecap="round" />
            <path d="M 144 145 Q 158 160 166 196 L 174 224" fill="none" stroke="#E0A97E" strokeWidth="18" strokeLinecap="round" />

            {/* Striped Shirt */}
            <path d="M 45 140 C 40 120 160 120 155 140 L 170 232 L 30 232 Z" fill="#F87171" />
            <line x1="38" y1="165" x2="162" y2="165" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="34" y1="195" x2="166" y2="195" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="31" y1="222" x2="169" y2="222" stroke="#FFFFFF" strokeWidth="6" />

            {/* Overalls / Salopette */}
            <path d="M 55 160 L 145 160 L 152 232 L 48 232 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
            {/* Overall Straps with Yellow Buttons */}
            <line x1="68" y1="130" x2="72" y2="175" stroke="#2563EB" strokeWidth="12" strokeLinecap="round" />
            <line x1="132" y1="130" x2="128" y2="175" stroke="#2563EB" strokeWidth="12" strokeLinecap="round" />
            <circle cx="72" cy="172" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="128" cy="172" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            {/* Overall Pocket */}
            <rect x="85" y="180" width="30" height="26" rx="6" fill="#1D4ED8" />
            <path d="M 94 190 Q 100 196 106 190" stroke="#93C5FD" strokeWidth="2" fill="none" />

            {/* Belly (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('ventre')}
              className="cursor-pointer group"
              role="button"
              aria-label="Ventre"
              tabIndex={0}
              onKeyDown={event => event.key === 'Enter' && handleTargetTap('ventre')}
            >
              <ellipse cx="100" cy="220" rx="32" ry="25" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* Legs and feet */}
            <path d="M 52 230 L 98 230 L 94 286 L 74 286 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
            <path d="M 102 230 L 148 230 L 126 286 L 106 286 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
            <g
              onClick={() => handleTargetTap('jambes')}
              className="cursor-pointer group"
              role="button"
              aria-label="Jambes"
              tabIndex={0}
              onKeyDown={event => event.key === 'Enter' && handleTargetTap('jambes')}
            >
              <ellipse cx="75" cy="258" rx="17" ry="28" fill="rgba(254, 240, 138, 0.35)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="125" cy="258" rx="17" ry="28" fill="rgba(254, 240, 138, 0.35)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>
            <path d="M 73 278 Q 65 297 47 301 Q 42 309 54 310 L 88 310 Q 97 307 91 298 L 91 280 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
            <path d="M 108 280 L 105 298 Q 100 307 110 310 L 146 310 Q 158 309 151 301 Q 133 297 126 278 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
            <g
              onClick={() => handleTargetTap('pieds')}
              className="cursor-pointer group"
              role="button"
              aria-label="Pieds"
              tabIndex={0}
              onKeyDown={event => event.key === 'Enter' && handleTargetTap('pieds')}
            >
              <ellipse cx="69" cy="301" rx="30" ry="17" fill="rgba(254, 240, 138, 0.35)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="131" cy="301" rx="30" ry="17" fill="rgba(254, 240, 138, 0.35)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* Arms / Hands (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('mains')}
              className="cursor-pointer group"
              role="button"
              aria-label="Mains"
              tabIndex={0}
              onKeyDown={event => event.key === 'Enter' && handleTargetTap('mains')}
            >
              <circle cx="24" cy="175" r="18" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <circle cx="176" cy="175" r="18" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="24" cy="175" rx="14" ry="14" fill="#FFDBB5" stroke="#E0A97E" strokeWidth="2.5" />
              <ellipse cx="176" cy="175" rx="14" ry="14" fill="#FFDBB5" stroke="#E0A97E" strokeWidth="2.5" />
            </g>

            {/* Arms (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('bras')}
              className="cursor-pointer group"
              role="button"
              aria-label="Bras"
              tabIndex={0}
              onKeyDown={event => event.key === 'Enter' && handleTargetTap('bras')}
            >
              <path d="M 51 149 L 40 170" stroke="rgba(254, 240, 138, 0.45)" strokeWidth="20" strokeLinecap="round" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <path d="M 149 149 L 160 170" stroke="rgba(254, 240, 138, 0.45)" strokeWidth="20" strokeLinecap="round" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* Head */}
            <circle cx="100" cy="85" r="52" fill="#FFDBB5" stroke="#E0A97E" strokeWidth="2.5" />

            {/* Hair */}
            <path d="M 48 76 C 48 35 152 35 152 76 C 138 48 62 48 48 76 Z" fill="#7C3AED" />
            <circle cx="62" cy="50" r="15" fill="#7C3AED" />
            <circle cx="85" cy="42" r="16" fill="#7C3AED" />
            <circle cx="115" cy="42" r="16" fill="#7C3AED" />
            <circle cx="138" cy="50" r="15" fill="#7C3AED" />
            {/* Cute Cowlick Bang */}
            <path d="M 100 38 Q 106 20 114 26 Q 106 28 102 38 Z" fill="#7C3AED" />

            {/* Head (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('tete')}
              className="cursor-pointer group"
              role="button"
              aria-label="Tête"
              tabIndex={0}
              onKeyDown={event => event.key === 'Enter' && handleTargetTap('tete')}
            >
              <ellipse cx="100" cy="54" rx="39" ry="20" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* Ears (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('oreilles')}
              className="cursor-pointer group"
            >
              <circle cx="44" cy="88" r="16" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <circle cx="156" cy="88" r="16" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <circle cx="44" cy="88" r="13" fill="#FFDBB5" stroke="#E0A97E" strokeWidth="2" />
              <circle cx="44" cy="88" r="7" fill="#FFA5AB" />
              <circle cx="156" cy="88" r="13" fill="#FFDBB5" stroke="#E0A97E" strokeWidth="2" />
              <circle cx="156" cy="88" r="7" fill="#FFA5AB" />
            </g>

            {/* Eyes (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('yeux')}
              className="cursor-pointer group"
            >
              <ellipse cx="100" cy="80" rx="36" ry="16" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              {avatarAction === 'sleep' ? (
                <>
                  <path d="M 72 82 Q 82 90 92 82" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M 108 82 Q 118 90 128 82" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <ellipse cx="80" cy="80" rx="8" ry="9" fill="#1E293B" />
                  <circle cx="83" cy="77" r="3" fill="#FFFFFF" />
                  <ellipse cx="120" cy="80" rx="8" ry="9" fill="#1E293B" />
                  <circle cx="123" cy="77" r="3" fill="#FFFFFF" />
                </>
              )}
            </g>

            {/* Rosy Cheeks */}
            <ellipse cx="68" cy="94" rx="8" ry="5" fill="#FF85A1" opacity="0.7" />
            <ellipse cx="132" cy="94" rx="8" ry="5" fill="#FF85A1" opacity="0.7" />

            {/* Nose (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('nez')}
              className="cursor-pointer group"
            >
              <circle cx="100" cy="93" r="12" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="100" cy="93" rx="7" ry="5" fill="#FF6B6B" stroke="#E11D48" strokeWidth="1.5" />
            </g>

            {/* Mouth (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('bouche')}
              className="cursor-pointer group"
            >
              <ellipse cx="100" cy="112" rx="18" ry="14" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              {avatarAction === 'eat' || avatarAction === 'drink' ? (
                <circle cx="100" cy="112" r="11" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              ) : (
                <path d="M 86 108 Q 100 124 114 108" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
              )}
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Everyday action cards */}
      <div className="w-full max-w-xl grid grid-cols-5 items-center justify-items-center gap-1.5 md:gap-2 pb-2">
        {CHALLENGES.filter(c => c.type === 'action').map(act => {
          const isTarget = currentChallenge.id === act.id;
          return (
            <motion.button
              key={act.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleTargetTap(act.targetId)}
              aria-label={act.prompt}
              className={`w-full max-w-[4.25rem] h-12 md:max-w-[5rem] md:h-12 rounded-2xl flex flex-col items-center justify-center shadow-xl border-2 transition-all ${
                isTarget
                  ? 'bg-amber-300 border-amber-400 ring-4 ring-amber-200 scale-105'
                  : 'bg-white border-slate-200'
              }`}
            >
              <ToddlerGraphic id={act.wordId} word={act.prompt} size={42} className="w-9 h-9 md:w-11 md:h-11" />
              <span className="text-[9px] md:text-[10px] font-bold text-slate-700 leading-none">{act.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
