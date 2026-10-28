import React, { useState } from 'react';
import { WordItem } from '../../types';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { ToddlerGraphic } from '../common/ToddlerGraphic';
import { Upload, RotateCcw, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

interface EditImageModalProps {
  word: WordItem;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const PRESET_EMOJIS = [
  '🐶', '🐱', '🐰', '🐻', '🐼', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵', '🦆',
  '🍎', '🍌', '🍓', '🍊', '🍇', '🍉', '🥛', '🍪', '🎂', '🍕', '🧀', '🥐',
  '🚗', '🚌', '🚒', '✈️', '🚂', '🚲', '⛵', '🚁', '🚀', '🚜', '🧸', '🎈',
  '👕', '👗', '👟', '🧢', '🧦', '🧣', '🛋️', '🛏️', '🚪', '🪟', '💡', '⏰',
  '🌳', '🌸', '☀️', '⭐', '🌙', '☁️', '🌈', '👶', '👧', '👦', '👩', '👨'
];

export const EditImageModal: React.FC<EditImageModalProps> = ({
  word,
  isOpen,
  onClose,
  onSaved
}) => {
  if (!isOpen) return null;

  const currentCustom = mediaCustomizationManager.getCustomImage(word.id);
  const [previewImage, setPreviewImage] = useState<string | null>(currentCustom);
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('upload');
  const [customUrl, setCustomUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setIsProcessing(true);

    try {
      // Compress and resize image file to lightweight WebP data URL
      const dataUrl = await mediaCustomizationManager.processImageFile(file, 280);
      setPreviewImage(dataUrl);
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur lors du traitement de l'image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyPresetEmoji = (emoji: string) => {
    // Generate clean vector SVG from emoji
    const svgData = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23EEF2FF" stroke="%236366F1" stroke-width="4"/><text x="50" y="65" font-size="52" text-anchor="middle">${encodeURIComponent(emoji)}</text></svg>`;
    setPreviewImage(svgData);
  };

  const handleSave = () => {
    if (previewImage) {
      mediaCustomizationManager.setCustomImage(word.id, previewImage);
    } else {
      mediaCustomizationManager.removeCustomImage(word.id);
    }
    onSaved();
    onClose();
  };

  const handleResetToDefault = () => {
    mediaCustomizationManager.removeCustomImage(word.id);
    setPreviewImage(null);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Personnaliser l'image : <span className="text-indigo-600">{word.fr}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {word.zh} • {word.en} (ID: {word.id})
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Current & Preview Box */}
          <div className="flex items-center justify-around p-4 bg-slate-50 rounded-2xl border border-slate-200">
            {/* Default Illustration */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 mb-2">Original</span>
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-sm">
                <ToddlerGraphic
                  id={word.id}
                  word={word.fr}
                  illustrationAsset={word.illustrationAsset}
                  category={word.categoryId}
                  size={64}
                />
              </div>
            </div>

            <div className="text-xl text-slate-300 font-bold">➜</div>

            {/* Custom Preview */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-indigo-600 mb-2">
                {previewImage ? 'Personnalisée' : 'Actuelle'}
              </span>
              <div className="w-20 h-20 rounded-2xl bg-indigo-50 border-2 border-dashed border-indigo-300 flex items-center justify-center p-2 shadow-sm relative overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={word.fr}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <ToddlerGraphic
                    id={word.id}
                    word={word.fr}
                    illustrationAsset={word.illustrationAsset}
                    category={word.categoryId}
                    size={64}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Tab selector for customization method */}
          <div className="flex border-b border-slate-200 gap-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2 px-3 text-xs font-black border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Téléverser Photo / Fichier</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`pb-2 px-3 text-xs font-black border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autocollants & Émojis</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`pb-2 px-3 text-xs font-black border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'url'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <span>Lien URL</span>
            </button>
          </div>

          {/* Tab 1: File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <label className="border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition-all text-center">
                <Upload className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="text-sm font-bold text-slate-700">
                  Choisir une photo de famille, d'animal ou de jouet
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Format JPG, PNG, WebP ou SVG (redimensionné automatiquement)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {isProcessing && (
                <p className="text-xs text-indigo-600 font-bold text-center animate-pulse">
                  Traitement et optimisation de l'image en cours...
                </p>
              )}
            </div>
          )}

          {/* Tab 2: Preset Stickers */}
          {activeTab === 'presets' && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500">
                Sélectionnez un autocollant illustré pour ce mot :
              </p>
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                {PRESET_EMOJIS.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPresetEmoji(emoji)}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 flex items-center justify-center text-xl transition-transform active:scale-90 shadow-sm"
                  >
                    <span>{emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Custom URL */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 block">
                Adresse URL directe de l'image :
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com/mon-image.png"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => customUrl && setPreviewImage(customUrl)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                >
                  Tester
                </button>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetToDefault}
            disabled={!currentCustom}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rétablir l'original</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Enregistrer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
