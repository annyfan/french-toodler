import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';

interface SimonChallenge {
  id: string;
  type: 'body' | 'action';
  prompt: string;
  wordId: string;
  targetId: string;
  emoji: string;
}

const CHALLENGES: SimonChallenge[] = [
  // Body parts
  { id: 'nez', type: 'body', prompt: 'Touche le nez !', wordId: 'bod_18', targetId: 'nez', emoji: '👃' },
  { id: 'yeux', type: 'body', prompt: 'Touche les yeux !', wordId: 'bod_27', targetId: 'yeux', emoji: '👀' },
  { id: 'bouche', type: 'body', prompt: 'Touche la bouche !', wordId: 'bod_03', targetId: 'bouche', emoji: '👄' },
  { id: 'oreilles', type: 'body', prompt: 'Touche les oreilles !', wordId: 'bod_19', targetId: 'oreilles', emoji: '👂' },
  { id: 'mains', type: 'body', prompt: 'Touche les mains !', wordId: 'bod_15', targetId: 'mains', emoji: '✋' },
  // Verbs / Actions
  { id: 'saute', type: 'action', prompt: 'Saute ! Saute !', wordId: 'vrb_77', targetId: 'jump', emoji: '🦘' },
  { id: 'dors', type: 'action', prompt: 'Fais dodo !', wordId: 'vrb_27', targetId: 'sleep', emoji: '😴' },
  { id: 'mange', type: 'action', prompt: 'Miam miam ! Mange !', wordId: 'vrb_51', targetId: 'eat', emoji: '🍎' },
  { id: 'danse', type: 'action', prompt: 'Danse !', wordId: 'vrb_23', targetId: 'dance', emoji: '💃' },
];

export const SimonSays: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [avatarAction, setAvatarAction] = useState<string>('idle');
  const [isSuccess, setIsSuccess] = useState(false);

  const currentChallenge = CHALLENGES[currentIndex % CHALLENGES.length];

  const playPrompt = () => {
    if (!currentChallenge) return;
    audioManager.playPop(420);
    speechManager.speak(`Simon dit : ${currentChallenge.prompt}`);
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

      {/* Center Interactive Character Avatar (Simon) */}
      <div className="relative flex-1 w-full max-w-md flex flex-col items-center justify-center">
        {/* Animated Avatar Container */}
        <motion.div
          animate={
            avatarAction === 'jump'
              ? { y: [0, -60, 0, -40, 0], scale: [1, 1.1, 1] }
              : avatarAction === 'dance'
              ? { rotate: [0, -10, 10, -10, 0], x: [0, -15, 15, 0] }
              : avatarAction === 'sleep'
              ? { rotate: [0, 15, 15], opacity: 0.8 }
              : { y: [0, -6, 0] }
          }
          transition={{
            repeat: avatarAction === 'idle' ? Infinity : 0,
            duration: avatarAction === 'idle' ? 3 : 0.8,
            ease: 'easeInOut'
          }}
          className="relative w-64 h-80 md:w-80 md:h-96 flex flex-col items-center justify-center"
        >
          {/* Sleeping Zzz animation */}
          {avatarAction === 'sleep' && (
            <div className="absolute -top-8 right-8 text-3xl font-extrabold text-indigo-500 animate-bounce">
              💤
            </div>
          )}

          {/* SVG Character Avatar with Interactive Hitspots */}
          <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-2xl">
            {/* Striped Shirt */}
            <path d="M 45 140 C 40 120 160 120 155 140 L 170 240 L 30 240 Z" fill="#F87171" />
            <line x1="38" y1="165" x2="162" y2="165" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="34" y1="195" x2="166" y2="195" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="30" y1="225" x2="170" y2="225" stroke="#FFFFFF" strokeWidth="6" />

            {/* Overalls / Salopette */}
            <path d="M 55 160 L 145 160 L 155 240 L 45 240 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
            {/* Overall Straps with Yellow Buttons */}
            <line x1="68" y1="130" x2="72" y2="175" stroke="#2563EB" strokeWidth="12" strokeLinecap="round" />
            <line x1="132" y1="130" x2="128" y2="175" stroke="#2563EB" strokeWidth="12" strokeLinecap="round" />
            <circle cx="72" cy="172" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="128" cy="172" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            {/* Overall Pocket */}
            <rect x="85" y="180" width="30" height="26" rx="6" fill="#1D4ED8" />
            <path d="M 94 190 Q 100 196 106 190" stroke="#93C5FD" strokeWidth="2" fill="none" />

            {/* Arms / Hands (Interactive Hitspot) */}
            <g
              onClick={() => handleTargetTap('mains')}
              className="cursor-pointer group"
            >
              <circle cx="24" cy="175" r="18" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <circle cx="176" cy="175" r="18" fill="rgba(254, 240, 138, 0.4)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="24" cy="175" rx="14" ry="14" fill="#FFDBB5" stroke="#E0A97E" strokeWidth="2.5" />
              <ellipse cx="176" cy="175" rx="14" ry="14" fill="#FFDBB5" stroke="#E0A97E" strokeWidth="2.5" />
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
              {avatarAction === 'eat' ? (
                <circle cx="100" cy="112" r="11" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              ) : (
                <path d="M 86 108 Q 100 124 114 108" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
              )}
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Bottom Action Cards (For Action Verbs: Saute, Dors, Mange, Danse) */}
      <div className="w-full max-w-lg flex items-center justify-center gap-3 md:gap-5 pb-4">
        {CHALLENGES.filter(c => c.type === 'action').map(act => {
          const isTarget = currentChallenge.id === act.id;
          return (
            <motion.button
              key={act.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleTargetTap(act.targetId)}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex flex-col items-center justify-center shadow-xl border-4 transition-all ${
                isTarget
                  ? 'bg-amber-300 border-amber-400 ring-4 ring-amber-200 scale-105'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-3xl md:text-4xl">{act.emoji}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
