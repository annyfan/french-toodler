import React, { useState, useMemo, useEffect } from 'react';
import { CategoryInfo, UserProgress, WordItem, MasteryStatus } from '../../types';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { contentManager } from '../../engine/ContentManager';
import { ToddlerGraphic } from '../common/ToddlerGraphic';
import { EditImageModal } from './EditImageModal';
import { EditAudioModal } from './EditAudioModal';
import { AddWordModal } from './AddWordModal';
import { AddCategoryModal } from './AddCategoryModal';
import { EditWordModal } from './EditWordModal';
import {
  Search,
  Volume2,
  Filter,
  Image as ImageIcon,
  Mic,
  Sparkles,
  Plus,
  Trash2,
  FolderPlus,
  Pencil
} from 'lucide-react';

interface VocabularyManagerProps {
  progress: UserProgress;
  selectedCategoryId: number | null;
  onClearCategoryFilter: () => void;
  onSelectCategoryId: (id: number | null) => void;
}

export const VocabularyManager: React.FC<VocabularyManagerProps> = ({
  progress,
  selectedCategoryId,
  onClearCategoryFilter,
  onSelectCategoryId
}) => {
  const [categories, setCategories] = useState<CategoryInfo[]>(contentManager.getCategories());
  const [words, setWords] = useState<WordItem[]>(contentManager.getWords());

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | MasteryStatus>('ALL');
  const [customOnlyFilter, setCustomOnlyFilter] = useState(false);

  const [customImages, setCustomImages] = useState<Record<string, string>>(
    mediaCustomizationManager.getAllCustomImages()
  );
  const [customAudios, setCustomAudios] = useState<Record<string, string>>(
    mediaCustomizationManager.getAllCustomAudios()
  );

  const [editingImageWord, setEditingImageWord] = useState<WordItem | null>(null);
  const [editingAudioWord, setEditingAudioWord] = useState<WordItem | null>(null);
  const [editingDetailWord, setEditingDetailWord] = useState<WordItem | null>(null);

  const [isAddWordOpen, setIsAddWordOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  useEffect(() => {
    const unsubMedia = mediaCustomizationManager.subscribe(() => {
      setCustomImages(mediaCustomizationManager.getAllCustomImages());
      setCustomAudios(mediaCustomizationManager.getAllCustomAudios());
    });

    const unsubContent = contentManager.subscribe(() => {
      setCategories(contentManager.getCategories());
      setWords(contentManager.getWords());
    });

    return () => {
      unsubMedia();
      unsubContent();
    };
  }, []);

  const filteredWords = useMemo(() => {
    return words.filter(word => {
      // Category filter
      if (selectedCategoryId !== null && word.categoryId !== selectedCategoryId) {
        return false;
      }

      // Status filter
      const currentStatus = progress.vocabulary[word.id] || 'NOT_YET';
      if (statusFilter !== 'ALL' && currentStatus !== statusFilter) {
        return false;
      }

      // Custom media only filter
      if (customOnlyFilter) {
        const hasCustomImg = !!customImages[word.id];
        const hasCustomAud = !!customAudios[word.id];
        const isCustomWord = contentManager.isCustomWord(word.id);
        if (!hasCustomImg && !hasCustomAud && !isCustomWord) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          word.fr.toLowerCase().includes(q) ||
          word.en.toLowerCase().includes(q) ||
          word.zh.includes(q) ||
          word.id.toLowerCase().includes(q) ||
          word.phonetics.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [words, selectedCategoryId, statusFilter, customOnlyFilter, searchQuery, progress.vocabulary, customImages, customAudios]);

  const handleStatusChange = (wordId: string, status: MasteryStatus) => {
    progressTracker.setWordStatus(wordId, status);
  };

  const playPronunciation = (word: WordItem) => {
    speechManager.speak(word.fr, word.id);
  };

  const handleDeleteWord = (word: WordItem) => {
    if (window.confirm(`Voulez-vous vraiment supprimer le mot personnalisé "${word.fr}" ?`)) {
      contentManager.deleteWord(word.id);
    }
  };

  const handleDeleteCategory = (cat: CategoryInfo) => {
    if (window.confirm(`Supprimer la catégorie personnalisée "${cat.name_fr}" et tous ses mots associés ?`)) {
      contentManager.deleteCategory(cat.id);
      if (selectedCategoryId === cat.id) {
        onClearCategoryFilter();
      }
    }
  };

  const activeCategory = selectedCategoryId !== null ? contentManager.getCategory(selectedCategoryId) : null;

  return (
    <div className="space-y-4">
      {/* Top Action Bar: Add Word & Add Category */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher (français, anglais, 中文)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
          />
        </div>

        {/* Buttons to Add Custom Items */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddCategoryOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-300 transition-transform active:scale-95 shadow-xs"
          >
            <FolderPlus className="w-4 h-4 text-slate-600" />
            <span>Nouvelle Catégorie</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddWordOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Mot</span>
          </button>
        </div>
      </div>

      {/* Filter and Category Ribbon */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Catégorie :</span>
          </div>
          <select
            value={selectedCategoryId !== null ? selectedCategoryId : ''}
            onChange={(e) => onSelectCategoryId(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Toutes les {categories.length} catégories ({words.length} mots)</option>
            {categories.map(c => {
              const isCust = contentManager.isCustomCategory(c.id);
              return (
                <option key={c.id} value={c.id}>
                  {c.id}. {c.icon ? `${c.icon} ` : ''}{c.name_fr} ({c.name_zh}) {isCust ? '★' : ''}
                </option>
              );
            })}
          </select>

          {/* If the selected category is custom, offer a delete button */}
          {activeCategory && contentManager.isCustomCategory(activeCategory.id) && (
            <button
              type="button"
              onClick={() => handleDeleteCategory(activeCategory)}
              className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold flex items-center gap-1 border border-rose-200"
              title="Supprimer cette catégorie personnalisée"
            >
              <Trash2 className="w-3 h-3" />
              <span>Supprimer catégorie</span>
            </button>
          )}

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'ALL' | MasteryStatus)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="OFTEN">Maîtrisé (Souvent)</option>
            <option value="SOMETIMES">En émergence (Parfois)</option>
            <option value="NOT_YET">Pas encore</option>
          </select>

          {/* Toggle Custom Items / Media Filter */}
          <button
            onClick={() => setCustomOnlyFilter(!customOnlyFilter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              customOnlyFilter
                ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ajouts & Médias perso</span>
          </button>

          {selectedCategoryId !== null && (
            <button
              onClick={onClearCategoryFilter}
              className="text-xs font-bold text-rose-500 hover:text-rose-700 underline ml-2"
            >
              Effacer filtre
            </button>
          )}
        </div>

        <div className="text-xs font-semibold text-slate-500">
          <span>{filteredWords.length} mots affichés / {words.length}</span>
        </div>
      </div>

      {/* Vocabulary Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto max-h-[620px] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase z-10">
              <tr>
                <th className="py-3 px-3 text-center">Illustration</th>
                <th className="py-3 px-4">Français (Québec)</th>
                <th className="py-3 px-3">Phonétique</th>
                <th className="py-3 px-4">English</th>
                <th className="py-3 px-4">中文</th>
                <th className="py-3 px-4 text-center">Voix & Audio</th>
                <th className="py-3 px-4 text-center">Statut d'Acquisition CDI</th>
                <th className="py-3 px-3 text-center">Gérer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredWords.map((word) => {
                const currentStatus = progress.vocabulary[word.id] || 'NOT_YET';
                const exposures = progress.wordExposures[word.id] || 0;
                const hasCustomImg = !!customImages[word.id];
                const hasCustomAud = !!customAudios[word.id];
                const isCustom = contentManager.isCustomWord(word.id);
                const isOverridden = contentManager.isOverriddenWord(word.id);

                return (
                  <tr key={word.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Illustration Column with Quick Edit Button */}
                    <td className="py-2.5 px-3 text-center">
                      <div className="relative inline-flex items-center justify-center group">
                        <button
                          type="button"
                          onClick={() => setEditingImageWord(word)}
                          className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-400 flex items-center justify-center p-1 shadow-sm transition-transform active:scale-95 group-hover:ring-2 group-hover:ring-indigo-300 relative overflow-hidden"
                          title="Modifier l'image de ce mot"
                        >
                          <ToddlerGraphic
                            id={word.id}
                            word={word.fr}
                            illustrationAsset={word.illustrationAsset}
                            category={word.categoryId}
                            size={40}
                          />
                        </button>
                        {hasCustomImg && (
                          <span
                            className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[9px] shadow"
                            title="Image personnalisée par le parent"
                          >
                            ★
                          </span>
                        )}
                      </div>
                    </td>

                    {/* French Word */}
                    <td className="py-3 px-4 text-slate-800 font-bold">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="capitalize">{word.fr}</span>
                        {isCustom && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                            Ajout parent
                          </span>
                        )}
                        {isOverridden && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">
                            Modifié
                          </span>
                        )}
                        {exposures > 0 && (
                          <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">
                            {exposures}x
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        {word.id}
                      </span>
                    </td>

                    {/* Phonetics */}
                    <td className="py-3 px-3 font-mono text-xs text-slate-500">
                      {word.phonetics}
                    </td>

                    {/* English */}
                    <td className="py-3 px-4 text-slate-600">
                      {word.en}
                    </td>

                    {/* Chinese */}
                    <td className="py-3 px-4 text-slate-700">
                      {word.zh}
                    </td>

                    {/* Voice & Audio Column (Listen + Record/Edit Parent Voice) */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                        {/* Play Pronunciation */}
                        <button
                          type="button"
                          onClick={() => playPronunciation(word)}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors shadow-2xs ${
                            hasCustomAud
                              ? 'bg-amber-400 text-amber-950 hover:bg-amber-500'
                              : 'bg-white text-indigo-600 hover:bg-indigo-50'
                          }`}
                          title={hasCustomAud ? "Écouter la voix parentale" : "Écouter la prononciation"}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Parent Voice Button */}
                        <button
                          type="button"
                          onClick={() => setEditingAudioWord(word)}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors shadow-2xs ${
                            hasCustomAud
                              ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                              : 'bg-white text-slate-500 hover:bg-slate-200'
                          }`}
                          title="Enregistrer ou changer la voix pour ce mot"
                        >
                          <Mic className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* CDI Developmental Mastery Status */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleStatusChange(word.id, 'NOT_YET')}
                          className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                            currentStatus === 'NOT_YET'
                              ? 'bg-slate-200 text-slate-800 shadow-sm'
                              : 'text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          Pas encore
                        </button>
                        <button
                          onClick={() => handleStatusChange(word.id, 'SOMETIMES')}
                          className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                            currentStatus === 'SOMETIMES'
                              ? 'bg-amber-400 text-amber-950 shadow-sm'
                              : 'text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          Parfois
                        </button>
                        <button
                          onClick={() => handleStatusChange(word.id, 'OFTEN')}
                          className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                            currentStatus === 'OFTEN'
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          Souvent
                        </button>
                      </div>
                    </td>

                    {/* Manage Column (Edit word & Delete custom word) */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingDetailWord(word)}
                          className="p-1.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Modifier les détails de ce mot (libellé, phonétique, catégorie, image, voix)"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteWord(word)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Supprimer ce mot personnalisé"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Word Modal */}
      <AddWordModal
        isOpen={isAddWordOpen}
        onClose={() => setIsAddWordOpen(false)}
        onWordAdded={(_newWord) => {
          setWords(contentManager.getWords());
        }}
        onRequestNewCategory={() => {
          setIsAddWordOpen(false);
          setIsAddCategoryOpen(true);
        }}
        preselectedCategoryId={selectedCategoryId || undefined}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onCategoryAdded={(newCat: CategoryInfo) => {
          setCategories(contentManager.getCategories());
          onSelectCategoryId(newCat.id);
        }}
      />

      {/* Edit Word Details Modal */}
      {editingDetailWord && (
        <EditWordModal
          word={editingDetailWord}
          isOpen={!!editingDetailWord}
          onClose={() => setEditingDetailWord(null)}
          onWordUpdated={() => {
            setWords(contentManager.getWords());
            setCustomImages(mediaCustomizationManager.getAllCustomImages());
            setCustomAudios(mediaCustomizationManager.getAllCustomAudios());
          }}
        />
      )}

      {/* Media Edit Modals */}
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
