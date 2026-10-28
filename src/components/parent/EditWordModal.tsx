import React, { useState, useRef, useEffect } from 'react';
import { WordItem, CategoryInfo } from '../../types';
import { contentManager } from '../../engine/ContentManager';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { speechManager } from '../../engine/SpeechManager';
import { ToddlerGraphic } from '../common/ToddlerGraphic';
import {
  X,
  Check,
  Volume2,
  Mic,
  Square,
  Upload,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';

interface EditWordModalProps {
  word: WordItem | null;
  isOpen: boolean;
  onClose: () => void;
  onWordUpdated: (word: WordItem) => void;
}

const PRESET_EMOJIS = [
  '🐶', '🐱', '🐰', '🐻', '🐼', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵', '🦆',
  '🍎', '🍌', '🍓', '🍊', '🍇', '🍉', '🥛', '🍪', '🎂', '🍕', '🧀', '🥐',
  '🚗', '🚌', '🚒', '✈️', '🚂', '🚲', '⛵', '🚁', '🚀', '🚜', '🧸', '🎈',
  '👕', '👗', '👟', '🧢', '🧦', '🧣', '🛋️', '🛏️', '🚪', '🪟', '💡', '⏰',
  '🌳', '🌸', '☀️', '⭐', '🌙', '☁️', '🌈', '👶', '👧', '👦', '👩', '👨'
];

export const EditWordModal: React.FC<EditWordModalProps> = ({
  word,
  isOpen,
  onClose,
  onWordUpdated
}) => {
  if (!isOpen || !word) return null;

  const categories: CategoryInfo[] = contentManager.getCategories();
  const isCustom = contentManager.isCustomWord(word.id);
  const isOverridden = contentManager.isOverriddenWord(word.id);

  const [fr, setFr] = useState(word.fr);
  const [en, setEn] = useState(word.en || '');
  const [zh, setZh] = useState(word.zh || '');
  const [categoryId, setCategoryId] = useState<number>(word.categoryId);
  const [phonetics, setPhonetics] = useState(word.phonetics || '');
  const [subcategory, setSubcategory] = useState(word.subcategory || '');
  const [complexityLevel, setComplexityLevel] = useState<1 | 2 | 3>(
    (word.complexityLevel as 1 | 2 | 3) || 1
  );

  // Image editing states: 'keep' | 'upload' | 'preset' | 'reset'
  const [imageAction, setImageAction] = useState<'keep' | 'upload' | 'preset' | 'reset'>('keep');
  const [uploadedImageDataUrl, setUploadedImageDataUrl] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('⭐');

  // Audio editing states: 'keep' | 'record' | 'upload' | 'reset'
  const [audioAction, setAudioAction] = useState<'keep' | 'record' | 'upload' | 'reset'>('keep');
  const [recordedAudioDataUrl, setRecordedAudioDataUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const [errorMsg, setErrorMsg] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset local state when word changes
  useEffect(() => {
    if (word) {
      setFr(word.fr);
      setEn(word.en || '');
      setZh(word.zh || '');
      setCategoryId(word.categoryId);
      setPhonetics(word.phonetics || `/${word.fr.toLowerCase()}/`);
      setSubcategory(word.subcategory || '');
      setComplexityLevel(((word.complexityLevel as 1 | 2 | 3) || 1));
      setImageAction('keep');
      setUploadedImageDataUrl(null);
      setAudioAction('keep');
      setRecordedAudioDataUrl(null);
      setErrorMsg('');
    }
  }, [word]);

  // Clean up recording timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setUploadedImageDataUrl(compressed);
          setImageAction('upload');
          setErrorMsg('');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Generate Emoji Badge Data URL
  const generateEmojiDataUrl = (emoji: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(128, 128, 120, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 12;
      ctx.strokeStyle = '#6366F1';
      ctx.stroke();

      ctx.font = '130px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, 128, 140);
      return canvas.toDataURL('image/png');
    }
    return '';
  };

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
    const dataUrl = generateEmojiDataUrl(emoji);
    setUploadedImageDataUrl(dataUrl);
    setImageAction('preset');
  };

  // Live Mic Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setRecordedAudioDataUrl(reader.result as string);
          setAudioAction('record');
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 6) {
            stopRecording();
            return 6;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Microphone error:', err);
      setErrorMsg('Impossible d’accéder au microphone. Vérifiez les autorisations.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setErrorMsg('Veuillez sélectionner un fichier audio valide (MP3, WAV, M4A).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setRecordedAudioDataUrl(event.target?.result as string);
      setAudioAction('upload');
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleTestAudio = (text: string) => {
    if (!text.trim()) return;
    speechManager.speak(text.trim(), word.id);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Rétablir le mot "${word.fr}" à sa configuration d'origine du CDI Québec ?`)) {
      contentManager.resetWordOverride(word.id);
      mediaCustomizationManager.removeCustomImage(word.id);
      mediaCustomizationManager.removeCustomAudio(word.id);
      const restored = contentManager.getWord(word.id) || word;
      onWordUpdated(restored);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanFr = fr.trim();
    if (!cleanFr) {
      setErrorMsg('Le mot en français québécois est obligatoire.');
      return;
    }

    // Determine custom image payload
    let customImagePayload: string | null | undefined = undefined;
    if (imageAction === 'upload' || imageAction === 'preset') {
      customImagePayload = uploadedImageDataUrl;
    } else if (imageAction === 'reset') {
      customImagePayload = null; // Remove custom image
    }

    // Determine custom audio payload
    let customAudioPayload: string | null | undefined = undefined;
    if (audioAction === 'record' || audioAction === 'upload') {
      customAudioPayload = recordedAudioDataUrl;
    } else if (audioAction === 'reset') {
      customAudioPayload = null; // Remove custom audio
    }

    contentManager.updateWord(
      word.id,
      {
        fr: cleanFr,
        en: en.trim(),
        zh: zh.trim(),
        categoryId,
        subcategory: subcategory.trim() || undefined,
        phonetics: phonetics.trim() || `/${cleanFr.toLowerCase()}/`,
        complexityLevel,
      },
      customImagePayload,
      customAudioPayload
    );

    const updated = contentManager.getWord(word.id) || word;
    onWordUpdated(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-100 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shadow-inner">
              ✏️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">Modifier le Mot</h3>
                <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded-full text-indigo-100 font-bold">
                  {word.id}
                </span>
                {isCustom ? (
                  <span className="text-[10px] font-black bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded-full">
                    Ajout parent
                  </span>
                ) : isOverridden ? (
                  <span className="text-[10px] font-black bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full">
                    CDI Modifié
                  </span>
                ) : (
                  <span className="text-[10px] font-black bg-white/20 text-indigo-100 px-2 py-0.5 rounded-full">
                    CDI Base
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-200 font-medium">
                Personnalisez le libellé, la phonétique, les traductions, l'image ou la voix
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Informations Lexicales */}
          <div className="space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-slate-100 pb-1">
              <span>1. Informations Lexicales & Traduction</span>
            </div>

            {/* French Text + Pronunciation Test */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Mot en Français Québécois <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Ex: auto, toutou, biscuit</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={fr}
                  onChange={(e) => setFr(e.target.value)}
                  placeholder="Ex: Auto, Chien, Pomme..."
                  className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleTestAudio(fr)}
                  disabled={!fr.trim()}
                  className="px-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors"
                  title="Écouter la prononciation"
                >
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Écouter</span>
                </button>
              </div>
            </div>

            {/* Phonetics & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Category */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Catégorie d'Appartenance
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 bg-white font-semibold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id}. {c.icon ? `${c.icon} ` : ''}{c.name_fr} ({c.name_zh})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phonetics */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Phonétique IPA
                  </label>
                  <button
                    type="button"
                    onClick={() => setPhonetics(`/${fr.trim().toLowerCase()}/`)}
                    className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    Auto-remplir
                  </button>
                </div>
                <input
                  type="text"
                  value={phonetics}
                  onChange={(e) => setPhonetics(e.target.value)}
                  placeholder="/oto/"
                  className="w-full px-3.5 py-2 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* English & Chinese Translations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  English (Traduction)
                </label>
                <input
                  type="text"
                  value={en}
                  onChange={(e) => setEn(e.target.value)}
                  placeholder="Ex: car, dog, apple"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  中文 (Traduction)
                </label>
                <input
                  type="text"
                  value={zh}
                  onChange={(e) => setZh(e.target.value)}
                  placeholder="Ex: 车, 狗, 苹果"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Subcategory & Complexity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Sous-catégorie Thématique
                </label>
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="Ex: VÉHICULES, JOUETS..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Niveau d'Acquisition (CDI)
                </label>
                <select
                  value={complexityLevel}
                  onChange={(e) => setComplexityLevel(Number(e.target.value) as 1 | 2 | 3)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={1}>Niveau 1 : Premiers mots (12-24 mois)</option>
                  <option value={2}>Niveau 2 : Vocabulaire actif (24-30 mois)</option>
                  <option value={3}>Niveau 3 : Lexique avancé (30-36+ mois)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Personnalisation de l'Illustration */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-100 pb-1">
              <span>2. Illustration & Image Visuelle</span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Actuelle : {mediaCustomizationManager.hasCustomImage(word.id) ? 'Photo personnalisée' : 'Illustration vectorielle'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              {/* Current / New Graphic Preview */}
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-indigo-200 flex items-center justify-center p-1 shadow-sm overflow-hidden flex-shrink-0">
                {imageAction === 'upload' || imageAction === 'preset' ? (
                  <img
                    src={uploadedImageDataUrl || ''}
                    alt="Aperçu"
                    className="w-full h-full object-contain"
                  />
                ) : imageAction === 'reset' ? (
                  <ToddlerGraphic
                    id={word.id}
                    word={fr}
                    illustrationAsset={word.illustrationAsset}
                    category={categoryId}
                    size={64}
                  />
                ) : (
                  <ToddlerGraphic
                    id={word.id}
                    word={fr}
                    illustrationAsset={word.illustrationAsset}
                    category={categoryId}
                    size={64}
                  />
                )}
              </div>

              {/* Image Action Buttons */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-wrap gap-2">
                  <label className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Nouvelle Photo...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setImageAction('preset')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                      imageAction === 'preset'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Autocollant Émoji</span>
                  </button>

                  {(mediaCustomizationManager.hasCustomImage(word.id) || imageAction !== 'keep') && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageAction('reset');
                        setUploadedImageDataUrl(null);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Rétablir l'illustration de base</span>
                    </button>
                  )}
                </div>

                {/* Emoji Grid if Preset Selected */}
                {imageAction === 'preset' && (
                  <div className="p-2 bg-white rounded-xl border border-slate-200 max-h-24 overflow-y-auto flex flex-wrap gap-1">
                    {PRESET_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleSelectEmoji(emoji)}
                        className={`w-7 h-7 text-lg rounded-lg hover:bg-indigo-50 flex items-center justify-center ${
                          selectedEmoji === emoji ? 'bg-indigo-100 ring-2 ring-indigo-400' : ''
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Personnalisation de la Voix */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-100 pb-1">
              <span>3. Voix & Prononciation</span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Actuelle : {mediaCustomizationManager.hasCustomAudio(word.id) ? 'Enregistrement vocal parent' : 'Audio studio fr-CA'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Record Mic */}
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Enregistrer ma voix</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 animate-pulse"
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>Arrêter ({recordingSeconds}s / 6s)</span>
                  </button>
                )}

                {/* Upload Audio File */}
                <label className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer flex items-center gap-1.5 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Fichier audio...</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Reset to standard audio */}
                {(mediaCustomizationManager.hasCustomAudio(word.id) || audioAction !== 'keep') && (
                  <button
                    type="button"
                    onClick={() => {
                      setAudioAction('reset');
                      setRecordedAudioDataUrl(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Rétablir l'audio studio</span>
                  </button>
                )}
              </div>

              {/* Audio preview when new audio recorded or loaded */}
              {recordedAudioDataUrl && (
                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <span>✅ Nouvel enregistrement prêt !</span>
                  <button
                    type="button"
                    onClick={() => {
                      const sound = new Audio(recordedAudioDataUrl);
                      sound.play();
                    }}
                    className="p-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                    title="Écouter le nouvel enregistrement"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              {isOverridden && (
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rétablir l'original CDI</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Enregistrer les Modifications</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
