import React, { useState, useRef, useEffect } from 'react';
import { contentManager } from '../../engine/ContentManager';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { speechManager } from '../../engine/SpeechManager';
import { CategoryInfo, WordItem } from '../../types';
import {
  X,
  Check,
  PlusCircle,
  Upload,
  Mic,
  Square,
  Play,
  Volume2,
  Sparkles,
  FolderPlus
} from 'lucide-react';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWordAdded: (word: WordItem) => void;
  onRequestNewCategory?: () => void;
  preselectedCategoryId?: number;
}

const PRESET_EMOJIS = [
  '🐶', '🐱', '🐰', '🐻', '🐼', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵', '🦆',
  '🍎', '🍌', '🍓', '🍊', '🍇', '🍉', '🥛', '🍪', '🎂', '🍕', '🧀', '🥐',
  '🚗', '🚌', '🚒', '✈️', '🚂', '🚲', '⛵', '🚁', '🚀', '🚜', '🧸', '🎈',
  '👕', '👗', '👟', '🧢', '🧦', '🧣', '🛋️', '🛏️', '🚪', '🪟', '💡', '⏰',
  '🌳', '🌸', '☀️', '⭐', '🌙', '☁️', '🌈', '👶', '👧', '👦', '👩', '👨'
];

export const AddWordModal: React.FC<AddWordModalProps> = ({
  isOpen,
  onClose,
  onWordAdded,
  onRequestNewCategory,
  preselectedCategoryId,
}) => {
  if (!isOpen) return null;

  const categories = contentManager.getCategories();

  const [fr, setFr] = useState('');
  const [en, setEn] = useState('');
  const [zh, setZh] = useState('');
  const [categoryId, setCategoryId] = useState<number>(preselectedCategoryId || categories[0]?.id || 1);
  const [phonetics, setPhonetics] = useState('');

  // Media
  const [imageTab, setImageTab] = useState<'upload' | 'preset' | 'url'>('upload');
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Audio
  const [audioTab, setAudioTab] = useState<'tts' | 'record' | 'upload'>('tts');
  const [audioDataUrl, setAudioDataUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Auto-generate approximate phonetics when French text changes
  const handleFrChange = (val: string) => {
    setFr(val);
    if (!phonetics || phonetics.startsWith('/')) {
      const simplified = val.toLowerCase().trim().replace(/e$/g, 'ə');
      setPhonetics(`/${simplified}/`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await mediaCustomizationManager.processImageFile(file, 280);
      setImageDataUrl(dataUrl);
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur de traitement de l'image.");
    }
  };

  const handleSelectPresetEmoji = (emoji: string) => {
    const svgData = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23EEF2FF" stroke="%236366F1" stroke-width="4"/><text x="50" y="65" font-size="52" text-anchor="middle">${encodeURIComponent(emoji)}</text></svg>`;
    setImageDataUrl(svgData);
  };

  const handleStartRecord = async () => {
    setErrorMsg('');
    try {
      await mediaCustomizationManager.startAudioRecording();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Impossible d'accéder au microphone.");
    }
  };

  const handleStopRecord = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    try {
      const dataUrl = await mediaCustomizationManager.stopAudioRecording();
      setAudioDataUrl(dataUrl);
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur lors de l'enregistrement audio.");
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAudioDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTestTts = () => {
    if (fr.trim()) {
      speechManager.speak(fr.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fr.trim()) {
      setErrorMsg('Veuillez entrer le mot en français.');
      return;
    }

    const finalImage = imageDataUrl || customImageUrl || undefined;
    const finalAudio = audioDataUrl || undefined;

    const selectedCat = categories.find(c => c.id === categoryId);

    const created = contentManager.addWord(
      {
        fr: fr.trim(),
        en: en.trim() || fr.trim(),
        zh: zh.trim() || fr.trim(),
        categoryId,
        subcategory: selectedCat ? selectedCat.name_fr : 'PERSONNALISÉ',
        phonetics: phonetics.trim() || `/${fr.trim()}/`,
        complexityLevel: 1,
        animationType: 'bounce',
        tags: ['personnalisé', 'parent'],
      },
      finalImage,
      finalAudio
    );

    onWordAdded(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Ajouter un Nouveau Mot au Vocabulaire
              </h3>
              <p className="text-xs text-slate-500">
                Le mot sera immédiatement disponible dans L'Imagier et le mode enfant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Section 1: Lexical Info */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">
                Mot en français (requis) *
              </label>
              <input
                type="text"
                required
                value={fr}
                onChange={(e) => handleFrChange(e.target.value)}
                placeholder="ex: Mamie, Doudou, Tracteur bleu, Papi..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Selector with Quick Add Category */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                  Catégorie d'Appartenance *
                </label>
                {onRequestNewCategory && (
                  <button
                    type="button"
                    onClick={onRequestNewCategory}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>+ Nouvelle catégorie</span>
                  </button>
                )}
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.id}. {c.name_fr} ({c.name_zh})
                  </option>
                ))}
              </select>
            </div>

            {/* Phonetics & Translations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  Phonétique (API)
                </label>
                <input
                  type="text"
                  value={phonetics}
                  onChange={(e) => setPhonetics(e.target.value)}
                  placeholder="/ma.mi/"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  English (optionnel)
                </label>
                <input
                  type="text"
                  value={en}
                  onChange={(e) => setEn(e.target.value)}
                  placeholder="ex: Grandma"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  中文 (optionnel)
                </label>
                <input
                  type="text"
                  value={zh}
                  onChange={(e) => setZh(e.target.value)}
                  placeholder="ex: 奶奶/外婆"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Image / Illustration Picker */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Illustration / Photo du Mot
              </label>
              {imageDataUrl && (
                <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  Image sélectionnée ✓
                </span>
              )}
            </div>

            <div className="flex border-b border-slate-200 gap-2">
              <button
                type="button"
                onClick={() => setImageTab('upload')}
                className={`pb-1.5 px-2 text-xs font-bold border-b-2 transition-colors ${
                  imageTab === 'upload' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'
                }`}
              >
                Téléverser une photo
              </button>
              <button
                type="button"
                onClick={() => setImageTab('preset')}
                className={`pb-1.5 px-2 text-xs font-bold border-b-2 transition-colors ${
                  imageTab === 'preset' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'
                }`}
              >
                Choisir un émoji/autocollant
              </button>
            </div>

            {imageTab === 'upload' && (
              <div className="flex items-center gap-3">
                <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-white transition-all text-xs font-bold text-slate-600">
                  <Upload className="w-4 h-4 text-indigo-600" />
                  <span>Choisir un fichier image (JPG, PNG, WebP)</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
                {imageDataUrl && (
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-300 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={imageDataUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                  </div>
                )}
              </div>
            )}

            {imageTab === 'preset' && (
              <div className="grid grid-cols-10 gap-1.5 max-h-32 overflow-y-auto p-2 bg-white rounded-xl border border-slate-200">
                {PRESET_EMOJIS.map((emoji, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPresetEmoji(emoji)}
                    className="w-8 h-8 rounded-lg hover:bg-indigo-50 border border-slate-200 flex items-center justify-center text-lg active:scale-90"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Voice & Audio */}
          <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-amber-950">
                Voix & Prononciation
              </label>
              {audioDataUrl && (
                <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  Voix personnalisée enregistrée ✓
                </span>
              )}
            </div>

            <div className="flex border-b border-amber-200 gap-2">
              <button
                type="button"
                onClick={() => setAudioTab('tts')}
                className={`pb-1.5 px-2 text-xs font-bold border-b-2 transition-colors ${
                  audioTab === 'tts' ? 'border-amber-600 text-amber-900' : 'border-transparent text-slate-400'
                }`}
              >
                Synthèse Vocale (Automatique)
              </button>
              <button
                type="button"
                onClick={() => setAudioTab('record')}
                className={`pb-1.5 px-2 text-xs font-bold border-b-2 transition-colors ${
                  audioTab === 'record' ? 'border-amber-600 text-amber-900' : 'border-transparent text-slate-400'
                }`}
              >
                Enregistrer la voix au micro
              </button>
              <button
                type="button"
                onClick={() => setAudioTab('upload')}
                className={`pb-1.5 px-2 text-xs font-bold border-b-2 transition-colors ${
                  audioTab === 'upload' ? 'border-amber-600 text-amber-900' : 'border-transparent text-slate-400'
                }`}
              >
                Importer audio
              </button>
            </div>

            {audioTab === 'tts' && (
              <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-amber-200">
                <span className="text-xs text-slate-600 font-medium">
                  Prononciation française québécoise générée automatiquement
                </span>
                <button
                  type="button"
                  onClick={handleTestTts}
                  disabled={!fr.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-amber-950 rounded-xl text-xs font-bold shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-950" />
                  <span>Tester « {fr.trim() || '...'} »</span>
                </button>
              </div>
            )}

            {audioTab === 'record' && (
              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-200">
                {isRecording ? (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-bold text-rose-600">
                      Enregistrement... ({recordingSeconds}s)
                    </span>
                    <button
                      type="button"
                      onClick={handleStopRecord}
                      className="ml-3 px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Square className="w-3 h-3 fill-white" />
                      <span>Terminer</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-slate-600 font-medium">
                      {audioDataUrl ? "Voix enregistrée avec succès !" : "Enregistrez la voix de maman ou papa"}
                    </span>
                    <div className="flex items-center gap-2">
                      {audioDataUrl && (
                        <button
                          type="button"
                          onClick={() => speechManager.playAudioUrl(audioDataUrl)}
                          className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold"
                        >
                          Écouter
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleStartRecord}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-xs font-black shadow-2xs"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{audioDataUrl ? 'Réenregistrer' : 'Enregistrer'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {audioTab === 'upload' && (
              <label className="border-2 border-dashed border-amber-300 hover:border-amber-400 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-white transition-all text-xs font-bold text-slate-600">
                <Upload className="w-4 h-4 text-amber-600" />
                <span>Importer un fichier audio (MP3, WAV, M4A)</span>
                <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
              </label>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Ajouter le mot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
