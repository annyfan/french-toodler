import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { ToddlerGraphic } from '../common/ToddlerGraphic';

interface SimonChallenge {
  id: string;
  type: 'body';
  prompt: string;
  en: string;
  zh: string;
  wordId: string;
  targetId: string;
}

const CHALLENGES: SimonChallenge[] = [
  { id: 'nez', type: 'body', prompt: 'Touche le nez !', en: 'Touch the nose!', zh: '摸摸鼻子！', wordId: 'bod_18', targetId: 'nez' },
  { id: 'yeux', type: 'body', prompt: 'Touche les yeux !', en: 'Touch the eyes!', zh: '摸摸眼睛！', wordId: 'bod_27', targetId: 'yeux' },
  { id: 'bouche', type: 'body', prompt: 'Touche la bouche !', en: 'Touch the mouth!', zh: '摸摸嘴巴！', wordId: 'bod_03', targetId: 'bouche' },
  { id: 'oreilles', type: 'body', prompt: 'Touche les oreilles !', en: 'Touch the ears!', zh: '摸摸耳朵！', wordId: 'bod_20', targetId: 'oreilles' },
  { id: 'mains', type: 'body', prompt: 'Touche les mains !', en: 'Touch the hands!', zh: '摸摸小手！', wordId: 'bod_15', targetId: 'mains' },
  { id: 'tete', type: 'body', prompt: 'Touche ta tête !', en: 'Touch your head!', zh: '摸摸小头！', wordId: 'bod_24', targetId: 'tete' },
  { id: 'bras', type: 'body', prompt: 'Touche les bras !', en: 'Touch the arms!', zh: '摸摸手臂！', wordId: 'bod_04', targetId: 'bras' },
  { id: 'ventre', type: 'body', prompt: 'Touche ton ventre !', en: 'Touch your tummy!', zh: '摸摸小肚皮！', wordId: 'bod_01', targetId: 'ventre' },
  { id: 'jambes', type: 'body', prompt: 'Touche tes jambes !', en: 'Touch your legs!', zh: '摸摸小腿！', wordId: 'bod_11', targetId: 'jambes' },
  { id: 'pieds', type: 'body', prompt: 'Touche tes pieds !', en: 'Touch your feet!', zh: '摸摸小脚！', wordId: 'bod_23', targetId: 'pieds' },
];

interface SimonSaysProps {
  showLabels?: boolean;
}

