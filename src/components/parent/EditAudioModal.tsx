import React, { useState, useEffect, useRef } from 'react';
import { WordItem } from '../../types';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { speechManager } from '../../engine/SpeechManager';
import { Mic, Square, Play, Upload, RotateCcw, X, Check, Volume2 } from 'lucide-react';

interface EditAudioModalProps {
  word: WordItem;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const EditAudioModal: React.FC<EditAudioModalProps> = ({
  word,
  isOpen,
  onClose,
  onSaved
}) => {
  if (!isOpen) return null;

  const currentCustom = mediaCustomizationManager.getCustomAudio(word.id);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(currentCustom);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState<'record' | 'upload'>('record');
  const [errorMsg, setErrorMsg] = useState('');
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
      setCustomAudioUrl(dataUrl);
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur lors de la capture audio.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = () => {
      setCustomAudioUrl(reader.result as string);
    };
    reader.onerror = () => {
      setErrorMsg("Impossible de lire le fichier audio.");
    };
    reader.readAsDataURL(file);
  };

  const playPreviewAudio = () => {
    if (customAudioUrl) {
      speechManager.playAudioUrl(customAudioUrl);
    } else {
      speechManager.speak(word.fr, word.id);
    }
  };

  const playStudioAudio = () => {
    const audio = new Audio(`./audio/words/${word.id}.mp3`);
    audio.play().catch(() => {
      speechManager.speak(word.fr);
    });
  };

  const handleSave = () => {
    if (customAudioUrl) {
      mediaCustomizationManager.setCustomAudio(word.id, customAudioUrl);
    } else {
      mediaCustomizationManager.removeCustomAudio(word.id);
    }
    onSaved();
    onClose();
  };

  const handleResetToDefault = () => {
    mediaCustomizationManager.removeCustomAudio(word.id);
    setCustomAudioUrl(null);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Personnaliser la voix : <span className="text-amber-600">{word.fr}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Phonétique: <code className="font-mono">{word.phonetics}</code> • ID: {word.id}
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Audio comparison preview cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Studio Audio */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-between text-center">
              <span className="text-xs font-bold text-slate-500">Voix Studio (fr-CA)</span>
              <span className="text-[11px] text-slate-400 mt-1">Sylvie Neural (Québec)</span>
              <button
                type="button"
                onClick={playStudioAudio}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Écouter studio</span>
              </button>
            </div>

            {/* Custom / Parent Audio */}
            <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 flex flex-col items-center justify-between text-center">
              <span className="text-xs font-bold text-amber-900">
                {customAudioUrl ? 'Voix Parent (Active)' : 'Voix Parent (Aucune)'}
              </span>
              <span className="text-[11px] text-amber-600 mt-1">
                {customAudioUrl ? 'Enregistrement personnalisé' : 'Non configurée'}
              </span>
              <button
                type="button"
                onClick={playPreviewAudio}
                disabled={!customAudioUrl}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 disabled:opacity-40 disabled:hover:bg-amber-400 rounded-xl text-xs font-black text-amber-950 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-amber-950" />
                <span>Tester ma voix</span>
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex border-b border-slate-200 gap-2">
            <button
              onClick={() => setActiveTab('record')}
              className={`pb-2 px-3 text-xs font-black border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'record'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Enregistrer au micro</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2 px-3 text-xs font-black border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importer un fichier audio</span>
            </button>
          </div>

          {/* Tab 1: Live Record */}
          {activeTab === 'record' && (
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50/60 rounded-2xl border border-slate-200 text-center">
              {isRecording ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center animate-ping mb-3">
                    <Mic className="w-8 h-8" />
                  </div>
                  <span className="text-base font-black text-rose-600">
                    Enregistrement en cours... ({recordingSeconds}s)
                  </span>
                  <span className="text-xs text-slate-500 mt-1 mb-4">
                    Parlez distinctement dans le micro (ex: « {word.fr} »)
                  </span>
                  <button
                    type="button"
                    onClick={handleStopRecord}
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    <span>Arrêter l'enregistrement</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={handleStartRecord}
                    className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 mb-3"
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                  <span className="text-sm font-bold text-slate-700">
                    Cliquez pour enregistrer votre voix
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    Votre tout-petit adorera entendre sa maman ou son papa dire « {word.fr} » !
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Upload Audio */}
          {activeTab === 'upload' && (
            <div>
              <label className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-amber-50/20 transition-all text-center">
                <Upload className="w-8 h-8 text-amber-500 mb-2" />
                <span className="text-sm font-bold text-slate-700">
                  Sélectionner un fichier audio
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Format MP3, WAV, M4A, AAC ou WebM
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetToDefault}
            disabled={!currentCustom}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rétablir l'audio d'origine</span>
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
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-black text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Enregistrer la voix</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
