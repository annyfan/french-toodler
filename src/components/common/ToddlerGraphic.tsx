import React, { useState, useEffect } from 'react';
import vocabularyData from '../../data/vocabulary.json';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { contentManager } from '../../engine/ContentManager';

interface WordItem {
  id: string;
  fr: string;
  en: string;
  categoryId: number;
  illustrationAsset: string;
}

const words = vocabularyData as WordItem[];
const ID_TO_ASSET = new Map<string, string>();
const WORD_TO_ASSET = new Map<string, string>();

for (const w of words) {
  ID_TO_ASSET.set(w.id.toLowerCase(), w.illustrationAsset);
  WORD_TO_ASSET.set(w.fr.toLowerCase(), w.illustrationAsset);
}

interface ToddlerGraphicProps {
  id?: string;
  word?: string;
  illustrationAsset?: string;
  category?: number;
  size?: number;
  className?: string;
}

export const ToddlerGraphic: React.FC<ToddlerGraphicProps> = ({
  id = '',
  word = '',
  illustrationAsset = '',
  category = 1,
  size = 80,
  className = ''
}) => {
  const [imgError, setImgError] = useState(false);
  const [altError, setAltError] = useState(false);
  const [customError, setCustomError] = useState(false);
  const [, setTick] = useState(0);

  // Subscribe to media changes (when parent modifies image)
  useEffect(() => {
    return mediaCustomizationManager.subscribe(() => {
      setImgError(false);
      setAltError(false);
      setCustomError(false);
      setTick(t => t + 1);
    });
  }, []);

  const normId = id.trim().toLowerCase();
  const normWord = word.trim().toLowerCase();

  // 0. Check parent customized image first!
  const parentCustomImage = mediaCustomizationManager.getCustomImage(normId);
  if (parentCustomImage && !customError) {
    return (
      <img
        src={parentCustomImage}
        alt={word || id}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setCustomError(true)}
        className={`object-contain select-none pointer-events-none transition-transform rounded-2xl ${className}`}
      />
    );
  }

  // 1. Resolve optimal illustration filename
  const customWordItem = normId ? contentManager.getWord(normId) : undefined;
  const resolvedAsset =
    illustrationAsset ||
    customWordItem?.illustrationAsset ||
    ID_TO_ASSET.get(normId) ||
    WORD_TO_ASSET.get(normWord) ||
    (normId ? `${normId}.svg` : '');

  // Try primary resolved asset
  if (resolvedAsset && !imgError) {
    return (
      <img
        src={`./illustrations/${resolvedAsset}`}
        alt={word || id}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setImgError(true)}
        className={`object-contain select-none pointer-events-none transition-transform ${className}`}
      />
    );
  }

  // Fallback: Try word ID alias (e.g. fur_09.svg)
  const fallbackIdAsset = normId ? `${normId}.svg` : '';
  if (fallbackIdAsset && fallbackIdAsset !== resolvedAsset && !altError) {
    return (
      <img
        src={`./illustrations/${fallbackIdAsset}`}
        alt={word || id}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setAltError(true)}
        className={`object-contain select-none pointer-events-none transition-transform ${className}`}
      />
    );
  }

  // Fallback 2: Hand-crafted Toddler Vector Illustrations
  if (normId.includes('chat') || normWord === 'chat') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="55" r="32" fill="#FFA500" />
        <polygon points="26,35 18,12 40,26" fill="#FFA500" stroke="#E67E22" strokeWidth="2" />
        <polygon points="74,35 82,12 60,26" fill="#FFA500" stroke="#E67E22" strokeWidth="2" />
        <polygon points="28,32 23,18 36,27" fill="#FFC0CB" />
        <polygon points="72,32 77,18 64,27" fill="#FFC0CB" />
        <circle cx="38" cy="50" r="5" fill="#2C3E50" />
        <circle cx="62" cy="50" r="5" fill="#2C3E50" />
        <circle cx="40" cy="48" r="2" fill="#FFFFFF" />
        <circle cx="64" cy="48" r="2" fill="#FFFFFF" />
        <polygon points="50,56 46,61 54,61" fill="#E74C3C" />
        <path d="M 46 61 Q 50 67 44 70" stroke="#2C3E50" strokeWidth="2" fill="none" />
        <path d="M 54 61 Q 50 67 56 70" stroke="#2C3E50" strokeWidth="2" fill="none" />
        <line x1="20" y1="58" x2="35" y2="58" stroke="#2C3E50" strokeWidth="2" />
        <line x1="20" y1="63" x2="35" y2="61" stroke="#2C3E50" strokeWidth="2" />
        <line x1="80" y1="58" x2="65" y2="58" stroke="#2C3E50" strokeWidth="2" />
        <line x1="80" y1="63" x2="65" y2="61" stroke="#2C3E50" strokeWidth="2" />
      </svg>
    );
  }

  if (normId.includes('chien') || normWord === 'chien') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="54" r="32" fill="#D2996E" />
        <path d="M 22 40 C 10 40 8 70 20 75 C 26 70 26 50 24 40 Z" fill="#8B5A2B" />
        <path d="M 78 40 C 90 40 92 70 80 75 C 74 70 74 50 76 40 Z" fill="#8B5A2B" />
        <circle cx="38" cy="50" r="5" fill="#2C3E50" />
        <circle cx="62" cy="50" r="5" fill="#2C3E50" />
        <circle cx="39" cy="48" r="1.8" fill="#FFFFFF" />
        <circle cx="63" cy="48" r="1.8" fill="#FFFFFF" />
        <ellipse cx="50" cy="62" rx="7" ry="5" fill="#2C3E50" />
        <path d="M 47 66 C 47 76 53 76 53 66 Z" fill="#FF6B6B" />
      </svg>
    );
  }

  // Fallback 3: Friendly Soft Sticker Badge
  const categoryPalette: Record<number, { bg: string; border: string; emoji: string }> = {
    1: { bg: '#FFE5EC', border: '#EF476F', emoji: '🔊' },
    2: { bg: '#FFF3BF', border: '#FFD166', emoji: '🐾' },
    3: { bg: '#E3FAF2', border: '#06D6A0', emoji: '🚗' },
    4: { bg: '#E0F2FE', border: '#118AB2', emoji: '🧸' },
    5: { bg: '#FFE8D6', border: '#FB5607', emoji: '🍎' },
    6: { bg: '#F3E8FF', border: '#8338EC', emoji: '👕' },
    7: { bg: '#E0E7FF', border: '#3A86FF', emoji: '👃' },
    8: { bg: '#FCE7F3', border: '#FF006E', emoji: '☕' },
    9: { bg: '#ECFDF5', border: '#10B981', emoji: '🛋️' },
    10: { bg: '#E0F2FE', border: '#0284C7', emoji: '🌳' },
    11: { bg: '#F5F3FF', border: '#7C3AED', emoji: '🏫' },
    12: { bg: '#FDF2F8', border: '#DB2777', emoji: '👶' },
    13: { bg: '#ECFEFF', border: '#06B6D4', emoji: '⭐' },
    14: { bg: '#FEF3C7', border: '#F59E0B', emoji: '⚡' },
    15: { bg: '#FEF9C3', border: '#EAB308', emoji: '✨' },
    16: { bg: '#EDE9FE', border: '#8B5CF6', emoji: '⏳' },
    17: { bg: '#FCE7F3', border: '#EC4899', emoji: '👤' },
    18: { bg: '#F3E8FF', border: '#9333EA', emoji: '❓' },
    19: { bg: '#EEF2FF', border: '#6366F1', emoji: '🧭' },
    20: { bg: '#E0F2FE', border: '#0EA5E9', emoji: '🔢' },
    21: { bg: '#F5F3FF', border: '#8B5CF6', emoji: '🔗' },
  };

  const currentTheme = categoryPalette[category] || { bg: '#F1F5F9', border: '#94A3B8', emoji: '🎈' };

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: currentTheme.bg,
        borderColor: currentTheme.border,
      }}
      className={`rounded-full border-3 flex flex-col items-center justify-center shadow-md transition-transform active:scale-95 select-none ${className}`}
    >
      <span style={{ fontSize: size * 0.52 }} className="leading-none drop-shadow-sm">
        {currentTheme.emoji}
      </span>
    </div>
  );
};
