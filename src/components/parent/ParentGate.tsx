import React, { useState, useRef, useEffect } from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { audioManager } from '../../engine/AudioContextManager';

interface ParentGateProps {
  onSuccess: () => void;
  compact?: boolean;
}

export const ParentGate: React.FC<ParentGateProps> = ({ onSuccess, compact = true }) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const HOLD_DURATION = 2000; // 2 seconds

  const startHold = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setHolding(true);
    setProgress(0);
    audioManager.playPop(350);
    startTimeRef.current = Date.now();

    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    const updateInterval = 30;
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / HOLD_DURATION) * 100);
      setProgress(currentProgress);

      if (elapsed >= HOLD_DURATION) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setHolding(false);
        setProgress(0);
        audioManager.playChime();
        if ('vibrate' in navigator) {
          navigator.vibrate([40, 50, 40]);
        }
        onSuccess();
      }
    }, updateInterval);
  };

  const endHold = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setHolding(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // SVG circular progress calculation
  const radius = compact ? 16 : 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const viewBoxSize = compact ? 40 : 60;
  const center = compact ? 20 : 30;

  return (
    <div className="relative select-none flex items-center justify-center">
      <button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onTouchCancel={endHold}
        className={`relative ${
          compact ? 'w-10 h-10 rounded-xl' : 'w-14 h-14 md:w-16 md:h-16 rounded-full'
        } bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-transform active:scale-95 ${
          holding ? 'ring-4 ring-indigo-400 scale-105 bg-indigo-50' : ''
        }`}
        title="Appui long 2s (Zone Parents)"
        aria-label="Zone Parents"
      >
        {/* SVG Circular countdown ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="3"
          />
          {holding && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#6366F1"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-75 ease-linear"
            />
          )}
        </svg>

        {/* Center Icon */}
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <Lock className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} ${holding ? 'text-indigo-600 scale-110' : 'text-slate-600'} transition-all`} />
          {!compact && (
            <span className="text-[9px] font-bold tracking-tight text-slate-500 uppercase mt-0.5">Parents</span>
          )}
        </div>
      </button>

      {/* Visual tool tip cue during hold */}
      {holding && (
        <div className="absolute top-full mt-2 right-0 bg-slate-900/95 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl flex items-center gap-1.5 animate-fade-in pointer-events-none z-50">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
          <span>Maintenez appuyé...</span>
        </div>
      )}
    </div>
  );
};