export const SimonSays: React.FC<SimonSaysProps> = ({ showLabels = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [avatarAction, setAvatarAction] = useState<string>('idle');
  const [isSuccess, setIsSuccess] = useState(false);
  const [tapFeedback, setTapFeedback] = useState<{ id: string; x: number; y: number } | null>(null);

  const currentChallenge = CHALLENGES[currentIndex % CHALLENGES.length];

  const playPrompt = () => {
    if (!currentChallenge) return;
    audioManager.playPop(420);
    speechManager.speak('Yannick dit', undefined, () => {
      speechManager.speak(currentChallenge.prompt, currentChallenge.wordId);
    });
  };

  useEffect(() => {
    setAvatarAction('idle');
    setIsSuccess(false);

    const timer = setTimeout(() => {
      playPrompt();
    }, 400);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleTargetTap = (targetId: string, e?: React.MouseEvent) => {
    if (isSuccess) return;

    if (e) {
      const clientX = e.clientX;
      const clientY = e.clientY;
      setTapFeedback({ id: targetId, x: clientX, y: clientY });
      setTimeout(() => setTapFeedback(null), 700);
    }

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

      speechManager.speak('Bravo !', 'rou_06');
      progressTracker.recordWordInteraction(currentChallenge.wordId);

      setTimeout(() => {
        setIsSuccess(false);
        setAvatarAction('idle');
        setCurrentIndex(prev => prev + 1);
      }, 1200);
    } else {
      // Try again gentle boing
      audioManager.playBoing();
      speechManager.speak(currentChallenge.prompt, currentChallenge.wordId);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-3 sm:p-5 pb-6 bg-gradient-to-b from-sky-100 via-indigo-50 to-amber-100 select-none overflow-hidden">
      
      {/* 1. Top Control Bar: Audio Replay on left, Clear dock space on right */}
      <div className="w-full max-w-4xl flex items-center justify-between z-20 px-2 pt-1 shrink-0">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={playPrompt}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 shadow-md border-2 border-amber-300 hover:border-amber-400 text-amber-950 font-black text-sm transition-all"
          title="Réécouter la consigne"
        >
          <span className="text-xl leading-none">🔊</span>
          <span className="hidden sm:inline text-xs font-black">Écouter</span>
        </motion.button>

        {/* Clearance spacer for ToddlerShell top-right dock */}
        <div className="w-36 sm:w-48 h-8 pointer-events-none" />
      </div>

      {/* 2. Top Header Card: Title, Prompt, and Bilingual Translations (Cleanly stacked, never covered!) */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center px-4 py-1.5 shrink-0 z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-900 drop-shadow-xs">
          Yannick a dit
        </h1>
        <div className="flex items-center gap-2 mt-1 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-sm border-2 border-indigo-200">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center p-0.5 shrink-0">
            <ToddlerGraphic id={currentChallenge.wordId} word={currentChallenge.prompt} size={32} />
          </div>
          <p className="text-base sm:text-lg md:text-xl font-extrabold text-indigo-900 leading-tight">
            « {currentChallenge.prompt} »
          </p>
        </div>
        {showLabels && (
          <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
            {currentChallenge.en} • {currentChallenge.zh}
          </p>
        )}
      </div>

      {/* 3. Center Character Stage: Dedicated vertical space, separated from header */}
      <div className="relative flex-1 w-full max-w-2xl flex items-center justify-center overflow-hidden my-1">
        <motion.div
          animate={
            avatarAction === 'jump'
              ? { y: [0, -40, 0, -20, 0], scale: [1, 1.06, 1] }
              : avatarAction === 'dance'
              ? { rotate: [0, -10, 10, -10, 0], x: [0, -14, 14, 0] }
              : avatarAction === 'sleep'
              ? { rotate: [0, 12, 12], opacity: 0.85 }
              : { y: [0, -5, 0] }
          }
          transition={{
            repeat: avatarAction === 'idle' ? Infinity : 0,
            duration: avatarAction === 'idle' ? 3 : 0.8,
            ease: 'easeInOut'
          }}
          className="relative w-72 h-[min(54vh,26rem)] sm:w-88 sm:h-[min(58vh,28rem)] md:w-96 md:h-[min(62vh,32rem)] flex items-center justify-center"
        >
          {/* Adorable 4-Year-Old Yannick Character Illustration */}
          <img
            src="./illustrations/yannick.png"
            alt="Yannick"
            className="w-full h-full object-contain drop-shadow-2xl pointer-events-none select-none"
          />

          {/* Interactive SVG Touch Hitspots mapped accurately to Yannick's body */}
          <svg viewBox="0 0 100 100" style={{ outline: 'none' }} className="absolute inset-0 w-full h-full select-none outline-none focus:outline-none">
            {/* 1. Tête / Head */}
            <g
              onClick={(e) => handleTargetTap('tete', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Tête"
              style={{ outline: 'none' }}
            >
              <ellipse cx="50" cy="19" rx="20" ry="14" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 2. Oreilles / Ears */}
            <g
              onClick={(e) => handleTargetTap('oreilles', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Oreilles"
              style={{ outline: 'none' }}
            >
              <circle cx="34" cy="33" r="6" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <circle cx="65" cy="33" r="6" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 3. Yeux / Eyes */}
            <g
              onClick={(e) => handleTargetTap('yeux', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Yeux"
              style={{ outline: 'none' }}
            >
              <ellipse cx="50" cy="29" rx="14" ry="6" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 4. Nez / Nose */}
            <g
              onClick={(e) => handleTargetTap('nez', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Nez"
              style={{ outline: 'none' }}
            >
              <circle cx="51" cy="32" r="5" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 5. Bouche / Mouth */}
            <g
              onClick={(e) => handleTargetTap('bouche', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Bouche"
              style={{ outline: 'none' }}
            >
              <ellipse cx="50" cy="36" rx="7" ry="4" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 6. Bras / Arms */}
            <g
              onClick={(e) => handleTargetTap('bras', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Bras"
              style={{ outline: 'none' }}
            >
              <ellipse cx="33" cy="43" rx="8" ry="6" transform="rotate(-15 33 43)" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="67" cy="43" rx="8" ry="6" transform="rotate(15 67 43)" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 7. Mains / Hands */}
            <g
              onClick={(e) => handleTargetTap('mains', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Mains"
              style={{ outline: 'none' }}
            >
              <circle cx="21" cy="38" r="8" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <circle cx="79" cy="38" r="8" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 8. Ventre / Belly */}
            <g
              onClick={(e) => handleTargetTap('ventre', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Ventre"
              style={{ outline: 'none' }}
            >
              <ellipse cx="50" cy="56" rx="16" ry="12" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 9. Jambes / Legs */}
            <g
              onClick={(e) => handleTargetTap('jambes', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Jambes"
              style={{ outline: 'none' }}
            >
              <ellipse cx="44" cy="74" rx="7" ry="12" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="56" cy="74" rx="7" ry="12" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>

            {/* 10. Pieds / Feet */}
            <g
              onClick={(e) => handleTargetTap('pieds', e)}
              className="cursor-pointer group outline-none focus:outline-none select-none"
              role="button"
              aria-label="Pieds"
              style={{ outline: 'none' }}
            >
              <ellipse cx="40" cy="90" rx="9" ry="6" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <ellipse cx="60" cy="90" rx="9" ry="6" fill="rgba(254, 240, 138, 0.45)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>
          </svg>
        </motion.div>

        {/* Floating Tap Feedback Particle */}
        <AnimatePresence>
          {tapFeedback && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -60, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: tapFeedback.x,
                top: tapFeedback.y,
                pointerEvents: 'none',
                zIndex: 999
              }}
              className="flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
              <span className="text-3xl filter drop-shadow">⭐</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Bottom Hint Encouragement Strip */}
      <div className="w-full max-w-md mx-auto text-center shrink-0 py-1 z-10">
        <span className="text-xs sm:text-sm font-bold text-indigo-900/80 bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full border border-indigo-200/80 shadow-xs">
          👉 Touche la bonne partie du corps sur Yannick !
        </span>
      </div>
    </div>
  );
};
