import React, { useState, useEffect } from 'react';
import { GrammarPair } from '../../types';
import { contentManager } from '../../engine/ContentManager';
import { speechManager } from '../../engine/SpeechManager';
import {
  X,
  Volume2,
  Sparkles,
  Check,
  RotateCcw,
  Puzzle
} from 'lucide-react';

interface EditGrammarPairModalProps {
  pair: GrammarPair | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (updatedPair: GrammarPair) => void;
}

export const EditGrammarPairModal: React.FC<EditGrammarPairModalProps> = ({
  pair,
  isOpen,
  onClose,
  onSaved
}) => {
  if (!isOpen || !pair) return null;

  const isCustom = contentManager.isCustomGrammarPair(pair.id);
  const isOverridden = contentManager.isOverriddenGrammarPair(pair.id);

  const [type, setType] = useState<'complexity' | 'expression'>(pair.type);
  const [level1, setLevel1] = useState(pair.level1);
  const [level2, setLevel2] = useState(pair.level2);
  const [block1, setBlock1] = useState(pair.blocks?.[0] || '');
  const [block2, setBlock2] = useState(pair.blocks?.[1] || '');
  const [en, setEn] = useState(pair.en || '');
  const [zh, setZh] = useState(pair.zh || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pair) {
      setType(pair.type);
      setLevel1(pair.level1);
      setLevel2(pair.level2);
      setBlock1(pair.blocks?.[0] || '');
      setBlock2(pair.blocks?.[1] || '');
      setEn(pair.en || '');
      setZh(pair.zh || '');
      setError(null);
    }
  }, [pair]);

  const handleTestAudio = (text: string) => {
    if (!text.trim()) return;
    speechManager.speak(text.trim());
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Rétablir le repère syntaxique "${pair.level1}" à sa formulation originale CDI ?`)) {
      contentManager.resetGrammarPairOverride(pair.id);
      const restored = contentManager.getGrammarPair(pair.id) || pair;
      onSaved(restored);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanL1 = level1.trim();
    const cleanL2 = level2.trim();
    const cleanB1 = block1.trim();
    const cleanB2 = block2.trim();

    if (!cleanL1) {
      setError('Veuillez saisir la phrase de Niveau 1 (télégraphique).');
      return;
    }
    if (!cleanL2) {
      setError('Veuillez saisir la phrase de Niveau 2 (grammaticale).');
      return;
    }
    if (!cleanB1 || !cleanB2) {
      setError('Veuillez renseigner les deux blocs de mots pour le jeu interactif.');
      return;
    }

    try {
      contentManager.updateGrammarPair(pair.id, {
        type,
        level1: cleanL1,
        level2: cleanL2,
        blocks: [cleanB1, cleanB2],
        en: en.trim(),
        zh: zh.trim(),
      });

      const updated = contentManager.getGrammarPair(pair.id) || pair;
      onSaved(updated);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la modification de la phrase.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-100 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shadow-inner">
              🧩
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">Modifier le Repère Syntaxique</h3>
                <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded-full text-teal-100 font-bold">
                  {pair.id}
                </span>
                {isCustom ? (
                  <span className="text-[10px] font-black bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full">
                    Ajout parent
                  </span>
                ) : isOverridden ? (
                  <span className="text-[10px] font-black bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full">
                    CDI Modifié
                  </span>
                ) : (
                  <span className="text-[10px] font-black bg-white/20 text-teal-100 px-2 py-0.5 rounded-full">
                    CDI Base
                  </span>
                )}
              </div>
              <p className="text-xs text-teal-100 font-medium">
                Adaptez la phrase télégraphique, l'expansion grammaticale et les blocs interactifs
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Type de repère syntaxique
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('complexity')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                  type === 'complexity'
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-400/40 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">📈</span>
                <div>
                  <div className="text-xs font-black">Section C : Complexité</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-snug">
                    Liaison, préposition, enrichissement verbe-nom
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('expression')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                  type === 'expression'
                    ? 'border-teal-500 bg-teal-50/70 text-teal-950 ring-2 ring-teal-400/40 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">💬</span>
                <div>
                  <div className="text-xs font-black">Section D : Expression</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-snug">
                    Formes idiomatiques, tournures spontanées québécoises
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Level 1 & Level 2 Inputs */}
          <div className="space-y-4">
            {/* Level 1 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-black">
                    L1
                  </span>
                  Niveau 1 : Phrase télégraphique (2 mots) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Étape 24-30 mois</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={level1}
                  onChange={(e) => setLevel1(e.target.value)}
                  placeholder="Ex: Veux lait, Toutou bébé, Auto papa..."
                  className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleTestAudio(level1)}
                  disabled={!level1.trim()}
                  className="px-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors"
                  title="Écouter la prononciation"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>Tester</span>
                </button>
              </div>
            </div>

            {/* Level 2 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-md bg-emerald-200 text-emerald-900 flex items-center justify-center text-[10px] font-black">
                    L2
                  </span>
                  Niveau 2 : Expansion grammaticale complète <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Étape 30-36+ mois</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={level2}
                  onChange={(e) => setLevel2(e.target.value)}
                  placeholder="Ex: Je veux du lait, C'est le toutou du bébé..."
                  className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleTestAudio(level2)}
                  disabled={!level2.trim()}
                  className="px-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors"
                  title="Écouter la prononciation"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>Tester</span>
                </button>
              </div>
            </div>
          </div>

          {/* Puzzle Blocks for Child Game */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Puzzle className="w-3.5 h-3.5 text-indigo-500" />
                Blocs de mots pour le jeu interactif
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Ces 2 blocs seront manipulés par l'enfant dans l'activité d'assemblage de phrases.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Bloc 1</label>
                <input
                  type="text"
                  value={block1}
                  onChange={(e) => setBlock1(e.target.value)}
                  placeholder="Ex: Auto"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-xs text-indigo-700"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Bloc 2</label>
                <input
                  type="text"
                  value={block2}
                  onChange={(e) => setBlock2(e.target.value)}
                  placeholder="Ex: papa"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-xs text-indigo-700"
                  required
                />
              </div>
            </div>
          </div>

          {/* Translations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                English (Traduction)
              </label>
              <input
                type="text"
                value={en}
                onChange={(e) => setEn(e.target.value)}
                placeholder="Ex: Daddy's car"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                中文 (Traduction)
              </label>
              <input
                type="text"
                value={zh}
                onChange={(e) => setZh(e.target.value)}
                placeholder="Ex: 爸爸的车"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium"
              />
            </div>
          </div>

          {/* Live Card Preview */}
          {(level1.trim() || level2.trim()) && (
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Aperçu du repère syntaxique
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  L1
                </span>
                <span className="text-xs font-bold text-slate-800">{level1 || '—'}</span>
                <span className="text-slate-400 text-xs">➔</span>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                  L2
                </span>
                <span className="text-xs font-bold text-slate-800">{level2 || '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <span>Blocs interactifs :</span>
                <span className="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs">
                  {block1 || 'Bloc 1'}
                </span>
                <span>+</span>
                <span className="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs">
                  {block2 || 'Bloc 2'}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
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
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2"
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
