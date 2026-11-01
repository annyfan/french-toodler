import React, { useState, useEffect, useMemo } from 'react';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { speechManager } from '../../engine/SpeechManager';
import { contentManager } from '../../engine/ContentManager';
import { WordItem, VoiceSettings, AudioPriorityMode } from '../../types';
import { ToddlerGraphic } from '../common/ToddlerGraphic';
import { EditImageModal } from './EditImageModal';
import { EditAudioModal } from './EditAudioModal';
import {
  Volume2,
  Sliders,
  Image as ImageIcon,
  Mic,
  RotateCcw,
  Sparkles,
  Play,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Search
} from 'lucide-react';

export const MediaSettingsPanel: React.FC = () => {
  const [words, setWords] = useState<WordItem[]>(contentManager.getWords());
  const wordsMap = useMemo(() => new Map(words.map(w => [w.id, w])), [words]);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(
    mediaCustomizationManager.getVoiceSettings()
  );
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [customImages, setCustomImages] = useState<Record<string, string>>(
    mediaCustomizationManager.getAllCustomImages()
  );
  const [customAudios, setCustomAudios] = useState<Record<string, string>>(
    mediaCustomizationManager.getAllCustomAudios()
  );

  const [testText, setTestText] = useState("Bonjour ! Bienvenue sur Baobao, le français québécois pour les tout-petits.");
  const [editingImageWord, setEditingImageWord] = useState<WordItem | null>(null);
  const [editingAudioWord, setEditingAudioWord] = useState<WordItem | null>(null);
  const [quickSearch, setQuickSearch] = useState('');

  // Load voices and subscribe to media changes
  useEffect(() => {
    const updateVoices = () => {
      setAvailableVoices(speechManager.getAvailableVoices());
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    const unsubscribeMedia = mediaCustomizationManager.subscribe(() => {
      setVoiceSettings(mediaCustomizationManager.getVoiceSettings());
      setCustomImages(mediaCustomizationManager.getAllCustomImages());
      setCustomAudios(mediaCustomizationManager.getAllCustomAudios());
    });

    const unsubscribeContent = contentManager.subscribe(() => {
      setWords(contentManager.getWords());
    });

    return () => {
      unsubscribeMedia();
      unsubscribeContent();
    };
  }, []);

  const handleVoiceChange = (uri: string) => {
    mediaCustomizationManager.setVoiceSettings({ voiceURI: uri });
    speechManager.setVoiceURI(uri);
  };

  const handleRateChange = (rate: number) => {
    speechManager.setRate(rate);
  };

  const handlePitchChange = (pitch: number) => {
    speechManager.setPitch(pitch);
  };

  const handlePriorityChange = (priority: AudioPriorityMode) => {
    mediaCustomizationManager.setVoiceSettings({ priority });
  };

  const handlePlayTest = (customPhrase?: string) => {
    const textToSpeak = customPhrase || testText;
    speechManager.speakWithVoice(
      textToSpeak,
      voiceSettings.voiceURI,
      voiceSettings.rate,
      voiceSettings.pitch
    );
  };

  const handleResetAllMedia = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les images et voix personnalisées ?")) {
      mediaCustomizationManager.resetAllCustomMedia();
    }
  };

  // Group and sort voices (French voices first!)
  const frenchVoices = availableVoices.filter(v => speechManager.isFrenchVoice(v));
  const otherVoices = availableVoices.filter(v => !speechManager.isFrenchVoice(v));

  // Custom items list
  const customizedWordIds = Array.from(
    new Set([...Object.keys(customImages), ...Object.keys(customAudios)])
  );

  const filteredCustomWords = customizedWordIds
    .map(id => wordsMap.get(id))
    .filter((w): w is WordItem => !!w)
    .filter(w => {
      if (!quickSearch.trim()) return true;
      const q = quickSearch.toLowerCase();
      return w.fr.toLowerCase().includes(q) || w.en.toLowerCase().includes(q) || w.id.includes(q);
    });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personnalisation Familiale & Thérapeutique</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black">
            Gestion des Voix & Illustrations
          </h2>
          <p className="text-indigo-100 text-xs md:text-sm mt-1 max-w-2xl">
            Remplacez n'importe quelle illustration par une photo de votre propre animal, jouet ou pièce de maison, et enregistrez la voix de maman ou papa pour favoriser l'éveil du langage de votre tout-petit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <span className="block text-2xl font-black">{Object.keys(customImages).length}</span>
            <span className="text-[11px] font-bold text-indigo-200">Photos perso</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <span className="block text-2xl font-black">{Object.keys(customAudios).length}</span>
            <span className="text-[11px] font-bold text-indigo-200">Voix perso</span>
          </div>
        </div>
      </div>

      {/* Section 1: Voice Engine & Audio Priority */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Paramètres du Moteur Vocal & Prononciation
              </h3>
              <p className="text-xs text-slate-500">
                Ajustez la voix québécoise, le débit et le timbre pour votre enfant
              </p>
            </div>
          </div>
        </div>

        {/* Audio Priority Mode Cards */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
            Priorité de Lecture Audio
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Mode 1: Studio Priority */}
            <button
              type="button"
              onClick={() => handlePriorityChange('STUDIO_THEN_SPEECH')}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                voiceSettings.priority === 'STUDIO_THEN_SPEECH'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl mb-2">🎙️</span>
                {voiceSettings.priority === 'STUDIO_THEN_SPEECH' && (
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              <div>
                <span className="block text-sm font-black text-slate-800">
                  Audio Studio (Recommandé)
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  Priorise les 664 MP3s pré-enregistrés avec la voix québécoise officielle (Sylvie fr-CA).
                </span>
              </div>
            </button>

            {/* Mode 2: Custom Audio First */}
            <button
              type="button"
              onClick={() => handlePriorityChange('CUSTOM_AUDIO_FIRST')}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                voiceSettings.priority === 'CUSTOM_AUDIO_FIRST'
                  ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl mb-2">🧸</span>
                {voiceSettings.priority === 'CUSTOM_AUDIO_FIRST' && (
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div>
                <span className="block text-sm font-black text-slate-800">
                  Voix des Parents en Priorité
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  Joue d'abord les enregistrements au micro de maman/papa, puis les audios studio.
                </span>
              </div>
            </button>

            {/* Mode 3: Always Speech Synthesis */}
            <button
              type="button"
              onClick={() => handlePriorityChange('ALWAYS_SPEECH')}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                voiceSettings.priority === 'ALWAYS_SPEECH'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl mb-2">🗣️</span>
                {voiceSettings.priority === 'ALWAYS_SPEECH' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
              </div>
              <div>
                <span className="block text-sm font-black text-slate-800">
                  Synthèse Vocale Directe
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  Force l'utilisation continue de la voix système choisie avec votre vitesse personnalisée.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Voice Selector, Speed, and Pitch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Voice Selector */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">
              Voix de Synthèse Système
            </label>
            <select
              value={voiceSettings.voiceURI}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            >
              <option value="">Voix québécoise automatique (Recommandée)</option>
              {frenchVoices.length > 0 && (
                <optgroup label="🇫🇷 / 🇨🇦 Voix Francophones Détectées">
                  {frenchVoices.map(v => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </optgroup>
              )}
              {otherVoices.length > 0 && (
                <optgroup label="Autres Voix Système">
                  {otherVoices.slice(0, 15).map(v => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Actuelle : {speechManager.getSelectedVoiceName()}
            </span>
          </div>

          {/* Speed / Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                Débit / Vitesse de Parole
              </label>
              <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {voiceSettings.rate.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.05"
              value={voiceSettings.rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
              <span>0.7x (Lent)</span>
              <span className="text-indigo-600">0.95x (Idéal 3 ans)</span>
              <span>1.3x (Rapide)</span>
            </div>
          </div>

          {/* Pitch */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                Hauteur / Timbre Vocale
              </label>
              <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {voiceSettings.pitch.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={voiceSettings.pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
              <span>0.8x (Grave)</span>
              <span className="text-indigo-600">1.0x (Naturel)</span>
              <span>1.3x (Aigu)</span>
            </div>
          </div>
        </div>

        {/* Speech Playground & Test Box */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <label className="text-xs font-bold text-slate-600 flex items-center justify-between">
            <span>Banc d'Essai Vocal (Tester la prononciation en direct) :</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <button
              type="button"
              onClick={() => handlePlayTest()}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-sm transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Tester la voix</span>
            </button>
          </div>

          {/* Quick preset phrases */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400">Exemples rapides :</span>
            {[
              "L'auto de papa",
              "Le bonhomme mange une pomme",
              "Regarde le petit chat sur le divan",
              "Un biscuit avec du lait"
            ].map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTestText(phrase);
                  handlePlayTest(phrase);
                }}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 rounded-lg text-xs font-bold text-slate-600 transition-colors shadow-2xs"
              >
                « {phrase} »
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Manage Customized Words (Photos & Parent Voices) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Vos Médias Personnalisés ({customizedWordIds.length} mots)
              </h3>
              <p className="text-xs text-slate-500">
                Consultez, modifiez ou réinitialisez les photos et voix enregistrées
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Filtrer mes médias..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {customizedWordIds.length > 0 && (
              <button
                type="button"
                onClick={handleResetAllMedia}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tout réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {customizedWordIds.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-black text-slate-700">
              Aucun mot personnalisé pour le moment
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Rendez-vous dans l'onglet <strong>« Dictionnaire Lexical »</strong> pour remplacer l'image d'un mot par votre propre photo de famille ou enregistrer votre voix au micro.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCustomWords.map(word => {
              const hasCustomImg = !!customImages[word.id];
              const hasCustomAud = !!customAudios[word.id];

              return (
                <div
                  key={word.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center p-1.5 relative overflow-hidden flex-shrink-0">
                      <ToddlerGraphic
                        id={word.id}
                        word={word.fr}
                        illustrationAsset={word.illustrationAsset}
                        category={word.categoryId}
                        size={48}
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-black text-slate-800 capitalize">
                        {word.fr}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-bold">
                        {word.en} • {word.zh}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        {hasCustomImg && (
                          <span className="text-[9px] font-black bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">
                            Photo perso
                          </span>
                        )}
                        {hasCustomAud && (
                          <span className="text-[9px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                            Voix parent
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingImageWord(word)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                      title="Changer l'image"
                    >
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAudioWord(word)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg transition-colors"
                      title="Changer la voix"
                    >
                      Voix
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals for customization */}
      {editingImageWord && (
        <EditImageModal
          word={editingImageWord}
          isOpen={!!editingImageWord}
          onClose={() => setEditingImageWord(null)}
          onSaved={() => {
            setCustomImages(mediaCustomizationManager.getAllCustomImages());
          }}
        />
      )}

      {editingAudioWord && (
        <EditAudioModal
          word={editingAudioWord}
          isOpen={!!editingAudioWord}
          onClose={() => setEditingAudioWord(null)}
          onSaved={() => {
            setCustomAudios(mediaCustomizationManager.getAllCustomAudios());
          }}
        />
      )}
    </div>
  );
};
