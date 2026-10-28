import React, { useState } from 'react';
import { contentManager } from '../../engine/ContentManager';
import { CategoryInfo } from '../../types';
import { X, Check, FolderPlus, Sparkles } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (cat: CategoryInfo) => void;
}

const PRESET_ICONS = [
  '👨‍👩‍👧', '🦖', '🏖️', '🚀', '🦄', '⚽', '🎨', '🎪', '🌈', '🍕',
  '🦁', '🚂', '🧸', '🎵', '🏥', '⛺', '🎂', '🍭', '🍓', '👑'
];

const PRESET_COLORS = [
  '#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#8338EC',
  '#FB5607', '#3A86FF', '#FF006E', '#8AC926', '#1982C4',
  '#F72585', '#7209B7', '#4CC9F0', '#10B981', '#F59E0B'
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onCategoryAdded,
}) => {
  if (!isOpen) return null;

  const [nameFr, setNameFr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameZh, setNameZh] = useState('');
  const [icon, setIcon] = useState('👨‍👩‍👧');
  const [color, setColor] = useState('#EF476F');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameFr.trim()) {
      setErrorMsg('Veuillez entrer un nom de catégorie en français.');
      return;
    }

    const created = contentManager.addCategory({
      name_fr: nameFr.trim(),
      name_en: nameEn.trim() || nameFr.trim(),
      name_zh: nameZh.trim() || nameFr.trim(),
      icon: icon || '🎈',
      color: color || '#6366F1',
    });

    onCategoryAdded(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Créer une Nouvelle Catégorie
              </h3>
              <p className="text-xs text-slate-500">
                Ajoutez un thème sur mesure (ex: Famille, Dinosaures, Vacances)
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* French Name */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">
              Nom en français (requis) *
            </label>
            <input
              type="text"
              required
              value={nameFr}
              onChange={(e) => setNameFr(e.target.value)}
              placeholder="ex: Ma Famille & Mes Proches"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Translations */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                English (optionnel)
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="ex: Family & Friends"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                中文 (optionnel)
              </label>
              <input
                type="text"
                value={nameZh}
                onChange={(e) => setNameZh(e.target.value)}
                placeholder="ex: 家庭与亲友"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>

          {/* Icon / Emoji Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                Icône / Émoji de la Catégorie
              </label>
              <span className="text-2xl p-1 bg-slate-100 rounded-xl">{icon}</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5 p-2 bg-slate-50 rounded-2xl border border-slate-200">
              {PRESET_ICONS.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-transform active:scale-90 ${
                    icon === emoji ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 scale-110' : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color Picker */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                Couleur Thématique
              </label>
              <div
                className="w-5 h-5 rounded-full border border-slate-300 shadow-sm"
                style={{ backgroundColor: color }}
              />
            </div>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
              {PRESET_COLORS.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform active:scale-90 ${
                    color === c ? 'ring-3 ring-indigo-400 scale-110 shadow-sm' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
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
              <span>Créer la catégorie</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
